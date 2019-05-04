<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <div class="title py-3"> Search Filters </div>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex md5>
        <v-text-field
          v-model="searchTerm"
          label="Search "
          solo
          clearable
        >
        <!-- v-on:change="filter(`${searchTerm}`, `${selectedSigs}`, `${selectedLevel}`)" -->
          <template v-slot:label>
            <v-icon style="vertical-align: middle">search</v-icon>
            Search
          </template>
        </v-text-field>
      </v-flex>
      <v-flex xs3 md4>
        <v-select
          class="px-2"
          solo
          multiple
          v-model="selectedSigs"
          :items="sigs"
          label="SIG"
          v-on:change="filter(`${searchTerm}`, `${selectedSigs}`, `${selectedLevel}`)"
        >
          <template v-slot:selection="{ item, index }">
            <v-chip v-if="index === 0">
              <span>{{ item }}</span>
            </v-chip>
            <v-chip v-if="index === 1">
              <span>{{ item }}</span>
            </v-chip>
            <span
              v-if="index === 2"
              class="grey--text caption"
            >(+{{ selectedSigs.length - 2 }} )</span>
          </template>
        </v-select>
      </v-flex>
      <v-flex xs3 md3>
        <v-select
          class="px-2"
          solo
          multiple
          v-model="selectedLevel"
          :items="levels"
          label="Level"
          v-on:change="filter(`${searchTerm}`, `${selectedSigs}`, `${selectedLevel}`)"
        >
          <template v-slot:selection="{ item, index }">
            <v-chip v-if="index === 0">
              <span>{{ item }}</span>
            </v-chip>
            <span
              v-if="index === 1"
              class="grey--text caption"
            >(+{{ selectedLevel.length - 1 }} )</span>
          </template>
        </v-select>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <!-- loader -->
    <v-flex text-xs-center class="mt-4">
      <pulse-loader :loading="loading" :color="color"></pulse-loader>
    </v-flex>
    <v-flex xs12 sm12 xl2>
      <v-layout row wrap>
        <v-flex
          class="pa-1 pt-3"
          v-for="lab in selectedLabs"
          :key="lab.entityId"
          xs12 sm6 md6 lg4
        >
          <v-hover v-if="!loading">
            <v-card color="indigo darken-1" class="white--text"
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 2}`"
            height="100%"
            :to="'/labs/' + lab.entityId"
            >
              <v-layout row style="min-height:200px">
                <v-flex xs8>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">{{lab.name}}</div>
                      <div>{{lab.description}}</div>
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
import _ from 'lodash'
import Fuse from 'fuse.js'
import Repository from '../scripts/repository.js'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import metadata from '../data/lab_metadata.json'

export default {
  components: {
    PulseLoader
  },
  data: function () {
    return {
      options: {
        shouldSort: true,
        tokenize: true,
        findAllMatches: true,
        threshold: 0.9,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          'name',
          'description'
        ]
      },
      selectedSigs: [],
      selectedLevel: '',
      searchTerm: '',
      sigs: [
        'API',
        'Big Data & AI',
        'Cloud',
        'eCommerce',
        'DevOps',
        'Mobile',
        'VR/AR',
        'WebDev'
      ],
      levels: [
        'Beginner',
        'Intermediate',
        'Advanced'
      ],
      labs: [],
      selectedLabs: [],
      color: '#3949ab',
      loading: true
    }
  },
  created: function () {
    this.getBadgesFromAPI()
    this.debouncedFilter = _.debounce(this.filter, 500)
  },
  methods: {
    search: function (term) {
      let fuse = new Fuse(this.labs, this.options)
      return fuse.search(term)
    },
    filter: function (searchTerm, sigs, levels) {
      let results = _.isEmpty(searchTerm) || searchTerm === 'null' ? this.labs : this.search(searchTerm)
      let filtered = this.filterBy(results, sigs, 'sig')
      this.selectedLabs = this.filterBy(filtered, levels, 'level')
    },
    filterBy: function (labs, filterTerms, key) {
      if (_.isEmpty(filterTerms)) {
        return labs
      }
      return _.filter(labs, (lab) => {
        return _.includes(filterTerms, lab[key])
      })
    },
    getBadgesFromAPI: function (event) {
      Repository.getIssuerBadges()
        .then(response => {
          let metadataLabs = this.addMetadata(response.data.badges, metadata)
          this.labs = metadataLabs
          this.selectedLabs = metadataLabs
          this.loading = false
        })
    },
    addMetadata: function (labs, metadata) {
      return _.map(labs, lab => {
        return _.assign(lab, _.find(metadata, { entityId: lab.entityId }))
      })
    }
  },
  watch: {
    searchTerm: function (newTerm, oldTerm) {
      this.debouncedFilter(newTerm, this.selectedSigs, this.selectedLevel)
    }
  }
}
</script>
