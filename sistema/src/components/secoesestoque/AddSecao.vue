<template>
    <div class="addsecao">
          <div class="addsecoes">
        <router-link to="/secao">
            <h2 class="secaotitulo">Adicionar Seções</h2>
        </router-link>
        <div class="line"></div> 
        </div>
    <div  v-if="this.info" class="alert alert-dark alertemp" role="alert">
            <ul v-for="(inf,id) in this.info" v-bind:key="id">
                <li v-if="!inf.msg">{{inf}}</li>
                <li v-if="inf.msg" :class="inf.msg.replace(/\s+/g, '')">{{inf.msg}}</li>
            </ul>
    </div>
    <form class="addsecaoform" id="form-group formestoque" @submit.prevent="savesecao">
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
    <p>{{this.error}}</p>
    </div>
  
</template>

<script>
import axios from 'axios';
const queryString = require('query-string');
export default {
    name: 'AddSecao',
    data(){
        return{
            info: null,
            error:null,
            secao:{
                descricao: null,
                estoque_id: null
            },
            armazem: null
        }
    },
    mounted(){
        axios.get('https://apist.herokuapp.com/api/estoque')
        .then(response => (this.armazem = response.data))
        .catch(error => (this.error =  error))
    },
    methods:{
        savesecao: function(evt){
            evt.preventDefault();
            //alert(queryString.stringify(this.secao))
            axios.post('https://apist.herokuapp.com/api/secaoestoque?', queryString.stringify(this.secao))
            .then(response => (this.info = response.data))
            .catch(error => (this.error = error))
        }
    }
}
</script>

<style>
.addsecao{
    margin-top: 5%;
}
.addsecaoform{
    margin-top: 5%;
    margin-left: 9%;
    margin-right: 2%;
}
.submitsecao{
    margin-top: 2%;

}
</style>