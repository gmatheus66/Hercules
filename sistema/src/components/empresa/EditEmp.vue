<template>
  <div class="edit">
      <h2>teste</h2>
      {{create()}}
      <p>{{this.$attrs.id}}</p>
      <p>info - {{this.inf}}</p>
      <p>error - {{this.err}}</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'EditEmp',
    date(){
        return{
           inf: null,
           err: null,
        }
    },
    mounted: function(){
           
    },
    methods:{
        create:function(){
            axios
            .get('https://apist.herokuapp.com/api/empresa/'+ this.$attrs.id, { useCredentials: true }
            ).then(response => (this.inf = response.data))
            .catch(error => (this.err =  error)); 
        }
    }
}
</script>

<style>

</style>