<template>
  <div class="produto">
    <div class="submain">
        <h2 class="produtotitulo">Produtos</h2>
        <router-link to="/addproduto">
            <div class="btnaddproduto">
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
     <div class="relbtn">
        <a v-if="produto != null" class="btn btn-outline-secondary linkpdf" v-on:click="relatoriocategoria()" >Relatório por Quantidade <i  class="large material-icons">picture_as_pdf</i></a> 
        <a v-if="produto != null" class="btn btn-outline-secondary linkpdf" v-on:click="relatoriodata()" >Relatório por data <i  class="large material-icons">picture_as_pdf</i></a>
     </div>
    <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">Nome</th>
                <th scope="col">Preço Custo</th>
                <th scope="col">Lucro</th>
                <th scope="col">Preço Venda</th>
                <th scope="col">Unidade</th>
                <th scope="col">Origem</th>
                <th scope="col">Seção</th>
                <th scope="col">Editar</th>
                <th scope="col">Deletar</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(prod, id) in this.produto" v-bind:key="id">
                <td>{{prod.nome}}</td>
                <td>{{prod.preco_custo}}</td>
                <td>{{prod.lucro}}</td>
                <td>{{prod.preco_venda}}</td>
                <td>{{prod.unidade_medida}}</td>
                <td>{{prod.origem}}</td>
                <td>{{getsecao(prod.secao_id)}}</td>
                <td> <router-link :to="'/editproduto/' + prod.id"  ><i class="large material-icons">create</i> </router-link></td>
                <td><i v-on:click="delete_produto(prod.id, id)" class="large material-icons">delete_forever</i></td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import moment from 'moment';
//const fs = require('fs');
export default {
    name: 'Produto',
    data(){
        return{
            produto: null,
            error: null,
            length: null,
            secao: null,
            delete: null,
            reldata: null,
            relcategoria: null
        }
    },
    mounted(){
        axios.get('https://apist.herokuapp.com/api/produto')
        .then(response => (this.produto = response.data))
        .catch(error => (this.error = error.data))

        axios.get('https://apist.herokuapp.com/api/secaoestoque')
        .then(response => (this.secao = response.data))
        .catch(error => (this.error = error.data))


        axios.get('https://apist.herokuapp.com/api/relatoriodata')
        .then(response => (this.reldata = response.data))
        .catch(error => (this.error = error.data))

        axios.get('https://apist.herokuapp.com/api/relatoriocategoria')
        .then(response => (this.relcategoria = response.data))
        .catch(error => (this.error = error.data))
    },
    methods:{
        getsecao(id){
            this.length = this.secao.length
            for(let i =0; i < this.length; i++){
                if(this.secao[i].id == id){
                    return this.secao[i].descricao
                }
            }
        },
        delete_produto(id, deleteid){
             axios
            .delete('https://apist.herokuapp.com/api/produto/'+ id)
            .then(response => (this.delete = response.data))
            .catch(error =>(this.error = error))

            this.produto.splice(deleteid, 1)
        },
        relatoriodata(){
            pdfMake.vfs = pdfFonts.pdfMake.vfs;
            moment.locale('pt-BR')
            
            /*        
            let fonts = {
                Roboto: {
                    normal: 'fonts/Roboto-Regular.ttf',
                    bold: 'fonts/Roboto-Medium.ttf',
                    italics: 'fonts/Roboto-Italic.ttf',
                    bolditalics: 'fonts/Roboto-MediumItalic.ttf'
                }
            };
            let printer = new PdfMake(fonts);
            */
           let corpotable = [
               ['Nome','Preço Custo', 'Lucro', 'Preço Venda' ,'Unidade', 'Origem', 'Seção', 'Data de Validade']
           ]
           //this.reldata.forEach(element => corpotable.push([element.nome, element.preco_custo, element.lucro, element.preco_venda, element.unidade, element.secao, element.data_validade ]));
            for(let i =0; i < this.reldata.length; i++ ){
                corpotable.push([ this.reldata[i].nome,
                 this.reldata[i].preco_custo,
                  this.reldata[i].lucro, 
                  this.reldata[i].preco_venda,
                  this.reldata[i].unidade_medida, 
                  this.reldata[i].origem, 
                  this.getsecao(this.reldata[i].secao_id),
                   moment(this.reldata[i].data_validade).format('DD/MM/YYYY') 
                   ])
            }
            var docDefinition = {
                content: [
                    { text: 'Relatório', style: 'header' },
                    { text: 'Relatório de produtos por data de vencimento.', style: 'subheader' },
                    {
                        style: 'tableExample',
                        table: {
                            body: corpotable
                        }
                    }
                ]
            };

            /*
            let pdfDoc = printer.createPdfKitDocument(docDefinition);
            pdfDoc.pipe(fs.createWriteStream('pdfs/basics.pdf'));
            pdfDoc.end();
            */ 
           pdfMake.createPdf(docDefinition).open();
        
        },
        relatoriocategoria(){
            pdfMake.vfs = pdfFonts.pdfMake.vfs;
            moment.locale('pt-BR')
            
           let corpo = [
               ['Nº','Categoria', 'Quantidade']
           ]
            for(let i =0; i < this.relcategoria.length; i++ ){
                corpo.push([ 
                 i,
                 this.relcategoria[i].descricao,
                 this.relcategoria[i].quantidade
                ])
            }
            
            var docDefinition = {
                content: [
                    { text: 'Relatório', style: 'header' },
                    { text: 'Relatório quantitativo de produtos por categoria.', style: 'subheader' },
                    {
                        style: 'tableExample',
                        table: {
                            body: corpo
                        }
                    }
                ]
            };

            pdfMake.createPdf(docDefinition).open();
        }

    }
}
</script>

<style>
.produto{
    margin-top: 5%;
}
.produtotitulo{
    display: inline-block;
    color: black;
    margin-left: 2%;
}
.btnaddproduto{
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
.relbtn{
    display: inline;
    margin-top: 1%;
    margin-left: 55%;
    margin-right: 2%;
}
.linkpdf{
    display: inline-block;
    margin-top: 1%;
    margin-left: 2%;
}
</style>