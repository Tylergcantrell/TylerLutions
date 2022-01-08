import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: '/add',
    name: 'add',
    component: () => import('../components/ServiceCreate')
  },
  {
    path: '/',
    name: 'list',
    component: () => import('../components/MobileDisplay')
  },
  {
    path: '/archive',
    name: 'archive',
    component: () => import('../components/Archive')
  },
   {
    path: '/pending',
    name: 'pending',
    component: () => import('../components/Pending')
  },
  {
    path: '/tv',
    name: 'tv',
    component: () => import('../components/TVDisplay')
  },
  {
    path: '/condensed',
    name: 'condensed',
    component: () => import('../components/Condensed')
  },
  {
    path: '/sl',
    name: 'serviceLoc',
    component: () => import('../components/ServiceLocList')
  },
  {
    path: '/slc',
    name: 'serviceLocCreate',
    component: () => import('../components/ServiceLocationCreate')
  },
  {
    path: '/sle',
    name: 'serviceLocEdit',
    component: () => import('../components/ServiceLocEdit')
  },
    {
    path: '/cl',
    name: 'cem',
    component: () => import('../components/CemList')
  },
  {
    path: '/cemCreate',
    name: 'cemCreate',
    component: () => import('../components/CemCreate')
  },
  {
    path: '/cle',
    name: 'cemEdit',
    component: () => import('../components/CemEdit')
  },
  {
    path: '/vl',
    name: 'veh',
    component: () => import('../components/VehList')
  },
  {
    path: '/vlc',
    name: 'vehAdd',
    component: () => import('../components/VehAdd')
  },
  {
    path: '/vle',
    name: 'vehEdit',
    component: () => import('../components/VehEdit')
  },
  {
    path: '/bll',
    name: 'bl',
    component: () => import('../components/BLList')
  },
  {
    path: '/blc',
    name: 'BLCreate',
    component: () => import('../components/BLAdd')
  },
  {
    path: '/ble',
    name: 'BLEdit',
    component: () => import('../components/BLEdit')
  },
  {
    path: '/srl',
    name: 'srl',
    component: () => import('../components/SRList')
  },
  {
    path: '/src',
    name: 'SRCreate',
    component: () => import('../components/SRAdd')
  },
  {
    path: '/sre',
    name: 'SREdit',
    component: () => import('../components/SREdit')
  },
  {
    path: '/pl',
    name: 'pers',
    component: () => import('../components/PersList')
  },
  {
    path: '/plc',
    name: 'persCreate',
    component: () => import('../components/PersAdd')
  },
  {
    path: '/ple',
    name: 'persEdit',
    component: () => import('../components/PersEdit')
  },
  {
    path: '/edit/:id',
    name: 'theEdit',
    component: () => import('../components/ServiceEdit')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;