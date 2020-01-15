<template>
    <div class="emp">
        <router-link to="/empresas">
            <h2 class="empresatitulo">Adicionar Empresa</h2>
        </router-link>
        <div class="line"></div> 

        <div  v-if="this.info" class="alert alert-dark alertemp" role="alert">
            <ul v-for="(inf,id) in this.info" v-bind:key="id">
                <li v-if="!inf.msg">{{inf}}</li>
                <li v-if="inf.msg" :class="inf.msg.replace(/\s+/g, '')">{{inf.msg}}</li>
            </ul>
        </div>
      
        <form id="data" class="form-group formadd" @submit.prevent="onSubmit">
            <div class="form-group row">
                <label for="razao" class="col-sm-2 col-form-label">Razão Social</label>
                 <div class="col-sm-8">
                    <input type="text" class="form-control" name="razao" id="razao" v-model="form.razao" placeholder="Razão Social">
                </div>
            </div>
            <div class="form-group row">
                <label for="cnpj" class="col-sm-2 col-form-label">CNPJ</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" name="cnpj" id="cnpj" v-model="form.cnpj" placeholder="CNPJ">
                </div>
            </div>
            <div class="form-group row">
                <label for="nome_fantasia" class="col-sm-2 col-form-label">Nome Fantasia</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" name="nome_fantasia" id="nome_fantasia" v-model="form.nome_fantasia" placeholder="Nome Fantasia">
                </div>
            </div>
            <div class="form-group row">
                <label for="ddd" class="col-sm-1 col-form-label">DDD</label>
                <label for="telefone" class="col-sm-1 col-form-label">Telefone</label>
                <div class="col-sm-2">
                    <input type="number" class="form-control" maxlength="2" name="ddd" id="ddd" v-model="form.ddd" placeholder="DDD">
                </div>
                <div class="col-sm-6">
                    <input type="number" class="form-control" name="telefone" id="telefone" v-model="form.telefone" placeholder="Telefone" maxlength="9">
                </div>
            </div>
            <div class="form-group row">
                <label for="nome_contato" class="col-sm-2 col-form-label">Nome Contato</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" name="nome_contato" id="nome_contato" v-model="form.nome_contato" placeholder="Nome Contato">   
                </div>
            </div>
            <button class="submit" type="submit">Salvar<i class="large material-icons save">save</i></button>         
        </form>
    </div>
</template>
<script>
import axios from 'axios';
const queryString = require('query-string');
//import { http } from '../../services/config';
export default {
    name: 'AddEmp',
    data(){
        return{
            form:{
                razao: '',
                cnpj: '',
                nome_fantasia: '',
                ddd: null,
                telefone: null,
                nome_contato: ''
            },
            info: null,
            error: null

        }
    },
    methods:{
        
            onSubmit(evt) {
                evt.preventDefault()
                //alert(queryString.stringify(this.form))
                
                axios
                .post('https://apist.herokuapp.com/api/empresa?', queryString.stringify(this.form))
                .then(response => (this.info = response.data)).catch(error => (this.error = error))
                /*
                http.post('https://apist.herokuapp.com/api/empresa?', queryString.stringify(this.form))
                .then(response => (this.info = response.data)).catch(error => (this.error = error))
              */
            },
           /*
            addempresa(){
                axios.post({
                method: 'post',
                url: 'https://apist.herokuapp.com/api/empresa',
                crossdomain: true,
                //data: $(".formadd").serialize()
                }).then(function(response){
                    this.info = response;
                }).catch(error => {
                    this.info = error.response;
                });
            }
            */
        
    }
}
</script>

<style >
.line{
    
    border-bottom: 5px solid #AEE5E2;
}
.emp{
    position: static;
}
a{
  text-decoration: none !important;
  color: black;
}
#data{
    margin-top: 3%;
    margin-left: 10%;
    margin-right: 5%;
}
.submit{
    margin-left: 39%;
    background-color: #B9FAA8;
    padding: 0.5%;
    text-align: center;
    font-weight: bold;
}
.save{
    margin-top: 1%;
    width: 30px;
    height: 20px;
}
.alertemp{
    margin-top: 1%;
    margin-left: 10%;
    margin-right: 20%;
}
</style>