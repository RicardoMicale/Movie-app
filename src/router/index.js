import {createRouter, createWebHistory} from 'vue-router';
import Login from '../views/Login';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Search from '../views/Search';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/search',
        name: 'Search',
        component: Search
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router