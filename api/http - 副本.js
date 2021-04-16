import Cookies from '@/config/cookie-my/index.js';
import store from '../store/store.js'
import router from '../router/index.js'
import Router from 'uni-simple-router'
import dataConfig from '@/config/index'
import Vue from 'vue'
import {
	GetBaseUrl
} from '../util/publicFunction'
export const vipCard = (data, ViewKay, AppNo) => {
	// console.log(data, ViewKay, AppNo, 'http.js文件')
	return new Promise((resolve, reject) => {
		uni.getProvider({
			service: 'oauth',
			success: async function(res) {
				let providerNew = res.provider[0]
				if (providerNew) { //小程序
					return reject();
				} else { //h5
					let UserMACPhone = Cookies.get('UserMACPhone'); //先获取后台返回的token
					let AppNo = Cookies.get('AppNo') ? Cookies.get('AppNo') : AppNo;
					let urlaspx = 'RenderMobile.aspx';
					// 请求地址
					let url = dataConfig.url + urlaspx + '?AppNo=' + AppNo + '&ViewKay=' + ViewKay + '&UserMAC=' + UserMACPhone										
					uni.showLoading({
						title: '加载中'
					});
					uni.request({
						url: url,
						data: data,
						method: 'POST',
						success: function(response) {
							if (response.data.Message === '请登录') {
								let AppID = response.data.Data.AppID;
								let ComponentID = response.data.Data.ComponentID;
								NOMAC(AppID,ComponentID)//这个地方要跳转重新授权
							}
							let success = response.data.Success
							let isTip = response.data.hasOwnProperty('Success')							
							if (isTip) {
								if (success) {
									uni.hideLoading();
									return resolve(response.data)
								} else {
									if(response.data.Message!=''){
										uni.showToast({
											title: response.data.Message,
											icon: 'none'
										});
									}									
									sessionStorage.setItem("IsCoupon","1") //是否有进店送券
									uni.hideLoading();
									return reject(response.data.Message || '操作失败')
								}
							} else {								
								let htmlconten = document.createElement('p');
								htmlconten.innerHTML = response.data;
								let text = htmlconten.innerText;
								if(text.length>30){
								  text = text.substring(0,30)
								}
								if(response.statusCode=='500'){
									uni.showToast({
										title: text,
										icon: 'none'
									});
								}
								// console.log(text)
								uni.hideLoading();
								return resolve(response.data)
							}
						},
						fail: function(error) {
							// console.log(error, 'http.js文件中fail--error')
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
							return reject(errors);
						},
						complete: function() {
							// uni.hideLoading();
						}
					})
				}
			}
		})

	})
}


function NOMAC(appId,ComponentID) {//传入AppID ----> 清除所有缓存 ----> 获取url地址 ----> 删除地址上的code
	uni.clearStorageSync();
	var url = document.location.toString();
	// console.log(url,'请登录的时候')
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
		Cookies.set('currentUrl', currentUrl)
	}
	let newAppUrl = GetBaseUrl();
	// let headUrl = (process.env.NODE_ENV === "development" ? 'http://localhost:9000/' : newAppUrl) + '#/GrantMiddle?AppNo=' + sessionStorage.getItem('AppNo')
	// let headUrl = (process.env.NODE_ENV === "development" ? 'http://localhost:9000/' : newAppUrl) +
	// 	'#/GrantMiddle'
	let headUrl = (process.env.NODE_ENV === "development" ? 'http://localhost:9000/' : newAppUrl) +'#/WxGrant' ;//重定向页面
	let redirect_uri = "http://manage.bak365.cn/TokenInter/Notify.ashx?Type=WeixinSignToken&AppNo="+ GetAppNo() + '&redirect_uri=' + encodeURIComponent(headUrl)
	if (appId) {
		// console.log(appId,'appId')
		// console.log(headUrl,'地址')
		// console.log(router,'打印过期之后的路由')
		router.push({
			path: '/WxGrant',
			query: {
				appId: appId,
				redirect_uri: headUrl,
				ComponentID:ComponentID,
				toUrlPage:'/pages/homePage/homePage'
			}
		})
	} else {
		uni.showToast({
			title: '获取appId失败!',
			icon: 'none'
		});
	}
}
