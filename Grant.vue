<template>
	<div>
	</div>
</template>

<script>
	import {
		vipCard
	} from '@/api/http.js';
	import dataConfig from '@/config/index'
	import Cookies from '@/config/cookie-my/index.js';
	export default {
		name: "Grant",
		data() {
			return {
				redirect_uri: "",
				appId: '',
				ComponentID:'',
				UserMACPhone:Cookies.get("UserMACPhone"),
				toUrlPage:''
				// UserMACPhone:'8247569c1631da6216cd72a2b4a8c33au'
			};
		},
		onLoad(option) {
			let query = JSON.parse(option.query);
			this.redirect_uri = query.redirect_uri;//重定向地址
			this.toUrlPage = query.toUrlPage;//要去的页面
			this.appId = query.appId;//获得的appid
			this.ComponentID = query.ComponentID;
		},
		created() {
			console.log(new Date().getTime(),'跳转到Grant页面')
			if(window.location.hostname == "localhost"){
				window.location.href =this.redirect_uri + "&code=1"
			}else if(!this.appId){
				this.AppIdoAuth()
			}else{				
				this.redirect_uri = encodeURIComponent(this.redirect_uri);
				if(!this.ComponentID){
					window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appId}&response_type=code&scope=snsapi_userinfo&connect_redirect=1&redirect_uri=${this.redirect_uri}&state=${this.toUrlPage}#wechat_redirect`;
				}else{
					window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appId}&redirect_uri=${this.redirect_uri}&response_type=code&scope=snsapi_userinfo&state=${this.toUrlPage}&component_appid=${this.ComponentID}#wechat_redirect`
				}
				
			}
			// this.AppIdoAuth()
		},
		mounted() {},
		methods: {
			 async AppIdoAuth() {
				try {
					let {
						Data
					} =  await vipCard({
						
					}, "GetPlatform");
				
				// let url = 'http://wx8d4708e1e9895e87.manage.bak365.cn/WebApp/mobile/#/GrantMiddle'
				// this.redirect_uri = encodeURIComponent(url)
				this.redirect_uri = encodeURIComponent(this.redirect_uri)
				if(!Data.ComponentID){
					window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${Data.AppID}&response_type=code&scope=snsapi_userinfo&connect_redirect=1&redirect_uri=${this.redirect_uri}&state=${this.toUrlPage}#wechat_redirect`;
				}else{
					window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${Data.AppID}&redirect_uri=${this.redirect_uri}&response_type=code&scope=snsapi_userinfo&state=${this.toUrlPage}&component_appid=${Data.ComponentID}#wechat_redirect`
				}
				
				// window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${Data.AppID}&response_type=code&scope=snsapi_userinfo&connect_redirect=1&redirect_uri=${this.redirect_uri}&state=1#wechat_redirect`;
				} catch (e) {
					console.log(e);
				}
			}
		}
	};
	
	
</script>

<style scoped>
	.van-loading {
		text-align: center;
		line-height: 100vh;
	}
</style>
