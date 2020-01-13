<template>
  <div class="editesto">
    <router-link to="/estoque">
        <h2 class="empresatitulo">Editar Estoque</h2>
    </router-link>
        <div class="line"></div> 

    <div class="alert alert-danger alertemp"  v-if="errorput" role="alert">
            Aguarde um momento e tente novamente ...
    </div>

    <div  v-if="this.savedit" class="alert alert-dark alertemp" role="alert">
        <ul v-for="(inf,id) in this.savedit" v-bind:key="id">
            <li v-if="!inf.msg">{{inf}}</li>
            <li v-if="inf.msg" :class="inf.msg.replace(/\s+/g, '')">{{inf.msg}}</li>
        </ul>
    </div>    
    {{selectempresa()}}

    <form class="addestoform" id="form-group formestoque" @submit="saveedit">
         <div class="form-group row">
             <label for="codigo" class="col-sm-2 col-form-label">Codigo</label>
            <div class="col-sm-2">
                <input type="number" class="form-control" name="codigo" id="codigo" v-model="estoque.codigo" placeholder="Codigo">
            </div>
        </div>
        <div class="form-group row">
             <label for="descricao" class="col-sm-2 col-form-label">Descrição</label>
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
                        <option v-for="(empresa, id) in this.empresa" v-bind:key="id"  :value="empresa.id">{{empresa.nome_fantasia}}</option>
                </select>
            </div>

        </div>
        <button class="submit submitestoedit" type="submit">Salvar<i class="large material-icons save">save</i></button>  
    </form>
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
        .then(response => {
            this.infoesto = response.data
            this.estoque.codigo = response.data[0].codigo
            this.estoque.descricao = response.data[0].descricao
            this.estoque.empresa_id = response.data[0].empresa_id
            this.estoque.tipo_armazem = response.data[0].tipo_armazem
        }) 
    
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
            axios.put('https://apist.herokuapp.com/api/estoque/'+ this.$attrs.id, queryString.stringify(this.estoque), { useCredentials: true })
                .then(response => (this.savedit = response.data))
                .catch(error =>(this.errorput = error) )
            
        }
    }
}
</script>

<style>
.editesto{
    margin-top: 5%;
}
.submitestoedit{
    margin-left: 30%;
}
</style>