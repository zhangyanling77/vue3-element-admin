<template>
  <el-breadcrumb class="app-breadcrumb breadcrumb-container" separator="/">
    <el-breadcrumb-item
      v-for="(item, index) in levelList"
      :key="item.path"
    >
      <!-- 面包屑导航的最后一个不可点，显示为当前的路由 -->
      <span
        v-if="index === levelList.length - 1"
        class="no-redirect"
      >
        {{item.meta.title}}
      </span>
      <a v-else @click.prevent="handleLink(item)">{{item.meta.title}}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onBeforeMount } from 'vue'
import { useRoute, useRouter, RouteLocationMatched, RouteRecordRaw } from 'vue-router'
import { compile } from 'path-to-regexp'

type PartialRouteLocationMatched = Partial<RouteLocationMatched>

export default defineComponent({
  name: 'Breadcrumb',
  setup() {
    const route = useRoute() // 相当于this.$route
    const router = useRouter() // 相当于this.$router
    const levelList = ref<Array<PartialRouteLocationMatched>>([]) // 导航列表，存放matched里筛选的路由记录

    // 判断是不是Dashboard路由
    const isDashboard = (route?: PartialRouteLocationMatched) => {
      const name = route && route.name
      if (!name) return false
      return (name as string).trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    }

    // 获取面包屑导航
    const getBreadcrumb = () => {
      // 对匹配的路由进行过滤，过滤没有title的的路由
      let matched = route.matched.filter(item => item.meta && item.meta.title) as PartialRouteLocationMatched[]
      // 获取第一个匹配路由记录
      const first = matched[0]
      if (!isDashboard(first)) {
        matched = ([{
          path: '/dashboard',
          meta: {
            title: 'Dashboard'
          }
        }] as PartialRouteLocationMatched[]).concat(matched)
      }
      levelList.value = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    }

    onBeforeMount(() => {
      getBreadcrumb()
    })

    watch(() => route.path, () => {
      getBreadcrumb()
    })

    // 动态路由，填充参数
    const pathCompile = (path: string) => {
      // 根据路径编译成正则函数 并接收具体参数 比如根据正则/user/:id 帮你将:id替换成具体路径
      const toPath = compile(path)
      const params = route.params
      return toPath(params)
    }

    // 点击面包屑跳转
    const handleLink = (route: RouteLocationMatched) => {
      const { path, redirect } = route
      if (redirect) {
        router.push(redirect as RouteRecordRaw)
        return
      }
      router.push(pathCompile(path))
    }
    return {
      handleLink,
      levelList
    }
  }
})
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  line-height: 50px;
  font-size: 14px;
  margin-left: 8px;
}

.no-redirect {
  color: #97a8be;
  cursor: text;
}
</style>

<style lang="scss">
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all .5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-leave-active {
  position: absolute;
}

.breadcrumb-move {
  transition: all .5s;
}
</style>
