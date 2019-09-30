<template>
  <v-footer>
    <v-col
      class="text-center"
      cols="12"
    >
    &copy; {{ new Date().getFullYear() }} — {{ productOwner }}
    </v-col>
  </v-footer>
</template>

<script>
import { productOwner } from '../../config'

export default {
  name: 'Footer',
  data: () => ({
    productOwner
  })
}
</script>
