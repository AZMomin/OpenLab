<template>
  <v-container>
    <!-- loader -->
    <v-flex text-xs-center class="mt-4">
      <pulse-loader :loading="loading" :color="color"></pulse-loader>
    </v-flex>
    <v-layout row wrap v-if="!loading">
      <v-flex xs9>
        <div xs12 class="display-3"> {{ labTitle }} </div>
        <div xs12 class="headline"> {{ labDescription }} </div>
        <v-btn
          :loading="loading3"
          :disabled="loading3"
          color="success"
          class="white--text"
          :href="this.lab.criteriaUrl"
        >
          View Resources
          <v-icon right dark>link</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs3>
        <v-img
          :src=labImg
          height="150px"
          contain
        ></v-img>
      </v-flex>
    </v-layout>
    <v-divider class="mt-4" v-if="!loading"/>
    <v-layout row v-if="!loading">
      <v-flex xs10 class="border-divider" mr-3 pt-3>
        <div xs12 class="display-1"><vue-markdown :source="badgeCriteriaNarrative"></vue-markdown></div>
      </v-flex>
      <v-flex xs2 pt-3>
        <div xs12 class="headline">Technologies</div>
        <v-list-tile
          v-for="tech in labTechnologies"
          :key="safeTechTitle(tech)"
        >
          <v-list-tile-action>
            <v-avatar
                size="40px"
              >
                <img
                  :src="tech.img"
                >
              </v-avatar>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ safeTechTitle(tech) }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>

import _ from 'lodash'
import VueMarkdown from 'vue-markdown'
import Repository from '../scripts/repository.js'
import metadata from '../data/lab_metadata.json'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  components: {
    VueMarkdown,
    PulseLoader
  },
  created: function () {
    this.getBadgesFromAPI()
  },
  computed: {
    labTitle: function () {
      try {
        return this.lab.name
      } catch (error) {
        return ''
      }
    },
    labDescription: function () {
      try {
        return this.lab.description
      } catch (error) {
        return ''
      }
    },
    labImg: function () {
      try {
        return this.lab.image
      } catch (error) {
        return ''
      }
    },
    labTechnologies: function () {
      try {
        return this.lab.technologies
      } catch (error) {
        return []
      }
    },
    badgeCriteriaNarrative: function () {
      try {
        return this.badgeResult.criteriaNarrative
      } catch (error) {
        return ''
      }
    }
  },
  data: function () {
    return {
      lab: {},
      title: 'Lab Title',
      badgeResult: {},
      markdownSource: '',
      color: '#3949ab',
      loading: true
    }
  },
  methods: {
    getBadgesFromAPI: function (event) {
      let badgeId = this.$route.params.id
      try {
        Repository.getIssuerBadgeByBadgeId(badgeId)
          .then(response => {
            // console.log(response)
            this.badgeResult = response.data.badges[0]
            this.lab = this.addMetadata(this.badgeResult, metadata)
            this.loading = false
          })
          .catch(error => {
            console.error(error)
          })
      } catch (error) {
        console.log(error)
      }
    },
    safeTechTitle: function (tech) {
      try {
        return tech.title
      } catch (error) {
        return ''
      }
    },
    addMetadata: function (lab, meta) {
      return _.assign(lab, _.find(meta, { entityId: lab.entityId }))
    }
  }
}
</script>

<style>
.border-divider {
  border-right: solid 1px lightgray;
}
a.returnLink {
    text-decoration: none;
    color: black
}
</style>
