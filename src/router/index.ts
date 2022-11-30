import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Home from '../views/home.vue'
import  User from '../views/admin-user.vue'
import  Map from '../views/admin-map.vue'
import  Question from '../views/admin-question.vue'
import  Bless from '../views/admin-bless.vue'
import  Alumnus from '../views/admin-alumnus.vue'
import  Donation from '../views/admin-donation.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin/user',
    name: 'User',
    component: User
  },  {
    path: '/admin/map',
    name: 'Map',
    component: Map
  },
  {
    path: '/admin/question',
    name: 'Question',
    component:Question
  },
  {
    path: '/admin/bless',
    name: 'Bless',
    component:Bless
  },
  {
    path: '/admin/alumnus',
    name: 'Alumnus',
    component:Alumnus
  },
  {
    path: '/admin/donation',
    name: 'Donation',
    component:Donation
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
