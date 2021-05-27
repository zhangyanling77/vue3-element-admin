<template>
  <div class="app-wrapper">
    <div class="siderbar-container">
      sider bar
    </div>
    <div class="main-container">
      <div class="header">
        <div class="navbar">
          nav bar
        </div>
        <div class="tags-view">
          tags view
        </div>
      </div>
      <div class="app-main">
        <h2>app main</h2>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

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
