<template>
	<view>
		
	</view>
</template>

<script>
	import Cookie from '@/config/cookie-my/index.js'
	import { GetQueryString,setUrlDelCode,GetBaseUrl } from "@/util/publicFunction";
	export default {
		data() {
			return {
				url: "",
			}
		},
		created() {
		},
		async mounted(){
			let url = Cookie.get("currentUrl");
			// let intoUrl = Cookie.get('intoUrl')
			console.log(url,'urlurlurlurlurl')
			let newAppNo = Cookie.get("AppNo");
			let baseUrl = GetBaseUrl()//获取域名
			let UserMACPhone = Cookie.get("UserMACPhone")//先查看有没有Mac
			let getPath = url.split('#')
			console.log(getPath,'getPath')
			try{
				await this.$store.dispatch("get_user",{
					AppNo:newAppNo,
					UserMAC:UserMACPhone
				})
				let ShopRadio = sessionStorage.getItem("ShopRadio")
				
				// if(ShopRadio=='1'){
				
				// 	window.location.href = baseUrl+'#/pages/shoppingMall/login'
					
					
				// }else if(ShopRadio=='2'){
				// 	window.location.href = baseUrl+'#/pages/shoppingMall/index'
				// }else{
				// 	this.url = url;
				// 	this.$Router.push({
				// 		path: getPath[1],
				// 	});
				// }
				if(url.indexOf('pages/shoppingMall/login') > -1&&ShopRadio == '1'){
					window.location.href = baseUrl+'#/pages/shoppingMall/login'
				}else if(url.indexOf('pages/shoppingMall/index') > -1&&ShopRadio == '2'){
					window.location.href = baseUrl+'#/pages/shoppingMall/index'
				}else if(getPath.length>2){
					this.$Router.push({
						path: getPath[2]
					});
				}else{
					this.$Router.push({
						path: '/pages/home'
					});
				}
				
			}catch(e){
			}
			
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
