import { createRouter, createWebHistory } from 'vue-router'
import Posts from '../views/Posts'

const routes = [
  {
    path: '/',
    name: 'Posts',
    component: Posts
  },
  {
    path: '/comments',
    name: 'Comments',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Comments.vue')
  },
  {
    path: '/cdcomments',
    name: 'CDComments',
    component: () => import(/* webpackChunkName: "about" */ '../views/C&DComments.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  mode: 'history',
  routes
})

export default router
