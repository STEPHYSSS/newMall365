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
				if (locationUrl.indexOf('Flag') > -1) { //秒杀href
					sessionStorage.setItem('searchUrl', locationUrl)
				}
				if (locationUrl.indexOf('FlagIndex') > -1) { //首页href
					sessionStorage.setItem('searchUrl', locationUrl)
				}
				getApp().globalData.mainStyle = 'theme2'
				Cookie.set('mainStyle', 'theme2')
				let Code = GetQueryString("code");
				let newAppNo = GetAppNo();
				let newAppUrl = GetBaseUrl();
				let UserMACPhone = Cookie.get("UserMACPhone")
				// let UserMACPhone = '8247569c1631da6216cd72a2b4a8c33au'
				UserMACPhone = UserMACPhone == 'undefined' ? '' : UserMACPhone
				UserMACPhone = UserMACPhone == 'null' ? '' : UserMACPhone
				let currentUrl = setUrlDelCode();
				let headUrl = (process.env.NODE_ENV === "development" ? 'http://localhost:9000/' : newAppUrl) +
					'#/GrantMiddle?AppNo=' + newAppNo //调回到固定页面
				// 判断加载地址是否为 /Grant开头的
				console.log(to.path, '路径')
				Cookie.set('currentUrl', currentUrl)
				// if(to.path !== '/pages/error/index' && to.path !== '/Grant' && to.path !== '/GrantMiddle' && !UserMACPhone){
				// 	console.log(to.path,'000')

				// 	if(UserMACPhone){
				// 		// next()
				// 		console.log('有token')
				// 	}else {
				// 		console.log('没有token',headUrl)
				// 	}
				// }else {
				// 	console.log(to.path,'000')
				// 	// 不是Grant、GrantMiddle开头的地址 就放行
				// 	// next()
				// }
				/*登录流程
					新用户授权
					1、先判断有没有Mac
					2、如果没有mac 就去调用GetPlatform   获取APPID，拿到APPID之后去请求微信授权
					3、获取微信授权code  再调用登录接口UserSign
					
					老用户登录
					1、先判断有没有Mac
					2、如果Mac过期的话 后端返回“请登录”和 APPID 拿到APPID之后去请求微信授权
					3、获取微信授权code  再调用登录接口UserSign*/
				// -----------------------------
				if (UserMACPhone && UserMACPhone !== null && UserMACPhone !== undefined && UserMACPhone !== '') { // 如果已经登录，那我不干涉你，让你随便访问				    
					next()
				} else { //没有登录
					if (to.path !== '/pages/error/index' && to.path !== '/Grant' && to.path !== '/GrantMiddle' && !UserMACPhone) {
						// 如果没有登录，但你访问其他需要登录的页面，那我就让你跳到登录页面去
						next({
							path: '/Grant',
							query: {
								redirect_uri: headUrl
							}
						})
					} else {
						// 如果没有登录，但你访问的login，那就不干涉你，让你访问
						next()
					}
				}
			}
		}
	})
})
// 全局路由后置守卫
router.afterEach((to, from) => {})

export default router;
