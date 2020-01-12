<template>
  <div class="emp">
      <div class="submain">
            <router-link to="/empresas">
                <h2 class="empresatitulo">Empresa</h2>
            </router-link>
        </div>
        <div class="line"></div>

    {{this.$attrs.id}}
    <p>{{this.emp}}</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'EditEmp',
    date(){
        return{
            empresadetail:{
                razao: null,
                cnpj: '',
                nome_fantasia: '',
                ddd: null,
                telefone: null,
                nome_contato: ''

            },
            emp: null

        }
        
    },
    mounted(){
        axios.get('https://apist.herokuapp.com/api/empresa/' + this.$attrs.id)
        .then((response) => { 
            this.emp = response.data
            this.empresadetail.razao = response.data[0].razao_social
            this.empresadetail.cnpj = response.data[0].cnpj
            this.empresadetail.nome_fantasia = response.data[0].nome_fantasia
            this.empresadetail.ddd = response.data[0].ddd
            this.empresadetail.telefone = response.data[0].telefone,
            this.empresadetail.nome_contato = response.data[0].nome_contato

        }) 
    },
    methods:{
 
    }
}
</script>

<style>

</style>