import {createRouter, createWebHistory} from 'vue-router';
import Login from '../views/Login';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Search from '../views/Search';
import Details from '../views/Details';
import Favourites from '../views/Favourites';
import Watched from '../views/Watched';

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
    },
    {
        path: '/details/:id',
        name: 'Details',
        component: Details
    },
    {
        path: '/favourites/:id',
        name: 'Favourites',
        component: Favourites
    },
    {
        path: '/watched/:id',
        name: 'Watched',
        component: Watched
    }
];


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router