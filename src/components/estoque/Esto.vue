<template>
    <div class="emp">
        <div class="submain">
            <h2 class="empresatitulo">Estoque</h2>
            <router-link to="/addestoque">
                <div class="btnaddesto">
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
                    <th scope="col">Codigo</th>
                    <th scope="col">Descricao</th>
                    <th scope="col">Tipo Armazem</th>
                    <th scope="col">Empresa</th>
                    <th scope="col">Editar</th>
                    <th scope="col">Deletar</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(component, idx) in this.info" v-bind:key="idx">
                    <td>{{component.codigo}}</td>
                    <td>{{component.descricao}}</td>
                    <td>{{component.tipo_armazem}}</td>
                    <td v-show="l">{{empresa(component.empresa_id)}}</td>
                    <td> <router-link :to="'/editesto/' + component.id"  ><i class="large material-icons">create</i> </router-link></td>
                    <td><i v-on:click="delete_estoque(component.id, idx)" class="large material-icons">delete_forever</i></td>
                </tr>
            </tbody>
        </table>
         
        <p>{{this.erro}}</p>
        <p>{{this.error}}</p>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'Estoque',
    components:{

    },
     data(){
        return{
            info: null,
            inf: null,
            data: null,
            erro: null,
            error: null,
            l: null,
            delete: null
            
        }
    },
    mounted(){
        axios
      .get('https://apist.herokuapp.com/api/estoque')
      .then(response => (this.info = response.data))
      .catch(error => (this.erro = error));

        axios
        .get('https://apist.herokuapp.com/api/empresa')
        .then((response) => ( this.data = response.data))
        .catch(error => (this.error = error));

    },
    methods:{
        empresa: function(id){
            this.l = this.data.length
           for(let i =0;i < this.l; i++){
                if(this.data[i].id == id){
                    return this.data[i].nome_fantasia;
                }
           }
         
        },
        delete_estoque(id, deleteid){
            axios
            .delete('https://apist.herokuapp.com/api/estoque/'+ id)
            .then(response => (this.delete = response.data))
            .catch(error =>(this.error = error))

            this.info.splice(deleteid,1)
        }
        
    }
}
</script>

<style >
.line{
    
    border-bottom: 5px solid #AEE5E2;
}
.emp{
   margin-top: 20%;
}
.addtext{
 
}
.estoquetitulo{
    color: black;
    margin-left: 4%;
}
.btnaddesto{
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
.addtext{
    display: inline;
    font-size: 1.5em;
    font-weight: bold;
}
</style>