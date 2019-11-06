import axios from "axios";
const entry = "https://dog.ceo/api/";
// async function apiRequest(url) {

const apiRequest = async function(url) {
    const respons = await axios.get(`${entry}${url}`);

    if(respons.data.status && respons.data.status === "success"){
        return respons.data.message;
    }else{
        //прерывает работу кода
        throw new Error("Некорректный ответ API");
    }
};

export default {
    async getAllBreeds(){
       return apiRequest("breeds/list/all")
    },
    async getDogsByBreed( { name, sub }, limit = 5){
        let breed = name;
        if(sub){
            breed = `${breed}/${sub}`;
        }
        return apiRequest(`breed/${breed}/images/random/${limit}`);
    },

    async getDogsFromStorage(){
        const data = localStorage.getItem('FAVORITES');
        if(data){
            return JSON.parse(data);
        }
        return [];
    },
    async saveDogsToStorage(dogs = []){
        localStorage.setItem('FAVORITES', JSON.stringify(dogs))
    }
}