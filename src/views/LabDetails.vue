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

export default {
  components: {
  },
  created: function () {
    this.lab = _.find(labs, lab => lab.id === parseInt(this.$route.params.id))
  },
  data: () => ({
    lab: {}
  })
}
</script>

<style>
.border-divider {
  border-right: solid 1px lightgray;
}
</style>
