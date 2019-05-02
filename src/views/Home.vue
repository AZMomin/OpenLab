<template>
  <v-container>
    <v-flex xs12 sm12 xl2>
      <v-layout row wrap>
        <!-- from api endpoint -->
        <v-flex xs12>
          <div class="display-1 pa-3">
            From Api Endpoint <v-icon large>trending_down</v-icon>
          </div>
        </v-flex>
        <!-- loader -->
          <v-flex text-xs-center>
            <pulse-loader :loading="loading" :color="color"></pulse-loader>
          </v-flex>
        <!-- tiles -->
        <v-flex
          class="pa-1"
          v-for="lab in labs.remote"
          :key="lab.id"
          xs12 sm6 md4 lg4
        >
          <v-hover v-if="!loading">
            <v-card color="indigo darken-1" class="white--text"
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 2}`"
            height="100%"
            :to="'/labs/' + lab.entityId"
            >
              <v-layout row style="min-height:150px">
                <v-flex xs8>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">{{lab.name}}</div>
                      <div>{{ lab.description|truncate }}</div>
                    </div>
                  </v-card-title>
                </v-flex>
                <v-flex xs4>
                  <v-img
                    :src=lab.image
                    height="125px"
                    class="mt-3"
                    contain
                  ></v-img>
                </v-flex>
              </v-layout>
              <v-card-actions class="px-1 py-3">
                <v-tooltip
                  top
                  v-for="icon in lab.icons"
                  :key="icon.label">
                  <template v-slot:activator="{ on }">
                    <v-chip outline color="teal" class="ml-2" v-on="on">
                      <v-icon :color="icon.color">{{icon.label}}</v-icon>
                    </v-chip>
                  </template>
                  <span> {{icon.tooltip}} </span>
                </v-tooltip>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-container>
</template>

<script>
import data from '../data/home.json'
import labs from '../data/labs.json'
import Repository from '../scripts/repository.js'
import _ from 'lodash'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  components: {
    PulseLoader
  },
  created: function () {
    this.labs = {
      new: _.filter(labs, lab => _.includes(data.new, lab.id)),
      trending: _.filter(labs, lab => _.includes(data.trending, lab.id)),
      remote: [{
        title: 'placeholder',
        description: 'placeholder desc',
        to: '/labs/0',
        id: 0,
        img: 'https://media.us.badgr.io/uploads/badges/issuer_badgeclass_053c8194-da0d-4c9f-bf7b-3c94047b2a4f.png',
        awardBadgeName: 'emr',
        icons: [
          { label: 'timeline', tooltip: 'Big Data & AI', color: 'red lighten-1' }
        ]
      }]
    }
    this.getBadgesFromAPI()
  },
  methods: {
    getBadgesFromAPI: function (event) {
      Repository.getIssuerBadges()
        .then(response => {
          console.log('badger search response:', response)
          // this timeout is just so we can see the spinner working
          setTimeout(() => {
            this.labs.remote = response.data.badges
            this.loading = false
          }, 2000)
        })
    }
  },
  filters: {
    truncate: function (value) {
      if (value.length > 50) {
        value = value.substring(0, 47) + '...'
      }
      return value
    }
  },
  data: () => ({
    labs: [],
    loading: true,
    color: '#3949ab'
  })
}
</script>
