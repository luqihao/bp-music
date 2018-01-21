import Vue from 'vue'
import Router from 'vue-router'

const recommend = (resolve) => {
  import('components/recommend').then((module) => {
    resolve(module)
  })
}
const singer = (resolve) => {
  import('components/singer').then((module) => {
    resolve(module)
  })
}
const search = (resolve) => {
  import('components/search').then((module) => {
    resolve(module)
  })
}
const rank = (resolve) => {
  import('components/rank').then((module) => {
    resolve(module)
  })
}
const singerDetail = (resolve) => {
  import('components/singer-detail').then((module) => {
    resolve(module)
  })
}
const disc = (resolve) => {
  import('components/disc').then((module) => {
    resolve(module)
  })
}
const topList = (resolve) => {
  import('components/top-list').then((module) => {
    resolve(module)
  })
}
const userCenter = (resolve) => {
  import('components/user-center').then((module) => {
    resolve(module)
  })
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/user',
      component: userCenter
    },
    {
      path: '/recommend',
      component: recommend,
      children: [
        {
          path: ':id',
          component: disc
        }
      ]
    },
    {
      path: '/singer',
      component: singer,
      children: [
        {
          path: ':id',
          component: singerDetail
        }
      ]
    },
    {
      path: '/search',
      component: search,
      children: [
        {
          path: ':id',
          component: singerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: rank,
      children: [
        {
          path: ':id',
          component: topList
        }
      ]
    }
  ]
})
