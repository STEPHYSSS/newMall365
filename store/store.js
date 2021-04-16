import Vue from 'vue'
import Vuex from 'vuex'
import { vipCard } from '@/api/http.js';
import Cookies from '@/config/cookie-my/index.js';
import { GetQueryString, setUrlDelCode } from '@/util/publicFunction'
import dataConfig from '@/config/index'

Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		// orderType: 'takein', // 0外卖  1自取
		orderType:Cookies.get('orderType') || 'takein',
		// 加入购物车商品信息
		currentCard: Cookies.get('currentCard') || [],
		// 当前定位的位置
		currentLocation: Cookies.get('currentLocation') || {},
		currentStoreInfo: Cookies.get('currentStoreInfo') || {},//门店地址
		addressInfo: Cookies.get('addressInfo') || {},//外卖地址
		historyUrl: Cookies.get('historyUrl') || {}
	},
	mutations: {
		['SET_ORDER_TYPE'](state, type) {
			state.orderType = type
			Cookies.set('orderType', type)
			sessionStorage.setItem('mealMode',type)////存外卖状态
		},
		['SET_CURRENT_LOCATION'](state, data) {
			state.currentLocation = data
			Cookies.set('currentLocation', data)
		},
		['SET_CURRENT_STORE'](state, data) {
			state.currentStoreInfo = data
			Cookies.set('currentStoreInfo', data)
		},
		['SET_CURRENT_ADDRESS'](state, data) {
			state.addressInfo = data
			Cookies.set('addressInfo', data)
		},
		['SET_CURRENT_CARD'](state, data) {
			state.currentCard = data
			Cookies.set('currentCard', data)
		},
		['SET_HISTORY_URL'](state, data) {
			state.historyUrl = data
			Cookies.set('historyUrl', data)
		}
	},
	getters:{
		
	},
	actions: {		
		// 获取appId 和 保存UserMAC     obj={AppNo:newAppNo,code:code} 登录的时候获取
		get_user({
			commit
		}, obj) {
			return new Promise(async (resolve, reject) => {
				try {
					let response = await vipCard(obj, 'UserSign')
					if(response.Data.hasOwnProperty('ShopRadio')){
						// 1代表商城模式,2代表自定义模式
						Cookies.set('ShopRadio', response.Data.ShopRadio)
						sessionStorage.setItem('ShopRadio', response.Data.ShopRadio)
					}
					sessionStorage.setItem('mealMode','takein')////存外卖状态
					if(response.Message == '未授权'){
						this.$Router.push({
							path: "/pages/error/index",
							query: {
								redirect_uri: url + "&code=" + code,
								title: "UserMAC获取失败"
							}
						});
					}
					if(response.Data.hasOwnProperty('CrsInfo')){
						Cookies.set('CrsInfo',response.Data.CrsInfo)//客服
					}
					if (response.Data.hasOwnProperty('UserBind')) {
						// ismenber:0 未绑定会员卡，1 绑定了会员卡  CardType :0 未绑定会员卡,net:微卡 ，mang||shop 实体卡
						Cookies.set('isMember', response.Data.UserBind)
					}
					if (response.Data.hasOwnProperty('IssueType')) {
						Cookies.set('CardType', response.Data.IssueType)
					}
					//主题模板
					if(response.Data.hasOwnProperty('ShopStyle')){
						Cookies.set('mallColor',response.Data.ShopStyle)//后台传过来的颜色 例：#cccccc
					}
					getApp().globalData.mainStyle = 'theme2'//自己定义的主题名称
					Cookies.set('mainStyle', 'theme2')

					resolve(response)
				} catch (e) {
					reject(e)
				}
			})
		}
	},
})

export default store
