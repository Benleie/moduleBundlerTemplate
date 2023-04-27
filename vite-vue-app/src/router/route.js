import HelloWorld from '../components/HelloWorld.vue'
import StudentQuery from '../views/student-query/student-query.vue';
const About = { template: '<div>About</div>' }

export const pageRoutes = [
  { path: '/', component: StudentQuery },
  { path: '/hello', component: HelloWorld },
  { path: '/about', component: About },
]
