<template>
  <Navbar />
  <main class="container">
    <router-view />
  </main>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  data() {
    return {
      title: 'Personal Profile - Zan'
    }
  },
  components:  {
    Navbar
  }
}
</script>

<style>

#app {
  font-family: Poppins;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

main.container {
   margin-top: 3rem;
}

</style>
