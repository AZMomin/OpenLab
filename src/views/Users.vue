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
    <v-flex xs12>
      <v-expansion-panel expand>
        <v-expansion-panel-content
          v-for="user in selectedUsers"
          :key="user.name"
        >
          <template v-slot:header>
            <div>
              {{user.name}}
              <v-chip label outline color="teal">{{user.labs.length}} Badges</v-chip>
            </div>
          </template>
          <v-card>
            <v-data-table
              :headers="headers"
              :items="user.labs"
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
import badges from '../data/badges.json'

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
        { text: 'SIG', value: 'sig' },
        { text: 'Level', value: 'level' },
        { text: 'Date Earned', value: 'dateEarned', sortable: false }
      ],
      autoUpdate: true,
      selectedUsers: [],
      isUpdating: false,
      users: []
    }
  },
  created: function () {
    this.users = badges
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
