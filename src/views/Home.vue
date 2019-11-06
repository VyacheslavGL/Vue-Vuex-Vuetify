<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <ul>
      <li v-for="(subbreeds, breed) in $store.state.breeds" :key="breed">
<!--        <router-link :to="{ name: 'breed-page', params: { name: breed }}">{{breed}}</router-link>-->
        <router-link :to="getBreedLink(breed)">{{breed}}</router-link>
        <ul v-if="subbreeds.length > 0">
          <li v-for="item in subbreeds" :key="item">
<!--            <router-link :to="{ name: 'breed-page', params: { name: breed, sub: item }}">{{item}}</router-link>-->
            <router-link :to="getBreedLink(breed, item)">{{item}}</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
methods:{
  getBreedLink(name, sub = null){
    return{
      name: 'breed-page',
      params:{
        name,
        sub,
      }
    }
  }
}
}
</script>
