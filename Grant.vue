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
				UserMACPhone:Cookies.get("UserMACPhone")	
				// UserMACPhone:'db333836b94e470079cc5f5623400931u'
			};
		},
		onLoad(option) {
			let query = JSON.parse(option.query);
			this.redirect_uri = query.redirect_uri;
			this.appId = query.appId;
		},
		created() {
			if( window.location.hostname == "localhost" ) 	{
				window.location.href =this.redirect_uri + "&code=11111"
			}else if(this.UserMACPhone){
				uni.navigateTo({
				   url: '/pages/home'
				});
			}else if( !this.appId ){
			   this.AppIdoAuth()
			}
			else{
			   this.redirect_uri = encodeURIComponent(this.redirect_uri);
			   window.location.href =
			   		`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appId}&response_type=code&scope=snsapi_userinfo&connect_redirect=1&redirect_uri=${this.redirect_uri}&state=1#wechat_redirect`;
			}
		},
		mounted() {},
		methods: {
			 async AppIdoAuth() {
				try {
					let {
						Data
					} =  await vipCard({
						
					}, "GetPlatform");
				
				this.redirect_uri = encodeURIComponent(this.redirect_uri);
				window.location.href =
							`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${Data.AppID}&response_type=code&scope=snsapi_userinfo&connect_redirect=1&redirect_uri=${this.redirect_uri}&state=1#wechat_redirect`;
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
