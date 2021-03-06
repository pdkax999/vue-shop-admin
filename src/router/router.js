import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login/Login.vue'
import Home from '../pages/Home/Home.vue'
import Welcome from "../pages/Home/Welcome.vue";
import Users from "../pages/Users/Users.vue";
import Roles from "../pages/Roles/Roles.vue";
import Rights from "../pages/Roles/Rights.vue";
import Categories from "../pages/Goods/Categories.vue";
import Goods from "../pages/Goods/Goods.vue";
import Params from "../pages/Goods/Params.vue";
import Add from "../pages/Goods/Add.vue";
import Reports from "../pages/Reports/Reports.vue";
import Orders from "../pages/Orders/Orders.vue";


Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Home,
      children: [{
          path: '/',
          redirect: '/welcome'
        },
        {
          path: 'welcome',
          component: Welcome

        },
        {
          path: 'users',
          component: Users

        },
        {
          path: 'roles',
          component: Roles
        },
        {
          path: 'rights',
          component: Rights
        },
        {
          path: 'categories',
          component: Categories
        },
        {
          path: 'params',
          component: Params
        },
        {
          path: 'goods',
          component: Goods,
        },
        {
          path:'goods/add',
          component:Add 
        },
        {
          path:'reports',
          component:Reports
        },
        {
          path:'orders',
          component:Orders
        }
      ]

    }
  ]
})


router.beforeEach((to, from, next) => {

  const tokenStr = window.sessionStorage.getItem('token_key');
  if (to.path === '/login') next()
  if (to.path === '/login' && tokenStr) next('/welcome')

  if (!tokenStr) return next('/login')

  next()
})

export default router
// 挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   // to 将要访问的路径
//   // from 代表从哪个路径跳转而来
//   // next 是一个函数，表示放行
//   //     next()  放行    next('/login')  强制跳转

//   if (to.path === '/login') return next()
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) return next('/login')
//   next()
// })
