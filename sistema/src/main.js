import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Main from  './components/Main';
import AddEmp from './components/AddEmp';
import Esto from './components/Esto';
import Emp from './components/empresa/Emp.vue';


Vue.config.productionTip = false
Vue.use(VueRouter)

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