
import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../view/LoginView.vue';
import TaskList from '../view/TaskListView.vue';

const routes = [
    {
        path: '/',
        name: 'LoginView',
        component: LoginView
    },
    { 
        path: '/tasks', 
        name: 'TaskList',
        component: TaskList },
    // { path: '/login', component: Login },
    // { path: '/main', component: Main },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
