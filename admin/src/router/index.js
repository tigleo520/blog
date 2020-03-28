import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import Welcome from '../views/Welcome.vue'
import Category from '../views/Category.vue'
import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'
import Banner from '../views/Banner'
import Ad from '../views/Ad'
import User from '../views/User'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login, meta: { isPublic: true } },
  {
    path: '/',
    component: Main,
    redirect: 'welcome',
    children: [
      { path: 'welcome', component: Welcome },
      { path: 'category', component: Category },
      { path: 'articles/create', component: ArticleEdit },
      { path: 'articles/edit/:id', component: ArticleEdit, props: true },
      { path: 'articles/list', component: ArticleList },
      { path: 'ads/banner', component: Banner },
      { path: 'ads/ad', component: Ad },
      { path: 'user', component: User }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, form, next) => {
  if (!to.meta.isPublic && !sessionStorage.token) {
    return next('/login')
  }
  next()
})
export default router
