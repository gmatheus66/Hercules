<template>
  <div class="addfuncionario">
       <div class="addsecoes">
        <router-link to="/funcionario">
            <h2 class="secaotitulo">Adicionar Funcionario</h2>
        </router-link>
        <div class="line"></div> 
        </div>
        <div  v-if="this.data" class="alert alert-dark alertemp" role="alert">
            <ul v-for="(inf,id) in this.data" v-bind:key="id">
                <li v-if="!inf.msg">{{inf}}</li>
                <li v-if="inf.msg" :class="inf.msg.replace(/\s+/g, '')">{{inf.msg}}</li>
            </ul>
        </div>
        <div  v-if="this.errorcep" class="alert alert-dark alertemp" role="alert">
            {{this.errorcep}}
        </div>
        <form class="form-group funcformadd" @submit.prevent="savefuncionario">
            <div class="form-group row">
                <label for="nome" class="col-sm-2 col-form-label">Nome</label>
                <div class="col-sm-4">
                    <input type="text" class="form-control" name="nome" id="nome"  placeholder="Nome" v-model="funcionario.nome">
                </div>
                <label for="idade" class="col-sm-1 col-form-label">Idade</label>
                <div class="col-sm-2">
                    <input type="number" class="form-control" name="idade" id="idade"  placeholder="Idade" v-model="funcionario.idade">
                </div>
            </div>
            <div class="form-group row">
                 <label for="endereco" class="col-sm-2 col-form-label">Endereço</label>
                <div class="col-sm-4">
                    <input type="text" class="form-control" name="endereco" id="endereco"  placeholder="Endereço" v-model="funcionario.endereco">
                </div>
                 <label for="cep" class="col-sm-1 col-form-label">Cep</label>
                <div class="col-sm-3">
                    <input type="text" class="form-control" name="cep" id="cep"  placeholder="Cep" v-on:keyup="validationcep" v-model="funcionario.cep">
                </div>
            </div>
            <div class="form-group row">
                 <label for="numero" class="col-sm-2 col-form-label">Numero</label>
                <div class="col-sm-1">
                    <input type="number" class="form-control" name="numero" id="numero"  placeholder="Nº" v-model="funcionario.numero_residencia">
                </div>
                 <label for="cidade" class="col-sm-1 col-form-label">Cidade</label>
                <div class="col-sm-3">
                    <input type="text" class="form-control" name="cidade" id="cidade"  placeholder="Cidade" v-model="funcionario.cidade">
                </div>
                 <label for="bairro" class="col-sm-1 col-form-label">Bairro</label>
                <div class="col-sm-2">
                    <input  type="text" class="form-control" name="bairro" id="bairro"  placeholder="Bairro" v-model="funcionario.bairro">
                </div>
            </div>
            <div class="form-group row">
                 <label for="estado" class="col-sm-2 col-form-label">Estado</label>
                <div class="col-sm-2">
                    <input type="text" class="form-control" maxlength="2" name="estado" id="estado"  placeholder="Estado" v-model="funcionario.estado">
                </div>
                 <label for="pais" class="col-sm-1 col-form-label">Pais</label>
                <div class="col-sm-2">
                    <input type="text" class="form-control" maxlength="2" name="pais" id="pais"  placeholder="Pais" v-model="funcionario.pais">
                </div>
            </div>
            <div class="form-group row">
                 <label for="cargo" class="col-sm-2 col-form-label">Cargo</label>
                <div class="col-sm-5">
                    <input type="text" class="form-control" name="cargo" id="cargo"  placeholder="Cargo" v-model="funcionario.cargo">
                </div>
            </div>
             <div class="form-group row">
             <label for="selectempresa" class="col-sm-2 col-form-label" >Empresa</label>
                <div class="col-sm-3">
                    <select class="custom-select" name="estoque_id" id="selectempresa" v-model="funcionario.empresa_id" >
                            <option selected disabled>Selecione a Empresa</option>
                            <option v-for="(empresa,id) in this.info"  v-bind:key="id" :value="empresa.id">{{empresa.nome_fantasia}}</option>
                    </select>
                </div>
             </div>
            <button class="submit funcadd" type="submit">Salvar<i class="large material-icons save">save</i></button> 
        </form>
  </div>
</template>

<script>
import axios from 'axios';
const queryString = require('query-string');
export default {
    name: 'AddFuncionario',
    data(){
        return{
            info: null,
            error: null,
            funcionario:{
                nome: null,
                idade: null,
                endereco: null,
                cep: null,
                numero_residencia: null,
                cidade: null,
                bairro: null,
                estado: null,
                pais: null,
                cargo: null,
                empresa_id: null
            },
            data: null,
            cep: null,
            errorcep: null
        }
    },
    mounted(){
        axios
      .get('https://apist.herokuapp.com/api/empresa')
      .then(response => (this.info = response.data))
      .catch(error => (this.error = error))
    },
    methods:{
        savefuncionario: function(evt){
            evt.preventDefault();
            axios.post('https://apist.herokuapp.com/api/funcionario?',queryString.stringify(this.funcionario))
            .then(response => {
                this.data = response.data
                if(response.statusText == "OK"){
                    this.funcionario.nome = null
                    this.funcionario.idade = null
                    this.funcionario.endereco = null
                    this.funcionario.cep = null
                    this.funcionario.numero_residencia = null
                    this.funcionario.cidade = null
                    this.funcionario.bairro = null
                    this.funcionario.estado = null
                    this.funcionario.pais = null
                    this.funcionario.cargo = null
                    this.funcionario.empresa_id = null
                }

            })
            .catch(error => (this.error = error))    
        },
        validationcep(){
            axios.get('https://viacep.com.br/ws/'+ this.funcionario.cep +'/json/')
            .then(response => {
                this.cep = response
                if(this.cep.statusText == "OK" && this.cep.data.erro != true){
                    this.funcionario.bairro = this.cep.data.bairro
                    this.funcionario.endereco = this.cep.data.logradouro
                    this.funcionario.cidade = this.cep.data.localidade
                    this.funcionario.estado = this.cep.data.uf
                    this.errorcep = null
                }
                if(this.cep.data.erro == true){
                    this.errorcep = "Cep Invalido"
                }


            })
            .catch(error => (this.error = error))
        }

    }
}
</script>

<style>
.addfuncionario{
    margin-top: 5%;
}
.funcformadd{
    margin-top: 3%;
    margin-left: 10%;
    margin-right: 5%;
}
.funcadd{
    margin-left: 45%;
    margin-top: 1%;
}
</style>