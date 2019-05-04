import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Users from './views/Users.vue'
import Labs from './views/Labs.vue'
import LabDetails from './views/LabDetails.vue'
import Sigs from './views/Sigs.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'labs',
      component: Labs
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    // {
    //   path: '/labs',
    //   name: 'labs',
    //   component: Labs
    // },
    {
      path: '/sigs/:id',
      component: Sigs
    },
    {
      path: '/labs/:id',
      component: LabDetails
    }
  ]
})
