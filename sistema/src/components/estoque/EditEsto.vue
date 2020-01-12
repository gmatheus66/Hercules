<template>
  <div class="editesto">
    <router-link to="/estoque">
        <h2 class="empresatitulo">Editar Estoque</h2>
    </router-link>
        <div class="line"></div> 

    {{this.erroesto}}
    {{ this.errorput}}
    <div class="alert alert-danger"  v-if="errorput" role="alert">
            Aguarde um momento...
    </div>
    <div class="alert alert-danger"  v-if="savedit" role="alert">
            {{this.savedit}}
    </div>
    
    {{selectempresa()}}

    <form id="data" class="formadd" @submit.prevent="saveedit">
            <div class="row">
                 <div class="col">
                    <input type="text" class="form-control form-edit" name="razao" id="razao" v-model="estoque.codigo">
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <input type="text" class="form-control form-edit" name="cnpj" id="cnpj"  v-model="estoque.descricao">
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <select name="selectemp" v-model="estoque.tipo_armazem" >
                        <option selected disabled>Selecione uma Empresa</option>
                        <option value="Padrão">Padrão</option>
                        <option value="Terceiros">Terceiros</option>
                        <option value="Próprio">Próprio</option>
                    </select>
                    <select name="selectemp" v-model="estoque.empresa_id" >
                        <option selected disabled>Selecione uma Empresa</option>
                            <option v-for="(empresa, id) in this.empresa" v-bind:key="id"  :value="empresa.id">{{empresa.nome_fantasia}}</option>
                    </select>
                </div>
            </div>
            <button type="submit">Enviar</button>         
        </form>
    {{this.savedit}}
    {{this.estoque}}
  </div>
</template>

<script>
import axios from 'axios';
const queryString = require('query-string');
export default {
    name: 'EditEsto',
    data(){
        return{
            infoesto:null,
            erroesto:null,
            estoque:{
                codigo: null,
                descricao: null,
                tipo_armazem: null,
                empresa_id: null,
                
            },
            empresa: null,
            savedit: null,
            empresaid_original: null,
            estoque_tipo_original:null,
            errorput: null
        }
    },
    mounted(){
        axios.get('https://apist.herokuapp.com/api/estoque/' + this.$attrs.id)
        .then(response => (
            this.infoesto = response.data[0],
            this.estoque.codigo = response.data[0].codigo,
            this.estoque.descricao = response.data[0].descricao,
            this.estoque_tipo_original = response.data[0].tipo_armazem,
            this.empresaid_original = response.data[0].empresa_id
        )) 
    
    },
    methods:{
        selectempresa: function(){
             axios.get('https://apist.herokuapp.com/api/empresa')
                .then(response => (this.empresa = response.data))
        },
        saveedit:function(evt){
            evt.preventDefault();
            if(this.estoque.empresa_id == null){
                alert( queryString.stringify(this.estoque))
                this.estoque.empresa_id = this.empresaid_original;
            }
            axios.put('https://apist.herokuapp.com/api/estoque/'+ this.$attrs.id + '?', queryString.stringify(this.estoque), { useCredentials: true })
                .then(response => (this.savedit = response.data))
                .catch(error =>(this.errorput = error) )
            
        }
    }
}
</script>

<style>

</style>