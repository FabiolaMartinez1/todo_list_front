<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome Fabi to Your Vue.js App :D"/> -->
  <!-- <TaskApp/> -->
  <!-- <nav>
    <router-link to="/">Log In</router-link> |
    <router-link to="/home">Home</router-link> |
    <router-link to="/tag">My tags</router-link> |
    <router-link to="/archive">Archive</router-link> |
    <router-link to="/about">About</router-link> | 
    <router-link to="/contact">Contact</router-link>
  </nav>

  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link active" aria-current="page" href="#">Home</a>
        <a class="nav-link" href="#">Features</a>
        <a class="nav-link" href="#">Pricing</a>
      </div>
    </div>
  </div>
</nav> -->
<nav  style="background-color: #181e42" class="navbar navbar-expand-lg navbar-dark">
  <div class="container-fluid">
    <router-link to="/tasks" class="navbar-brand">Tasks</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <!-- <router-link to="/tasks" class="nav-link active" aria-current="page">Tasks</router-link> -->
        <router-link to="/task" class="nav-link">Task Form</router-link>
        <router-link to="/tag" class="nav-link">My Tags</router-link>
        <router-link to="/" class="nav-link">Log out</router-link>
        <!-- <router-link to="/about" class="nav-link">About</router-link>
        <router-link to="/contact" class="nav-link">Contact</router-link> -->
      </div>
    </div>
  </div>
</nav>


<div>
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import TaskApp from './components/TaskList.vue'
// import router from './router/router';

export default {
  name: 'App',
//   components: {
//     // TaskApp,
//     router
// }
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
