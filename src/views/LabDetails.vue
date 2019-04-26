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
      <v-layout>
        <v-flex xs-12 class="display-3">
            {{title}} {{$route.params.id}}
            <div v-html="compiledMarkdown"></div>
        </v-flex>
      </v-layout>
  </v-layout>
</template>

<script src="https://unpkg.com/marked@0.3.6"></script>
<script src="https://unpkg.com/lodash@4.16.0"></script>
<script>

export default {
  components: {
  },
  computed: {
    compiledMarkdown: function () {
      return marked("# hello", { sanitize: true })
    }
  },
  data: () => ({
    title: 'Lab Title',
    items: [
      {
        text: 'Labs',
        disabled: false,
        href: '#/labs'
      },
      {
        text: 'Lab Title',
        disabled: true,
        href: 'breadcrumbs_link_2'
      }
    ]
  })
}
</script>
