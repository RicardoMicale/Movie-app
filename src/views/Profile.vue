<template>
    <h1>Welcome back, {{cUser.username}} </h1>
    <div class="all">
        <div class="user-info">
            <img src="@/assets/user_phdr.png" alt="User Profile picture">
        </div>
        <div class="user-info">
            <span>{{cUser.email}}</span>
            <div class="buttons">
                <button class="edit" @click="showEdit()">Edit Profile</button>
                <Edit v-if="edit" />
                <button class="pass" @click="showPass()">Change Password</button>
                <Password v-if="editPass" />
            </div>
            <div class="list-links">
                <router-link :to="'/favourites/' + cUser.username" class="links">See all favourites <i class="fas fa-arrow-right"></i></router-link>
                <router-link :to="'/watched/' + cUser.username" class="links">See all watched <i class="fas fa-arrow-right"></i></router-link>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';
import * as fb from '../firebase';
import Edit from '../components/Edit';
import Password from '../components/Password';

export default {
    name: 'Profile',
    components: {
        Edit,
        Password
    },
    data() {

        return {
            cUser: {},
            edit: false,
            editPass: false,
            user: firebase.auth().currentUser
        }
    },
    created() {

        let cUser;
        
        firebase.auth().onAuthStateChanged(async user => {
            if(user) {
                await fb.getUser(user.uid).then(response => {
                    this.cUser = response.data();

                    }).catch(err => console.log(err))
            } else {
                this.$router.push('/login');
            }
        })

        

        return {
            cUser
        }
    },
    methods: {
        showEdit() {
            this.edit = !this.edit
        },
        showPass() {
            this.editPass = !this.editPass
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
  --bg-dDark: #c5c5c5;
  /* Fonts */
  --main-font: 'Jost', sans-serif;
  --alt-font: 'Montserrat', sans-serif;
}

h1 {
    color: var(--text);
    padding: 2rem 7vw .4rem;
}

i {
    color: var(--text);
}

.all {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: auto;
    padding: 1rem 7vw;
}

.user-info {
    display: inherit;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 20%;
    height: auto;
    color: var(--text);
}

.user-info img {
    width: 100%;
}

button {
    width: 60%;
    margin: 1rem 0;
    border-radius: 500000px;
    outline: none;
    border: none;
    padding: .6rem 0;
    font-family: var(--alt-font);
    font-weight: 600;
    cursor: pointer;
}

.edit {
    background-color: var(--accent);
    color: var(--bg);
}

.pass {
    background-color: var(--text);
    color: var(--bg);
}

.user-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70%;
    position: relative;
}

.user-info span {
    font-size: 1.2rem;
}

.buttons {
    width: 100%;
    text-align: center;
}

.list-links {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    margin-top: .4rem;
}

.links {
    text-decoration: none;
    color: var(--text);
    margin: .6rem;
    cursor: pointer;
}

</style>