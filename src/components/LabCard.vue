<template>
  <!-- <v-hover>
    <v-card color="indigo darken-1" class="white--text"
    slot-scope="{ hover }"
    :class="`elevation-${hover ? 12 : 2}`"
    height="100%"
    >
      <v-layout row>
        <v-flex xs8>
          <v-card-title primary-title>
            <div>
              <div class="headline">{{props.lab.title}}</div>
              <div>{{props.lab.desc}}</div>
              <div>desc</div>
            </div>
          </v-card-title>
        </v-flex>
        <v-flex xs4>
          <v-img
            :src=props.lab.img
            height="125px"
            contain
          ></v-img>
        </v-flex>
      </v-layout>
      <v-card-actions class="px-4 py-3">
        View Badge
        <v-spacer></v-spacer>
        <v-btn outline fab small color="blue lighten-2" :to="props.lab.to">
          <v-icon>keyboard_arrow_right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-hover> -->
  <v-hover>
                <v-card color="indigo darken-3" class="white--text"
                slot-scope="{ hover }"
                :class="`elevation-${hover ? 12 : 2}`"
                >
                  <v-layout row>
                    <v-flex xs7>
                      <v-card-title primary-title>
                        <div>
                          <div class="headline">{{title}}</div>
                          <div>Ellie Goulding</div>
                          <div>(2013)</div>
                        </div>
                      </v-card-title>
                    </v-flex>
                    <v-flex xs5>
                      <v-img
                        src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
                        height="125px"
                        contain
                      ></v-img>
                    </v-flex>
                  </v-layout>
                  <v-card-actions class="pa-3">
                    Rate this album
                    <v-spacer></v-spacer>
                    <v-icon>star_border</v-icon>
                    <v-icon>star_border</v-icon>
                    <v-icon>star_border</v-icon>
                    <v-icon>star_border</v-icon>
                    <v-icon>star_border</v-icon>
                  </v-card-actions>
                </v-card>
              </v-hover>
</template>

<script>

export default {
  data: () => ({
    props: {
      title: String
    }
  })
}
</script>

<style>

</style>
