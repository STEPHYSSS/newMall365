import { vipCard } from '@/api/http.js';
import wx from 'weixin-js-sdk'
import Cookie from '@/config/cookie-my/index.js';
import {GetAppNo,GetBaseImgUrl} from '../util/publicFunction'
export default {
	data() {
		return {
			location: {}
		}
	},
	methods:{
		// 进入首页就获取微信地址
		async getWxConfig(){
			try {
				let {
					Data
				} = await vipCard({
					Action: "GetJSSDK",
					Url: window.location.href
				}, "UProdOpera");
				
				wx.config({
					debug: false,
					appId: Data.SDK.appId,
					timestamp: Data.SDK.timestamp,
					nonceStr: Data.SDK.noncestr,
					signature: Data.SDK.signature,
					jsApiList: ["getLocation","openAddress","scanQRCode"]
				});
				wx.ready(res => {
					let _this = this;
				    wx.getLocation({
				       type: 'gcj02',  // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
				      success: function(res) {
						  // console.log(JSON.stringify(res))
						_this.location = {
							longitude: res.longitude,
							latitude: res.latitude
						}
						_this.$store.commit("SET_CURRENT_LOCATION", _this.location);
						Cookie.set(GetAppNo()+'_location',JSON.stringify(_this.location))
						sessionStorage.setItem(GetAppNo()+'_location',JSON.stringify(_this.location))		
						let url = window.location.href;
						if(url.indexOf('pages/shoppingMall/index')>-1){
							_this.getShopList(_this.location)
						}
				      },
					  cancel: function(res) {
						this.$toast.fail(res);
					  }
				    });
				  wx.error(function(res) {
				     this.$toast.fail('获取当前位置失败');
				    console.log("调用微信接口获取当前位置失败", res);
				  });
				})
			} catch (e) {
				
			}
		},
		async wxRegister(goodsInfo) { //data是微信配置信息，option是分享的配置内容
			try{
				let {
					Data
				} = await vipCard({
					Action: "GetJSSDK",
					Url: window.location.href
				}, "UProdOpera");
				wx.config({
					debug: false, // 开启调试模式
					appId: Data.SDK.appId, // 必填，公众号的唯一标识
					timestamp: Data.SDK.timestamp, // 必填，生成签名的时间戳
					nonceStr: Data.SDK.noncestr, // 必填，生成签名的随机串
					signature: Data.SDK.signature, // 必填，签名，见附录1
					jsApiList: ['checkJsApi','updateAppMessageShareData','updateTimelineShareData'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				})
				wx.ready(function () {
					wx.updateAppMessageShareData({ 
						title: goodsInfo.Name,
						link: goodsInfo.LinkUrl,
						desc: goodsInfo.Describe, // 分享描述
						imgUrl: goodsInfo.Img,
						success: function () {
						  // this.getLeaderSpread(goodsInfo);
						}
					 }),
					wx.updateTimelineShareData({
					   title: goodsInfo.Name,
					   link: goodsInfo.LinkUrl,
					   desc: goodsInfo.Describe, // 分享描述
					   imgUrl: goodsInfo.Img,
					   success: function () {
					 	// this.getLeaderSpread(goodsInfo);
					   }
					 })
					// wx.onMenuShareTimeline({
					// 	title: goodsInfo.Name,
					// 	link: goodsInfo.LinkUrl,
					// 	desc: goodsInfo.Describe, // 分享描述
					// 	imgUrl: goodsInfo.Img,
					// 	success:function(res){
					// 		this.getLeaderSpread(goodsInfo);
					// 	},
					// 	cancel: function (res) {
					// 		alert(res,'11');//这里官网说已经不支持回调了
					// 	},
					// 	fail: function (res) {
					// 		alert(JSON.stringify(res));//这里官网说已经不支持回调了
					// 	}
					// });					
					// wx.onMenuShareAppMessage({//分享到朋友
					// 	title: goodsInfo.Name,
					// 	link: goodsInfo.LinkUrl,
					// 	desc: goodsInfo.Describe, // 分享描述
					// 	imgUrl: goodsInfo.Img,
					// 	success:function(){
					// 		this.getLeaderSpread(goodsInfo);
					// 	}
					// });				
				})
				wx.error(function (res) {
					console.log("页面加载异常！" + res.errMsg);
				});
			}catch(e){
				 
			}				
		},
		async getLeaderSpread(info){
			let {
				Data
			} = await vipCard({
					Action: "LeaderSpread",
					SpreadLink:info.LinkUrl, //推广链接
					ProdSID:info.ProdSID
				},"UProdOpera"
			);
		},
		async getShopList(info) {//获取门店
			let {
				Data
			} = await vipCard({
					Action: "GetShopList",
					Longitude: info.longitude?info.longitude:'',//获取授权的经纬度
					Latitude: info.latitude?info.latitude:''
				},
				"UShopOpera"
			);
			let currentStoreInfo = {
				Name: Data.ShopList[0].Name,
				Address: Data.ShopList[0].Address,
				SID: Data.ShopList[0].SID,
				Latitude: Data.ShopList[0].Latitude,
				Longitude: Data.ShopList[0].Longitude
			}
			this.$store.commit("SET_CURRENT_STORE",currentStoreInfo)
			localStorage.setItem("localShop",JSON.stringify(currentStoreInfo))
		},
	}
}