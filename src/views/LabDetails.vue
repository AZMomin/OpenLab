<style src="../assets/css/LabDetails.css" scoped>
</style>
<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs8>
        <div xs12 class="display-3"> {{ lab.title }} </div>
        <div xs12 class="headline"> {{ lab.description }} </div>
      </v-flex>
      <v-flex xs4>
        <v-img
          :src=lab.img
          height="150px"
          contain
        ></v-img>
      </v-flex>
    </v-layout>
    <v-divider class="mt-4"/>
    <v-layout row>
      <v-flex xs9 class="border-divider" mr-3>
        <div xs12 class="display-1"> Placeholder </div>
      </v-flex>
      <v-flex xs3>
        <div xs12 class="headline">Technologies</div>
        <v-list-tile
          v-for="tech in lab.technologies"
          :key="tech.title"
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
            <v-list-tile-title>{{ tech.title }}</v-list-tile-title>
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
import LocalLabData from '../data/home.json'

export default {
  components: {
    VueMarkdown
  },
  created: function () {
    this.lab = _.find(labs, lab => lab.id === parseInt(this.$route.params.id))
  },
  data: () => ({
    lab: {},
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

<style>
.border-divider {
  border-right: solid 1px lightgray;
}
</style>
