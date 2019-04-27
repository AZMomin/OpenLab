<style src="../assets/css/LabDetails.css" scoped>
</style>
<template>
    <v-layout
      class="fill-height"
      tag="v-list"
      column
    >
      <v-list>
        <v-list-tile avatar>
          <v-list-tile-title class="title">
            <router-link to="/" v-bind:class="{ returnLink: true}">
              <v-icon>arrow_back</v-icon>
              Return
            </router-link>
          </v-list-tile-title>
        </v-list-tile>
        <v-divider/>
      </v-list>
      <v-container>
        <v-layout row>
          <v-flex xs-12>
              {{title}} {{$route.params.id}}
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs-12>
            <vue-markdown :source="badgeResult.criteriaNarrative"></vue-markdown>
          </v-flex>
        </v-layout>
      </v-container>
  </v-layout>
</template>
<script>
// vue markdown from here
// https://www.npmjs.com/package/vue-markdown
import VueMarkdown from 'vue-markdown'
import Repository from '../scripts/repository.js'
import LocalLabData from '../data/home.json'
import _ from 'lodash'

export default {
  components: {
    VueMarkdown
  },
  data: () => ({
    title: 'Lab Title',
    badgeResult: { criteriaNarrative: '' },
    markdownSource: ''
  }),
  created: function () {
    this.badgeResult = {}
    this.getBadgesFromAPI()
  },
  methods: {
    getBadgesFromAPI: function (event) {
      var routeId = this.$route.params.id
      var thisLabDetails = _.find(LocalLabData.new, function (lab) { return lab.to.includes(routeId) })
      try {
        var badgeNameToFind = thisLabDetails.awardBadgeName
        Repository.getIssuerBadgeByBadgeName(badgeNameToFind)
          .then(response => {
            console.log('badger search response:', response)
            this.badgeResult = response.data.badges[0]
            // eslint-disable-next-line
          })
          .catch(error => {
            console.log('oh no!', error)
          })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
