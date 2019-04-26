<style src="../assets/css/LabDetails.css" scoped>
</style>
<template>
    <v-layout
      class="fill-height"
      tag="v-list"
      column
    >
      <img src="../assets/logo.png">
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
      <vue-markdown :source="markdownSource">
      </vue-markdown>
      <v-flex xs-12 class="display-3">
          {{title}} {{$route.params.id}}
          <div v-html="compiledMarkdown"></div>
      </v-flex>
      </v-layout>
  </v-layout>
</template>
<script>
// vue markdown from here
// https://www.npmjs.com/package/vue-markdown
import VueMarkdown from 'vue-markdown'
export default {
  components: {
    VueMarkdown
  },
  data: () => ({
    title: 'Lab Title',
    markdownSource: '',
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
  }),
  created: function() {
    this.markdownSource = '\
Heading \n\
=======\n\
\n\
SubHeading\n\
----------\n\
\n\
  * list item 1\n\
  * list item 2\n\
\n\
  This is a hyperlink to [Google](http://google.com).\n\
  ![alt text](/img/logo.82b9c7a5.png "Logo Title Text 1")'
    
  }
}
</script>
