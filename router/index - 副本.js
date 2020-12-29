import modules from './modules'
import Vue from 'vue'
import Router from 'uni-simple-router'

import store from '../store/store.js'
import Cookie from '@/config/cookie-my/index.js'
import {
	GetQueryString,
	setUrlDelCode
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
	console.log("全局路由前置守卫")
	next()
	// uni.getProvider({
	// 	service: 'oauth',
	// 	success: async function(res) {
	// 		let providerNew = res.provider[0]
	// 		if (Cookie.get('mainColor')) {
	// 			// 保存主题色
	// 			getApp().globalData.mainColor = Cookie.get('mainColor')
	// 		}
	// 		if (providerNew) {
	// 			// 小程序
	// 			getApp().globalData.mainStyle = 'theme2'
	// 			Cookie.set('mainStyle', 'theme2')
	// 			next()
	// 		} else {
				
	// 			// h5
	// 			if (Cookie.get('mainStyle')) {
	// 				getApp().globalData.mainStyle = Cookie.get('mainStyle')
	// 			}
	// 			getApp().globalData.mainStyle = 'theme2'
	// 			Cookie.set('mainStyle', 'theme2')

	// 			let GetQuery = GetQueryString('AppNo')
	// 			// let newAppNo = GetQuery ? GetQuery : Cookie.get('AppNo')
	// 			let newAppNo = ''
	// 			if(dataConfig.Bak365_Dev===0)
	// 			{
	// 				newAppNo='001';
	// 			}
	// 			else
	// 			{
	// 				let domain = window.location.host;
	// 				newAppNo=domain.split('.')[0];
	// 			}
	// 			let UserMACPhone = Cookie.get('UserMACPhone')//暂时注释
	// 			// let UserMACPhone = '926fb63385232ec49043749cdb3145d0u';
	// 			UserMACPhone = UserMACPhone == 'undefined' ? '' : UserMACPhone
	// 			UserMACPhone = UserMACPhone == 'null' ? '' : UserMACPhone
	// 			console.log(to.query,'to.query')
	// 			if (!to.query.hasOwnProperty('AppNo') && newAppNo && to.path !== '/GrantMiddle' && to.path !== '/Grant') {
	// 				// 给每个页面加?BusinNo
	// 				let obj = {}
	// 				Object.assign(obj, to.query)
	// 				Object.assign(obj, {
	// 					AppNo: newAppNo
	// 				})
	// 				next({
	// 					path: to.path,
	// 					query: obj
	// 				})
	// 			}
	// 			// if (!to.query.hasOwnProperty('AppNo') && newAppNo && to.path !== '/GrantMiddle' && to.path !== '/Grant') {
	// 			// 	// 给每个页面加?AppNo
	// 			// 	let obj = {}
	// 			// 	Object.assign(obj, to.query)
	// 			// 	Object.assign(obj, {
	// 			// 		AppNo: '001'					
	// 			// 	})
	// 			// 	next({
	// 			// 		path: to.path,
	// 			// 		query: obj
	// 			// 	})
	// 			// }

	// 			let currentUrl = setUrlDelCode()
	// 			 // let domain = window.location.host;
	// 			 // console.log(domain,'-----domain-----')
	// 			 // newAppNo = domain;//获取域名存放给AppNo,暂时注释
	// 			if (newAppNo) {
	// 				Cookie.set('AppNo', newAppNo)
	// 				if (to.path !== '/pages/error/index' && to.path !== '/Grant' && to.path !== '/GrantMiddle' && !UserMACPhone) {
	// 					currentUrl = setUrlDelCode()
	// 					Cookie.set('currentUrl', currentUrl)
	// 					let headUrl = (process.env.NODE_ENV === "development" ? 'http://localhost:9000/' : dataConfig.BASE_URL_OnLine) +
	// 						'#/GrantMiddle?AppNo=' + newAppNo //调回到固定页面
	// 					if (UserMACPhone && UserMACPhone !== null && UserMACPhone !== undefined && UserMACPhone !== '') {
	// 						next()
	// 					} else {
	// 						// uni.clearStorageSync();
	// 						//重新登录清除缓存
	// 						store.commit("SET_HISTORY_URL", {})
	// 						try {
	// 							let appId = await store.dispatch('get_user', {
	// 								AppNo: newAppNo,
	// 								Code:''
	// 							})
	// 							if (appId) {
	// 								next({
	// 									path: '/Grant',
	// 									query: {
	// 										appId: appId,
	// 										redirect_uri: headUrl
	// 									}
	// 								})
	// 							} else {
	// 								uni.showToast({
	// 									title: '获取appId失败',
	// 									icon: 'none'
	// 								});
	// 							}
	// 						} catch (e) {
	// 							// 		//获取 获取appId 失败，加一个按钮，让用户手动重新获取这个接口
	// 							if (to.path === '/pages/error/index') {
	// 								next()
	// 							} else {
	// 								next({
	// 									path: '/pages/error/index',
	// 									query: {
	// 										redirect_uri: currentUrl,
	// 										title: '获取appId 失败'
	// 									}
	// 								})
	// 							}
	// 						}
	// 					}
	// 				} else {
	// 					next()
	// 				}
	// 			} else if (to.path === '/pages/error/index') {
	// 				next()
	// 			} else {
	// 				// 没有商户编号
	// 				next({
	// 					path: '/pages/error/index',
	// 					query: {
	// 						redirect_uri: currentUrl,
	// 						title: '商户编号有误'
	// 					}
	// 				})
	// 			}
	// 		}
	// 	}
	// })
})
// 全局路由后置守卫
router.afterEach((to, from) => {})
export default router;
