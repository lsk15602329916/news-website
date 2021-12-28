import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NewsList from '../views/NewsList.vue'

import NewsDetails from '@/views/NewsDetails';

import homePage from '@/views/homePage'

const HomeChildren = [{
        path: '',
        redirect: '/home/__all__'
    },
    {
        path: ':tag',
        name: 'NewsList',
        component: NewsList,
    },
]

const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        mame: 'Home',
        component: Home,
        children: HomeChildren
    },
    {
        path: '/details/:item_id',
        name: 'NewsDetails',
        component: NewsDetails,
    },
    {
        // path: '/homePage/:user_id',
        path: '/homePage',
        name: 'homePage',
        component: homePage,
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router