import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


// cart
import CartList from '@/components/cart/CartList.vue'


// api
import ProductData from '@/components/api/ProductData.vue'
import CartData from '@/components/api/CartData.vue'
import AuthComponent from '@/components/auth/AuthComponent.vue'
import BlogData from '@/components/api/BlogData.vue'
import RegisterComponent from '@/components/auth/RegisterComponent.vue'
import BlogDetail from '@/components/api/BlogDetail.vue'
import Error404Component from '@/components/error/Error404Component.vue'
import BlogEdit from '@/components/api/BlogEdit.vue'
import BlogAdd from '@/components/api/BlogAdd.vue'



// route
const routes = [

  // public route 
  {
    path: '/',
    name: 'auth',
    component: AuthComponent
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterComponent
  },
  {
    path: '/home',
    name: 'dashboard',
    component: HomeView,
  },

  // cart 
  {
    path: '/cart',
    name: 'cart',
    component: CartList,
  },

  // api route

  {
    path: '/product-api',
    name: 'productApi',
    component: ProductData,
  },
  {
    path: '/cart-api',
    name: 'cartApi',
    component: CartData,
  },
  {
    path: '/blog-api',
    name: 'blogApi',
    component: BlogData,
  },
  {
    path: '/blog-detail/:id',
    name: 'blogDetail',
    component: BlogDetail
  },

  {
    path: '/:id/edit',
    name: 'edit',
    component: BlogEdit
  },
  {
    path: '/blog-add',
    name: 'addBlog',
    component: BlogAdd
  },

  // page not found
  {
    // path: '/error-404',
    path: '/:pathMatch(.*)*',
    name: '404',
    component: Error404Component
  },
]

// for testcase
const isServer = typeof window === 'undefined'

const router = createRouter({
  history: isServer ? createMemoryHistory(import.meta.env.BASE_URL) : createWebHistory(import.meta.env.BASE_URL),
  routes,

  // linkActiveClass: 'active',
  // linkExactActiveClass: 'exact-active',
})


// retrive value from localstorage  and !! convert vlaue into bool
const isLogged = () => !!localStorage.getItem('auth_token');

// auth check
router.beforeEach((to, from) => {

  // public route 
  const publicPages = ['auth', 'register'];
  // to.name check name of target rotue against list
  const isPublicPages = publicPages.includes(to.name);


  // if user is not logged in and go to private page
  if (!isPublicPages && !isLogged()) {
    return { name: 'auth' };
  }

  // login in and access login page   
  if (isLogged() && isPublicPages) {
    return { name: 'dashboard' }
  }
  return true;

});

export default router
