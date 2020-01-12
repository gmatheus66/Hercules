<template>
  <div class="addmarca">
      <div class="submain">
        <router-link to="/marca">
            <h2 class="marcatitulo">Adicionar Marca</h2>
        </router-link>
    </div>
    <div class="line"></div> 

    <div  v-if="this.info" class="alert alert-dark alertemp" role="alert">
        <ul v-for="(inf,id) in this.info" v-bind:key="id">
            <li v-if="!inf.msg">{{inf}}</li>
            <li v-if="inf.msg" :class="inf.msg.replace(/\s+/g, '')">{{inf.msg}}</li>
        </ul>
    </div>

     <form class="form-group formaddmarca" @submit.prevent="addmarca" >
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
    name: 'AddMarca',
    data(){
        return{
            info: null,
            error: null,
            marca:{
                descricao: null
            }
        }
    },
    methods:{
        addmarca(evt){
            evt.preventDefault();
            axios.post('https://apist.herokuapp.com/api/marca?', queryString.stringify(this.marca))
            .then(response => (this.info = response.data))
            .catch(error => (this.error = error.data))
        }
    }
}
</script>

<style>
.addmarca{
    margin-top: 5%;
}
.formaddmarca{
    margin-top: 5%;
    margin-left: 20%;
    margin-right: 4%;
}
</style>