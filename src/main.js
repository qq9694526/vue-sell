import Vue from 'vue'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'
import App from './App'

import goods from './components/goods/goods'
import ratings from './components/ratings/ratings'
import seller from './components/seller/seller'

import './common/css/index.less'
import './common/fonts/iconfont.css'

//开启debug模式
Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(vueResource);

var router = new VueRouter({
//	mode: 'history',
	linkActiveClass:'active',
	routes: [{
		path: '/goods',
		component: goods
	}, {
		path: '/ratings',
		component: ratings
	}, {
		path: '/seller',
		component: seller
	}]
})
var app=new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
//router.push('/goods')

//new Vue({
//el: '#app',
//template: '<App/>',
//components: { App }
//})