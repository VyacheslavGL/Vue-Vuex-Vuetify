<template>
    <v-app id="app">
<!--        clipped - опускает ниже app-->
        <v-navigation-drawer v-model="menu.showMenu" clipped app>
            <v-list dense>
                <v-list-item link v-for="item in menuItem" :to="item.link" :key="item.link">
                    <v-list-item-action>
                        <v-icon>{{item.icon}}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{item.text}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
<!--        clipped-left - растягивает до левого края-->
        <v-app-bar
                app
                color="indigo"
                dark
                clipped-left
        >
            <v-app-bar-nav-icon @click.stop="toggleDrawer" />
            <v-toolbar-title>{{ $route.meta.title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn to="/profile" text>
                <v-icon>mdi-account</v-icon>
                Личный кабинет
            </v-btn>
            <v-btn text>
                <v-icon>mdi-logout</v-icon>
                Выход
            </v-btn>
        </v-app-bar>

        <v-content>
            <v-container fluid class="fill-height">
                <v-card class="pa-4 fill-height" width="100%">
                    <router-view/>
                </v-card>
            </v-container>
        </v-content>
        <v-footer
                color="indigo"
                app
        >
            <span class="white--text">&copy; 2019</span>
        </v-footer>
    </v-app>
</template>

<script>
    // import Vue from 'vue'
    import {LOAD_BREEDS, LOAD_FAVORITES} from "./store/action.types";
    import { getDrawerState, saveDrawerState } from "./services/Utils";

    // Декларативный - когда говорим что должно быть но не говорим что для этого надо сделать и императивный - в процедурном стиле

    export default {
        async beforeCreate() {
        // async created() {
            // dispatch - запускает метод
            //Promise.all - пишем если нужено параллельное выполнение функции
            await Promise.all([
                this.$store.dispatch(LOAD_BREEDS),
                this.$store.dispatch(LOAD_FAVORITES),
            ]);
            // this.showMenu = await getDrawerState();
            //обьявление реактивного свойства
            // Vue.set(this, 'showMenu', await getDrawerState())
            this.$set(this.menu, 'showMenu', await getDrawerState());
        },
        data(){
            return{
                menu: {}
            }
        },
        computed: {
            favoriteCount() {
                return this.$store.state.favorites.length
            },
            menuItem() {
                return [
                    {link: '/', text: "Главная", icon: 'mdi-home'},
                    {link: '/about', text: "О нас", icon: 'mdi-help'},
                    {link: '/favorites', text: `Избранное (${this.favoriteCount})`, icon: 'mdi-star-outline'},
                ]

            },

        },
        methods:{
           async toggleDrawer(){
                this.menu.showMenu = !this.menu.showMenu;
                await saveDrawerState(this.menu.showMenu);
            }
        },
        mounted() {
            document.body.classList.remove("show-preloader");
        }
    }

</script>

<style>


    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }
</style>
