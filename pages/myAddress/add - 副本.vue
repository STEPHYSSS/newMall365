<template>
	<div>
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickGo" :title="specificAreaHead?'选择收货地址':'收货地址'"
		 :status-bar="true" :shadow="false"></uni-nav-bar>
		<div>
			<div class="setADcell">
				<adCell text="联系人" showArrow="false">
					<input type="text" v-model="form.Name" placeholder="请填写收货人的姓名">
				</adCell>
			</div>
			<div class="setADcell">
				<adCell text="性别" showArrow="false">
					<radio-group v-model="form.Sex" style="text-align:center" @change="radioChangeSex">
						<radio style="display: inline-flex;margin-right:10px" value="1" :checked="form.Sex==='1'">先生</radio>
						<radio style="display: inline-flex;" value="2" :checked="form.Sex==='2'">女士</radio>
					</radio-group>
					<!-- <view class="radio-group" v-model="form.Sex">
						<view class="radio" :class="{'checked': form.Sex}" style="margin-right: 10rpx;" @click="Sex(1)">先生</view>
						<view class="radio" :class="{'checked': form.Sex}" @click="Sex(2)">女士</view>
					</view> -->
				</adCell>
			</div>
			<div class="setADcell">
				<adCell text="手机号" showArrow="false">
					<input type="text" v-model="form.Mobile" placeholder="请填写收货人手机号码">
				</adCell>
			</div>
			<div class="setADcell" @click="tenxButton">
				<adCell text="收货地址"  showArrow="false">
					<span>{{form.Address?form.Address:'点击选择'}}</span>
				</adCell>
			</div>
			<div class="setADcell">
				<adCell text="门牌号" showArrow="false">
					<input type="text" v-model="form.House" placeholder="详细地址，例：15号楼5层301室">
				</adcell>
			</div>
			<div class="setADcell setWidth">
				<adCell text="设置为默认地址" showArrow="false">
					<switch @change="switchChange" />
				</adCell>
			</div>
		</div>
		<div style="margin-top:50px;padding:0 20px;">
			<button type="main" size="large" @click="saveArea" style="    background-color: #8d8bdb;
    color: #fff;" :disabled="disabledLoad">保存</button>
		</div>
		<uni-popup ref="specificArea" class="confirm-area-popup" style="margin-top:50px">
			<!-- #ifdef H5 -->
			<iframe style="margin-top:50px" id="mapPage" width="100%" height="100%" frameborder="0" :src="`https://apis.map.qq.com/tools/locpicker?search=1&type=1&policy=1&coord=${location.latitude},${location.longitude}&key=IB5BZ-HF53W-5KLRH-R3VUL-35KO7-Y2BUT&referer=365商城管理`"></iframe>
			<!-- coord=40.022964,116.319723 -->
			<!-- #endif -->
			<!-- #ifndef H5 -->
			<a-search-area @bindAddress="bindAddress"></a-search-area>
			<!-- #endif -->
		</uni-popup>
		<simple-address ref="logisticsArea" :pickerValueDefault="cityPickerValueDefault" @onConfirm="confirmArea" cancelColor="#999" themeColor="#007AFF"></simple-address>
	</div>
</template>

<script>
	import {
		vipCard,
		getSuggestion
	} from "@/api/http.js";
	import areaLists from "@/config/area_json/area";
	import {
		checkMobile
	} from "@/util/publicFunction";
	import adCell from '@/node_modules/adcell/ADCell.vue';

	export default {
		name: "index",
		components: {
			adCell
		},
		data() {
			return {
				areaInfo: {},
				currentDeliveryType: '',
				specificArea: false,
				logisticsArea: false,
				isAdd: false,
				form: {
					Sex: "1"
				},
				location: {},
				areaList: areaLists,
				disabledLoad: false,
				specificAreaHead: false,
				cityPickerValueDefault: [0, 0, 1],
				edotAddress:this.$Route.query.areaInfo
			};
		},
		created() {
			this.DeliveryType = this.currentDeliveryType.indexOf("2") > -1 ? 2 : 3;
			
			if(this.$Route.query.areaInfo){
				this.areaInfo = this.edotAddress;
			}
			if (JSON.stringify(this.areaInfo) !== "{}") {
				this.form = JSON.parse(JSON.stringify(this.areaInfo));
				this.form.Defaults = this.form.Defaults === "1" ? true : false;
				let Sex = this.form.Sex.replace(/\s*/g, "");
				this.form.Sex = Sex === "先生" ? "1" : "2";
				this.location = {
					latitude: this.areaInfo.Latitude,
					longitude: this.areaInfo.Longitude
				};
			} else {
				this.location = this.$store.state.currentLocation; //当前的位置
			}
			console.log(this.location);

			let _this = this;

			// #ifdef H5
			window.addEventListener(
				"message",
				function(event) {
					// 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
					var loc = event.data;
					if (loc && loc.module == "locationPicker") {
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
		},
		methods: {
			Sex(flag){
				if(flag =='1'){
					this.form.Sex = '1'
				}else{
					this.form.Sex = '2'
				}
			},
			clickGo() {
				if (this.specificAreaHead) {
					this.specificArea = false;
					this.specificAreaHead = false
					this.$refs.specificArea.close()
				} else {
					// this.$emit("clickGo");
					this.$Router.push({path:'/pages/myAddress/myAddress'})
				}
			},
			radioChangeSex(val) {
				this.form.Sex = val.detail.value
			},
			switchChange(val) {
				//true,false
				this.form.Defaults = val.detail.value
			},
			clickGoAddress() {

			},
			tenxButton() {
				console.log(this.DeliveryType);
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
			async saveArea() {
				// console.log(this.form, "this.form");
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
					// this.$emit("saveArea");
					this.$Router.push({path:'/pages/myAddress/myAddress'})
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
	};
</script>

<style scoped lang="less">
	/deep/.uni-popup__wrapper-box {
		width: 100%;
		height: 100%;
	}

	.setWidth {
		/deep/.headView {
			width: 118px;
		}
	}
	.radio-group {
		display: flex;
		justify-content: flex-start;
		
		.radio {
			padding: 10rpx 30rpx;
			border-radius: 6rpx;
			border: 2rpx solid #919293;
			color: #919293;
			font-size: 14px;
			
			&.checked {
				background-color: #ADB838;
				color: #fff;
				border: 2rpx solid #ADB838;
			}
		}
	}
</style>
