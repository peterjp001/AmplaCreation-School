import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import UsersView from '../views/UsersView.vue'
import CourseView from '../views/CourseView.vue'
import EmployeeView from '../views/EmployeeView.vue'
import GradeView from '../views/GradeView.vue'
import NotesView from '../views/NotesView.vue'
import StudentView from '../views/StudentView.vue'
import BlankView from '../views/BlankView.vue'
import EditUserView from '../views/EditUserView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView
    },
    {
      path: '/course',
      name: 'course',
      component: CourseView
    },
    {
      path: '/employee',
      name: 'employee',
      component: EmployeeView
    },
    {
      path: '/grade',
      name: 'grade',
      component: GradeView
    },
    {
      path: '/student',
      name: 'student',
      component: StudentView
    },
    {
      path: '/notes',
      name: 'notes',
      component: NotesView
    },
    {
      path: '/blankpage',
      name: 'blankpage',
      component: BlankView
    },
    {
      path: '/edituser/:user_id',
      name: 'user',
      component: EditUserView,
      props:true
    },
    
    // ,
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && localStorage.getItem("accessToken") == null && localStorage.getItem("userData") == null) next({ name: 'login' })
  else next()
})

export default router
