<template>
    <a @click="getAllMovies()">Search view</a>
</template>

<script>
import env from '../env';
import axios from 'axios';

export default {
    name: 'Search',
    data() {
        const allMovies = [];

        return {
            allMovies
        }
    },
    methods: {
        async getAllMovies() {
            await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${env}&language=en-US&sort_by=latest.desc&include_adult=false&include_video=false&page=1`)
            .then(response => {
                console.log(response.data);
                return this.allMovies = response.data;
            }).catch(error => {console.log(error)});
            
        }
    }
}
</script>

<style scoped>

</style>