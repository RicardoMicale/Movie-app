<template>
  <h1>Watched</h1>
  <div class="all-movies" v-if="movies.length > 0">
    <div class="movie-card" v-for="movie in movies" :key="movie.id">
      <router-link :to="'/details/' + movie.id" class="movie-link">
        <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title">
        <div class="title">
          <p>{{ movie.release_date.slice(0,4) }}</p>
          <h5>{{ movie.title }}</h5>
        </div>
      </router-link>
    </div>
  </div>
  <h2 v-else>You havent marked any movies as watched</h2>
</template>

<script>
import firebase from 'firebase';
import * as fb from '../firebase';

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
              this.cUser.watched.forEach(async wa => {
                this.movies.push(wa)
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

h1, h2 {
  text-align: center;
  color: var(--text);
  margin: 2rem 0 1rem 0;
}

h2 {
  font-weight: 400;
}

.all-movies {
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

.movie-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 15vw;
  margin-left: .2rem;
  margin-right: .2rem;
}

.movie-card .movie-link {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  text-decoration: none;
  margin: 2.4rem 0;
}

.movie-link:hover img {
  border-top: solid .4rem var(--accent);
}

.movie-card .movie-link div {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  background-color: var(--text);
  color: var(--bg);
  width: 100%;
  height: 10rem;
  border-bottom-left-radius: .5rem;
  border-bottom-right-radius: .5rem;
  padding: 1rem .5rem;
}

p {
  font-weight: 400;
  margin-bottom: .3rem;
  color: var(--bg-dDark);
  opacity: .5;
  font-size: .8rem;
}

h5 {
  text-align: center;
  color: var(--bg);
  font-size: 1rem;
}

.movie-link img {
  width: 100%;
}

@media screen and (max-width: 1024px) {
  .all-movies {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .movie-card {
    width: 90%;
  }

  p {
    font-size: 1rem;
  }

  h5 {
    font-size: 1.2rem;
  }

}

</style>