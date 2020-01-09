<template>
  <div id="app">
    <a v-on:click="changedisplayToblock()"><Header/></a>
<div v-bind:style="{display: this.display}">
  <div class="t1">
  <section class="container flex">
  <div class="item1">
    <a v-on:click="changedisplayTonone()">
      <router-link to="/empresas">
        <div class="empresa">
          <img id="empresa" src="./assets/icon3.png" alt="icon1">
        </div>
        <span>Empresa</span>
      </router-link>
    </a>
  </div>
  <div class="item1">
    <div >
    <a v-on:click="changedisplayTonone()">
      <router-link to="/estoque"> 
        <div class="estoque">
          <img id="estoque" width="100px" height="100px" src="./assets/icon7.png" alt="icon1">
        </div>
        <span>Estoque</span>
      </router-link>
    </a>
    </div>
  </div>

<div class="item1">
  <div>
    <router-link to="/"> 
      <div class="secao">
        <img src="./assets/icon8.png" alt="icon1">
      </div>
      <span class="sp1">Seções</span>
    </router-link>
  </div>
</div>

<div class="item1">
  <div>
    <router-link to="/"> 
      <div class="funcionario">
        <img src="./assets/icon5.png" alt="icon1">
      </div>
      <span>Funcionario</span>
    </router-link>
  </div>
</div>
  
</section>
</div>
<div class="t2">
<section class="container flex">
<div class="item">
  <router-link to="/"> 
    <div class="categorias">
      <img src="./assets/icon2.png" alt="icon1">
    </div>
    <span>Categorias</span>
  </router-link>
</div>

<div class="item">
  <div class="">
    <router-link to="/"> 
      <div class="marcas">
        <img src="./assets/icon1.png" alt="icon1">
      </div>
      <span>Marcas</span>
    </router-link>
  </div>
</div>

<div class="item">
  <div class="">
    <router-link to="/"> 
      <div class="fornecedor">
        <img src="./assets/icon4.png" alt="icon1">
      </div>
      <span>Fornecedor</span>
    </router-link>
  </div>
</div>

<div class="item">
  <div>
    <router-link to="/"> 
      <div class="produtos">
        <img src="./assets/icon6.png" alt="icon1">
      </div>
      <span>Produtos</span>
    </router-link>
  </div>
</div>

  </section>
</div>
</div>    
    <router-view></router-view>
    <p>{{this.display}}</p>
    <a v-on:click="changedisplay()">change</a>
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
</div>
     
</template>
<script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script>

<script>

import Header from './components/Header.vue'

export default {
  name: 'app',
  data(){
    return{
      display: 'block',
    }
  },
  components: {
    Header
  },
  methods:{
    changedisplayToblock:function(event){
      this.display = 'block'
    },
    changedisplayTonone:function(event){
      this.display = 'none'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;;
  color: #2c3e50;
}
.main{
  margin-top: 5%;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

.bl{
  display: inline-block;
  padding: 1%;
  
}
.sp1{
  margin-left: 0.6%;
}
.sp2{
  margin-left: 0.3%;
}
.sp3{
  padding-left: 21%;
  margin-right: 5%;
  text-align: center
}
.sp4{
  margin-left: 5%;
}

.sp5{
  margin-left: 8%;
}
.sp6{
  margin-left: 18%;

}
.sp7{
  margin-left: 12%;
}
.sp8{
  margin-left: 15%;
}

a{
  text-decoration: none;
  color: black;
}
a:hover{
  text-decoration: none;
  color: black;
}
.item{
  margin-left: 2%;
  margin-right: 2%;
  padding: 1%;
  
}
.item1{
  margin-left: 2%;
  margin-right: 2%;
  padding: 1%;
}
.flex {
	display: flex;
}
.t1{
  margin-left: 25%;
  margin-right: 25%;
}
.t2{
  margin-top: 2%;
  margin-left: 25%;
  margin-right: 25%;
}

span{
  text-decoration: none;
  color: black;
}

img{
  width: 60px;
  height: 60px;
}
a{
  text-decoration: none;
  color: black;
}
</style>
