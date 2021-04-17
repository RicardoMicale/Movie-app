<template>
  <h1>{{ movie.title }} - Details</h1>
  <div class="details-container">
    <div class="info-container">
      <div class="left">
        <span>{{ movie.release_date }}</span>
        <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title">
      </div>
      <div class="right">
        <h3>Plot:</h3>
        <p>{{ movie.overview }}</p>
        <h4>Rating: <span>{{ movie.vote_average }}</span></h4>
        <h4>Runtime: <span>{{ movie.runtime }} mins</span></h4>
        <h4>Cast:</h4>
        <ul>
          <li v-for="actor in actors" :key="actor.id">{{ actor.name }} as {{ actor.character }}</li>
        </ul>
        <h4>Genres:</h4>
        <ul>
          <li v-for="genre in movie.genres" :key="genre.id">{{ genre.name }}</li>
        </ul>
        <h4>Budget: <span>{{ movie.budget }}</span></h4>
        <h4>Original language: <span>{{ movie.original_language }}</span></h4>
      </div>
    </div>
    <div class="buttons">
      <button class="btn btn-watch" @click="addWatch()">Mark as Watched</button>
      <button class="btn btn-fav" @click="addFav()">Add to Favourites</button>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import axios from 'axios';
import api from '../api';
import firebase from 'firebase';
import * as fb from '../firebase';
// import { ref, onBeforeMount } from 'vue';

export default {
    name: 'Details',
    data() {
      
      const route = useRoute();
      const CAST_URL = `https://api.themoviedb.org/3/movie/${route.params.id}/credits?api_key=${api}&language=en-US`
      const movie = this.getMovie();
      const actors = this.getCast();

      return {
        URL,
        CAST_URL,
        movie,
        actors
      }

    },

    methods: {
      //Get movie
      async getMovie() {
        let movie = {};
        const route = useRoute();
        const URL = `https://api.themoviedb.org/3/movie/${route.params.id}?api_key=${api}&language=en-US`;

        await axios.get(URL)
        .then(response => {
          return this.movie = response.data
        }).catch(error => console.log(error));

        return movie
      },
      //Get actors
      async getCast() {
        let cast = [];
        const route = useRoute();
        const CAST_URL = `https://api.themoviedb.org/3/movie/${route.params.id}/credits?api_key=${api}&language=en-US`
      
        
        await axios.get(CAST_URL)
          .then(response => {
            return this.actors = response.data.cast.slice(0,6);
          }).catch(error => console.log(error));

          return cast
      },
      //add favourite
      async addFav() {
        const user = firebase.auth().currentUser;
        let cUser;

        await fb.getUser(user.uid)
          .then(response => {
            cUser = response.data()
            cUser.favourites.push(this.movie);
          })

        fb.updateUser(user.uid, cUser);
      },
      //add watch
      async addWatch() {
        const user = firebase.auth().currentUser;
        let cUser;

        await fb.getUser(user.uid)
          .then(response => {
            cUser = response.data()
            cUser.watched.push(this.movie);
          })

        fb.updateUser(user.uid, cUser);
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

h1 {
  color: var(--text);
  font-size: 2rem;
  padding: 10vh 7vw 1rem;
}

.details-container {
  background-color: var(--bg-dDark);
  width: 100%;
  height: auto;
}

.info-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 7vw;
  width: 100%;
}

.left {
  width: 60%;
  position: relative;
}

.left span {
  position: absolute;
  background-color: var(--primary-dark);
  color: var(--bg-dDark);
  height: 2rem;
  left: 0;
  top: 2rem;
  padding: .3rem 1rem;
  border-bottom-right-radius: 5000px;
  border-top-right-radius: 5000px;
}

img {
  width: 100%;
  border-right: solid 2rem var(--primary-light);
}

.right {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 4rem;
  color: var(--text);
}

h4, h3 {
  color: var(--text);
  margin-bottom: .5rem;
}

p, li, h4 span {
  opacity: 0.8;
}

p, ul {
  margin-bottom: .25rem;
}

li {
  list-style-type: none;
  margin-left: 1rem;
}

.buttons {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 4rem 0;
}

.btn {
  outline: none;
  border: none;
  padding: .7rem 2rem;
  width: 20%;
  font-family: var(--alt-font);
  font-weight: 600;
  border-radius: 50000px;
  cursor: pointer;
}

.btn-watch {
  background-color: var(--primary-light);
  color: var(--text);
}

.btn-fav {
  background-color: var(--text);
  color: var(--bg);
}

@media screen and (max-width: 1024px) {
  .info-container {
    flex-direction: column;
  }

  .left span {
    top: 1rem;
  }

  .right {
    margin-left: 0;
  }

  .buttons {
    flex-direction: column;
    padding: 1rem 0;
  }

  .btn {
    width: 90%;
    margin-top: 1rem;
  }
}

</style>