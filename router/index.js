import modules from './modules'
import Vue from 'vue'
import Router from 'uni-simple-router'

import store from '../store/store.js'
import Cookie from '@/config/cookie-my/index.js'
import {
	GetQueryString,
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
				let locationUrl = window.location.href;
				sessionStorage.setItem('searchUrl',locationUrl)
				getApp().globalData.mainStyle = 'theme2'
				Cookie.set('mainStyle', 'theme2')
                let Code = GetQueryString("code");
				let newAppNo = GetAppNo();
				let newAppUrl = GetBaseUrl();
				let UserMACPhone = Cookie.get("UserMACPhone")
				// let UserMACPhone = '8247569c1631da6216cd72a2b4a8c33au'
				UserMACPhone = UserMACPhone == 'undefined' ? '' : UserMACPhone
				UserMACPhone = UserMACPhone == 'null' ? '' : UserMACPhone
				
				let currentUrl = setUrlDelCode()
				if (newAppNo) {
					if (to.path !== '/pages/error/index' && to.path !== '/Grant' && to.path !== '/GrantMiddle' && !UserMACPhone) {
						currentUrl = setUrlDelCode()
						Cookie.set('currentUrl', currentUrl)

						let headUrl = (process.env.NODE_ENV === "development" ? 'http://localhost:9000/' : newAppUrl) +
							'#/GrantMiddle?AppNo=' + newAppNo //调回到固定页面
						if (UserMACPhone && UserMACPhone !== null && UserMACPhone !== undefined && UserMACPhone !== '') {
							next()
						}else if( Code && Code !== null && Code !== undefined && Code !== '' ){
							// uni.clearStorageSync();
							//重新登录清除缓存
							store.commit("SET_HISTORY_URL", {})
							try {
								let appId = await store.dispatch('get_user', {
									AppNo: newAppNo,
									Code:Code
								})
								
								if (appId) {
									next()
								} else {
									uni.showToast({
										title: '获取appId失败',
										icon: 'none'
									});
								}
							} catch (e) {
								// 		//获取 获取appId 失败，加一个按钮，让用户手动重新获取这个接口
								if (to.path === '/pages/error/index') {
									next()
								} else {
									next({
										path: '/pages/error/index',
										query: {
											redirect_uri: currentUrl,
											title: '获取appId 失败'
										}
									})
								}
							}
						}else{
							next({
							 	path: '/Grant',
							 	query: {
							 		redirect_uri: headUrl
							 	}
							 })
					    }
					} else {
						next()
					}
					
				} else if (to.path === '/pages/error/index') {
					next()
				} else {
					// 没有商户编号
					next({
						path: '/pages/error/index',
						query: {
							redirect_uri: currentUrl,
							title: '商户编号为空'
						}
					})
				}
			}
		}
	})
})
// 全局路由后置守卫
router.afterEach((to, from) => {})
export default router;
