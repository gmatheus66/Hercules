<template>
  <div class="addestoque"> 
        <div class="editesto">
        <router-link to="/estoque">
            <h2 class="empresatitulo">Adicionar Estoque</h2>
        </router-link>
        <div class="line"></div> 
        </div>
    <div  v-if="this.save" class="alert alert-dark alertemp" role="alert">
            <ul v-for="(inf,id) in this.save" v-bind:key="id">
                <li v-if="!inf.msg">{{inf}}</li>
                <li v-if="inf.msg" :class="inf.msg.replace(/\s+/g, '')">{{inf.msg}}</li>
            </ul>
        </div>

    <form class="addestoform" id="form-group formestoque" @submit="saveestoque">
         <div class="form-group row">
             <label for="codigo" class="col-sm-2 col-form-label">Codigo</label>
            <div class="col-sm-2">
                <input type="number" class="form-control" name="codigo" id="codigo" v-model="estoque.codigo" placeholder="Codigo">
            </div>
             <label for="descricao" class="col-sm-1 col-form-label">Descrição</label>
            <div class="col-sm-5">
                <input type="text" class="form-control" name="descricao" id="descricao" v-model="estoque.descricao" placeholder="Descrição">
            </div>
        </div>
        <div class="form-group row">
             <label for="selectarmazem" class="col-sm-2 col-form-label">Tipo do Armazém</label>
            <div class="col-sm-2">
                 <select class="custom-select" name="selectarmazem" v-model="estoque.tipo_armazem" id="selectarmazem">
                        <option selected disabled>Selecione o Tipo</option>
                        <option value="Padrão">Padrão</option>
                        <option value="Terceiros">Terceiros</option>
                        <option value="Próprio">Próprio</option>
                </select>
            </div>
            <label for="selectemp" class="col-sm-1 col-form-label">Empresa</label>
            <div class="col-sm-5">
                 <select class="custom-select" name="selectemp" v-model="estoque.empresa_id"  id="selectemp">
                        <option selected disabled>Selecione uma Empresa</option>
                        <option v-for="(empresa, id) in this.info" v-bind:key="id"  :value="empresa.id">{{empresa.nome_fantasia}}</option>
                </select>
            </div>

        </div>
        <button class="submit submitesto" type="submit">Salvar<i class="large material-icons save">save</i></button>  
    </form>
  </div>
</template>

<script>
import axios from 'axios';
const queryString = require('query-string');
export default {
    name: 'AddEsto',
    data(){
        return{
            info: null,
            save: null,
            estoque:{
                codigo: null,
                descricao: null,
                tipo_armazem: null,
                empresa_id: null
            }
        }
    },
    mounted(){
        axios
      .get('https://apist.herokuapp.com/api/empresa')
      .then(response => (this.info = response.data))
        
    },
    methods:{
        saveestoque: function(evt){
            evt.preventDefault();
            axios
            .post('https://apist.herokuapp.com/api/estoque?', queryString.stringify(this.estoque))
            .then(response => (this.save = response.data)).catch(error => (this.info = error))
        }
    }



}
</script>

<style>
.addestoque{
    margin-top: 5%;
}
.addestoform{
    margin-top: 5%;
    margin-left: 16%;
    margin-right: 5%;
}
.submitesto{
    margin-left: 25%;
    margin-top: 2%;
}
</style>