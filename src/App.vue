<template>
  <Navbar />
</template>

<script>
import Navbar from './components/Navbar';

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;700&family=Montserrat:wght@400;500;700&display=swap');

/* Variables*/
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

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--main-font);
  background-color: var(--bg);
}

.navbar {
  padding: 1rem 7vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text);
  background-color: var(--primary-light);
}

</style>
