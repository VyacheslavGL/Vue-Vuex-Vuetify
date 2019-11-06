<template>
    <v-row>
        <v-col cols="12" sm="6" md="4" xl="3" v-for="item in photos" :key="item" class="mb-3">
            <v-card :img="item" height="300">
<!--                <v-img :src="item"></v-img>-->
                <v-btn
                        fab
                        absolute
                        right
                        bottom
                        dark
                        class="mb-11 fav-btn"
                        :color="getFavoriteButtonClass(item)"
                        @click="toggleFavorite(item)"
                >
<!--                    <v-icon dark>mdi-plus</v-icon>-->
                    <v-icon>mdi-heart</v-icon>
                </v-btn>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import {TOGGLE_FAVORITE_IMAGE} from "../store/action.types";

    export default {
        name: "DogsList",
        props:{
            photos: {
                type: Array,
                required: true,
            }
        },
        methods:{
            async toggleFavorite(image){
                await this.$store.dispatch(TOGGLE_FAVORITE_IMAGE, image);
            },
            getFavoriteButtonText(imege){
                return this.$store.state.favorites.includes(imege) ? 'Убрать из избранного' : 'Добавить в избранное';
            },
            getFavoriteButtonClass(imege){
                return this.$store.state.favorites.includes(imege) ? 'red accent-3' : 'blue-grey darken-4';
            },
        },
    }
</script>

<style scoped>
.fav-btn{
    z-index: 2;
}
</style>