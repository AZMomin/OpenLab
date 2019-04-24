<template>
  <v-container>
    <v-flex xs12 sm12 xl2>
      <v-layout row wrap>
        <v-flex xs12>
          <div class="display-1 pa-3">
            Trending <v-icon large>trending_up</v-icon>
          </div>
        </v-flex>
        <v-flex
          class="pa-1"
          v-for="lab in labs.trending"
          :key="lab.id"
          xs12 sm6 md4 lg4
        >
          <!-- <v-card flat tile>
            <v-img
              :src="`https://unsplash.it/150/300?image=${Math.floor(Math.random() * 100) + 1}`"
              height="250px"
            ></v-img>
          </v-card> -->
          <v-hover>
            <v-card color="indigo darken-1" class="white--text"
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 2}`"
            height="100%"
            :to="lab.to"
            >
              <v-layout row style="min-height:150px">
                <v-flex xs8>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">{{lab.title}}</div>
                      <div>{{lab.desc}}</div>
                    </div>
                  </v-card-title>
                </v-flex>
                <v-flex xs4>
                  <v-img
                    :src=lab.img
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
                      <v-icon color="deep-orange lighten-1">{{icon.label}}</v-icon>
                    </v-chip>
                  </template>
                  <span> {{icon.tooltip}} </span>
                </v-tooltip>
                <v-chip outline color="teal" class="ml-2" v-on="on">
                  <v-icon color="#ffd700">star</v-icon>
                </v-chip>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-flex>

        <v-flex xs12>
          <div class="display-1 pa-3">
            New <v-icon large>new_releases</v-icon>
          </div>
        </v-flex>
        <v-flex
          class="pa-1"
          v-for="lab in labs.new"
          :key="lab.id"
          xs12 sm6 md4 lg4
        >
          <!-- <v-card flat tile>
            <v-img
              :src="`https://unsplash.it/150/300?image=${Math.floor(Math.random() * 100) + 1}`"
              height="250px"
            ></v-img>
          </v-card> -->
          <v-hover>
            <v-card color="indigo darken-1" class="white--text"
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 2}`"
            height="100%"
            :to="lab.to"
            >
              <v-layout row style="min-height:150px">
                <v-flex xs8>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">{{lab.title}}</div>
                      <div>{{lab.desc}}</div>
                    </div>
                  </v-card-title>
                </v-flex>
                <v-flex xs4>
                  <v-img
                    :src=lab.img
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
                      <v-icon color="deep-orange lighten-1">{{icon.label}}</v-icon>
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
console.log(data)
export default {
  // components: {
  //   LabCard
  // },
  created: function () {
    this.labs = data
  },
  data: () => ({
    labs: []
  })
}
</script>
