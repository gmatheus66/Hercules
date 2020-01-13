<template>
  <div class="funcionario">
      <div class="submain">
        <h2 class="functitulo">Funcionarios</h2>
        <router-link to="/addfuncionario">
            <div class="btnaddfunc">
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
                <th scope="col">Empresa </th>
                <th scope="col">Nome</th>
                <th scope="col">Idade</th>
                <th scope="col">Endereço</th>
                <th scope="col">Nº</th>
                <th scope="col">Cep</th>
                <th scope="col">Cidade</th>
                <th scope="col"> Bairro</th>
                <th scope="col">Estado</th>
                <th scope="col">Pais</th>
                <th scope="col">Editar</th>
                <th scope="col">Deletar</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(funcionario, id) in this.funcionarios" v-bind:key="id">
                <td>{{getempresa(funcionario.empresa_id)}}</td>
                <td>{{funcionario.nome}}</td>
                <td>{{funcionario.idade}}</td>
                <td>{{funcionario.endereco}}</td>
                <td>{{funcionario.numero_residencia}}</td>
                <td>{{funcionario.cep}}</td>
                <td>{{funcionario.cidade}}</td>
                <td>{{funcionario.bairro}}</td>
                <td>{{funcionario.estado}}</td>
                <td>{{funcionario.pais}}</td>
                <td> <router-link :to="'/editfuncionario/' + funcionario.id"  ><i class="large material-icons">create</i> </router-link></td>
                <td><i v-on:click="delete_funcionario(funcionario.id, id)" class="large material-icons">delete_forever</i></td>
            </tr>
        </tbody>
    </table>

  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'funcionario',
    data(){
        return{
            funcionarios: null,
            error: null,
            empresas: null,
            length: null,
            delete: null
        }
    },
    mounted(){
        axios
        .get('https://apist.herokuapp.com/api/funcionario')
        .then(response => (this.funcionarios = response.data))
        .catch(error => (this.error = error.data))

        axios
        .get('https://apist.herokuapp.com/api/empresa')
        .then(response => (this.empresas = response.data))
        .catch(error => (this.error = error.data))
    },
    methods:{
        getempresa(id){
            this.length = this.empresas.length

            for(let i = 0; i < this.length; i++){
                if(this.empresas[i].id == id){
                    return this.empresas[0].nome_fantasia
                }
            }
        },
        delete_funcionario(id, deleteid){
             axios
            .delete('https://apist.herokuapp.com/api/funcionario/'+ id)
            .then(response => (this.delete = response.data))
            .catch(error =>(this.error = error))
            
            this.funcionarios.splice(deleteid, 1)
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
.funcionario{
    margin-top: 5%;
}
.functitulo{
    display: inline-block;
    color: black;
    margin-left: 2%;
}
.btnaddfunc{
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