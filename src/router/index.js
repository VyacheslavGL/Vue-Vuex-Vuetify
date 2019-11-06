import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            title: 'Главная'
        }
    },
    {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {
            title: 'О проекте',
        }
    },
    {
        //:name - обязательный параметр, :sub? - опциональный не обязательный со знаком вопрос
        path: '/breed/:name/:sub?',
        name: 'breed-page',
        component: () => import(/* webpackChunkName: "breed" */ '../views/Breed.vue'),
        meta: {
            title: 'Просмотр породы'
        }
    },
    {
        path: '/favorites',
        name: 'fav',
        component: () => import(/* webpackChunkName: "fav" */ '../views/Favorites.vue'),
        meta: {
            title: 'Список избранного'
        }
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/Profile.vue'),
        meta: {
            title: 'Настройки профеля'
        }
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

//ешеду
//переход на страницу загружается перед переходом на страницу
router.beforeEach((to, from, next) =>{
    document.title = to.meta.title;
    document.body.classList.add('show-preloader');
    next();
});

router.afterEach(() => {
    document.body.classList.remove('show-preloader');
});

export default router
