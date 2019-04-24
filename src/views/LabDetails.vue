<template>
  <v-layout>
   <!-- <v-flex xs12>
     <v-layout row wrap>
       <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
     </v-layout>
   </v-flex> -->
   <v-layout>
      <v-flex xs-12 class="display-3">
          {{title}} {{ $route.params.id }}
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>

export default {
  components: {
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
