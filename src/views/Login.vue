<template>
    <div class="authorization">
        <div class="log-in">
            <h1>Log in</h1>
            <form @submit.prevent="signUpGoogle()" class="google-sign-up">
                <div>
                    <img src="../assets/Google.svg" alt="Google logo">
                    <input type="submit" value="Log in with Google">
                </div>
            </form>
            <h3>Or use your email</h3>
            <form @submit.prevent="logIn()">
                <label for="email">E-mail</label>
                <input v-model="emailLogin" type="text" id="email" placeholder="example@mail.com" required>
                <label for="password">Password</label>
                <input v-model="passwordLogin" type="password" id="password" placeholder="********" required>
                <input type="submit" value="Log in" class="log-cred">
            </form>
        </div>
        <div class="divider"></div>
        <div class="register">
            <h1>Register</h1>
            <form @submit.prevent="signUpGoogle()" class="google-sign-up">
                <div>
                    <img src="../assets/Google.svg" alt="Google logo">
                    <input type="submit" value="Sign up with Google">
                </div>
            </form>
            <h3>Or use your email</h3>
            <form @submit.prevent="createNewUser()">
                <label for="emailReg">E-mail</label>
                <input v-model="emailReg" type="text" id="emailReg" placeholder="example@mail.com" required>
                <label for="username">Username</label>
                <input v-model="username" type="text" id="username" placeholder="think of a username" required>
                <label for="passwordReg">Password</label>
                <input v-model="passReg" type="password" id="passwordReg" placeholder="********" required>
                <input type="submit" value="Register" class="register-cred">
            </form>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';
import * as fb from '../firebase'


export default {
    name: 'Login',
    data() {
        return {
            emailReg: '',
            passReg: '',
            emailLogin: '',
            passwordLogin: '',
            username: ''
        }
    },
    methods: {
        userConst(email, username) {
            const user = {
                email: email,
                username: username,
                favourites: [],
                watched: []
            }

            return user
        },
        //Create user
        createNewUser() {
            let id;
            const newUser = this.userConst(this.emailReg, this.username);

            firebase.auth().createUserWithEmailAndPassword(this.emailReg, this.passReg)
                .then(user => {
                    alert(`Acc for ${user.user.uid}`);
                    id = user.user.uid;
                    fb.createUser(id, newUser);
                    this.$router.push('/profile');
                });
        },
        //Log in
        logIn() {
            firebase.auth().signInWithEmailAndPassword(this.emailLogin, this.passwordLogin).then(() => {
                this.$router.push('/profile');
            })
        },
        //signUp google
        async signUpGoogle() {
            const provider = new firebase.auth.GoogleAuthProvider();
            await firebase.auth().signInWithPopup(provider)
                .then(response => {
                    localStorage.setItem('user', response.user);
                    this.$router.push('/profile');
                    console.log(response.user);
                    return response.user
                })
                .catch(err => {
                    console.log(err);
                    localStorage.removeItem('user');
                });
            
            return;
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

.divider {
    background-color: var(--primary-light);
    width: 2px;
    height: 90%;
}

input {
    font-family: var(--main-font);
}

h1, h3, input, label {
    color: var(--text);
}

h1, h3 {
    margin-top: 2rem;
    margin-bottom: 1rem;
}

input[type="text"], input[type="password"] {
    background-color: var(--bg-dDark);
    border: none;
    outline: none;
    width: 30rem;
    height: 2.6rem;
    padding: .2rem .8rem;
    border-radius: 500000px;
    margin-top: .3rem;
    margin-bottom: .8rem;
    font-size: 1rem;
}

input[type="submit"] {
    margin-top: 3rem;
    width: 12rem;
    height: 2rem;
    border-radius: 500000px;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 1.2rem;
}

.log-cred {
    background-color: var(--text);
    color: var(--bg);
}

.register-cred {
    background-color: var(--primary-dark);
    color: var(--text-alt);
}

.authorization {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 7vw 0;
    height: 100vh;
}

.log-in, .register {
    height: 100%;
}

form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.google-sign-up {
    background-color: var(--bg-dDark);
    border-radius: 500000px;
    width: 20rem;
    padding: .7rem 2rem;
}

.google-sign-up div {
    display: flex;
    justify-content: center;
    align-items: center;
}

.google-sign-up img {
    width: 2rem;
    margin: 0 .5rem;
}

.google-sign-up div input {
    background: none;
    outline: none;
    border: none;
    margin: 0 .5rem;
    font-size: 1.2rem;
    cursor: pointer;
}



</style>