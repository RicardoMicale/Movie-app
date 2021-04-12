<template>
    <header class="navbar">
        <router-link class="logo" to="/">
            <img src="../assets/Logo-alt-movies.svg" alt="InfoMovies Logo">
            <h2>InfoMovies</h2>
        </router-link>
        <nav>
            <ul>
                <li><router-link class="link" to="/">Home</router-link></li>
                <li><router-link class="link" to="/search">Search</router-link></li>
                <li><router-link class="link" to="/profile">Profile</router-link></li>
                <li><router-link class="link" to="/login">Log in</router-link></li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'Navbar'
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

h2 {
    font-family: var(--alt-font);
}

img {
    width: 1.6rem;
    height: auto;
    margin-right: .4rem;
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

</style>