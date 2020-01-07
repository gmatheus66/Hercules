<template>
    <div class="emp">
        <h2 class="empresatitulo">Estoque</h2>
        <div class="btnadd">
            <span class="addtext">ADICIONAR</span>
            <img id="icadd" src="../assets/ic_add.png" alt="icadd">
        </div>
        <div class="line"></div>       
    </div>
</template>
<script>
export default {
    name: 'Estoque',
    components:{

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