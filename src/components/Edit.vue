<template>
    <div class="all">
        <div class="modal">
            <h3>Edit your profile</h3>
            <form @submit.prevent="changeUsername()">
                <label for="changeUsername">Change User</label>
                <input type="text" id="changeUsername" placeholder="Enter new username" v-model="newUsername">
                <input type="submit" value="Submit">
            </form>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';
import * as fb from '../firebase';

export default {
    name: 'Edit',
    data() {
        return {
            newEmail: '',
            newUsername: ''
        }
    },
    methods: {
        async changeUsername() {

            let cUser
            const user = firebase.auth().currentUser;

            await fb.getUser(user.uid)
                .then(response => {
                    cUser = response.data();
                    cUser.username = this.newUsername
                })
            
            fb.updateUser(user.uid, cUser)
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

.modal {
    background-color: var(--bg);
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

form {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin-top: .5rem;
    margin-bottom: .5rem;
}

label {
    width: 30%;
}

input {
    font-family: var(--alt-font);
}

input[type="text"] {
    width: 45%;
    height: 1.5rem;
    border: none;
    background-color: var(--bg-dDark);
    border-bottom-left-radius: 500000px;
    border-top-left-radius: 500000px;
    outline: none;
    padding: .2rem .4rem;
}

input[type="text"]:focus {
    border: solid 1px var(--accent);
}

input[type="submit"] {
    background-color: var(--accent);
    width: 25%;
    height: 1.5rem;
    border: none;
    outline: none;
    border-bottom-right-radius: 500000px;
    border-top-right-radius: 500000px;
    cursor: pointer;
}

</style>