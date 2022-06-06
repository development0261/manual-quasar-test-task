
import auth from './middleware/auth.js'
import guest from './middleware/guest.js'

const router = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    component: () => import('pages/index.vue'),
    meta:{
      middleware:[auth]
    }
  },
  {
    path: '/login',
    component: () => import('pages/Login.vue'),
    meta:{
      middleware:[guest]
    }
    
  },
  {
    path: '/register',
    component: () => import('pages/Register.vue'),
    meta:{
      middleware:[guest]
    }
  },
    {
    path: '/properties',
    component: () => import('pages/Properties.vue'),
    meta:{
      middleware:[auth]
    }
  },
  
  {
    path: '/bookings',
    component: () => import('src/pages/Bookings.vue'),
    meta:{
      middleware:[auth]
    }
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default router
