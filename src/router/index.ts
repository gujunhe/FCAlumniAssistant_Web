import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Home from '../views/home.vue'
import  User from '../views/admin-user.vue'
import  Map from '../views/admin-map.vue'
import  Question from '../views/admin-question.vue'
import  Bless from '../views/admin-bless.vue'
import  Alumnus from '../views/admin-alumnus.vue'
import  Donation from '../views/admin-donation.vue'
import  Login from '../views/admin-login.vue'
import store from "@/store";
import {Tool} from "@/util/tool";
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      loginRequire: true
    }
  },
  {
    path: '/admin/user',
    name: 'User',
    component: User,
    meta: {
      loginRequire: true
    }
  },  {
    path: '/admin/map',
    name: 'Map',
    component: Map,
    meta: {
      loginRequire: true
    }
  },
  {
    path: '/admin/question',
    name: 'Question',
    component:Question,
    meta: {
      loginRequire: true
    }
  },
  {
    path: '/admin/bless',
    name: 'Bless',
    component:Bless,
    meta: {
      loginRequire: true
    }
  },
  {
    path: '/admin/alumnus',
    name: 'Alumnus',
    component:Alumnus,
    meta: {
      loginRequire: true
    }
  },
  {
    path: '/admin/donation',
    name: 'Donation',
    component:Donation,
    meta: {
      loginRequire: true
    }

  },
  {
    path: '/login',
    name: 'Login',
    component:Login,


  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 路由登录拦截
router.beforeEach((to, from, next) => {
  // 要不要对meta.loginRequire属性做监控拦截
  if (to.matched.some(function (item) {
    console.log(item, "是否需要登录校验：", item.meta.loginRequire);
    return item.meta.loginRequire
  })) {
    const loginUser = store.state.user;
    if (Tool.isEmpty(loginUser)) {
      console.log("用户未登录！");
      next({path:'/login'})
    } else {

      next();
    }
  } else {
    next();
  }
});
export default router
