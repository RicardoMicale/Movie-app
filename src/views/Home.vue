<template>
    <div class="container">
        <div class="left">
            <div class="tittle">
                <img src="../assets/Logo-movies.svg" alt="Info movies logo">
                <h1>Movie Information</h1>
                <div class="underline"></div>
                <p>Mark movies as favourites and track what you watch</p>
                <div class="buttons">
                    <router-link class="button button-1" to="/login">Join Now</router-link>
                    <router-link class="button button-2" to="/search">Start exploring</router-link>
                </div>
            </div>
        </div>
        <div class="right">
            <img src="../assets/amico.svg" alt="Couple watching tv">
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home'
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

.container {
    display: flex;
    justify-content: space-between;
    position: relative;
    height: 100%;
}

@media screen and (max-width: 1024px) {
    .container {
        flex-direction: column;
    }
}

.left {
    padding: 7vw 0 0 7vw;
    height: 100vh;
}

@media screen and (max-width: 1024px) {
    .left {
        padding-right: 7vw;
    }
}

.tittle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    position: relative;
}

.tittle img {
    width: 2rem;
}

.buttons {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 4rem;
}


.button {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    width: 12rem;
    height: 2.2rem;
    border-radius: 500000px;
    margin-right: 3rem;
}

@media screen and (max-width: 1024px) {
    .tittle {
        width: 100%;
        align-items: center;
        padding-top: 2rem;
    }

    .buttons {
        flex-direction: column;
        justify-content: space-around;
        height: 8rem;
        width: 100%;
    }

    .button {
        margin-right: 0;
    }

}

.button-1 {
    color: var(--text);
    font-weight: 600;
    background-color: var(--primary-light);
}

.button-2 {
    color: var(--bg);
    background-color: var(--text);
}

h1 {
    font-size: 3.5rem;
    width: 40vw;
    line-height: 3.5rem;
    color: var(--primary-dark);
}

h1::after {
    content: ' just a click away';
    color: var(--text);
    font-size: 3rem;
}

@media screen and (max-width: 1024px) {
    h1 {
        font-size: 2.2rem;
        text-align: center;
        width: 100%;
        line-height: 2.4rem;
        margin-top: 1.4rem;
        margin-bottom: .8rem;
    }

    h1::after {
        font-size: 2rem;
        
    }
}

.underline {
    margin-top: .4rem;
    width: 8rem;
    height: .6rem;
    background-color: var(--primary-dark);
}

.underline::before {
    position: absolute;
    content: '';
    width: 6rem;
    height: .6rem;
    background-color: var(--primary-light);
}

.underline::after {
    position: absolute;
    content: '';
    width: 4rem;
    height: .6rem;
    background-color: var(--accent);
}

.underline, .underline::after, .underline::before {
    border-radius: 50000px;
}


p {
    font-family: var(--alt-font);
    color: var(--text);
    margin-top: 1.6rem;
}

@media screen and (max-width: 1024px) {
    .underline {
        margin-top: -.5rem
    }

    p {
        text-align: center;
    }
}

.right {
    position: relative;
    height: 100vh;
}

.right img {
    overflow-y: hidden;
    position: absolute;
    right: 0;
    top: 2rem;
    width: 30vw;
}

@media screen and (max-width:1024px) {
    .right {
        display: none;
    }
}

</style>