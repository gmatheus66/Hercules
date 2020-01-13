<template>
  <div class="editmarca">
      <div class="submain">
        <router-link to="/marca">
            <h2 class="marcatitulo">Editar Marca</h2>
        </router-link>
    </div>
    <div class="line"></div> 

    <div  v-if="this.info" class="alert alert-dark alertemp" role="alert">
        <ul v-for="(inf,id) in this.info" v-bind:key="id">
            <li v-if="!inf.msg">{{inf}}</li>
            <li v-if="inf.msg" :class="inf.msg.replace(/\s+/g, '')">{{inf.msg}}</li>
        </ul>
    </div>
     <form class="form-group formaddmarca" @submit.prevent="editmarca" >
            <div class="form-group row">
                <label for="descricao" class="col-sm-2 col-form-label">Descrição</label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" name="descricao" id="descricao" v-model="marca.descricao" placeholder="Descrição">
                </div>
            </div>
          <button class="submit submitcategoria" type="submit">Salvar<i class="large material-icons save">save</i></button>     
    </form>
  </div>
</template>

<script>
import axios from 'axios';
const queryString = require('query-string');
export default {
    name: 'EditMarca',
    data(){
        return{
            info: null,
            error: null,
            marcas: null,
            marca:{
                descricao: null
            }
        }
    },
    mounted(){
        axios
        .get('https://apist.herokuapp.com/api/marca/'+ this.$attrs.id)
        .then(response => (this.marcas = response.data, this.marca.descricao = response.data[0].descricao ))
        .catch(error => (this.error = error))
        
    },
    methods:{
        editmarca(evt){
            evt.preventDefault();
            axios
            .put('https://apist.herokuapp.com/api/marca/'+ this.$attrs.id, queryString.stringify(this.marca))
            .then(response => (this.info = response.data))
            .catch(error => (this.error = error))
        
        }
    }

}
</script>

<style>

</style>