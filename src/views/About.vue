<template>
  <div class="about">
    <h1>This is an about page</h1>
    <v-divider />
    <h2 class="text-center">Наша история</h2>

    <v-timeline>
      <v-timeline-item>timeline item</v-timeline-item>
      <v-timeline-item class="text-right">timeline item</v-timeline-item>
      <v-timeline-item>timeline item</v-timeline-item>
    </v-timeline>



    <v-timeline>
      <v-timeline-item
              v-for="(year, i) in years"
              :key="i"
              :color="year.color"
              small
      >
        <template v-slot:opposite>
        <span
                :class="`headline font-weight-bold ${year.color}--text`"
                v-text="year.year"
        ></span>
        </template>

        <div class="py-4">
          <h2 :class="`headline font-weight-light mb-4 ${year.color}--text`">Lorem ipsum</h2>
          <div>
              <router-link to="/" tag="p">{{year.text}}</router-link>
          </div>
        </div>
      </v-timeline-item>
    </v-timeline>

      <iframe width="600" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ7WVKx4w3lkYR_46Eqz9nx20&key=AIzaSyDlXs2U0IDi-aZCgAk0nUsix8K_xc3CcnM" allowfullscreen></iframe>


  </div>
</template>

<script>
  export default {
    data(){
      return{
        years: [
          {
            color: 'cyan',
            year: '1960',
            text: 'Начало нашей карьеры'
          },
          {
            color: 'green',
            year: '1970',
            text: 'Выход на зарубежный рынок'
          },
          {
            color: 'pink',
            year: '1980',
            text: 'Подведение итогов'
          },
          {
            color: 'blue',
            year: '1990',
            text: 'Подьем рынка'
          },
          {
            color: 'orange',
            year: '2000',
            text: 'Новый уровень'
          },
        ],
      }
    }
  }
</script>
