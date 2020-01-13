<template>
  <div class="editfunc">
       <div class="addsecoes">
        <router-link to="/funcionario">
            <h2 class="secaotitulo">Adicionar Funcionario</h2>
        </router-link>
        <div class="line"></div> 
        </div>
        <div  v-if="this.info" class="alert alert-dark alertemp" role="alert">
            <ul v-for="(inf,id) in this.info" v-bind:key="id">
                <li v-if="!inf.msg">{{inf}}</li>
                <li v-if="inf.msg" :class="inf.msg.replace(/\s+/g, '')">{{inf.msg}}</li>
            </ul>
        </div>
        <form class="form-group funcformadd" @submit.prevent="saveeditfuncionario">
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
                    <input type="text" class="form-control" name="cep" id="cep"  placeholder="Cep" v-model="funcionario.cep">
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
                            <option v-for="(empresa,id) in this.empresa"  v-bind:key="id" :value="empresa.id">{{empresa.nome_fantasia}}</option>
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
    name: 'EditFuncionario',
    data(){
        return{
            info: null,
            funcionarios: null,
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
            error: null,
            empresa: null
        }
    },
    mounted(){
        axios
        .get('https://apist.herokuapp.com/api/funcionario/' + this.$attrs.id)
        .then(response => {
            this.funcionarios = response.data
            this.funcionario.nome = response.data[0].nome
            this.funcionario.idade = response.data[0].idade
            this.funcionario.endereco = response.data[0].endereco
            this.funcionario.cep = response.data[0].cep
            this.funcionario.numero_residencia = response.data[0].numero_residencia
            this.funcionario.cidade = response.data[0].cidade
            this.funcionario.bairro = response.data[0].bairro
            this.funcionario.estado = response.data[0].estado
            this.funcionario.estado = response.data[0].estado
            this.funcionario.pais = response.data[0].pais
            this.funcionario.empresa_id = response.data[0].empresa_id
            this.funcionario.cargo = response.data[0].cargo
            
        })
        .catch(error => (this.error = error.data))

      axios
      .get('https://apist.herokuapp.com/api/empresa')
      .then(response => (this.empresa = response.data))
      .catch(error => (this.error = error))
    },
    methods: {
        saveeditfuncionario(evt){
            evt.preventDefault();
            axios
            .put('https://apist.herokuapp.com/api/funcionario/' + this.$attrs.id,  queryString.stringify(this.funcionario))
            .then(response => (this.info = response.data))
            .catch(error => (this.error = error))
        }
    }

}
</script>

<style>
.editfunc{
    margin-top: 5%;
}
</style>