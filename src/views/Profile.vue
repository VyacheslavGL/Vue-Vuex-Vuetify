<template>
    <div class="profile">
        <h1>{{$route.meta.title}}</h1>
        <v-divider></v-divider>
        <v-form @submit.prevent="sendForm">

            <v-row>
                <v-col sm="4">
                    <v-alert v-if="showError" class="my-6" type="error" >Заполните корректно форму</v-alert>
                    <v-text-field
                            :error-messages = "nameErrors"
                            v-model="userName"
                            label="Ваше имя"
                            @input="$v.userName.$touch()"
                            @blur="$v.userName.$touch()"
                    ></v-text-field>
                    <v-select
                            :items = 'cities'
                            label="Ваш город"
                            v-model="city"
                    ></v-select>
                    <v-select
                            v-model="lang"
                            item-value="lang"
                            item-text="title"
                            :items = 'languages'
                            label="Ваш Интерфейс"
                    ></v-select>
                    <v-text-field
                            v-model="email"
                            label="Ваше email"
                            :error-messages = "emailErrors"
                            @input="$v.email.$touch()"
                            @blur="$v.email.$touch()"
                    ></v-text-field>
                    <v-text-field v-mask="phoneMask" label="Ваше телефон"></v-text-field>
                    <v-radio-group label="Пол:" row>
                        <v-radio label="Мужской" value="male"></v-radio>
                        <v-radio label="Женский" value="female"></v-radio>
                    </v-radio-group>
                    <v-checkbox label="Получать уведомление о новых собаках" />
                    <v-slider
                     v-model="height" min="10" max="150" thumb-label="always"
                    >
                        <template #label>
                            Рост собаки: ({{height}} см)
                        </template>
                    </v-slider>
<!--                    календарь-->
                    <v-menu
                            v-model="showDatePiker"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                    >
                        <template #activator="{ on }">
                            <v-text-field
                                    label="Дата рождения"
                                    :value="formatedBirthday"
                                    readonly
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                                first-day-of-week="1"
                                v-model="birthday"
                                @input="showDatePiker = false"
                        ></v-date-picker>
                    </v-menu>
                    <v-btn color="primary" type="submit">Сохранить</v-btn>
                </v-col>
            </v-row>
        </v-form>
    </div>
</template>

<script>

    import {mask} from 'vue-the-mask'
    import { validationMixin } from 'vuelidate'
    import {required, maxValue, minValue, email } from 'vuelidate/lib/validators'
    const russianLetters = value => /^[а-яА-Я]{2,25}$/.test(value);

    export default {
        directives: {
          mask
        },
        mixins: [validationMixin],
        data(){
            return{
                cities:['Санкт-Петербург', 'Москва', 'Екатеринбург', 'Казань'],
                languages:[
                    {
                        lang: 'en',
                        title: "English"
                    },
                    {
                        lang: 'ru',
                        title: "Русский"
                    },
                ],
                height: 10,
                showDatePiker: false,
                birthday: '',
                phoneMask: '+7 (###) ###-##-##',
                userName: '',
                showError: false,
                email: '',
                city: 'Санкт-Петербург',
                lang: 'en',
            }
        },
        computed:{
            formatedBirthday(){
                return this.birthday.split('-').reverse().join('.');
            },
            nameErrors(){
                const errors = [];
                // $dirty - если поле не изменяли то ошибку не показывать
                if (!this.$v.userName.$dirty)return errors;
                if(!this.$v.userName.required){
                    errors.push('Заполните имя!')
                }
                if(!this.$v.userName.russianLetters){
                    errors.push('Имя должно содержать только кирилицу!')
                }
                return errors;
            },
            emailErrors(){
                const errors = [];
                // $dirty - если поле не изменяли то ошибку не показывать
                if (!this.$v.email.$dirty)return errors;
                if(!this.$v.email.required){
                    errors.push('Заполните почтовый адрес!')

                }
                if(!this.$v.email.email){
                    errors.push('Введите корректный email!')
                }
                return errors;
            },
        },
        validations: {
            height: {required, minValue: minValue(10), maxValue: maxValue(150)},
            userName: {required, russianLetters},
            email: {required, email},
        },
        methods:{
            sendForm(){
                // https://vuelidate.netlify.com/#sub-v-values
                this.$v.$touch();
                if(this.$v.$invalid){
                    this.showError = true;
                }else{
                    this.showSuccess = true;
                }
//если есть ошибка то будет скролить на самый верх до алерта
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                })
            }
        }
    }
</script>