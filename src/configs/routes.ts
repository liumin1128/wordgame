export default [
  {
    path: '/',
    component: '@/layouts/base',
    wrappers: ['@/wrappers/material-ui'],
    routes: [
      {
        path: '/',
        component: '@/pages/index',
        title: 'Home',
        exact: true,
      },
    ],
  },
];
