<template>
	<view>		
		<!-- 此页面用来判断商城模式 1:商城模式， 2：自定义模式 -->
	</view>
</template>

<script>
	import {
		vipCard
	} from '@/api/http.js';
	// import Mixins from "./mixins.js";
	import Cookie from '@/config/cookie-my/index.js';
	import {
		GetQueryString,GetBaseUrl,GetAppNo
	} from "@/util/publicFunction";
	export default {
		// mixins: [Mixins],
		data() {
			return {
				ShopRadio:sessionStorage.getItem("ShopRadio")
			}
		},
		created() {
			console.log('第一次加载homepage')
			if(this.ShopRadio == "1"){
				console.log(this.ShopRadio)
				this.$Router.push({path:'/pages/shoppingMall/login'})
				// uni.navigateTo({
				//    url: '/pages/shoppingMall/login'
				// });
			}else{	
				console.log(this.ShopRadio,'**************************')
				this.$Router.push({path:'/pages/shoppingMall/index'})
				// this.$router.push('/pages/shoppingMall/login')
				// uni.navigateTo({
				//    url: '/pages/shoppingMall/index'
				// });
			}
			
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
