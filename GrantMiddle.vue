<template>
	<div class>
	</div>
</template>

<script>
	// import Cookie from "js-cookie";
	import Cookie from '@/config/cookie-my/index.js'
	import {
		GetQueryString,setUrlDelCode,GetBaseUrl
	} from "@/util/publicFunction";

	export default {
		name: "",
		data() {
			return {
				myCode: "",
				url: "",
				text: '',
				text1: ''
			};
		},
		created() {},
		components: {},
		async mounted() {
			let UserMACPhone = Cookie.get("UserMACPhone");
			let newAppNo = Cookie.get("AppNo");
			let url = window.location.href;
			console.log(url,'原始地址栏链接')
			let code = this.setCode("code");//获取微信回调中返回的code			
			// 首先获取把code截取下来，然后截取要去的页面 并进行跳转
			let baseUrl = GetBaseUrl()//获取域名
			let index = url.indexOf('state');
			let index2 = url.indexOf('appid');
			let a = url.substring(index+6,index2-1);//这个地方是获取要去到的页面路径
			let pathURL = decodeURIComponent(a);
			let windowHref = baseUrl+'#'+ pathURL; 
			console.log(windowHref,'拼接好的地址')
			if(UserMACPhone){
				if(url){
					console.log(url,'原始地址栏链接')
					window.location.href = windowHref;
				}
			}else{
				if(code && code !== "undefined"){
					console.log(code,newAppNo,'进入请求之前')
					Cookie.remove("UserMACPhone");
					console.log(UserMACPhone,'看看有没有token')
					try{
						await this.$store.dispatch("get_user",{
							AppNo:newAppNo,
							Code:code
						})
						console.log(windowHref,'windowHref拼接好的')
						let ShopRadio = sessionStorage.getItem("ShopRadio")
						if(ShopRadio=='1'&&pathURL=='/pages/homePage/homePage'){
							window.location.href = baseUrl+'#/pages/shoppingMall/login'
						}else if(ShopRadio=='2'&& pathURL=='/pages/homePage/homePage'){
							window.location.href = baseUrl+'#/pages/shoppingMall/index'
						}else{
							window.location.href = windowHref;
						}
						// this.$Router.push({
						// 	path: pathUrl
						// });
					}catch(e){
						console.log(windowHref + "?code=" + code,'catch错误中准备重定向地址')
						this.$Router.push({
							path: "/pages/error/index",
							query: {
								redirect_uri: windowHref + "?code=" + code,
								title: "UserMAC获取失败"
							}
						});
					}
				}else{
					this.$Router.push({
						path: "/pages/error/index",
						title: "code获取失败"
					});
				}
			}
			
		},
		methods: {
			setCode(name) {
				let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				let r
				let a = window.location.href
				if (a.indexOf('query') > -1) {
					a = decodeA(a)
					if (JSON.stringify(a) != '{}') return a[name]
				} else {
					let b = a.substr(a.indexOf(name), a.length - 1)
					r = b.match(reg)
					if (r != null) return unescape(r[2]);
				}
				return null;
			}
		}
	};

	function decodeA(a) {
		if (a.indexOf('query') > -1) {
			let queryObj = a.substr(a.indexOf('query') + 6, a.length - 1)
			try {
				let queryObjP = JSON.parse(queryObj)
				if (typeof queryObjP == 'object') {
					return queryObjP
				}
			} catch (e) {
				a = decodeURIComponent(a)
				return decodeA(a)
			}

		} else {
			return a
		}
	}
</script>

<style lang="less" scoped>
</style>