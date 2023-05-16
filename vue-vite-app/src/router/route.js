import HelloWorld from '../components/HelloWorld.vue'
import StudentQuery from '@/views/student-query/student-query.vue';
import ElementDemo from '@/views/element-demo/element-demo.vue';
import Chart from '../views/charts/first.vue';
const About = { template: '<div>About</div>' }

export const pageRoutes = [
  { path: '/', component: Chart },
  { path: '/table', component: StudentQuery },
  { path: '/el', component: ElementDemo },
  { path: '/hello', component: HelloWorld },
  { path: '/about', component: About },
]
