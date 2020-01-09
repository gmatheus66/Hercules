<template>
    <div class="emp">
        <h2 class="empresatitulo">Estoque</h2>
        <router-link to="/addestoque">
            <div class="btnadd">
                <span class="addtext">ADICIONAR</span><img id="icadd" src="../../assets/ic_add.png" alt="icadd">
            </div>
        </router-link>
        <div class="line"></div> 

        <table>
            <thead>
                <tr>
                    <th>Codigo</th>
                    <th>Descricao</th>
                    <th>Tipo Armazem</th>
                    <th>Empresa</th>
                    <th>Editar</th>
                    <th>Deletar</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(component, idx) in this.info" v-bind:key="idx">
                    <td>{{component.codigo}}</td>
                    <td>{{component.descricao}}</td>
                    <td>{{component.tipo_armazem}}</td>
                    <td v-show="l">{{empresa(component.empresa_id)}}</td>
                    <td> <router-link :to="'/editesto/' + component.id"  ><i class="large material-icons">create</i> </router-link></td>
                    <td><i class="large material-icons">delete_forever</i></td>
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
    position: relative;
    margin-top: 50%;
    margin-left: 5%;
    font-size: 1.5em;
    font-weight: bold;
}
.estoquetitulo{
    color: black;
    margin-left: 4%;
}
</style>