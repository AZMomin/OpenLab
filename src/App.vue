<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      temporary
      app
    >
    <v-img
      height="100%"
    >
      <v-layout
        class="fill-height"
        tag="v-list"
        column
      >
        <v-list-tile avatar>
          <v-list-tile-avatar
            color="white"
          >
          </v-list-tile-avatar>
          <v-list-tile-title class="title">
            OpenLabs
          </v-list-tile-title>
        </v-list-tile>
        <v-divider/>

        <v-list-tile
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          avatar
          class="v-list-item"
        >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title
            v-text="link.text"
          />
        </v-list-tile>

        <v-list-group
          value="true"
        >
          <template v-slot:activator>

            <v-list-tile>
              <v-list-tile-action>
                <v-icon>group</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>SIGs</v-list-tile-title>
            </v-list-tile>
          </template>
            <v-list-tile
              v-for="(sig, i) in sigs"
              :key="i"
              :to="'/sigs' + sig.to"
              avatar
              class="v-list-item"
              style="padding-left: 45px"
              :disabled="sig.disabled"
            >
              <v-list-tile-action>
                <v-icon>{{ sig.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-title
                v-text="sig.name"
              />
            </v-list-tile>
        </v-list-group>

        </v-layout>
      </v-img>
    </v-navigation-drawer>
    <v-toolbar app fixed>
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <v-toolbar-title>OpenLabs</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <!-- <HelloWorld/> -->
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      drawer: false,
      menu: [
        { icon: 'dashboard', title: 'Home', path: '' },
        { icon: 'note', title: 'Labs', path: 'labs' },
        { icon: 'star', title: 'Badges', path: 'badges' }
      ],
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
      ],
      right: null,
      links: [
        {
          to: '/',
          icon: 'dashboard',
          text: 'Home'
        },
        {
          to: '/labs',
          icon: 'class',
          text: 'Labs'
        },
        {
          to: '/badges',
          icon: 'star',
          text: 'Badges'
        }
      ],
      responsive: false,
      sigs: [
        { name: 'API', icon: 'extension', to: '/api', disabled: true },
        { name: 'Big Data & AI', icon: 'timeline', to: '/ai', disabled: false },
        { name: 'Cloud', icon: 'cloud', to: '/cloud', disabled: true },
        { name: 'Commerce', icon: 'shopping_cart', to: '/commerce', disabled: true },
        { name: 'DevOps', icon: 'build', to: '/devops', disabled: true },
        { name: 'Mobile', icon: 'smartphone', to: '/mobile', disabled: true },
        { name: 'VR/AR', icon: 'rounded_corner', to: '/vrar', disabled: true },
        { name: 'WebDev', icon: 'code', to: '/webdev', disabled: true }
      ]
    }
  }
}
</script>
