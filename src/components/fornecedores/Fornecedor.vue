<template>
  <div class="fornecedor">
         <div class="submain">
        <h2 class="fornecedortitulo">Fornecedor</h2>
        <router-link to="/addfornecedor">
            <div class="btnaddfornecedor">
                <span class="addtext">ADICIONAR</span><img id="icadd" src="../../assets/ic_add.png" alt="icadd">
            </div>
        </router-link>
    </div>
    <div class="line"></div>
    <div  v-if="this.delete" class="alert alert-dark alertemp" role="alert">
        <ul v-for="(inf,id) in this.delete" v-bind:key="id">
            <li v-if="!inf.msg">{{inf}}</li>
            <li v-if="inf.msg" :class="inf.msg.replace(/\s+/g, '')">{{inf.msg}}</li>
        </ul>
     </div>
    <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">Razão Social</th>
                <th scope="col">CNPJ</th>
                <th scope="col">N/Fantasia</th>
                <th scope="col">Endereço</th>
                <th scope="col">Nº</th>
                <th scope="col">Cep</th>
                <th scope="col">Cidade</th>
                <th scope="col">Bairro</th>
                <th scope="col">Editar</th>
                <th scope="col">Deletar</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(forne, id) in this.fornecedor" v-bind:key="id">
                <td>{{forne.razao_social}}</td>
                <td>{{forne.cnpj}}</td>
                <td>{{forne.nome_fantasia}}</td>
                <td>{{forne.endereco}}</td>
                <td>{{forne.numero_residencia}}</td>
                <td>{{forne.cep}}</td>
                <td>{{forne.cidade}}</td>
                <td>{{forne.bairro}}</td>
                <td> <router-link :to="'/editfornecedor/' + forne.id"  ><i class="large material-icons">create</i> </router-link></td>
                <td><i v-on:click="delete_fornecedor(forne.id)" class="large material-icons">delete_forever</i></td>

            </tr>
        </tbody>
    </table>

  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Fornecedor',
    data(){
        return{
            fornecedor: null,
            error: null,
            delete: null
        }
    },
    mounted(){
        axios
        .get('https://apist.herokuapp.com/api/fornecedor')
        .then(response => (this.fornecedor = response.data))
        .catch(error => (this.error = error.data))
    },
    methods:{
        delete_fornecedor(id){
            axios
            .delete('https://apist.herokuapp.com/api/fornecedor/'+ id)
            .then(response => (this.delete = response.data))
            .catch(error =>(this.error = error))


            for(let i = 0; i < this.fornecedor.length; i++){
                if(this.fornecedor[i].id == id){
                    this.fornecedor.splice(i,1);
                }
            }
        }
    }
}
</script>

<style>
.fornecedor{
    margin-top: 5%;
}
.fornecedortitulo{
    display: inline-block;
    color: black;
    margin-left: 2%;
}
.btnaddfornecedor{
    text-align: center;
    display: inline;
    border: 0px solid black;
    background-color: #B9FAA8;
    margin-bottom: 1%;
    padding-top: 2%;
    padding-left: 1%;
    padding-bottom: 2%;
    padding-right: 1%;
    margin-left: 55%;
    margin-right: 5%;

}
</style>