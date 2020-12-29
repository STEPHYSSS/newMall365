import {
	vipCard
} from '@/api/http.js';
export default {
	data: function() {
		return {
			location: {},
			publicName: '',
			publicMobile: ''
		}
	},
	methods: {
		async getWxConfig() {
			// 获取当前地址
			// if (this.$store.state.currentLocation.latitude) { //判断是否有当前地址
			//      this.location = this.$store.state.currentLocation
			//      return
			// }
			try {
				// let {
				// 	Data
				// } = await vipCard({
				// 	Action: "GetJSSDK",
				// 	Url: window.location.href
				// }, "UProdOpera");
				// wx.config({
				// 	debug: true,
				// 	appId: Data.SDK.appId,
				// 	timestamp: Data.SDK.timestamp,
				// 	nonceStr: Data.SDK.noncestr,
				// 	signature: Data.SDK.signature,
				// 	jsApiList: ["getLocation","openAddress"]
				// });
				// console.log(wx.config)
				// wx.ready(res => {
				// 	let _this = this;
				// 	console.log(_this.location,'---')
				// 	wx.getLocation({
				// 		type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
				// 		success: function(res) {
				// 			alert(JSON.stringify(res))
				// 			this.location = {
				// 				longitude: res.longitude,
				// 				latitude: res.latitude
				// 			};
				// 			// this.location.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
				// 			// this.location.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
				// 			this.$store.commit("SET_CURRENT_LOCATION", this.location);
				// 			console.log(this.location)
				// 		},
				// 		cancel: function(res) {
				// 			this.$toast.fail({
				// 				message: "拒绝授权位置,部分功能无法使用哦!"
				// 			});
				// 		}
				// 	});
				// 	wx.openAddress({
				// 		success: function(res) {
				// 			alert(JSON.stringify(res))
				// 			_this.publicName = res.userName; //收货人姓名
				// 			_this.publicMobile = res.telNumber; //收货人手机号码
				// 		},
				// 		cancel: function(errMsg) {
				// 			alert(errMsg)
				// 		}
				// 	})
				// 	wx.error(function(res) {
				// 		let toast2 = this.$toast.fail('获取当前位置失败');
				// 		// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
				// 		console.log("调用微信接口获取当前位置失败", res);
				// 	});
				// })
				
				
				// console.log(Data.SDK,'-----')
				//                wx.error(function (res) {
				//                     console.log(res, "获取授权位置失败");
				//                });
				//                wx.ready(function () {
				//                     console.log("获取授权ready");
				//                     wx.getLocation({
				//                          success: function (res) {
				//                               console.log("绝授权获取地理位置成功");
				//                               this.location.latitude = res.latitude;
				//                               this.location.longitude = res.longitude;
				//                          },
				//                          cancel: function (res) {
				//                               console.log("绝授权获取地理位置");
				//                               this.$toast.fail({
				//                                    message: "拒绝授权位置,部分功能无法使用哦!"
				//                               });
				//                               // setTimeout(() => {
				//                               //      this.$router.push("/shoppingMall/shoppingCart");
				//                               // }, 1000);
				//                          }
				//                    });
				//                });
				// let _this = this
				// uni.getLocation({
				//     type: 'wgs84',
				//     success: function (res) {
				// 		_this.location = {
				// 		     longitude: res.longitude,
				// 		     latitude: res.latitude
				// 		};
				//     }
				// });

				// this.location = {
				//      //记得删除
				//      longitude: 30.47988,
				//      latitude: 114.41739
				// };
				// this.$store.commit("SET_CURRENT_LOCATION", this.location);
			} catch (e) {
				// console.log(e, "55555");
			}
		}
	}
}
