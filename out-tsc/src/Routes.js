import { Router } from '@vaadin/router';
import '.';
const routes = [
    {
        path: '/',
        component: 'main-app',
        children: [],
    },
];
const outlet = document.getElementById('outlet');
export const router = new Router(outlet);
router.setRoutes(routes);
//# sourceMappingURL=Routes.js.map