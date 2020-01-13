<template>
  <div class="editsecao">
      <div class="addsecoes">
        <router-link to="/secao">
            <h2 class="secaotitulo">Editar Seção</h2>
        </router-link>
        <div class="line"></div> 
        </div>
    <div  v-if="this.info" class="alert alert-dark alertemp" role="alert">
            <ul v-for="(inf,id) in this.info" v-bind:key="id">
                <li>{{inf}}</li>
            </ul>
    </div>
    <form class="addsecaoform" id="form-group formestoque" @submit.prevent="saveeditsecao">
        <div class="form-group row">
             <label for="selectarmazem" class="col-sm-2 col-form-label">Tipo do Armazém</label>
            <div class="col-sm-3">
                 <select class="custom-select" name="estoque_id" id="selectarmazem" v-model="secao.estoque_id" >
                        <option selected disabled>Selecione o Tipo</option>
                        <option v-for="(arma , id) in this.armazem" v-bind:key="id" :value="arma.id">{{arma.descricao}}</option>
                </select>
            </div>
             <label for="descricao" class="col-sm-1 col-form-label">Descrição</label>
            <div class="col-sm-5">
                <input type="text" class="form-control" name="descricao" id="descricao" v-model="secao.descricao" placeholder="Descrição">
            </div>
        </div>
        <button class="submit submitsecao" type="submit">Salvar<i class="large material-icons save">save</i></button>
    </form>

  </div>
</template>

<script>
import axios from 'axios';
const queryString = require('query-string');
export default {
    name:'EditSecao',
    data(){
        return{
            info: null,
            error:null,
            data: null,
            secao:{
                descricao: null,
                estoque_id: null
            },
            armazem: null
        }
    },
    mounted(){
        axios.get('https://apist.herokuapp.com/api/secaoestoque/'+ this.$attrs.id )
        .then(response => {
            this.data = response.data
            this.secao.descricao = response.data[0].descricao
            this.secao.estoque_id = response.data[0].estoque_id
        })
        .catch(error => (this.error = error))

        axios.get('https://apist.herokuapp.com/api/estoque')
        .then(response => (this.armazem = response.data))
        .catch(error => (this.error =  error))
    },
    methods:{
        saveeditsecao(evt){
            evt.preventDefault();
            axios.put('https://apist.herokuapp.com/api/secaoestoque/'+ this.$attrs.id, queryString.stringify(this.secao) )
            .then(response => (this.info = response.data))
            .catch(error => (this.error = error))
        }
    }
}
</script>

<style>
.editsecao{
    margin-top: 5%;
}
</style>