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
            <ul>
                <li></li>
            </ul>
        </div>
        <div class="wached">

        </div>
    </div>
</template>

<script>
import firebase from 'firebase';
import * as fb from '../firebase';
// import axios from 'axios';

export default {
    name: 'Profile',
    data() {
        return {
            cUser: {}
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
                    }).catch(err => console.log(err))
            }
        })

        return {
            cUser
        }
    },
    // methods: {
    //     // async getMovie(movieId) {
    //     //     URL = 

    //     //     await axios.get()
    //     // }
    // }
}
</script>

<style scoped>

</style>