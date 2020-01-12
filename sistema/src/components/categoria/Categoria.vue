<template>
  <div class="categoria">
      <div class="submain">
        <h2 class="categoriatitulo">Categorias de Produtos</h2>
        <router-link to="/addcategoria">
            <div class="btnaddcategoria">
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
                <th scope="col">Id</th>
                <th scope="col">Descrição</th>
                <th scope="col">Editar</th>
                <th scope="col">Deletar</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(categoria, id) in this.categorias" v-bind:key="id">
                <td>{{categoria.id}}</td>
                <td>{{categoria.descricao}}</td>
                <td> <router-link :to="'/editcategoria/' + categoria.id"  ><i class="large material-icons">create</i> </router-link></td>
                <td><i v-on:click="delete_categoria(categoria.id, id)" class="large material-icons">delete_forever</i></td>
            </tr>

        </tbody>


    </table>

  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'categoria',
    data(){
        return{
            categorias: null,
            delete: null,
            error: null
        }
    },
    mounted(){
        axios
        .get('https://apist.herokuapp.com/api/categoria')
        .then(response => (this.categorias = response.data))
    },
    methods:{
        delete_categoria(id, deleteid){
             axios
            .delete('https://apist.herokuapp.com/api/categoria/'+ id)
            .then(response => (this.delete = response.data))
            .catch(error =>(this.error = error))

            this.categorias.splice(deleteid, id)
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
.categoria{
    margin-top: 5%;
}
.categoriatitulo{
    display: inline-block;
    color: black;
    margin-left: 2%;
}
.btnaddcategoria{
    text-align: center;
    display: inline;
    border: 0px solid black;
    background-color: #B9FAA8;
    margin-bottom: 1%;
    padding-top: 2%;
    padding-left: 1%;
    padding-bottom: 2%;
    padding-right: 1%;
    margin-left: 43%;
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