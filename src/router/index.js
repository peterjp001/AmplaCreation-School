import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import UsersView from '../views/UsersView.vue'
import CourseView from '../views/CourseView.vue'
import EmployeeView from '../views/EmployeeView.vue'
import GradeView from '../views/GradeView.vue'
import GradeInfoView from '../views/GradeInfoView.vue'
import NotesView from '../views/NotesView.vue'
import StudentView from '../views/StudentView.vue'
import BlankView from '../views/BlankView.vue'
import InfoUserView from '../views/InfoUserView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import StatistiquesView from '../views/StatistiquesView.vue'
import PresenceView from '../views/PresenceView.vue'
import InfoEmployeeView from '../views/InfoEmployeeView.vue'
import AcademicYearView from '../views/AcademicYearView.vue'
import EditCourseRegistryView from '../views/EditCourseRegistryView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:patchMatch(.*)*',
      name: 'notfound',
      component: NotFoundView
    },
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
      path: '/user/:user_id',
      name: 'user',
      component: InfoUserView,
      props:true
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
      path: '/employee/:employee_id',
      name: 'employeeInfo',
      component: InfoEmployeeView,
      props:true
    },
    {
      path: '/grade',
      name: 'grade',
      component: GradeView
    },
    {
      path: '/grade/:grade_id',
      name: 'gradeInfo',
      component: GradeInfoView,
      props:true
    },
    {
      path: '/grade-course/:grade_registry_id',
      name: 'gradeCourseInfo',
      component: EditCourseRegistryView,
      props:true
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
      path: '/statistiques',
      name: 'statistiques',
      component: StatistiquesView
    },
    {
      path: '/presence',
      name: 'presence',
      component: PresenceView
    },
    {
      path: '/academicyear',
      name: 'academicyear',
      component: AcademicYearView
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
