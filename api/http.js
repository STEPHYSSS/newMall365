import Cookies from '@/config/cookie-my/index.js';
import store from '../store/store.js'
import router from '../router/index.js'
import dataConfig from '@/config/index'
import Vue from 'vue' 
import {GetBaseUrl} from '../util/publicFunction'    
export const vipCard = (data, ViewKay, AppNo) => {
	return new Promise((resolve, reject) => {
		uni.getProvider({
			service: 'oauth',
			success: async function(res) {
				let providerNew = res.provider[0]
				if (providerNew) {
					// 小程序
					return reject();
				} else {
					// h5
					// let UserMACPhone = sessionStorage.getItem('UserMACPhone')
					let UserMACPhone = Cookies.get("UserMACPhone")
					// let UserMACPhone = '8247569c1631da6216cd72a2b4a8c33au'
					let AppNo = sessionStorage.getItem('AppNo')
					
					let urlaspx = 'RenderMobile.aspx'
					let url = dataConfig.url + urlaspx + '?AppNo=' + AppNo + '&ViewKay=' + ViewKay + '&UserMAC=' +
						UserMACPhone

					// uni.showLoading({
					// 	title: '加载中'
					// });
					uni.request({
						url: url,
						data: data,
						method: 'POST',
						success: function(response) {
							if (response.data.Message === '请登录') {
								let appid = response.data.Data.AppID;
								// console.log("11111")
								// return
								NOMAC(appid)//这个地方要跳转重新授权
								// response.data.Message
							}
							let success = response.data.Success
							let isTip = response.data.hasOwnProperty('Success')
							if (isTip) {
								if (success) {
									uni.hideLoading();
									return resolve(response.data)
								} else {									
									sessionStorage.setItem("IsCoupon","1")
									uni.hideLoading();
									return reject(response.data.Message || '操作失败')
								}
							} else {
								uni.hideLoading();
								return resolve(response.data)
							}
						},
						fail: function(error) {
							// console.log(error, '-----error-----')
							let errors = ''
							if (error.toString().search('TypeError') || error.toString().search('500')) {
								errors = '获取请求失败'
							} else if (typeof(error) == 'string') {
								errors = error
							} else if (error.toString() === '请登录') {
								errors = ''
							} else {
								errors = '获取请求失败'
							}
							uni.showToast({
								title: errors,
								icon: 'none' 
							});
							uni.hideLoading();
							// console.log(errors,'errors------')
							return reject(errors);
						},
						complete: function() {
							uni.hideLoading();
						}
					})
				}
			}
		})

	})
}

function NOMAC(appId) {	
	uni.clearStorageSync();
	var url = document.location.toString();
	var arrUrl = url.split("?");
	console.log('222222',arrUrl)
	if(arrUrl.length>1){
		var para = arrUrl[1];
		para = para.split("&"); //获取url的参数
		para.forEach((D, index) => { //删除原本url上的code
			if (D.indexOf('code') > -1) {
				para.splice(index, 1)
			}
		})
		
		para = para.join(',')
		let currentUrl = arrUrl[0] + '?' + para
		Cookies.set('currentUrl', currentUrl)
	}
	let newAppUrl = GetBaseUrl();
	console.log(newAppUrl,'-----newAppUrl-----')
	// let headUrl = window.location.protocol + "//" + window.location.host + '/#/GrantMiddle?AppNo=' + Cookies.get('AppNo')
	// let headUrl = (process.env.NODE_ENV === "development" ? 'http://localhost:8080/' : dataConfig.BASE_URL_OnLine) +'#/GrantMiddle?AppNo=' + sessionStorage.getItem('AppNo')
	let headUrl = (process.env.NODE_ENV === "development" ? 'http://localhost:9000/' : newAppUrl) +'#/GrantMiddle?AppNo=' + sessionStorage.getItem('AppNo')
	console.log(appId,'appId')
	if (appId) {
			router.push({
				path: '/Grant',
				query: {
					appId: appId,
					redirect_uri: headUrl
				}
			})
		} else {
			uni.showToast({
				title: '获取appId失败!',
				icon: 'none'
			});
		}
	// store.dispatch('get_user', {
	// 	AppNo: sessionStorage.getItem('AppNo')
	// }).then(appId => {
	// 	// console.log(appId,'---appId---')
	// 	if (appId) {
	// 		router.push({
	// 			path: '/Grant',
	// 			query: {
	// 				appId: appId,
	// 				redirect_uri: headUrl
	// 			}
	// 		})
	// 	} else {
	// 		uni.showToast({
	// 			title: '获取appId失败!',
	// 			icon: 'none'
	// 		});
	// 	}
	// })
}