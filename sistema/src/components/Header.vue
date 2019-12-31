<template>
  <div class="header">
      <router-link to="/">
      <h1 class="titulo">Hercules</h1>
      <h4 class="subtitulo">Sistema de gerenciamento de estoque</h4>
      </router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style>
*{
    margin:0%;
    border: 0;
    padding: 0;
}
.titulo{
    padding-top: 0.5%;
    margin-bottom: 0%;
    margin-left: 4%;
    font-weight: bold;
    color: black
}
.subtitulo{
    margin-left: 7%;
    color: black
}
.header{
    background-color: #AEE5E2;
    padding-bottom: 1%;
}
</style>