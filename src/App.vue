<template>
  <div id="app">
    <div class="content">
      <nav class="mdl-navigation mine">
        <router-link to="dashboard">
            <a class="mdl-navigation__link" href="">Dashboard</a>
        </router-link>
        <router-link to="page1">
            <a class="mdl-navigation__link" href="">Appli 1</a>
        </router-link>
      </nav>
    </div>
    <div class="contentrouter">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

a{
  color: red;
  margin: 2%;
}

.contentrouter{
  display: flex;
  text-align: center;
  justify-content: center;
}
.content{
  font-weight: bold;
  color: red;
}
</style>
