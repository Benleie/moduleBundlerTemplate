export default [
  {
    path: '/login',
    name: 'Login',
    meta: {
      label: '登录页',
    },
    component: () => import('@/views/pages/login/login.vue'),
  },
];
