import Vue from 'vue'
import App from './App'
import store from './store/store'
import router from './router'
import { RouterMount } from 'uni-simple-router'
import dataConfig from '@/config/index'
import './config/vueFilter'

import './assets/icon/iconfont.css'
import tabBar from "@/components/AutoTabBar.vue"
Vue.component('tabBar',tabBar)
//挂载公用组件
import vconsole from 'vconsole' // 引入vconsole
//挂载公用组件结束

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$store = store
Vue.prototype.$VUE_APP_PREFIX = dataConfig.VUE_APP_PREFIX
Vue.prototype.$VUE_APP_PREFIX2 = dataConfig.BASE_URL_OnLine2 //用于图片路径
if(window.location.hostname == "wx8d4708e1e9895e87.manage.bak365.cn" ){
	Vue.prototype.$vconsole = new vconsole() // 使用vconsole
}


Vue.prototype.$toast = (val) => {
	uni.showToast({
		title: val,
		duration: 2000,
		icon: 'none'
	});
}
Vue.prototype.$toast.success = (val) => {
	uni.showToast({
		title: val,
		duration: 2000,
		icon: 'none'
	});
}
Vue.prototype.$toast.fail = (val) => {
	uni.showToast({
		title: val,
		duration: 2000,
		icon: 'none'
	});
}

const app = new Vue({
	...App,
	store,
	router
})
// #ifdef H5
RouterMount(app, '#app');
// #endif
// #ifndef H5
app.$mount();
// #endif
// #ifdef H5  
import wechat from '@/pages/myAddress/wechar.js'  
if(wechat.isWechat()){  
    Vue.prototype.$wechat =wechat;  
}  
// #endif
