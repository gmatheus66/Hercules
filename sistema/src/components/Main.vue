<template>
  <div class="main">

<div class="t1">
  <section class="container flex">
	<div class="item1">
    <div >
      <div class="empresa">
        <img id="empresa" src="../assets/icon3.png" alt="icon1">
      </div>
       <span>Empresa</span>
    </div>
  </div>
	<div class="item1">
    <div >
      <div class="estoque">
        <img id="estoque" width="100px" height="100px" src="../assets/icon7.png" alt="icon1">
      </div>
      <span class="sp2">Estoque</span>
    </div>
  </div>
	<div class="item1">

  </div>
	<div class="item1">
    <div>
      <div class="secao">
        <img src="../assets/icon8.png" alt="icon1">
      </div>
        <span class="sp3">Seções</span>
    </div>
  </div>
	<div class="item1">
     <div class="">
      <div class="funcionario">
        <img src="../assets/icon5.png" alt="icon1">
      </div>
        <span class="sp4">Funcionario</span>
    </div>
  </div>
  </section>
</div>    

<div class="t2">
  <section class="container flex">
	<div class="item"><div class="categorias">
        <img src="../assets/icon2.png" alt="icon1">
      </div>
      <span class="sp5">Categorias</span>
  </div>
  <div class="item">
    <div class="">
      <div class="marcas">
        <img src="../assets/icon1.png" alt="icon1">
      </div>
      <span class="sp3">Marcas</span>
    </div>
  </div>
	<div class="item">
    <div class="">
      <div class="fornecedor">
        <img src="../assets/icon4.png" alt="icon1">
      </div>
      <span class="sp7">Fornecedor</span>
    </div>
  </div>
	<div class="item">
    <div>
      <div class="produtos">
        <img src="../assets/icon6.png" alt="icon1">
      </div>
        <span class="sp8">Produtos</span>
    </div>
  </div>
  </section>
</div> 
     
  </div>

</template>

<script>
export default {
  name: 'Main',
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
a {
  color: #42b983;
}
.bl{
  display: inline-block;
  padding: 1%;
  
}
.sp1{
  margin-left: 15%;
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
.item:hover{
  border: 2px solid black;
  border-radius: 5px;
  background-color: #AEE5E2;
  cursor: pointer;
}
.item1:hover{
  border: 2px solid black;
  border-radius: 5px;
  background-color: #AEE5E2;
  cursor: pointer;
}
.item{
  margin-left: 2%;
  margin-right: 2%;
  
}
.item1{
  margin-left: 2.5%;
}
.flex {
	display: flex;
}
.t1{
  margin-top: 10%;
  margin-left: 25%;
  padding-bottom: 2%;
}
.t2{
  margin-top: 5%;
  margin-left: 25%
}

</style>
