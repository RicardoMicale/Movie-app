<template>
    <div class="heading">
        <h1>Search</h1>
        <div class="change-page">
            <i class="fas fa-chevron-left" @click="prevPage()"></i>
            <h3>{{pageNum}}</h3>
            <i class="fas fa-chevron-right" @click="nextPage()"></i>
        </div>
    </div>
    <form @submit.prevent="searchMovies()">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Type a movie to search" v-model="searchWord">
        <input type="submit" value="Search">
    </form>
    <div class="movie-container">
        <div class="movie-card" v-for="movie in allMovies.results" :key="movie.id">
            <router-link :to="'/details/' + movie.id" class="details-link">
                <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title">
                <div>
                    <h5>{{movie.release_date}}</h5>
                    <p>{{movie.title}}</p>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import env from '../api';
import { ref } from 'vue';

export default {
    name: 'Search',
    data() {
        const allMovies = this.getAllMovies();
        const pageNum = 1;
        const searchWord = '';

        return {
            allMovies,
            pageNum,
            searchWord
        }
    },
    methods: {
        //Todas las peliculas
        async getAllMovies() {
            let movies = [] 

            await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${env}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                return this.allMovies = data;
            })
            .catch(error => {console.log(error)});

            return movies;
        },
        //Cambiar de pagina
        sumPage() {
            return this.pageNum = this.pageNum + 1
        },

        async nextPage() {
            let movies = [] 
            let page = this.sumPage();

            await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${env}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                return this.allMovies = data;
            })
            .catch(error => {console.log(error)});

            return movies;
        },
        //Retroceder pagina
        substractPage() {
            return this.pageNum = this.pageNum - 1
        },

        async prevPage() {
            let movies = [] 

            if(this.pageNum === 1) {
                alert("You're on the first page")
                return
            }
            
            let page = this.substractPage();

            await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${env}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                return this.allMovies = data;
            })
            .catch(error => {console.log(error)});

            return movies;
        },
        //Buscar pelicula
        async searchMovies() {
            const search = ref('');
            const query = this.searchWord;
            let movies = [];
            console.log(query)

            if(query != '') {
                await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${env}&language=en-US&query=${query}&page=1&include_adult=false`)
                    .then(response => {
                        return response.json()
                    })
                    .then(data => {
                        search.value = '';
                        console.log(data)
                        return this.allMovies = data
                    })
                }

            return movies;
        }
    }
}
</script>

<style scoped>

:root {
  /* Colors */
  --bg: #ffffff;
  --text: #232323;
  --text-alt: #101010;
  --primary-light: #00C8B0;
  --primary-dark: #01A692;
  --accent: #F42355;
  --bg-dDark: #F2F2F2;
  /* Fonts */
  --main-font: 'Jost', sans-serif;
  --alt-font: 'Montserrat', sans-serif;
}

.heading {
    margin: 2rem  7vw .3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.change-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2rem;
    width: 6rem;
}

.change-page i, .change-page h3 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    color: var(--text-alt);
}

.change-page i {
    background-color: var(--primary-dark);
    cursor: pointer;
}

.change-page h3 {
    background-color: var(--bg-dDark);
    width: 8rem;
}

.fa-chevron-left {
    border-top-left-radius: 50000px;
    border-bottom-left-radius: 50000px;
}

.fa-chevron-right {
    border-top-right-radius: 50000px;
    border-bottom-right-radius: 50000px;
}

h1 {
    font-size: 3rem;
    color: var(--text);
}

form {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: .7rem auto 1rem auto;
}

input {
    height: 2.3rem;
    border: none;
    outline: none;
    color: var(--text);
}

input[type="text"] {
    padding: .1rem .5rem;
    background-color: var(--bg-dDark);
    font-family: var(--alt-font);
}

input[type="submit"] {
    border-top-right-radius: 50000px;
    border-bottom-right-radius: 50000px;
    background-color: var(--primary-light);
    width: 5rem;
    font-weight: 600;
    font-family: var(--alt-font);
    cursor: pointer;
}

form i {
    background-color: var(--primary-light);
    color: var(--text);
    border-top-left-radius: 500000px;
    border-bottom-left-radius: 500000px;
    padding: .1rem .5rem;
    height: 2.3rem;
    width: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.movie-container {
    overflow-x: hidden;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    flex: 2 2 20%;
    width: 100%;
    background-color: var(--bg-dDark);
    padding: 1rem 7vw;
}

.details-link {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    text-decoration: none;
    margin: 2.4rem 0;
}

.movie-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 15vw;
    margin-left: .2rem;
    margin-right: .2rem;
}

.movie-card:hover img {
    border-top: solid .4rem var(--accent);
}

img {
    width: 100%;
}

.movie-card div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    background-color: var(--text);
    width: 100%;
    height: 8rem;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
    padding: .6rem .5rem;
}

p {
    text-align: center;
    color: var(--bg);
}

h5 {
    font-weight: 400;
    margin-bottom: .7rem;
    color: var(--bg-dDark);
    opacity: .5;
}
</style>