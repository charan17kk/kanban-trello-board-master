import { Commands, Context, Route, Router } from '@vaadin/router';
import '.';

const routes: Route[] = [
  {
    path: '/',
    component: 'main-app',
    children: [
    ],
  },
];

const outlet = document.getElementById('outlet');
export const router = new Router(outlet);
router.setRoutes(routes);