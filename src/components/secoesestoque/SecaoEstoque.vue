<template>
  <div class="secao">
       <div class="submain">
        <h2 class="secaotitulo">Seções para locais de estoque</h2>
        <router-link to="/addsecao">
            <div class="btnadd">
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
                <th scope="col">Armazem</th>
                <th scope="col">Descricao</th>
                <th scope="col">Editar</th>
                <th scope="col">Deletar</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(secao, id) in this.secoes" v-bind:key="id">
                <td v-show="length">{{getestoque(secao.estoque_id)}}</td>
                <td>{{secao.descricao}}</td>
                <td> <router-link :to="'/editsecao/' + secao.id"  ><i class="large material-icons">create</i> </router-link></td>
                <td><i v-on:click="delete_secao(secao.id)" class="large material-icons">delete_forever</i></td>
            </tr>
        </tbody>

    </table>

  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'secao',
    data(){
        return{
            secoes: null,
            error : null,
            name: null,
            length: null,
            delete: null
        }
    },
    mounted(){
        axios
        .get('https://apist.herokuapp.com/api/secaoestoque')
        .then(response => (this.secoes = response.data))
        .catch(error => (this.error = error))

         axios.get('https://apist.herokuapp.com/api/estoque')
            .then(response => (this.name = response.data))
            .catch(error => (this.error = error.data))
    },
    methods:{
        getestoque(id){
            this.length = this.name.length

            for(let i = 0; i < this.length; i++){
                if(this.name[i].id == id){
                    return this.name[i].descricao
                }
            }

        },
        delete_secao(id){
            axios
            .delete('https://apist.herokuapp.com/api/secaoestoque/'+ id)
            .then(response => (this.delete = response.data))
            .catch(error =>(this.error = error))

            for(let i = 0; i < this.secoes.length; i++){
                if(this.secoes[i].id == id){
                    this.secoes.splice(i,1);
                }
            }
        }
    }
}
</script>

<style>

.line{
    
    border-bottom: 5px solid #AEE5E2;
    margin-left: 2%;
    margin-top: 1%;
    border-radius: 10px;
}
.secao{
    margin-top: 5%;
}
.secaotitulo{
    display: inline-block;
    color: black;
    margin-left: 2%;
}
.btnadd{
    text-align: center;
    display: inline;
    border: 0px solid black;
    background-color: #B9FAA8;
    margin-bottom: 1%;
    padding-top: 2%;
    padding-left: 1%;
    padding-bottom: 2%;
    padding-right: 1%;
    margin-left: 35%;
    margin-right: 5%;

}
.addtext{
    display: inline;
    font-size: 1.5em;
    font-weight: bold;
}
#icadd{
    display: inline;
    margin-left: 1%;
}
</style>