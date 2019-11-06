<template>
    <div class="favorites">
        <h1>Список избранных фото</h1>
<!--        <b-alert show v-if="favorites.length === 0">Список пуст</b-alert>-->
<!--        <img @click="toggleFavorite(item)" v-for="item in favorites" :src="item" :key="item" alt="">-->
        <dogs-list :photos="favorites"/>
    </div>
</template>

<script>
    // import {TOGGLE_FAVORITE_IMAGE} from "../store/action.types";
    import DogsList from "../components/DogsList";

    export default {
        components: {DogsList},
        /*  methods:{
            async toggleFavorite(image){
                await this.$store.dispatch(TOGGLE_FAVORITE_IMAGE, image);
            }
          },*/
        computed:{
            favorites(){
                return this.$store.state.favorites;
            }
        },

    }
</script>