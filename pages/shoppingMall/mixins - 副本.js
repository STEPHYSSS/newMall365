import {vipCard} from '@/api/http.js';
export default {
     data: function () {
          return {
               location: {}
          }
     },
     methods: {
          async getWxConfig() {
			  // 获取当前地址
               if (this.$store.state.currentLocation.latitude) { //判断是否有当前地址
                    this.location = this.$store.state.currentLocation
                    return
               }
               try {
     //                let { Data } = await vipCard({ Action: "GetJSSDK" }, "UProdOpera");
     //                wx.config({
     //                     debug: false,
     //                     appId: Data.SDK.appId,
     //                     timestamp: Data.SDK.timestamp,
     //                     nonceStr: Data.SDK.nonceStr,
     //                     signature: Data.SDK.signature,
     //                     jsApiList: ["getLocation"]
     //                });
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
					
                    this.location = {
                         //记得删除
                         longitude: 30.47988,
                         latitude: 114.41739
                    };
                    this.$store.commit("SET_CURRENT_LOCATION", this.location);
               } catch (e) {
                    // console.log(e, "55555");
               }
          }
     }
}
