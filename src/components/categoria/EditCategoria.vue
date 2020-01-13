<template>
  <div class="editcategoria">
      <div class="submain">
            <router-link to="/categoria">
                <h2 class="categoriatitulo">Editar Categoria</h2>
            </router-link>
       </div>
        <div class="line"></div>

         <div  v-if="this.info" class="alert alert-dark alertemp" role="alert">
            <ul v-for="(inf,id) in this.info" v-bind:key="id">
                <li v-if="!inf.msg">{{inf}}</li>
                <li v-if="inf.msg" :class="inf.msg.replace(/\s+/g, '')">{{inf.msg}}</li>
            </ul>
        </div>

        <form class="form-group formaddcategoria" @submit.prevent="addeditcategoria">
            <div class="form-group row">
                <label for="descricao" class="col-sm-2 col-form-label">Descrição</label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" name="descricao" id="descricao" v-model="categoria.descricao" placeholder="Descrição">
                </div>
            </div>
          <button class="submit submitcategoria" type="submit">Salvar<i class="large material-icons save">save</i></button>     
        </form>
  </div>
</template>

<script>
import Axios from 'axios'
const queryString = require('query-string');
export default {
    name: 'EditCategoria',
    data(){
        return{
            info: null,
            error: null,
            categoria:{
                descricao: null
            },
            categorias: null
        }
    },
    mounted(){
        Axios.get('https://apist.herokuapp.com/api/categoria/' + this.$attrs.id)
            .then(response => {
                this.categorias = response.data
                this.categoria.descricao = response.data[0].descricao
            })
            .catch(error => (this.error = error))
    },
    methods:{
        addeditcategoria(evt){
            evt.preventDefault();
            Axios.put('https://apist.herokuapp.com/api/categoria/' + this.$attrs.id, queryString.stringify(this.categoria))
            .then(response => (this.info =  response.data))
            .catch(error => (this.error = error.data))            

        }
    }
}
</script>

<style>
.editcategoria{
    margin-top: 5%;
}
</style>