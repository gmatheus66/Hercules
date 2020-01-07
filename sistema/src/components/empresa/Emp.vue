<template v-bind:is="currentView">
    <div class="emp">
        <h2 class="empresatitulo">Empresas</h2>
        <router-link to="/addempresas">
            <div class="btnadd">
                <span class="addtext">ADICIONAR</span><img id="icadd" src="../../assets/ic_add.png" alt="icadd">
            </div>
        </router-link>
         <div class="line"></div> 
        
        <table>
            <thead>
                <tr>
                    <th>Razão Social</th>
                    <th>CNPJ</th>
                    <th>Nome Fantasia</th>
                    <th>DDD</th>
                    <th>Telefone</th>
                    <th>Contato</th>
                    <th>Editar</th>
                    <th>Deletar</th>
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
                    <td><i class="large material-icons">create</i></td>
                    <td><i class="large material-icons">delete_forever</i></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from 'axios';
//import AddEmp from './AddEmp';
export default {
    name: 'Empresa',
    components:{
       
    },
    data(){
        return{
        info:null,
        }  
    },
    mounted(){
        axios
      .get('https://apist.herokuapp.com/api/empresa')
      .then(response => (this.info = response.data))
        
        
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
   
}
</script>

<style >
table,tr,th,td{
    margin: auto;
    border: 1px solid black;
    border-collapse: collapse;
    text-align: center;
}
.line{
    
    border-bottom: 5px solid #AEE5E2;
    margin-left: 4%;
    margin-top: 1%;
    border-radius: 10px;
}
.emp{
    position: relative;
    margin-top: 15%;
}
.empresatitulo{
    color: black;
    margin-left: 4%;
}
.btnadd{
    position: absolute;
    border: 0px solid black;
    background-color: #B9FAA8;
    top: -1%;
    left:81%;
    right: 4%;
    margin-bottom: 1%;

}
.addtext{
    position: relative;
    margin-top: 50%;
    margin-left: 5%;
    font-size: 1.5em;
    font-weight: bold;
}
a{
  text-decoration: none;
  color: black;
}
</style>