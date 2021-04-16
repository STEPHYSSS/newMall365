import modules from './modules'
import Vue from 'vue'
import Router from 'uni-simple-router'

import store from '../store/store.js'
import Cookie from '@/config/cookie-my/index.js'
import {
	GetQueryString,
	getQueryString2,
	setUrlDelCode,
	GetAppNo,
	GetBaseUrl
} from '../util/publicFunction'
import dataConfig from '@/config/index'

Vue.use(Router)
//初始化
// encodeURI: false,
const router = new Router({
	routes: [...modules] //路由表
});

//全局路由前置守卫
router.beforeEach((to, from, next) => {
	uni.getProvider({
		service: 'oauth',
		success: async function(res) {
			let providerNew = res.provider[0]
			if (Cookie.get('mainColor')) {
				// 保存主题色
				getApp().globalData.mainColor = Cookie.get('mainColor')
			}
			if (providerNew) {
				// 小程序
				getApp().globalData.mainStyle = 'theme2'
				Cookie.set('mainStyle', 'theme2')
				next()
			} else {
				// h5
				if (Cookie.get('mainStyle')) {
					getApp().globalData.mainStyle = Cookie.get('mainStyle')
				}
				getApp().globalData.mainStyle = 'theme2'//主题
				Cookie.set('mainStyle', 'theme2')
				let locationUrl = window.location.href;	
				Cookie.set('GroupUrl', window.location.href)
				let newAppNo = GetAppNo();//获取AppNo
				Cookie.set('AppNo', newAppNo)//把AppNo存起来
				let newAppUrl = GetBaseUrl();//获取域名
				if (locationUrl.indexOf('Flag') > -1 || locationUrl.indexOf('FlagIndex') > -1 || locationUrl.indexOf('Group') > -1 || locationUrl.indexOf('LeaderSID') > -1) { //秒杀href 首页href 拼团href
					sessionStorage.setItem('searchUrl', locationUrl)
					Cookie.set('searchUrl', locationUrl)
				}									
				let headUrl = (process.env.NODE_ENV === "development" ? 'http://localhost:9000/' : newAppUrl) +'#/WxGrant' ;//重定向页面
				let getCookie = Cookie.get('GroupUrl')
				let redirect_uri = "http://manage.bak365.cn/TokenInter/Notify.ashx?Type=WeixinSignToken&AppNo="+ GetAppNo() +'&Extra='+encodeURIComponent(getCookie)+ '&redirect_uri=' + encodeURIComponent(headUrl)										
				let UserMACPhone = (process.env.NODE_ENV === "development" ? '1' : Cookie.get("UserMACPhone"));
				
				let Token = GetQueryString("Token");//获取token
				if(Token){
					Cookie.set('UserMACPhone',Token)
					var url = document.location.toString();
					console.log(url,'2222222222')
					var arrUrl = url.split("?");
					if (arrUrl.length > 1) {
						var para = arrUrl[1];
						para = para.split("&"); //获取url的参数
						para.forEach((D, index) => { //删除原本url上的code
							if (D.indexOf('code') > -1) {
								para.splice(index, 1)
							}
						})
						para = para.join(',')
						let currentUrl = arrUrl[0] + '?' + para
						Cookie.set('currentUrl', currentUrl)
					}
				}
				// 判断有没有Mac ------> 没有的话就跳转链接 ------> 获取到 token 之后存起来并且删掉地址栏的token ------> 调用登录接口				
				if(newAppNo){
					// 本地开发模式
					// if(window.location.href.indexOf('WxGrant')==-1){
					// 	Cookie.set('intoUrl', window.location.href)
					// }
					if(process.env.NODE_ENV === "development"){		
						if(to.path == '/WxGrant'){	//如果进入的页面不是WxGrant 就判断是否有token
							if(!UserMACPhone && locationUrl.indexOf('Token') == -1 ){
								window.location.href = redirect_uri;							
							}else{	
								next();
							}
						}else{
							next()
						}
					}else{
						if(to.path != '/WxGrant'){	//如果进入的页面不是WxGrant 就判断是否有token
							if(!UserMACPhone && locationUrl.indexOf('Token') == -1 ){
								window.location.href = redirect_uri;							
							}else{	
								next();
							}
						}else{
							next()
						}
					}
				}else{
					// 没有商户编号
					next({
						path: '/pages/error/index',
						query: {						
							title: '商户编号为空'
						}
					})
				}
				
				// if (newAppNo) {
				// 	if (to.path !== '/Grant' && to.path !== '/GrantMiddle' && to.path !== '/pages/error/index' && !UserMACPhone) {
				// 		currentUrl = GetBaseUrl() + '#' + to.path
				// 		Cookie.set('currentUrl', currentUrl)
				// 		let headUrl = (process.env.NODE_ENV === "development" ? 'http://localhost:9000/' : newAppUrl) +
				// 			'#/GrantMiddle' //调回到固定页面
				// 		if (UserMACPhone && UserMACPhone !== null && UserMACPhone !== undefined && UserMACPhone !== '') {							
				// 			next()
				// 		} else if (Code && Code !== null && Code !== undefined && Code !== '') {
				// 			// uni.clearStorageSync();
				// 			//重新登录清除缓存
				// 			store.commit("SET_HISTORY_URL", {})
				// 			try {
				// 				let appId = await store.dispatch('get_user', {
				// 					AppNo: newAppNo,
				// 					Code: Code
				// 				})

				// 				if (appId) {
				// 					next()
				// 				} else {
				// 					uni.showToast({
				// 						title: '获取appId失败',
				// 						icon: 'none'
				// 					});
				// 				}
				// 			} catch (e) {
				// 				// 		//获取 获取appId 失败，加一个按钮，让用户手动重新获取这个接口
				// 				if (to.path === '/pages/error/index') {
				// 					next()
				// 				} else {
				// 					next({
				// 						path: '/pages/error/index',
				// 						query: {
				// 							redirect_uri: currentUrl,
				// 							title: '获取appId 失败'
				// 						}
				// 					})
				// 				}
				// 			}
				// 		} else {
				// 			next({
				// 				path: '/Grant',
				// 				query: {
				// 					redirect_uri: headUrl,
				// 					toUrlPage:to.path
				// 				}
				// 			})
				// 		}
				// 	} else {			
				// 		console.log('444')
				// 		next() 
				// 	}
				// } 
				// else if (to.path === '/pages/error/index') {
				// 	next()
				// } else {
				// 	// 没有商户编号
				// 	next({
				// 		path: '/pages/error/index',
				// 		query: {
				// 			redirect_uri: currentUrl,
				// 			title: '商户编号为空'
				// 		}
				// 	})
				// }
				
			}
		}
	})
})
// 全局路由后置守卫
router.afterEach((to, from) => {})
export default router;
