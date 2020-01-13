<template>
  <div class="emp">
      <div class="submain">
            <router-link to="/empresas">
                <h2 class="empresatitulo">Editar Empresa</h2>
            </router-link>
        </div>
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
                    <input type="text" class="form-control" name="razao" id="razao" v-model="empresadetail.razao" placeholder="Razão Social">
                </div>
            </div>
            <div class="form-group row">
                <label for="cnpj" class="col-sm-2 col-form-label">CNPJ</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" name="cnpj" id="cnpj" v-model="empresadetail.cnpj" placeholder="CNPJ">
                </div>
            </div>
            <div class="form-group row">
                <label for="nome_fantasia" class="col-sm-2 col-form-label">Nome Fantasia</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" name="nome_fantasia" id="nome_fantasia" v-model="empresadetail.nome_fantasia" placeholder="Nome Fantasia">
                </div>
            </div>
            <div class="form-group row">
                <label for="ddd" class="col-sm-1 col-form-label">DDD</label>
                <label for="telefone" class="col-sm-1 col-form-label">Telefone</label>
                <div class="col-sm-2">
                    <input type="number" class="form-control" maxlength="2" name="ddd" id="ddd" v-model="empresadetail.ddd" placeholder="DDD">
                </div>
                <div class="col-sm-6">
                    <input type="number" class="form-control" name="telefone" id="telefone" v-model="empresadetail.telefone" placeholder="Telefone" maxlength="9">
                </div>
            </div>
            <div class="form-group row">
                <label for="nome_contato" class="col-sm-2 col-form-label">Nome Contato</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" name="nome_contato" id="nome_contato" v-model="empresadetail.nome_contato" placeholder="Nome Contato">   
                </div>
            </div>
            <button class="submit" type="submit">Salvar<i class="large material-icons save">save</i></button>         
    </form>
  </div>
</template>

<script>
import axios from 'axios';
const queryString = require('query-string');
export default {
    name: 'EditEmp',
    data(){
        return{
            emp: null,
            empresadetail:{
                razao: null,
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
    mounted(){
        axios.get('https://apist.herokuapp.com/api/empresa/' + this.$attrs.id)
        .then((response) => { 
            this.emp = response.data
            this.empresadetail.razao = response.data[0].razao_social
            this.empresadetail.cnpj = response.data[0].cnpj
            this.empresadetail.nome_fantasia = response.data[0].nome_fantasia
            this.empresadetail.ddd = response.data[0].ddd
            this.empresadetail.telefone = response.data[0].telefone
            this.empresadetail.nome_contato = response.data[0].nome_contato

        }) 
    },
    methods:{
        onSubmit(evt){
            evt.preventDefault();
            axios.put('https://apist.herokuapp.com/api/empresa/'+ this.$attrs.id, queryString.stringify(this.empresadetail))
            .then(response => (this.info = response.data))
            .catch(error => (this.error = error))
            

        }
    }
}
</script>

<style>

</style>