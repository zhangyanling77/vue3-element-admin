<template>
  <div class="app-wrapper">
    <div class="siderbar-container">
      <Sidebar />
    </div>
    <div class="main-container">
      <div class="header">
          <navbar />
        <div class="tags-view">
          tagsview
        </div>
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Siderbar'
import AppMain from '@/components/AppMain'
import Navbar from '@/components/Navbar'

export default {
  components: {
    Sidebar,
    AppMain,
    Navbar
  }
}
</script>

<style lang="scss" scoped>
  .app-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    .main-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      .header {
        .tags-view {
          height: 40px;
        }
      }
      .app-main {
        min-height: calc(100vh - 100px);
      }
    }
  }
</style>
