<template>
  <div class="navbar">
    <breadcrumb />
  </div>
</template>

<script lang="ts">
import Breadcrumb from '../Breadcrumb/index.vue'

export default {
  name: 'Navbar',
  components: {
    Breadcrumb
  }
}
</script>
