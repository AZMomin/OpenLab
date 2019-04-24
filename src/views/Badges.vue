<template>
  <v-container>
    <v-layout row>
          <v-flex xs12>
            <v-autocomplete
              v-model="selectedUsers"
              :disabled="isUpdating"
              :items="users"
              box
              chips
              color="blue-grey lighten-2"
              label="Users"
              item-text="user.name"
              item-value="user"
              multiple
            >
              <template v-slot:selection="data">
                <v-chip
                  :selected="data.selected"
                  close
                  class="chip--select-multi"
                  @input="remove(data.item)"
                >
                  <v-avatar class="mr-0">
                    <v-icon>perm_identity</v-icon>
                  </v-avatar>
                  {{ data.item.user.name }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-tile-content v-text="data.item"></v-list-tile-content>
                </template>
                <template v-else>
                  <v-list-tile-avatar>
                    <v-icon>perm_identity</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title v-html="data.item.user.name"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="data.item.user.practice"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-autocomplete>
          </v-flex>
        </v-layout>
    <v-divider></v-divider>
    <!-- <v-flex xs12 sm12 xl2>
          <v-layout row wrap>
            <v-flex
              class="pa-1 pt-3"
              v-for="lab in selectedLabs"
              :key="lab.title"
              xs12 sm6 md6 lg4
            >
              <v-hover>
                <v-card color="indigo darken-1" class="white--text"
                slot-scope="{ hover }"
                :class="`elevation-${hover ? 12 : 2}`"
                height="100%"
                >
                  <v-layout row>
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
                        contain
                      ></v-img>
                    </v-flex>
                  </v-layout>
                  <v-divider light></v-divider>
                  <v-card-actions class="px-4 py-3">
                    <v-chip outline label color="teal" text-color="white">Big Data & AI</v-chip>
                    <v-chip outline color="teal" class="ml-2">
                      <v-icon color="deep-orange lighten-1">cloud</v-icon>
                    </v-chip>
                    <v-chip outline color="teal" class="ml-2">
                      <v-icon color="#ffd700">star</v-icon>
                    </v-chip>
                    <v-spacer></v-spacer>
                    <v-btn outline fab small color="blue lighten-2" :to="lab.to">
                      <v-icon>keyboard_arrow_right</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-hover>
            </v-flex>
          </v-layout>
        </v-flex>-->
          <v-flex xs12>
            <v-expansion-panel expand>
              <v-expansion-panel-content
                v-for="user in selectedUsers"
                :key="user"
              >
                <template v-slot:header>
                  <div>
                    {{user.name}}
                    <v-chip label outline color="teal">{{user.numBadges}} Badges</v-chip>
                  </div>
                </template>
                <v-card>
                  <v-data-table
                    :headers="headers"
                    :items="labs"
                    class="elevation-1"
                  >
                    <template v-slot:items="props">
                      <td>{{ props.item.title }}</td>
                      <td>{{ props.item.sig }}</td>
                      <td>{{ props.item.level }}</td>
                      <td>{{ props.item.dateEarned }}</td>
                    </template>
                  </v-data-table>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-flex>
  </v-container>
</template>

<script>
import _ from 'lodash'

export default {
  data () {
    return {
      headers: [
        {
          text: 'Badges',
          align: 'left',
          sortable: true,
          value: 'title'
        },
        { text: 'SIG', value: 'sig', },
        { text: 'Level', value: 'level' },
        { text: 'Date Earned', value: 'dateEarned', sortable: false },
      ],
      autoUpdate: true,
      selectedUsers: [],
      isUpdating: false,
      users: [
        { user: { name: 'Ashley Alston', practice: 'ABI', numBadges: 7, id: 0 } },
        { user: { name: 'Chris Caicedo', practice: 'MSFT', numBadges: 7, id: 1 } },
        { user: { name: 'Tyler Estes', practice: 'ABI', numBadges: 7, id: 2 } },
        { user: { name: 'Tom Kelm', practice: 'ABI', numBadges: 7, id: 3 } },
        { user: { name: 'John Franks', practice: 'ABI', numBadges: 7, id: 4 } },
        { user: { name: 'Ali Momin', practice: 'OTS', numBadges: 7, id: 5 } },
        { user: { name: 'Phil Shon', practice: 'ABI', numBadges: 7, id: 6 } }
      ],
      labs: [
        { title: 'AWS EMR', desc: 'Sentiment Analysis', sig: 'Big Data & AI', level: 'Beginner', dateEarned:'2019-01-01' },
        { title: 'AWS SageMaker', desc: 'Document Typing', sig: 'Big Data & AI', level: 'Intermediate', dateEarned: '2019-02-02' },
        { title: 'Apache Cassandra Certification', desc: 'Airline Streaming', sig: 'Big Data & AI', level: 'Beginner', dateEarned:'2019-03-03'  },
        { title: 'Spark Streaming', desc: 'Sentiment Analysis', sig: 'Big Data & AI', level: 'Beginner', dateEarned: '2019-04-04' },
        { title: 'Azure ML', desc: 'Anomaly Detection', sig: 'Big Data & AI', level: 'Intermediate', dateEarned: '2019-05-05' },
        { title: 'GCP AutoML', desc: 'Facial Recognition', sig: 'Big Data & AI', level: 'Intermediate', dateEarned: '2019-06-06' },
        { title: 'Rand Lab', desc: 'Dummy Lab', sig: 'API', level: 'Advanced', dateEarned: '2019-07-07' }

      ],
    }
  },
  watch: {
    isUpdating (val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000)
      }
    }
  },
  methods: {
    remove (item) {
      const index = _.findIndex(this.selectedUsers, { 'id': item.user.id })
      if (index >= 0) this.selectedUsers.splice(index, 1)
    }
  }
}
</script>
