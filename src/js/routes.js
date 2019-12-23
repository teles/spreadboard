import Overview from "./pages/Overview.vue";

const routes = [
    { path: "/overview", component: Overview},
    { path: '*', redirect: '/overview'}
];

export default routes;