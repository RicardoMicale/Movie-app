<template>
    <div class="all">
        <div class="modal">
            <h3>Change your password</h3>
            <form @submit.prevent="changePass()">
                <div class="firstPass">
                    <label for="changePass">Change Password</label>
                    <input type="password" id="changePass" placeholder="Enter new password" v-model="newPass">
                </div>
                <div class="secPass">
                    <label for="changePass2">Repeat Password</label>
                    <input type="password" id="changePass2" placeholder="Repeat new password" v-model="newPass2">
                </div>
                <input type="submit" value="Submit">
            </form>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'Password',
    data() {
        return {
            newPass: '',
            newPass2: ''
        }
    },
    methods: {
        async changePass() {

            const user = firebase.auth().currentUser;

            if(this.newPass === this.newPass2) {
                user.updatePassword(this.newPass);
                firebase.auth().sendPasswordResetEmail(user.email)
            } else {
                alert("Passwords are different, please make sure you're writting the same password in both fields")
            }
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
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    margin-top: .5rem;
    margin-bottom: .5rem;
}

label {
    width: 40%;
}

input {
    font-family: var(--alt-font);
}

form div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: .5rem;
    margin-bottom: .5rem;
}

input[type="password"] {
    width: 50%;
    height: 1.5rem;
    border: none;
    background-color: var(--bg-dDark);
    border-radius: 50000px;
    outline: none;
    padding: .2rem .4rem;
}

input[type="password"]:focus {
    border: solid 1px var(--accent);
}

input[type="submit"] {
    background-color: var(--accent);
    width: 25%;
    height: 1.5rem;
    border: none;
    outline: none;
    border-radius: 50000px;
    cursor: pointer;
    margin-top: 1rem;
}

@media screen and (max-width: 1024px) {
    .all {
        padding-left: 0 !important;
        padding-right: 0 !important;
    }

    form {
        flex-direction: column;
    }

    .firstPass, .secPass {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    input[type="password"],input[type="submit"], label {
        width: 100%;
    }

    input[type="password"] {
        margin-top: .5rem;
    }
}

</style>