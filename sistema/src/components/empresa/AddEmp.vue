<template>
    <div class="emp">
        <h2 class="empresatitulo">Adicionar Empresa</h2>
        <div class="line"></div> 

      
        <form id="data" class="formadd" @submit.prevent="onSubmit">
            <div class="row">
                 <div class="col">
                    <input type="text" class="form-control" name="razao" id="razao" v-model="form.razao" placeholder="Razão Social">
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <input type="text" class="form-control" name="cnpj" id="cnpj" v-model="form.cnpj" placeholder="CNPJ">
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <input type="text" class="form-control" name="nome_fantasia" id="nome_fantasia" v-model="form.nome_fantasia" placeholder="Nome Fantasia">
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <input type="number" class="form-control" name="ddd" id="ddd" v-model="form.ddd" placeholder="DDD">
                </div>
                <div class="col">
                    <input type="number" class="form-control" name="telefone" id="telefone" v-model="form.telefone" placeholder="Telefone" maxlength="9">
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <input type="text" class="form-control" name="nome_contato" id="nome_contato" v-model="form.nome_contato" placeholder="Nome Contato">   
                </div>
            </div>
            <button type="submit">Enviar</button>         
        </form>
        <p>{{this.info}}</p>
    </div>
</template>
<script>
import axios from 'axios';
const queryString = require('query-string');
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
            info: null

        }
    },
    methods:{
        
            onSubmit(evt) {
                evt.preventDefault()
                //alert(queryString.stringify(this.form))
                axios
                .post('https://apist.herokuapp.com/api/empresa?', queryString.stringify(this.form))
                .then(response => (this.info = response.data)).catch(error => (this.info = error))
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
</style>