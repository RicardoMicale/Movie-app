<template>
    <header class="navbar">
        <router-link class="logo" to="/">
            <img src="../assets/Logo-alt-movies.svg" alt="InfoMovies Logo">
            <h2>InfoMovies</h2>
        </router-link>
        <nav>
            <div class="burger" @click="openNav()">
                <div class="line1"></div>
                <div class="line2"></div>
                <div class="line3"></div>
            </div>
            <ul>
                <li><router-link class="link" to="/">Home</router-link></li>
                <li><router-link class="link" to="/search">Search</router-link></li>
                <li><router-link class="link" to="/profile">Profile</router-link></li>
                <li><router-link class="link" to="/login" v-show="hide">Log in</router-link></li>
                <li><button @click="logOut()" class="logout-btn" v-show="!hide">Log out</button></li>
            </ul>
        </nav>
    </header>
    <ul :class="{'burgerActive': isNavOpen}" class="openNav">
        <li><router-link class="link" to="/">Home</router-link></li>
        <li><router-link class="link" to="/search">Search</router-link></li>
        <li><router-link class="link" to="/profile">Profile</router-link></li>
        <li><router-link class="link" to="/login" v-show="hide">Log in</router-link></li>
        <li><button @click="logOut()" class="logout-btn" v-show="!hide">Log out</button></li>
    </ul>
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'Navbar',
    data() {
        return {
            hide: Boolean,
            isNavOpen: false
        }
    },
    methods: {
        logOut() {
            firebase.auth().signOut().then(() => {
                this.$router.push('/')
            })
            this.hide = !this.hide
        },
        isUserSignedIn() {
            firebase.auth().onAuthStateChanged(user => {
                if(user) {
                    this.hide = false
                } else {
                    this.hide = true
                }
            })
        },
        openNav() {
            this.isNavOpen = !this.isNavOpen;
        }
    },
    mounted() {
        this.isUserSignedIn()
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

.logo {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: var(--text);
}

.burger {
    display: none;
}

h2 {
    font-family: var(--alt-font);
}

img {
    width: 1.6rem;
    height: auto;
    margin-right: .4rem;
}

@media screen and (max-width: 1024px) {
    .navbar {
        width: 100vw;
    }

    .logo {
        font-size: .8rem;
    }

    img {
        width: 1.4rem;
    }
}

ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 20vw;
}

li {
    list-style-type: none;
    height: 100%;
    position: relative;
}

.link {
    text-decoration: none;
    color: var(--text);
}

.link::before {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    height: 2px;
    width: 0;
    background-color: var(--text);
    transition: all .3s ease;
}

.link:hover::before {
    width: 100%;
}


li .router-link-active::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    height: 2px;
    width: 100%;
    background-color: var(--text);
}

.hide {
    display: none;
}

.logout-btn {
    padding: .3rem 1.2rem;
    background-color: var(--text);
    color: var(--primary-light);
    border: none;
    outline: none;
    border-radius: 50000px;
    cursor: pointer;
    font-family: var(--main-font);
    font-size: .9rem;
}

.logout-btn:hover {
    color: var(--primary-dark);
    background-color: var(--text-alt);
} 

.openNav {
    display: none;
}

@media screen and (max-width:1024px) {
    ul {
        display: none;
    }

    .burger {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 1.8rem;
        height: 1.8rem;
        background-color: transparent;
    }

    .burger div {
        width: 100%;
        height: .3rem;
        background-color: var(--text);
        border-radius: 50000px;
    }

    .burgerActive {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 12rem;
        background-color: var(--primary-light);
        padding: 1.3rem 0;
        margin-top: -.2rem;
    }

    .burgerActive li {
        margin-bottom: .8rem;
    }

}

</style>