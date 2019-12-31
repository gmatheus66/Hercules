<template v-bind:is="currentView">
    <div class="emp">
        <h2 class="empresatitulo">Empresas</h2>
        <div class="btnadd">
            <span class="addtext">ADICIONAR</span>
            <img id="icadd" src="../../assets/ic_add.png" alt="icadd">
        </div>
        <div class="line"></div>

        {{ info }}       
    </div>
</template>
<script>
//import axios from 'axios';
export default {
    name: 'Emp',
    components:{

    },
    data(){
        return{
        info:null,

        myInit: { method: 'GET',          
               contentType: 'application/json',
                cache: false,
                dataType: 'json',
               mode: 'cors' }
        
        } 
           
    },
    mounted(){
        fetch.bind('https://apist.herokuapp.com/api/empresa', this.myInit).then(response => {
            this.info = response
        })
        /*
        axios.get('http://apist.herokuapp.com/api/empresa', this.myInit).then(
            response => {this.info = response}
        )
         */
    }
}
</script>

<style >
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
    border: 1px solid black;
    background-color: #B9FAA8;
    width: 15%;
    height: 90%;
    top: 0;
    left:75%;
    right: 5%;
}
#icadd{

}
.addtext{
    position: relative;
    margin-top: 50%;
    margin-left: 5%;
    font-size: 1.5em;
    font-weight: bold;
}
</style>