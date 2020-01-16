<template>
  <div class="addcategoria">
       <div class="submain">
            <router-link to="/categoria">
                <h2 class="categoriatitulo">Adicionar Categoria</h2>
            </router-link>
       </div>
        <div class="line"></div>

         <div  v-if="this.info" class="alert alert-dark alertemp" role="alert">
            <ul v-for="(inf,id) in this.info" v-bind:key="id">
                <li v-if="!inf.msg">{{inf}}</li>
                <li v-if="inf.msg" :class="inf.msg.replace(/\s+/g, '')">{{inf.msg}}</li>
            </ul>
        </div>

        <form class="form-group formaddcategoria" @submit.prevent="addcategoria">
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
import axios from 'axios';
const queryString = require('query-string');
export default {
    name: 'AddCategoria',
    data(){
        return{
            info: null,
            error: null,
            categoria:{
                descricao: null
            }
        }
    },
    methods:{
        addcategoria(evt){
            evt.preventDefault();
            axios.post('https://apist.herokuapp.com/api/categoria?', queryString.stringify(this.categoria))
            .then(response => {
                this.info = response.data
                if(response.statusText == "OK" && this.info.data.msg == "Categoria cadastrada com sucesso"){
                    this.categoria.descricao = null
                }
            })
            .catch(error => (this.error = error))
        }
    }
}
</script>

<style>
.addcategoria{
    margin-top: 5%;
}
.formaddcategoria{
    margin-top: 5%;
    margin-left: 20%;
    margin-right: 4%;
}
.submitcategoria{
    margin-top: 3%;
    margin-left: 35%;
}
</style>