<style src="../assets/css/LabDetails.css" scoped>
</style>
<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs8>
        <div xs12 class="display-3"> {{ labTitle }} </div>
        <div xs12 class="headline"> {{ labDescription }} </div>
      </v-flex>
      <v-flex xs4>
        <v-img
          :src=labImg
          height="150px"
          contain
        ></v-img>
      </v-flex>
    </v-layout>
    <v-divider class="mt-4"/>
    <v-layout row>
      <v-flex xs9 class="border-divider" mr-3>
        <div xs12 class="display-1"><vue-markdown :source="badgeCriteriaNarrative"></vue-markdown></div>
      </v-flex>
      <v-flex xs3>
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

import labs from '../data/labs.json'
import _ from 'lodash'
// vue markdown from here
// https://www.npmjs.com/package/vue-markdown
import VueMarkdown from 'vue-markdown'
import Repository from '../scripts/repository.js'
// import LocalLabData from '../data/home.json'

export default {
  components: {
    VueMarkdown
  },
  created: function () {
    this.getBadgesFromAPI()
  },
  computed: {
    labTitle: function () {
      try {
        return this.lab.title
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
        return this.lab.img
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
      markdownSource: ''
    }
  },
  methods: {
    getBadgesFromAPI: function (event) {
      let routeId = this.$route.params.id
      // eslint-disable-next-line
      let thisLabDetails = _.find(labs, function (lab) { return lab.id == routeId })
      try {
        console.log('lab details: ', thisLabDetails)
        let badgeNameToFind = thisLabDetails.awardBadgeName
        Repository.getIssuerBadgeByBadgeName(badgeNameToFind)
          .then(response => {
            console.log('badger search response:', response)
            this.badgeResult = response.data.badges[0]
            this.lab = _.find(labs, lab => lab.id === parseInt(this.$route.params.id))
            // eslint-disable-next-line
          })
          .catch(error => {
            console.log('oh no!', error)
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
