<template>
	<view>
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickGo" :title="specificAreaHead?'选择收货地址':'收货地址'"
		 :status-bar="true" :shadow="false"></uni-nav-bar>
		<view class="main" :class="mainStyle">
			<div class="setADcell">
				<adCell text="收货人" showArrow="false">
					<div class="widthBox"><input type="text" v-model="form.Name" placeholder="请填写收货人的姓名">					
						<text class="iconfont icon-tongxunlu"  @click="getWxAddress" style="position: absolute;right: 30px;top: 15px;"></text>
					</div>
				</adCell>
				<adCell text="性别" showArrow="false">
					<div class="widthBox">
						<view class="radio-group">
							<view class="radio" :class="{'checked': !form.Sex}" style="margin-right: 10rpx;" @tap="form.Sex=0">先生</view>
							<view class="radio" :class="{'checked': form.Sex}" @tap="form.Sex=1">女士</view>
						</view>
					</div>
				</adCell>
				<adCell text="手机号" showArrow="false">
					<div class="widthBox"><input type="text" v-model="form.Mobile" placeholder="请填写收货人手机号码">
					</div>
				</adCell>
				<adCell text="收货地址" showArrow="false" @click="tenxButton">
					<div class="widthBox"><span>{{form.Address?form.Address:'点击选择'}}</span></div>
				</adCell>
				<adCell text="门牌号" showArrow="false">
					<div class="widthBox"><input type="text" v-model="form.House" placeholder="详细地址，例：15号楼5层301室"></div>
				</adCell>
				<adCell text="设置默认地址" showArrow="false">
					<div class="widthBox" style="width: 40%;">
						<switch :checked="form.Defaults" @change="switchChange" style="position: absolute;top: 7px;left: 33%; transform:scale(0.8)"></switch>
					</div>
				</adCell>
			</div>
			<div style="margin-top:50px;padding:0 20px;">
				<button type="main" size="large" @click="saveArea" style="background-color: #ADB838;color: #fff;    height: 40px;
    line-height: 40px;
    font-size: 16px;" :disabled="disabledLoad">保 存</button>
			</div>
			
		</view>
		<!-- 地址popup -->
		<uni-popup ref="specificArea" class="confirm-area-popup" style="margin-top:50px">
			<!-- #ifdef H5 -->
			<iframe style="margin-top:50px" id="mapPage" width="100%" height="100%" frameborder="0"
			 :src="`https://apis.map.qq.com/tools/locpicker?search=1&type=1&policy=1&coord=30.59035,114.310694&key=IB5BZ-HF53W-5KLRH-R3VUL-35KO7-Y2BUT&referer=365商城管理`"></iframe>
			<!-- <iframe style="margin-top:50px" id="mapPage" width="100%" height="100%" frameborder="0"
			 :src="`https://apis.map.qq.com/tools/locpicker?search=1&type=1&policy=1&coord=${location.latitude},${location.longitude}&key=IB5BZ-HF53W-5KLRH-R3VUL-35KO7-Y2BUT&referer=365商城管理`"></iframe> -->
			<!-- coord=40.022964,116.319723 -->
			<!-- #endif -->
			<!-- #ifndef H5 -->
			<a-search-area @bindAddress="bindAddress"></a-search-area>
			<!-- #endif -->
		</uni-popup>
		<simple-address ref="logisticsArea" :pickerValueDefault="cityPickerValueDefault" @onConfirm="confirmArea" themeColor="#007AFF"></simple-address>
	</view>
</template>
<script>
	import { vipCard,getSuggestion } from "@/api/http.js";
	import areaLists from "@/config/area_json/area";
	import adCell from '@/node_modules/adcell/ADCell.vue';
	import { checkMobile } from "@/util/publicFunction";
	import wx from 'weixin-js-sdk'
	import Mixins from "@/pages/mixins.js";
	export default{
		mixins: [Mixins],
		name: "index",
		components: {
			adCell
		},
		data(){
			return{
				mainStyle: getApp().globalData.mainStyle,
				areaInfo: {},
				currentDeliveryType: '',
				specificArea: false,
				logisticsArea: false,
				isAdd: false,
				form: {
					Sex: 0,
					Name:'',
					Mobile:'',
					Address:'',
					House:''
				},
				location: {},
				areaList: areaLists,
				disabledLoad: false,
				specificAreaHead: false,
				cityPickerValueDefault: [0, 0, 1],
				publicName:'',
				publicMobile:''
			}
		},
		created() {
			this.getWxConfig();
			this.DeliveryType = this.currentDeliveryType.indexOf("2") > -1 ? 2 : 3;
			if(this.$Route.query.areaInfo){
				this.form = this.$Route.query.areaInfo;
				this.form.Defaults = this.form.Defaults === "1" ? true : false;
			}
			if (JSON.stringify(this.areaInfo) !== "{}") {
				this.form = JSON.parse(JSON.stringify(this.areaInfo));
				this.form.Defaults = this.form.Defaults === "1" ? true : false;
				let Sex = this.form.Sex.replace(/\s*/g, "");
				this.form.Sex = Sex === "先生" ? "0" : "1";
				this.location = {
					latitude: this.areaInfo.Latitude,
					longitude: this.areaInfo.Longitude
				};
			} else {
				// this.location
				// console.log(this.location.latitude)
				this.location = this.$store.state.currentLocation; //当前的位置
			}
		
			let _this = this;
		
			// #ifdef H5
			window.addEventListener(
				"message",
				function(event) {
					// 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
					var loc = event.data;
					if (loc && loc.module == "locationPicker") {0
						//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
						if (_this.$refs.specificArea) {
							_this.$refs.specificArea.close()
						}
						_this.$nextTick(function() {
							_this.specificArea = false;
							_this.specificAreaHead = false
							_this.$set(_this.form, 'Address', loc.poiname)
							_this.$set(_this.form, 'Latitude', loc.latlng.lat)
							_this.$set(_this.form, 'Longitude', loc.latlng.lng)
						})
		
					}
				},
				false
			);
			// #endif
			// // #ifdef H5
			//             //获取定位经纬度
			//             if (this.$wechat && this.$wechat.isWechat()) {
			//                  this.$wechat.location(function (res) {
			//                      console.log(res)
			//                     // let latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
			//                     // let longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
			//                     // todo
			//                     let latitude = 31.14979;
			//                     let longitude = 121.12426;
			
			//                     //根据经纬度，解析区域，提示用户输入
			//                  });
			//             }
			//             // #endif
		},
		methods:{
			// 进入首页就获取微信地址
			// async getWxConfig(){
			// 	try {
			// 		let {
			// 			Data
			// 		} = await vipCard({
			// 			Action: "GetJSSDK",
			// 			Url: window.location.href
			// 		}, "UProdOpera");
					
			// 		wx.config({
			// 			debug: false,
			// 			appId: Data.SDK.appId,
			// 			timestamp: Data.SDK.timestamp,
			// 			nonceStr: Data.SDK.noncestr,
			// 			signature: Data.SDK.signature,
			// 			jsApiList: ["getLocation","openAddress","scanQRCode"]
			// 		});
			// 		wx.ready(res => {
			// 			let _this = this;
			// 		    wx.getLocation({
			// 		       type: 'gcj02',  // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
			// 		      success: function(res) {
			// 				_this.location = {
			// 					longitude: res.longitude,
			// 					latitude: res.latitude
			// 				}
			// 				_this.$store.commit("SET_CURRENT_LOCATION", _this.location);
			// 				sessionStorage.setItem('location',JSON.stringify(_this.location))							
			// 		      },
			// 			  cancel: function(res) {
			// 				this.$toast.fail(res);
			// 			  }
			// 		    });
			// 		  wx.error(function(res) {
			// 		     this.$toast.fail('获取当前位置失败');
			// 		    console.log("调用微信接口获取当前位置失败", res);
			// 		  });
			// 		})
			// 	} catch (e) {
					
			// 	}
			// },
			getWxAddress(){
				let _this = this;
				wx.openAddress({
				  success: function (res) {
					  // alert(JSON.stringify(res))
					_this.form.Name = res.userName;
					_this.form.Mobile = res.telNumber;
				  },
				  cancel: function(res) {
					this.$toast.fail(res);
				  }
				});
			},
			clickGo() {
				if (this.specificAreaHead) {
					this.specificArea = false;
					this.specificAreaHead = false
					this.$refs.specificArea.close()
				} else {
					// this.$emit("clickGo");
					// this.$Router.push({path:'/pages/myAddress/myAddress',query:{
					// 	flag:'towaimai'
					// }})
					window.history.back(-1)
					
				}
			},
			// 默认地址
			switchChange(val) {
				//true,false
				// this.form.Defaults = val.detail.value === true ? 1 : 0;
				this.form.Defaults = val.detail.value
			},
			// 点击选择地址按钮
			tenxButton() {
				// if (Number(this.DeliveryType) === 2) {
					this.specificArea = true;
					this.$refs.specificArea.open()
					this.specificAreaHead = true
				// } else {
				// 	this.logisticsArea = true;
				// 	this.$refs.logisticsArea.open()
				// }
			},
			confirmArea(val) {
				this.logisticsArea = false;
				this.$refs.logisticsArea.close()
				this.form.Address = val.label;
				this.form.Type = 2;
			
				this.form.Province = val.labelArr[0];
				this.form.City =  val.labelArr[1];
				this.form.District =  val.labelArr[2];
			},
			// 保存地址
			async saveArea() {
				if (!this.form.Address) {
					this.$toast("选择地址");
					return;
				}
				if (!this.form.House) {
					this.$toast("填写门牌号");
					return;
				}
				if (!this.form.Name) {
					this.$toast("填写联系人");
					return;
				}
				if (!this.form.Mobile) {
					this.$toast("填写手机号");
					return;
				} else {
					if (!checkMobile(this.form.Mobile)) {
						this.$toast("手机号格式错误");
						return;
					}
				}
				this.disabledLoad = true;
				this.form.Type = this.form.Type ? this.form.Type : 1
				try {
					let obj = {
						Action: "SetAddress"
					};
					Object.assign(obj, this.form);
			
					// console.log(obj,'obj')
					obj.Defaults = obj.Defaults === true ? 1 : 0;
			
					let {
						Data
					} = await vipCard(obj, "UMemberOpera");
					this.$toast("新增成功");
					// this.$emit("saveArea");
					this.$Router.push({path:'/pages/myAddress/myAddress',query:{
						flag:'towaimai'
					}})
					this.disabledLoad = false;
				} catch (e) {
					this.disabledLoad = false;
				}
			},
			
			bindAddress(val) {
				let _this = this
				if (_this.$refs.specificArea) {
					_this.$refs.specificArea.close()
				}
				_this.$nextTick(function() {
					_this.specificArea = false;
					_this.specificAreaHead = false
					_this.$set(_this.form, 'Address', val.address)
					_this.$set(_this.form, 'Latitude', val.location.lat)
					_this.$set(_this.form, 'Longitude', val.location.lng)
				})
			},
		}
	}
</script>
<style lang="less">
	/deep/.uni-popup__wrapper-box {
		width: 100%;
		height: 100%;
	}
	/* 覆盖样式修改颜色 */
	/deep/ uni-switch .uni-switch-input.uni-switch-input-checked{
	    background-color: #adb838 !important;
	    border-color: #adb838 !important;
	}
	.widthBox{
		width:68%;
		input{
			font-size: 12px;
		}
		.radio-group {
			display: flex;
			justify-content: flex-start;
			
			.radio {
				padding: 10rpx 30rpx;
				border-radius: 6rpx;
				border: 1px solid #CCCCCC;
				margin-right: 6px;
				&.checked {
					background-color: #ADB838;
					color: #ffffff;
					border: 1px solid #ADB838;
				}
			}
		}
	}
</style>

