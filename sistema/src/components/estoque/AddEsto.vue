<template>
  <div class="addestoque"> 
        <h2 class="estoquetitulo">Empresas</h2>
        <router-link to="/addestoque">
            <div class="btnadd">
                <span class="addtext">ADICIONAR</span><img id="icadd" src="../../assets/ic_add.png" alt="icadd">
            </div>
        </router-link>
        <div class="line"></div> 



    <p></p>

  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'AddEsto',
    data(){
        return{
            info: null
        }
    },
    mounted(){
        axios
      .get('https://apist.herokuapp.com/api/estoque')
      .then(response => (this.info = response.data))
        
    }



}
</script>

<style>

</style>