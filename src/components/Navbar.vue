<template>
    <header class="navbar">
        <div>
            <img src="../assets/Logo-alt-movies.svg" alt="InfoMovies Logo">
            <h2>InfoMovies</h2>
        </div>
        <nav>
            <ul>
                <li>Home</li>
                <li>Search</li>
                <li>Profile</li>
                <li>Log in</li>
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

div {
    display: flex;
    justify-content: center;
    align-items: center;
}

ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 20vw;
}

li {
    list-style-type: none;
}

</style>