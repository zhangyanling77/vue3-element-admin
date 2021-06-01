<template>
  <div>
    <!-- 测试展开收起 -->
    <h6 @click="isCollapse=!isCollapse" style="color: white">展开收起测试</h6>

    <el-menu
      class="sidebar-container-menu"
      mode="vertical"
      :default-active="activeMenu"
      :background-color="scssVariables.menuBg"
      :text-color="scssVariables.menuText"
      :active-text-color="scssVariables.menuActiveText"
      :collapse="isCollapse"
      :collapse-transition="true"
    >
      <sidebar-item
        v-for="route in menuRoutes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
// 导入scss变量在组件中使用
import variables from '@/styles/variables.scss'
import { routes } from '@/router'
import SidebarItem from './SidebarItem.vue'

export default defineComponent({
  name: 'Sidebar',
  components: {
    SidebarItem
  },
  setup() {
    const route = useRoute()
    // 根据路由路径对应当前激活的菜单，当页面刷新之后激活当前匹配的菜单
    const activeMenu = computed(() => {
      const { path } = route
      return path
    })
    // scss变量
    const scssVariables = computed(() => variables)
    // 菜单展开收起的状态
    const isCollapse = ref(true)

    // 渲染路由
    const menuRoutes = computed(() => routes)

    return {
      scssVariables,
      activeMenu,
      isCollapse,
      menuRoutes
    }
  }
})
</script>
