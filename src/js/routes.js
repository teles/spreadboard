import Home from "./pages/Home.vue";
import Board from "./pages/Board.vue";

const routes = [
    { path: '/home', component: Home, name: "home"},
    { path: '/board/:id' , component: Board, name: "board"},
    { path: '*', redirect: '/home'}
];

export default routes;