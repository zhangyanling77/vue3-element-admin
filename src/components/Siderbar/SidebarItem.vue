<template>
  <div class="sidebar-item-container">
    <!-- 一个路由下只有一个子路由时，只渲染这个子路由 -->
    <template v-if="theOnlyOneChildRoute && !theOnlyOneChildRoute.children">
      <el-menu-item :index="resolvePath(theOnlyOneChildRoute.path)">
        <i v-if="icon" :class="icon" :style="menuIcon"></i>
        <template #title>
          <span>{{theOnlyOneChildRoute.meta.title}}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 多个子路由 -->
    <el-submenu
      v-else
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template #title>
        <i v-if="item.meta.icon" :class="item.meta.icon" :style="menuIcon"></i>
        <span class="submenu-title">{{item.meta.title}}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
      ></sidebar-item>
    </el-submenu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import path from 'path'

export default defineComponent({
  name: 'SidebarItem',
  props: {
    item: {
      type: Object as PropType<RouteRecordRaw>,
      required: true
    },
    basePath: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { item } = toRefs(props)

    // 渲染菜单主要先看子路由
    // 子路由的数量
    const showingChildNumber = computed(() => {
      // hidden 路由排除，只算可渲染的子路由
      const children = (props.item.children || []).filter(child => {
        if (child.meta && child.meta.hidden) return false
        return true
      })
      return children.length
    })

    const theOnlyOneChildRoute = computed(() => {
      // 多个children时，直接返回null，多个children时递归
      if (showingChildNumber.value > 1) {
        return null
      }
      // 只有一个子路由 筛选meta中有没有hidden属性，比如login、404等页面是不需要渲染成菜单的
      if (item.value.children) {
        for (const child of item.value.children) {
          if (!child.meta || !child.meta.hidden) {
            return child
          }
        }
      }
      // showingChildNumber === 0 无可渲染的子路由 无可渲染chiildren时 把当前路由item作为仅有的子路由渲染
      return {
        ...props.item,
        path: '' // resolvePath避免resolve拼接时 拼接重复
      }
    })

    // menu icon
    const icon = computed(() => {
      // 子路由 如果没有icon就使用父路由的
      return theOnlyOneChildRoute.value?.meta?.icon || (props.item.meta && props.item.meta.icon)
    })
    // 利用path.resolve 根据父路径+子路径 解析成正确路径 子路径可能是相对的 resolvePath 在模板中使用
    const resolvePath = (childPath: string) => {
      return path.resolve(props.basePath, childPath)
    }

    return {
      theOnlyOneChildRoute,
      icon,
      resolvePath,
      menuIcon: {
        marginRight: '16px',
        marginLeft: '5px',
        verticalAlign: 'middle'
      }
    }
  }
})
</script>

<style lang="scss">
.sidebar-item-container {
  .menu-icon {
    margin-right: 16px;
    margin-left: 5px;
    vertical-align: middle;
  }
}
</style>
