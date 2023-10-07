
import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../view/LoginView.vue';
import TaskList from '../view/TaskListView.vue';
import TaskForm from '../view/TaskFormView.vue';
import TagsList from '../view/TagsView.vue';

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
        path: '/task',
        name: 'TaskForm',
        component: TaskForm,
        // component: () => import(/* webpackChunkName: "TaskForm" */ '../components/TaskForm.vue')
    },
    { 
        path: '/tag', 
        name: 'TagsList',
        component: TagsList 
    },
    {
        path: '/task/:taskId',
        name: 'TaskId',
        component: TaskForm,
        props: true
    },      
    
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
