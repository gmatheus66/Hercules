<template v-bind:is="currentView">
    <div class="emp">
        <div class="submain">
            <h2 class="empresatitulo">Empresas</h2>
            <router-link to="/addempresas">
                <div class="btnaddemp">
                    <span class="addtext">ADICIONAR</span><img id="icadd" src="../../assets/ic_add.png" alt="icadd">
                </div>
            </router-link>
        </div>
         <div class="line"></div> 
        <div class="alert alert-danger"  v-if="erroremp" role="alert">
            Aguarde um momento...
        </div>
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
                    <th scope="col">Nome Fantasia</th>
                    <th scope="col">DDD</th>
                    <th scope="col">Telefone</th>
                    <th scope="col">Contato</th>
                    <th scope="col">Editar</th>
                    <th scope="col">Deletar</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(component, idx) in this.info" v-bind:key="idx">
                    <td>{{component.razao_social}}</td>
                    <td>{{component.cnpj}}</td>
                    <td>{{component.nome_fantasia}}</td>
                    <td>{{component.ddd}}</td>
                    <td>{{component.telefone}}</td>
                    <td>{{component.nome_contato}}</td>
                    <td> <router-link :to="'/editemp/' + component.id"  ><i class="large material-icons">create</i> </router-link></td>
                    <td><i v-on:click="delete_empresa(component.id, idx)" class="large material-icons">delete_forever</i></td>
                </tr>
            </tbody>
        </table>
    </div>
    
</template>
<script>
import axios from 'axios';
//import { timeout } from 'q';
//import AddEmp from './AddEmp';
export default {
    name: 'Empresa',
    components:{
       
    },
    data(){
        return{
            info:null,
            erroremp: null,
            delete: null,
            delete_length: null
        }  
    },
   
    mounted(){
        this.$display_home.value = 'none'
        axios
      .get('https://apist.herokuapp.com/api/empresa')
      .then(response => (this.info = response.data))
      .catch(error => (this.erroremp = error))
        
        
        /*
        fetch('https://apist.herokuapp.com/api/empresa').then(response => {
            this.info = response
        })
        axios({
            method: 'get',
            url: 'https://apist.herokuapp.com/api/empresa',
            crossdomain: true
        }).then(function(response){
            this.info = response;
        }).catch(error => {
            this.info = error.response;
        });
        axios.get('http://apist.herokuapp.com/api/empresa', this.myInit).then(
            response => {this.info = response}
        )
         */
    },
    methods:{
        addParams(nome,id){
            this.$router.push({name: nome, params: {i: id}})
        },
        delete_empresa(id, deleteid){
            axios
            .delete('https://apist.herokuapp.com/api/empresa/'+ id)
            .then(response => (this.delete = response.data))
            .catch(error =>(this.erroremp = error))
            
            this.info.splice(deleteid,1)

            //timeout.setTimeout(this.delete.splice(0,1) , 1000)
        }
    }
   
}
</script>

<style >
table{
    margin: auto;
    margin-top: 2% !important;
}
thead{
    background-color: #AEE5E2;
}
tr,th,td{
    text-align: center;
}

.line{
    
    border-bottom: 5px solid #AEE5E2;
    margin-left: 2%;
    margin-top: 1%;
    border-radius: 10px;
}
.emp{
    margin-top: 5%;
}
.empresatitulo{
    display: inline-block;
    color: black;
    margin-left: 2%;
}
.btnaddemp{
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
#icadd{
    display: inline;
    margin-left: 1%;
}
a{
  text-decoration: none !important;
  color: black !important;
}
</style>