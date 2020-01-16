<template>
  <div class="addfornecedor">
        <div class="submain">
        <router-link to="/fornecedor">
            <h2 class="fornecedortitulo">Adicionar Fornecedor</h2>
        </router-link>
    </div>
    <div class="line"></div>

     <div  v-if="this.info" class="alert alert-dark alertemp" role="alert">
            <ul v-for="(inf,id) in this.info" v-bind:key="id">
                <li v-if="!inf.msg">{{inf}}</li>
                <li v-if="inf.msg" :class="inf.msg.replace(/\s+/g, '')">{{inf.msg}}</li>
            </ul>
    </div> 
    <div  v-if="this.errorcep" class="alert alert-dark alertemp" role="alert">
        {{this.errorcep}}
    </div>
    <form class="form-group formaddfornecedor" @submit.prevent="addfornecedor">
        <div class="form-group row">
            <label for="razao" class="col-sm-2 col-form-label">Razão Social</label>
                <div class="col-sm-8">
                <input type="text" class="form-control" name="razao_social" id="razao" v-model="fornecedor.razao_social" placeholder="Razão Social">
            </div>
        </div>
        <div class="form-group row">
            <label for="cnpj" class="col-sm-2 col-form-label">CNPJ</label>
            <div class="col-sm-8">
                <input type="number" class="form-control" name="cnpj" id="cnpj" v-on:blur="getcnpj" v-model="fornecedor.cnpj" placeholder="CNPJ">
            </div>
        </div>
         <div class="form-group row">
            <label for="nome_fantasia" class="col-sm-2 col-form-label">Nome Fantasia</label>
            <div class="col-sm-8">
                <input type="text" class="form-control" name="nome_fantasia" id="nome_fantasia" v-model="fornecedor.nome_fantasia" placeholder="Nome Fantasia">
            </div>
        </div>
         <div class="form-group row">
            <label for="endereco" class="col-sm-2 col-form-label">Endereço</label>
            <div class="col-sm-4">
                <input type="text" class="form-control" name="endereco" id="endereco" v-model="fornecedor.endereco" placeholder="Endereço">
            </div>
            <label for="cep" class="col-sm-1 col-form-label">Cep</label>
            <div class="col-sm-3">
                <input type="number" class="form-control" maxlength="8" name="cep" id="cep" v-on:keyup="validationcep" v-model="fornecedor.cep" placeholder="Cep">
            </div>
        </div>
         <div class="form-group row">
            <label for="numero" class="col-sm-2 col-form-label">Numero</label>
            <div class="col-sm-1">
                <input type="number" class="form-control" name="numero_residencia" id="numero" v-model="fornecedor.numero_residencia" placeholder="Nº">
            </div>
            <label for="cidade" class="col-sm-1 col-form-label">Cidade</label>
            <div class="col-sm-3">
                <input type="text" class="form-control" name="cidade" id="cidade" v-model="fornecedor.cidade" placeholder="Cidade">
            </div>
            <label for="bairro" class="col-sm-1 col-form-label">Bairro</label>
            <div class="col-sm-2">
                <input type="text" class="form-control" name="bairro" id="bairro" v-model="fornecedor.bairro" placeholder="Bairro">
            </div>
        </div>
         <div class="form-group row">
            <label for="estado" class="col-sm-2 col-form-label">Estado</label>
            <div class="col-sm-2">
                <input type="text" class="form-control" maxlength="2" name="estado" id="estado" v-model="fornecedor.estado" placeholder="Estado">
            </div>
            <label for="pais" class="col-sm-1 col-form-label">Pais</label>
            <div class="col-sm-2">
                <input type="text" class="form-control" maxlength="2" name="pais" id="pais" v-model="fornecedor.pais" placeholder="Pais">
            </div>
        </div>
        <button class="submit submitfornecedor" type="submit">Salvar<i class="large material-icons save">save</i></button>    
    </form>
  </div>
</template>

<script>
import axios from 'axios';
const queryString = require('query-string');
export default {
    name: 'AddFronecedor',
    data(){
        return{
            info: null,
            error: null,
            fornecedor:{
                razao_social: null,
                nome_fantasia: null,
                cnpj: null,
                endereco: null,
                cep: null,
                numero_residencia: null,
                bairro: null,
                cidade: null,
                pais: null,
                estado: null
            },
            gtcnpj: null
        }
    },
    methods:{
        addfornecedor(evt){
            evt.preventDefault();
            axios.post('https://apist.herokuapp.com/api/fornecedor?', queryString.stringify(this.fornecedor))
            .then(response => (this.info = response.data))
            .catch(error => (this.error = error.data))
        },
        validationcep(){
            axios.get('https://viacep.com.br/ws/'+ this.fornecedor.cep +'/json/')
            .then(response => {
                this.cep = response
                if(this.cep.statusText == "OK" && this.cep.data.erro != true){
                    this.fornecedor.bairro = this.cep.data.bairro
                    this.fornecedor.endereco = this.cep.data.logradouro
                    this.fornecedor.cidade = this.cep.data.localidade
                    this.fornecedor.estado = this.cep.data.uf
                    this.errorcep = null
                }
                if(this.cep.data.erro == true){
                    this.errorcep = "Cep Invalido"
                }


            })
            .catch(error => (this.error = error))
        },
        getcnpj(){
            axios
            .get('https://cors-anywhere.herokuapp.com/https://www.receitaws.com.br/v1/cnpj/'+this.fornecedor.cnpj,  {
                crossdomain: true,
                headers:{
                    'Access-Control-Allow-Origin': 'https://herculestock.herokuapp.com/',
                }    
            
            })
            .then(response => {
                this.gtcnpj = response.data
                if(this.gtcnpj){
                    this.fornecedor.razao_social = this.gtcnpj.nome
                    this.fornecedor.nome_fantasia = this.gtcnpj.fantasia
                    this.fornecedor.estado = this.gtcnpj.uf
                    this.fornecedor.cidade = this.gtcnpj.municipio
                    this.fornecedor.bairro = this.gtcnpj.bairro
                    this.fornecedor.numero_residencia = this.gtcnpj.numero
                }
            })
            .catch(error => (this.error = error))
        }
    }

}
</script>

<style>
.addfornecedor{
    margin-top: 5%;
}
.formaddfornecedor{
    margin-top: 5%;
    margin-left: 15%;
    margin-right: 4%;
}
.submitfornecedor{
    margin-top: 3%;
}

</style>