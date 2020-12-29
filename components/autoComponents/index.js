// import titleBox from "./titleBox/"
import Vue from 'vue'
import shopInformation from "@/components/autoComponents/shopInformation/"
import enterShops from "@/components/autoComponents/enterShops/"
import searchBox from "@/components/autoComponents/searchBox/"
import notice from "@/components/autoComponents/notice/"
import voice from "@/components/autoComponents/voice/"
import guide from "@/components/autoComponents/guide/"
import auxiliaryBlank from "@/components/autoComponents/auxiliaryBlank/"
import pictureAds from "@/components/autoComponents/pictureAds/"
import magicCube from "@/components/autoComponents/magicCube/"
import imgNav from "@/components/autoComponents/imgNav/"
import textBox from "@/components/autoComponents/textBox/"
// import linkedLinks from "./linkedLinks/"
// import integralMall from "./integralMall/"
// const ComponentsAuto = {
// 	install: function(Vue) {
// 		Vue.component('titleBox', titleBox)
// 		Vue.component('shopinfoma', shopInformation)
// 		Vue.component('enterShops', enterShops)
// 		Vue.component('searchBox', searchBox)
// 		Vue.component('notice', notice)
// 		Vue.component('voice', voice)
// 		Vue.component('guide', guide)
// 		Vue.component('auxiliaryBlank', auxiliaryBlank)
// 		Vue.component('pictureAds', pictureAds)
// 		Vue.component('magicCube', magicCube)
// 		Vue.component('imgNav', imgNav)
// 		Vue.component('textBox', textBox)
// 		Vue.component('linkedLinks', linkedLinks)
// 		Vue.component('integralMall', integralMall)
// 	}
// }
// const ComponentsAuto = () => {
// 	Vue.component('shopinfoma', shopInformation)
// 	Vue.component('enterShops', enterShops)
// 	Vue.component('searchBox', searchBox)
// 	Vue.component('notice', notice)
// 	Vue.component('voice', voice)
// 	Vue.component('guide', guide)
// 	Vue.component('auxiliaryBlank', auxiliaryBlank)
// 	Vue.component('pictureAds', pictureAds)
// 	Vue.component('magicCube', magicCube)
// 	Vue.component('imgNav', imgNav)
// 	Vue.component('textBox', textBox)
// }


export default ComponentsAuto

// import Vue from 'vue'
// const files = require.context('.', true, /\.vue$/)
// let ComponentsAuto = {}

// files.keys().forEach(key => {
// 	if (key === './public.vue') return
// 	let val = key.split('/')[1]
// 	const SeckillList = require('./shopInformation/index.vue')
// 	Object.assign(ComponentsAuto, {
// 		[val]: SeckillList
// 	})
// })
// console.log(ComponentsAuto, 'modules')
// Object.keys(ComponentsAuto).forEach(key => {
// 	console.log(key, 'key')
// 	Vue.component(key, ComponentsAuto[key]);
// });

// export default ComponentsAuto
