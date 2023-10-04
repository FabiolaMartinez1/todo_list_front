
import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../view/LoginView.vue';
import TaskList from '../view/TaskListView.vue';
import TaskForm from '../view/TaskFormView.vue';

const routes = [
    {
        path: '/',
        name: 'LoginView',
        component: LoginView
    },
    { 
        path: '/tasks', 
        name: 'TaskList',
        component: TaskList 
    },
    {
        path: '/tasks',
        name: 'NuevaTarea',
        component: TaskForm,
        // component: () => import(/* webpackChunkName: "TaskForm" */ '../components/TaskForm.vue')
    }
    
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
