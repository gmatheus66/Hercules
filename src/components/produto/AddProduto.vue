<template>
  <div class="addproduto">
      <div class="submain">
        <router-link to="/produto">
        <h2 class="produtotitulo">Adicionar Produto</h2>
        </router-link>
    </div>
    <div class="line"></div>
     <div  v-if="this.info" class="alert alert-dark alertemp" role="alert">
        <ul v-for="(inf,id) in this.info" v-bind:key="id">
            <li v-if="!inf.msg">{{inf}}</li>
            <li v-if="inf.msg" :class="inf.msg.replace(/\s+/g, '')">{{inf.msg}}</li>
        </ul>
    </div>
    <form class="form-group formaddproduto" @submit.prevent="addproduto">
        <div class="form-group row">
            <div class="col-sm-1">
            <label for="codigo" class="col-sm-0 col-form-label">Codigo</label>
                <input type="number" class="form-control" name="codigo" id="codigo"  v-model="produto.codigo" required>
            </div>
            <div class="col-sm-3">
                <label for="nome" class="col-sm-0 col-form-label">Nome</label>
                <input type="text" class="form-control" name="nome" id="nome" placeholder="Nome" v-model="produto.nome" required>
            </div>
            <div class="col-sm-3">
                <label for="marca_id" class="col-sm-0 col-form-label">Marca</label>
                 <select class="custom-select" name="marca_id"  id="marca_id" v-model="produto.marca_id">
                        <option selected disabled>Selecione uma Marca</option>
                        <option v-for="(mc, id) in marca" v-bind:key="id" :value="mc.id">{{mc.descricao}}</option>
                </select>
            </div>
            <div class="col-sm-3">
                <label for="fornecedor" class="col-sm-0 col-form-label">Fornecedor</label>
                 <select class="custom-select" name="fornecedor_id"  id="fornecedor" v-model="produto.fornecedor_id" required>
                        <option selected disabled>Selecione uma Fornecedor</option>
                        <option v-for="(forn, id) in fornecedor" v-bind:key="id" :value="forn.id">{{forn.nome_fantasia}}</option>
                </select>
            </div>
        </div>

        <div class="form-group row">
            <div class="col-sm-2">
            <label for="preco_custo" class="col-sm-0 col-form-label">Preço Custo</label>
                <input type="number" class="form-control" name="preco_custo" id="preco_custo" v-model="produto.preco_custo"  placeholder="Preço Custo" required>
            </div>
            <div class="col-sm-2">
                <label for="lucro" class="col-sm-0 col-form-label">Lucro</label>
                <input type="number" class="form-control" name="lucro" id="lucro" v-model="produto.lucro" placeholder="Lucro" required>
            </div>
            <div class="col-sm-2">
                <label for="preco_venda" class="col-sm-0 col-form-label">Preço Venda</label>
                <input type="number" class="form-control" name="preco_venda" id="preco_venda" v-model="produto.preco_venda" placeholder="Preço Venda" required>
            </div>
            <div class="col-sm-2">
                <label for="unidade" class="col-sm-0 col-form-label">Unidade</label>
                 <select class="custom-select" name="unidade" id="unidade" v-model="produto.unidade_medida" required> 
                        <option selected disabled>Selecione uma Unidade</option>
                        <option value="UN">UN</option>
                        <option value="PC">PC</option>
                        <option value="KG">KG</option>
                        <option value="CX">CX</option>
                        <option value="CJ">CJ</option>
                </select>
            </div>
            <div class="col-sm-2">
                <label for="data_validade" class="col-sm-0 col-form-label">Data de Validade</label>
                <input type="date" class="form-control" name="data_validade" id="data_validade" v-model="produto.data_validade" required>
            </div>
        </div>

        <div class="form-group row">
            <div class="col-sm-2">
            <label for="icms" class="col-sm-0 col-form-label">ICMS</label>
                <input type="number" class="form-control" name="icms" id="icms" v-model="produto.icms" placeholder="ICMS">
            </div>
            <div class="col-sm-2">
                <label for="subst_tributaria" class="col-sm-0 col-form-label">Subst. Tributaria</label>
                <input type="number" class="form-control" name="subst_tributaria" id="subst_tributaria" v-model="produto.subst_tributaria" placeholder="Subst. Tributaria">
            </div>
            <div class="col-sm-2">
                <label for="cst" class="col-sm-0 col-form-label">CST - NFE</label>
                <input type="number" class="form-control" name="cst" id="cst" v-model="produto.cst_nfe" placeholder="CST - NFE">
            </div>
            <div class="col-sm-2">
                <label for="ncm" class="col-sm-0 col-form-label">NCM - NFE</label>
                <input type="number" class="form-control" name="ncm" id="ncm" v-model="produto.ncm_nfe" placeholder="NCM - NFE" required>
            </div>
            <div class="col-sm-3">
                <label for="secao" class="col-sm-0 col-form-label">Seção</label>
                 <select class="custom-select" name="secao_id" v-model="produto.secao_id" id="secao" required>
                        <option selected disabled>Selecione uma Seção</option>
                        <option v-for="(sc, id) in secao" v-bind:key="id" :value="sc.id">{{sc.descricao}}</option>
                </select>
            </div>
        </div>

        <div class="form-group row">
            <div class="col-sm-5">
                <label for="codigo_barras" class="col-sm-0 col-form-label">Código de barras</label>
                <input type="number" class="form-control" name="codigo_barras" id="codigo_barras" placeholder="Código de barras" v-model="produto.codigo_barras" required>
            </div>
            <div class="col-sm-3">
                <label for="categoria" class="col-sm-0 col-form-label">Categoria</label>
                 <select class="custom-select" name="categoria" v-model="produto.categoria_id" id="categoria" required>
                        <option selected disabled>Selecione uma Categoria</option>
                        <option v-for="(ctg,id) in categoria" v-bind:key="id" :value="ctg.id">{{ctg.descricao}}</option>
                </select>
            </div>
            <div class="col-sm-3">
                <label for="origem" class="col-sm-0 col-form-label">Origem</label>
                 <select class="custom-select" name="origem" v-model="produto.origem"  id="origem" required> 
                        <option selected disabled>Selecione uma Origem</option>
                        <option value="Extrangeiro">Extrangeiro</option>
                        <option value="Nacional">Nacional</option>
                </select>
            </div>
        </div>
        <button class="submit submitfornecedor" type="submit">Salvar<i class="large material-icons save">save</i></button>   
    </form>
  </div>
</template>

<script>
import axios from 'axios';
const queryString = require('query-string');
export default {
    name: 'AddProduto',
    data(){
        return{
            marca: null,
            fornecedor: null,
            categoria: null,
            secao: null,
            error: null,
            info: null,
            produto:{
                codigo: null,
                nome: null,
                preco_custo: null,
                lucro: null,
                preco_venda: null,
                icms: null,
                subst_tributaria: null,
                cst_nfe: null,
                ncm_nfe: null,
                unidade_medida: null,
                origem: null,
                codigo_barras: null,
                marca_id: null,
                categoria_id: null,
                secao_id: null,
                fornecedor_id: null,
                data_validade: null
            }

        }
    },
    mounted(){
        axios
        .get('https://apist.herokuapp.com/api/marca')
        .then(response => (this.marca = response.data ))
        .catch(error => (this.error = error))

        axios
        .get('https://apist.herokuapp.com/api/fornecedor')
        .then(response => (this.fornecedor = response.data))
        .catch(error => (this.error = error))

         axios
        .get('https://apist.herokuapp.com/api/secaoestoque')
        .then(response => (this.secao = response.data))
        .catch(error => (this.error = error))

        axios
        .get('https://apist.herokuapp.com/api/categoria')
        .then(response => (this.categoria = response.data))
        .catch(error => (this.error = error))
    },
    methods:{
        addproduto(evt){
            evt.preventDefault();
            axios.post('https://apist.herokuapp.com/api/produto?', queryString.stringify(this.produto))
            .then(response => (this.info = response.data))
            .catch(error => (this.error = error))
        }
    }

}
</script>

<style>
.addproduto{
    margin-top: 5%;
}
.formaddproduto{
    margin-top: 3%;
    margin-left: 6%;
    margin-right: 2%;
}
</style>