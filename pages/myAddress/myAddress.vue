<template>
	<view class="container">
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickLeft" :title="title" :status-bar="true" :shadow="false"></uni-nav-bar>
		<!-- GetAddressList获取地址  SetAddress添加地址 -->
		<!-- 外卖地址信息 -->
		<!-- <view v-if="$Route.query.flag == 'towaimai'"> -->
		<!-- v-if="$Route.query.flag == 'towaimai' || $Route.query.flag == 'login' || $Route.query.flag == 'homeD' || $Route.query.flag == 'AutoWaimai'" -->		
		<!-- 门店地址 -->
		<view class="shopAddress" v-if="$Route.query.flag == 'shop' || $Route.query.flag == 'shopAuto' ">
			<view class="search" style="width: 96%;">
				<uni-search-bar cancelButton="none" :disabledMy="false" style="width:100%" @confirm="confirm" placeholder="请输入搜索关键词"
				 v-model="Name" :radius="50"></uni-search-bar>
			</view>
			<view class="addressList">
				<view v-for="(item,index) in ShopAddress" :key="index" class="ShopAddress">
					<view style="display: flex;">
						<view class="left" @click="toDownOrder(item)">
							<span class="span1">{{item.Name}}</span>
							<span class="span2">距离您{{item.Length}}</span>
							<span class="span3">{{item.Address}}</span>
						</view>
						<view class="right">
							<view style="color: #ADB838;font-size: 13px;" @click="toDownOrder(item)">
								去下单
							</view>
							<view class="iconPhone" @click="call(item.Tel)">
								<span class="iconfont icon-bodadianhua" style="color: #AAB63A;font-size: 26px;"></span>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<view class="main">
				<view v-if="!areaList.length" class="no-address-tips">
					<view class="noAddressinfo">暂无地址信息</view>
					<view>请点击底部按钮添加地址信息</view>
				</view>
				<template v-else>
					<uni-swipe-action>
						<uni-swipe-action-item class="address-wrapper" :options="swipeOption" @click="handleSwipeClick(item.SID)" v-for="(item, index) in areaList"
						 :key="index">
							<view class="address" @tap="chooseAddress(item)">
								<view class="left flex-fill overflow-hidden mr-20">
									<div class="areaName">{{item.Address}}&nbsp;{{item.House}}</div>
									{{item.Name}}
									<span v-if="item.Sex">{{item.Sex | setSex2}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
									<span>{{item.Mobile?item.Mobile:item.Tel}}</span>
									<span v-if="item.Defaults == '1'">默认地址</span>
								</view>
								<image src="/static/images/edit.png" class="edit-icon" @tap.stop="edit(item)"></image>
							</view>
						</uni-swipe-action-item>
					</uni-swipe-action>
				</template>
			</view>
			<view class="btn-box">
				<button type="primary" size="default" @tap="add">新增地址</button>
			</view>
		</view>		
		<!-- <uni-popup ref="chooesAddress" type="center">
			<view style="width: 300px;background-color: #FFFFFF;height: auto;border-radius: 5x;">
				
			</view>
		</uni-popup> -->
		<modal custom :show="couponDetailModalShow" @cancel="closeCouponDetailModal">
			<view class="d-flex flex-column">
				<view class="text-center" style="margin-bottom: 30rpx;text-align: center;font-size: 14px;">
					<h3>该地址暂无法配送</h3>
				</view>
				<view class="text-center font-size-sm text-color-assist" style="margin-bottom: 40rpx;font-size: 15px;color: #5A5B5C;text-align: center;">
					抱歉，目前该地址附近没有可配送的门店，暂无法配送。
				</view>
				<view class="text-color-assist font-size-sm pre-line" style="text-align: center;font-size: 15px;" @click="closeCouponDetailModal">
					<div>朕知道了</div>
				</view>
			</view>
		</modal>
	</view>
</template>

<script>
	import Cookies from '@/config/cookie-my/index.js';
	import { vipCard } from "@/api/http.js";
	// import Mixins from "@/pages/shoppingMall/mixins.js";
	import Mixins from "@/pages/mixins.js";
	import modal from '@/components/modal/modal'	
	import {GetAppNo} from '@/util/publicFunction.js'
	export default {
		mixins: [Mixins],
		name:'myAddress',
		data() {
			return {
				title: '',
				scene: 'menu',
				is_choose: false, //是否选择地址
				swipeOption: [{
					text: '删除',
					style: {
						backgroundColor: '#D12E32'
					}
				}],
				couponDetailModalShow: false,//超出范围提示弹窗
				showAreaList: false,
				radioModes: 2,
				addEditArea: false,
				resultArea: "",
				areaList: [], //用来接收地址列表-			
				areaInfo: {}, // 编辑的地址
				currentDeliveryType: "", //当前的配送类型
				ShopAddress: {}, //商家地址
				Name: '', //门店搜索
				location: JSON.parse(sessionStorage.getItem('location')),
				ShopRadio:localStorage.getItem("ShopRadio")
			}
		},
		components:{
			modal
		},
		created() {
			this.getWxConfig(); // 获取授权地址
			if (this.$Route.query.flag == 'shop' || this.$Route.query.flag == 'shopAuto') {
				this.title = '门店地址';
				uni.setNavigationBarTitle({
					title: '门店地址'
				});
				this.getShopList();
			} else {
				this.title = '我的地址'
				this.getAddressList();
			}
			// vuex缓存的数据经过刷新的时候数据就会回到默认
			// 自取时调用门店接口，外卖时调用地址接口
			 //暂时注释 || this.$Route.query.flag == 'homeD' || this.$Route.query.flag=='login'			 
			// let orderType=Cookies.get("orderType")
			// console.log(orderType)
			// if(	this.$store.state.orderType == 'takeout'){			
			// 	this.getAddressList();
			// }else{
			// 	this.getShopList();
			// }
		},
		filters: {
			setSex2(val) {
				if (val == 0) {
					return '先生'
				} else if (val == 1) {
					return '女士'
				}
			}
		},
		methods: {
			// 获取地址列表
			async getAddressList() {
				let {
					Data
				} = await vipCard({
						Action: "GetAddressList",
						Type: 1
					},
					"UMemberOpera"
				);
				this.areaList = Data.AddressList || [];
				if(this.areaList.length==0){
					this.$store.commit("SET_ORDER_TYPE", 'takein');
					sessionStorage.setItem('mealMode',this.$store.state.orderType)////存外卖状态
				}else{
					// 当没有选择地址的时候默认选择第一条
					for (let i = 0; i < this.areaList.length; i++) {
						if (this.areaList[i].Defaults == '1') {
							return sessionStorage.setItem('takeOutAddress', JSON.stringify(this.areaList[i]));
						}
						let addResses = {
							Name: this.areaList[0].Name,
							Address: this.areaList[0].Address,
							SID: this.areaList[0].SID,
							Length: this.areaList[0].Length,
							House: this.areaList[0].House,
							Latitude:this.areaList[0].Latitude,
							Longitude:this.areaList[0].Longitude
						}
						this.$store.commit("SET_CURRENT_ADDRESS",addResses)
						sessionStorage.setItem('takeOutAddress', JSON.stringify(addResses));
					}
				}
				
			},
			// 
			// openCouponDetailModal(coupon) {
			// 	this.coupon = coupon
			// 	this.couponDetailModalShow = true
			// },
			closeCouponDetailModal() {
				this.couponDetailModalShow = false
			},
			async chooseAddress(item) {	
				if (this.$Route.query.flag == 'towaimai' || this.$Route.query.flag == 'login' || this.$Route.query.flag == 'AutoWaimai'|| this.$Route.query.flag == 'homeD') {
					let currentStoreOut = {
						Name: item.Name,
						Address: item.Address+item.House,
						SID: item.SID,
						Length: item.Length,
						Mobile: item.Mobile,
						Longitude: item.Longitude,
						Latitude: item.Latitude
					}
					try{
						let { Data } = await vipCard({ Action: "GetShopRecently", Latitude:item.Latitude,Longitude:item.Longitude },"UShopOpera");
						let currentStoreInfo = {
							Address: Data.ShopInfo.Address,
							Latitude: Data.ShopInfo.Latitude,
							Longitude:Data.ShopInfo.Longitude,
							Name: Data.ShopInfo.Name,
							SID: Data.ShopInfo.SID,
							Length:  Data.ShopInfo.Length
						}
						// if(Data.Message.indexOf('距离超长')>-1){
						// 	this.chooesAddress = true;
						// 	this.$refs.chooesAddress.open();
						// }else{
							
							this.$store.commit("SET_CURRENT_ADDRESS",currentStoreOut)
							this.$store.commit("SET_CURRENT_STORE",currentStoreInfo)
							sessionStorage.setItem('takeOutAddress', JSON.stringify(currentStoreOut));
							this.$store.commit("SET_ORDER_TYPE", 'takeout');
							sessionStorage.setItem('mealMode',this.$store.state.orderType)////存外卖状态
							if(this.$Route.query.flag == 'AutoWaimai'|| this.ShopRadio ==='2'){
								return this.$Router.push('/pages/shoppingMall/index')
							}
							this.$Router.push({path:'/pages/shoppingMall/menu_naixue/menu/menu'})
						// }
					}catch(e){
						this.$store.commit("SET_ORDER_TYPE", 'takein');
						sessionStorage.setItem('mealMode',this.$store.state.orderType)////存外卖状态
						if(e.indexOf('距离超长')>-1){
							setTimeout(()=>{
								this.couponDetailModalShow = true
							},0)
							
						}
						//TODO handle the exception
					}
					
				} else {
					console.log('555')
				}
			},
			add() {
				uni.navigateTo({
					url: '/pages/myAddress/add'
				})
			},
			edit(val) {//编辑地址
				this.$Router.push({
					path: '/pages/myAddress/add',
					query: {
						areaInfo: val
					}
				})
			},
			// 删除
			handleSwipeClick(id) {
				uni.showModal({
					title: '提示',
					content: '确定要删除？',
					success: res => {
						if (res.confirm) {
							let {
								Data
							} = vipCard({
									Action: "RemoveAddress",
									SID: id
								},
								"UMemberOpera"
							);
							uni.showToast({
								title: '删除成功！',
								icon: 'success'
							})
							setTimeout(()=>{
								this.getAddressList()
							},100)
						}
					}
				})
			},
			addresses() {},
			// 返回
			clickLeft() {
				if(this.$Route.query.flag == 'AutoWaimai'){
					// 如果没有选择地址的话，就要提示选择地址
					if(localStorage.getItem('addressInfo') == null){
						this.$store.commit("SET_ORDER_TYPE", 'takein');
						sessionStorage.setItem('mealMode',this.$store.state.orderType)////存外卖状态
					}
				}
				window.history.back(-1)
				// if (this.$Route.query.flag == 'login') {
				// 	this.$Router.push('/pages/shoppingMall/login')
				// } else if (this.$Route.query.flag == 'towaimai' || this.$Route.query.flag == 'shop') {
				// 	this.$Router.push('/pages/shoppingMall/menu_naixue/menu/menu')
				// }else if(this.$Route.query.flag == 'shopAuto' || this.$Route.query.flag == 'AutoWaimai'){					
				// 	this.$Router.push('/pages/shoppingMall/index')
				// }
				// else {
				// 	this.$Router.push('/pages/home')
				// }

			},
			// 门店地址开始

			confirm(e) { //搜索
				this.Name = e.value;
				this.getShopList();
			},
			// 获取门店地址
			async getShopList() {
				let {
					Data
				} = await vipCard({
						Action: "GetShopList",
						Longitude: this.$store.state.currentLocation.longitude,
						Latitude: this.$store.state.currentLocation.latitude,
						Name: this.Name
					},
					"UShopOpera"
				);
				this.ShopAddress = Data.ShopList;
				
				// this.$store.commit("SET_CURRENT_STORE",this.ShopAddress)
				// this.ShopAddress = Data.ShopList || [];
				// // 当没有选择地址的时候默认选择第一条
				// for (let i = 0; i < this.ShopAddress.length; i++) {
				// 	if (this.ShopAddress[i].Defaults == '1') {
				// 		return sessionStorage.setItem('takeOutAddress', JSON.stringify(this.ShopAddress[i]));
				// 	}
				// 	let shop = {
				// 		Name: this.ShopAddress[0].Name,
				// 		Address: this.ShopAddress[0].Address,
				// 		SID: this.ShopAddress[0].SID,
				// 		Length: this.ShopAddress[0].Length,
				// 		House: this.ShopAddress[0].House,
				// 		Latitude:this.ShopAddress[0].Latitude,
				// 		Longitude:this.ShopAddress[0].Longitude
				// 	}
				// 	this.$store.commit("SET_CURRENT_STORE",shop)
				// }
			},
			toDownOrder(item) { //选择地址
				let currentStoreInfo = {
					Name: item.Name,
					Address: item.Address,
					SID: item.SID,
					Length: item.Length,
					Longitude: item.Longitude,
					Latitude: item.Latitude
				}
				this.$store.commit("SET_CURRENT_STORE", currentStoreInfo)
				if(this.$Route.query.flag == 'shopAuto'){
					localStorage.setItem("localShop",JSON.stringify(currentStoreInfo))
					// localStorage.setItem(GetAppNo()+"_"+ "localShop",JSON.stringify(this.currentStoreInfo))
					return this.$Router.push({path:"/pages/shoppingMall/index"})
				}
				this.$Router.push({
					path: '/pages/shoppingMall/menu_naixue/menu/menu',
					query: {
						flag: 'Deflocation'
					}
				})
			},
			
			// 拨打电话
			call(Tel) {
				uni.makePhoneCall({
					// 手机号
					phoneNumber: Tel,

					// 成功回调
					success: (res) => {
						console.log('调用成功!')
					},

					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
					}

				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100%;
	}

	.main {
		padding: 30rpx;
		display: flex;
		flex-direction: column;
		padding-bottom: 100rpx;

		.address-wrapper {
			margin-bottom: 30rpx;
		}

		.no-address-tips {
			display: inline-block;
			font-size: 16px;
			position: absolute;
			top: 33%;
			left: 21%;
			text-align: center;
			color: #b5b4b4;

			.noAddressinfo {
				margin-bottom: 10px;
			}
		}

		.address {
			width: 100%;
			padding: 40rpx 20rpx;
			background-color: #FFFFFF;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.areaName {
				font-weight: 700;
				font-size: 16px;
				margin-bottom: 10px;
			}

			.left {
				span {
					display: inline-block;
					margin: 0 5px;
				}
			}

			.right {
				flex: 1;
				overflow: hidden;
				display: flex;
				flex-direction: column;
			}

			.edit-icon {
				width: 50rpx;
				height: 50rpx;
				flex-shrink: 0;
			}
		}
	}

	.btn-box {
		box-sizing: border-box;
		height: 50px;
		background-color: #FFFFFF;
		box-shadow: 0 0 10px rgba(145, 146, 147, 0.1);
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 5px 0;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;

		uni-button {
			height: 40px;
			width: 80%;
			border-radius: 50rem !important;
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-align: center;
			-webkit-align-items: center;
			align-items: center;
			-webkit-box-pack: center;
			-webkit-justify-content: center;
			justify-content: center;
			background-color: #ADB838;
		}
	}

	.ShopAddress {
		background-color: #fff;
		padding: 10px;
		margin: 10px 10px;

		.left {
			width: 65%;
			box-sizing: border-box;

			span {
				display: block;
			}

			.span1 {
				font-weight: 700;
				font-size: 15px;
				margin-bottom: 10px;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				width: 70%;
			}

			.span2 {
				color: #5a5858;
			}

			.span3 {
				color: #9c9898;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				width: 90%;
			}

			.span2,
			.span3 {
				margin-bottom: 5px;
			}
		}

		.right {
			text-align: right;
			flex: 1;

			.iconPhone {
				margin-top: 23px;
				margin-right: 5px;
			}
		}
	}
</style>
