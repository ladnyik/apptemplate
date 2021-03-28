import { Route } from '@vaadin/router';
import './views/login/login-view';
import './views/main/main-view';

export type ViewRoute = Route & { title?: string; children?: ViewRoute[] };

export const views: ViewRoute[] = [
  // for client-side, place routes below (more info https://vaadin.com/docs/v19/flow/typescript/creating-routes.html)
  {
    path: '',
    component: 'login-view',
    title: '',
  },
  {
    path: 'login',
    component: 'login-view',
    title: 'Login',
  },
  {
    path: 'app',
    component: 'app-view',
    title: 'App',
    action: async () => {
      await import('./views/app/app-view');
    },
  },
  {
    path: '(.*)',
    component: 'login-view',
    title: 'Login',
  }
];
export const routes: ViewRoute[] = [
  {
    path: '',
    component: 'main-view',
    children: [...views],
  },
];
