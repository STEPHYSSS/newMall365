import Vue from 'vue'
import App from './App'
import store from './store/store'
import router from './router'
import {
	RouterMount
} from 'uni-simple-router'
import dataConfig from '@/config/index'
import './config/vueFilter'

import './assets/icon/iconfont.css'
import tabBar from "@/components/AutoTabBar.vue"
Vue.component('tabBar',tabBar)
//挂载公用组件
import shopInformation from "@/components/autoComponents/shopInformation/"
import enterShops from "@/components/autoComponents/enterShops/"
import searchBox from "@/components/autoComponents/searchBox/"
import notice from "@/components/autoComponents/notice/"
// import voice from "@/components/autoComponents/voice/"
import guide from "@/components/autoComponents/guide/"
import auxiliaryBlank from "@/components/autoComponents/auxiliaryBlank/"
import pictureAds from "@/components/autoComponents/pictureAds/"
import magicCube from "@/components/autoComponents/magicCube/"
import imgNav from "@/components/autoComponents/imgNav/"
import textBox from "@/components/autoComponents/textBox/"
import switchStores from "@/components/autoComponents/switchStores/"
import richText from "@/components/autoComponents/richText/"
import goods from "@/components/autoComponents/goods/"
import goodsGroup from "@/components/autoComponents/goodsGroup/"
import titleBox from "@/components/autoComponents/titleBox/"
import vconsole from 'vconsole' // 引入vconsole


	// import '@/config/kefu.js'
	// Vue.use(wxKefu)

Vue.component('shopinfoma', shopInformation)
Vue.component('enterShops', enterShops)
Vue.component('searchBox', searchBox)
Vue.component('notice', notice)
// Vue.component('voice', voice)
Vue.component('guide', guide)
Vue.component('auxiliaryBlank', auxiliaryBlank)
Vue.component('pictureAds', pictureAds)
Vue.component('magicCube', magicCube)
Vue.component('imgNav', imgNav)
Vue.component('textBox', textBox)
Vue.component('switchStores', switchStores)
Vue.component('richText', richText)
Vue.component('goods', goods)
Vue.component('goodsGroup', goodsGroup)
Vue.component('titleBox', titleBox)
//挂载公用组件结束

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$store = store
Vue.prototype.$VUE_APP_PREFIX = dataConfig.VUE_APP_PREFIX
Vue.prototype.$VUE_APP_PREFIX2 = dataConfig.BASE_URL_OnLine2 //用于图片路径
Vue.prototype.$vconsole = new vconsole() // 使用vconsole

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
