<template>
  <div id="app">
    <head>
      <meta charset="utf-8">
      <meta content="width=device-width,initial-scale=1,minimal-ui" name="viewport">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Material+Icons">
      <link rel="stylesheet" href="https://unpkg.com/vue-material/dist/vue-material.min.css">
      <link rel="stylesheet" href="https://unpkg.com/vue-material/dist/theme/default.css">
      <link href="https://emoji-css.afeld.me/emoji.css" rel="stylesheet">
    </head>
    <div class="header">
      <span id="main_title">What I Need</span>
      <div id="nav">
        <router-link to="/">Inicio</router-link> |
        <router-link to="/add">Añadir</router-link> |
        <router-link to="/priority">Prioridades</router-link> |
        <router-link to="/category">Categorias</router-link> |
        <router-link to="/new">Nuevo producto</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: start;
  color: #2c3e50;
  margin-left: 15px;
}

.header{
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

#main_title {
  float: left;
  height: 120px;
  display: flex;
  align-items: center;
  width: 88px;
  padding: 0px 10px;
  font-size: 30px;
  font-weight: bold;
}

#nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  margin: 20px 0;
}

#nav a{
  padding: 5px 2px;
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

@media (max-width: 559px) {
  #app {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 0px;
  }
}
</style>
