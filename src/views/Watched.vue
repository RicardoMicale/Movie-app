<template>
  <h1>Watched</h1>
  <div class="all-movies" v-if="movies.length > 0">
    <div class="movie-card" v-for="movie in movies" :key="movie.id">
      <router-link :to="'/details/' + movie.id">
        <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title">
        <div class="title">
          <p>{{ movie.title }}</p>
        </div>
      </router-link>
    </div>
  </div>
  <h1 v-else>You havent marked any movies as watched</h1>
</template>

<script>
import firebase from 'firebase';
import * as fb from '../firebase';
import api from '../api';

export default {
    name: 'Watched',
    data() {
      return {
        cUser: {},
        movies: []
      }
    },
    created() {
      
      let cUser;

      firebase.auth().onAuthStateChanged(async user => {
        if(user) {
          await fb.getUser(user.uid)
            .then(response => {
              this.cUser = response.data();
              //fetch movies from watched list
              this.cUser.watched.forEach(fav => {
                fetch(`https://api.themoviedb.org/3/movie/${fav}?api_key=${api}&language=en-US`)
                  .then(response => {
                    this.movies.push(response);
                  })
              })

            }).catch(err => console.log(err))
        } else {
          alert('You have to be signed in to see this page');
          this.$router.push('/');
        }
      })

      return {
        cUser
      }
    }
}
</script>

<style scoped>

</style>