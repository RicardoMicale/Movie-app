<template>
    <h1>Welcome back, {{cUser.username}} </h1>
    <div class="user-info">
        <img src="@/assets/user_phdr.png" alt="User Profile picture">
        <span>{{cUser.email}}</span>
        <button>Edit Profile</button>
        <button>Change Password</button>
    </div>
    <div class="lists">
        <div class="fav">
            <span>See all watched <i class="fas fa-arrow-right"></i></span>
            <ul>
                <li v-for="movie in userFavs" :key="movie.id">
                    <router-link :to="'/details' + movie.id">
                        <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="movie.title">
                        <p>{{ movie.title }}</p>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="wached">
            <span>See all watched <i class="fas fa-arrow-right"></i></span>
            <ul>
                <li v-for="movie in userWatched" :key="movie.id">
                    <router-link :to="'/details' + movie.id">
                        <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="movie.title">
                        <p>{{ movie.title }}</p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';
import * as fb from '../firebase';
import api from '../api';

export default {
    name: 'Profile',
    data() {

        return {
            cUser: {},
            userfavs: [],
            userWatched: []
        }
    },
    created() {

        const user = firebase.auth().currentUser;
        let cUser;

        if(user === null) {
            this.$router.push('/login')
            return null
        }
        
        firebase.auth().onAuthStateChanged(async user => {
            console.log(user.uid)
            if(user) {
                await fb.getUser(user.uid).then(response => {
                        this.cUser = response.data();
                        console.log(this.cUser)

                        //getFavourites
                        // const favMovies = []
                        this.cUser.favourites.forEach(async fav => {
                            const URL = `https://api.themoviedb.org/3/movie/${fav}?api_key=${api}&language=en-US`;
                            await fetch(URL)
                                .then(response => {
                                    return response.json()
                                })
                                .then(data => {
                                    this.userfavs.push(data);
                                })
                                .catch(err => console.log(err));
                        })

                        //getWatched
                        // const watchedMovies = []
                        this.cUser.watched.forEach(async watched => {
                            const URL = `https://api.themoviedb.org/3/movie/${watched}?api_key=${api}&language=en-US`;
                            await fetch(URL)
                                .then(response => {
                                    return response.json()
                                })
                                .then(data => {
                                    this.userWatched.push(data);
                                })
                                .catch(err => console.log(err));
                        })
                                    }).catch(err => console.log(err))
                            }
        })

        

        return {
            cUser,
            // favMovies,
            // watchedMovies
        }
    },
    methods: {
        getFavs() {
            const favMovies = []

            this.cUser.favs.forEach(fav => {
                const URL = `https://api.themoviedb.org/3/movie/${fav}?api_key=${api}&language=en-US`;
                fetch(URL)
                    .then(response => {
                        return response.json()
                    })
                    .then(data => {
                        favMovies.push(data);
                    })
                    .catch(err => console.log(err));
            })

            return favMovies
        },
        getWatched() {
            const watchedMovies = []

            this.cUser.watched.forEach(watched => {
                const URL = `https://api.themoviedb.org/3/movie/${watched}?api_key=${api}&language=en-US`;
                fetch(URL)
                    .then(response => {
                        return response.json()
                    })
                    .then(data => {
                        watchedMovies.push(data);
                    })
                    .catch(err => console.log(err));
            })

            return watchedMovies
        }
    }
}
</script>

<style scoped>

</style>