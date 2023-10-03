<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome Fabi to Your Vue.js App :D"/> -->
  <TaskApp/>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import TaskApp from './components/TaskList.vue'

export default {
  name: 'App',
  components: {
    TaskApp
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
