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
		GetQueryString
	} from "@/util/publicFunction";
	export default {
		// mixins: [Mixins],
		data() {
			return {
				ShopRadio:localStorage.getItem("ShopRadio")
			}
		},
		created() {
			if(this.ShopRadio === '1'){
				// this.$router.push('/pages/shoppingMall/login')
				uni.navigateTo({
				   url: '/pages/shoppingMall/login'
				});
			}else{				
				uni.navigateTo({
				   url: '/pages/shoppingMall/index'
				});
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
