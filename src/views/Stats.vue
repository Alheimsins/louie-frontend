<template>
  <v-container>
    <v-layout wrap>
      <v-container fluid grid-list-lg>
        <v-layout wrap>
          <v-flex xs12>
            <v-card>
              <v-card-title primary-title>
                <h3 class="headline">Statistikk</h3>
              </v-card-title>
              <v-card-text>
                <v-sparkline
                  :value="value"
                  :labels="labels"
                  type="bar"
                  auto-line-width
                ></v-sparkline>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'stats',
  data: () => ({
    value: [9, 2, 5],
    labels: ['test1', 'test2', 'test3']
  })
}
</script>

<style scoped>
code {
  margin-right: 15px;
}
p {
  font-size: 18px !important;
  color: black;
}
h5, h3 {
  color: black;
}
</style>
