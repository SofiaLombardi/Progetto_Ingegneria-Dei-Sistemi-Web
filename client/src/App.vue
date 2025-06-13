<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  components: { Navbar }
};
</script>

<style>
body {
  background-color: #f8f9fa;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* migliora la gestione su mobile */
}
</style>
