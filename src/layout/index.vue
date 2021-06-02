<template>
  <div class="app-wrapper">
    <div class="siderbar-container">
      <Sidebar />
    </div>
    <div class="main-container">
      <div class="header">
        <div class="navbar">
          navbar
        </div>
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

export default {
  components: {
    Sidebar,
    AppMain
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
        background-color: #eee;
        .navbar {
          height: 60px;
          background-color: #fff;
        }
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
