<template>
  <div class="produto">
    <div class="submain">
        <h2 class="produtotitulo">Produtos</h2>
        <router-link to="/addproduto">
            <div class="btnaddproduto">
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
                <th scope="col">Nome</th>
                <th scope="col">Preço Custo</th>
                <th scope="col">Lucro</th>
                <th scope="col">Preço Venda</th>
                <th scope="col">Unidade</th>
                <th scope="col">Origem</th>
                <th scope="col">Seção</th>
                <th scope="col">Editar</th>
                <th scope="col">Deletar</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(prod, id) in this.produto" v-bind:key="id">
                <td>{{prod.nome}}</td>
                <td>{{prod.preco_custo}}</td>
                <td>{{prod.lucro}}</td>
                <td>{{prod.preco_venda}}</td>
                <td>{{prod.unidade_medida}}</td>
                <td>{{prod.origem}}</td>
                <td>{{getsecao(prod.secao_id)}}</td>
                <td> <router-link :to="'/editproduto/' + prod.id"  ><i class="large material-icons">create</i> </router-link></td>
                <td><i v-on:click="delete_produto(prod.id, id)" class="large material-icons">delete_forever</i></td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Produto',
    data(){
        return{
            produto: null,
            error: null,
            length: null,
            secao: null,
            delete: null
        }
    },
    mounted(){
        axios.get('https://apist.herokuapp.com/api/produto')
        .then(response => (this.produto = response.data))
        .catch(error => (this.error = error.data))

        axios.get('https://apist.herokuapp.com/api/secaoestoque')
        .then(response => (this.secao = response.data))
        .catch(error => (this.error = error.data))
    },
    methods:{
        getsecao(id){
            this.length = this.secao.length
            for(let i =0; i < this.length; i++){
                if(this.secao[i].id == id){
                    return this.secao[i].descricao
                }
            }
        },
        delete_produto(id, deleteid){
             axios
            .delete('https://apist.herokuapp.com/api/produto/'+ id)
            .then(response => (this.delete = response.data))
            .catch(error =>(this.error = error))

            this.produto.splice(deleteid, 1)
        }
    }
}
</script>

<style>
.produto{
    margin-top: 5%;
}
.produtotitulo{
    display: inline-block;
    color: black;
    margin-left: 2%;
}
.btnaddproduto{
    text-align: center;
    display: inline;
    border: 0px solid black;
    background-color: #B9FAA8;
    margin-bottom: 1%;
    padding-top: 2%;
    padding-left: 1%;
    padding-bottom: 2%;
    padding-right: 1%;
    margin-left: 60%;
    margin-right: 5%;

}
</style>