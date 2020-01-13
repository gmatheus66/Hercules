import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Main from  './components/Main';
import AddEmp from './components/empresa/AddEmp';
import Esto from './components/estoque/Esto';
import Emp from './components/empresa/Emp.vue';
import EditEmp from './components/empresa/EditEmp';
import AddEsto from './components/estoque/AddEsto';
import EditEsto from './components/estoque/EditEsto';
import Marca from './components/marca/Marca';
import AddMarca from './components/marca/AddMarca';
import EditMarca from './components/marca/EditMarca';
import Categoria from './components/categoria/Categoria';
import AddCategoria from './components/categoria/AddCategoria';
import EditCategoria from './components/categoria/EditCategoria';
import Secao from './components/secoesestoque/SecaoEstoque';
import AddSecao from './components/secoesestoque/AddSecao';
import EditSecao from './components/secoesestoque/EditSecao';
import Funcionario from './components/funcionario/Funcionario';
import AddFuncionario from './components/funcionario/AddFuncionario';
import EditFuncionario from './components/funcionario/EditFuncionario';
import Fonecedor from './components/fornecedores/Fornecedor';
import AddFornecedor from './components/fornecedores/AddFornecedor';
import EditFornecedor from './components/fornecedores/EditFornecedor';
import Produto from './components/produto/Produto';
import AddProduto from './components/produto/AddProduto';
import EditProduto from './components/produto/EditProduto';


Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.prototype.$display_home = {value: 'block'}
//const Bar = { template: '<div>bar</div>' }
const Login = {
  template: '<div>Login</div>'
}

const Bar = {
  template: '<div>About</div>'
}


const router = new VueRouter({
  routes: [
    { path: '/bar', component: Bar },
    { path: '/login' , component: Login},
    {path: '/abt' , component:Main},
    {path: '/addempresas' , component: AddEmp},
    {path: '/empresas' , component:Emp},
    {path: '/estoque', component: Esto},
    {path: '/editemp/:id', name: 'edit', component: EditEmp, props:true },
    {path: '/editesto/:id', name: 'editesto', component: EditEsto, props:true },
    {path: '/addestoque', component: AddEsto},
    {path: '/marca', name: 'marca',component: Marca},
    {path: '/addmarca', component: AddMarca},
    {path: '/editmarca/:id', name: 'editmarca', component: EditMarca, props: true},
    {path: '/categoria', component: Categoria},
    {path: '/addcategoria', component: AddCategoria},
    {path: '/editcategoria/:id', name: 'editcategoria', component: EditCategoria, props: true},
    {path: '/secao', component: Secao},
    {path: '/addsecao', component: AddSecao},
    {path: '/editsecao/:id', name: 'editsecao', component: EditSecao, props: true },
    {path: '/funcionario', component: Funcionario},
    {path: '/addfuncionario', component: AddFuncionario},
    {path: '/editfuncionario/:id', name: 'editfunc', component: EditFuncionario, props: true},
    {path: '/fornecedor', component: Fonecedor},
    {path: '/addfornecedor', component: AddFornecedor},
    {path: '/editfornecedor/:id', name: 'editfornecedor', component: EditFornecedor, props: true},
    {path: '/produto', component: Produto},
    {path: '/addproduto', component: AddProduto},
    {path: '/editproduto/:id', name: 'editproduto', component: EditProduto, props: true}

    
  ]
  
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

/*
new Vue({
  router
}).$mount('#app')
*/