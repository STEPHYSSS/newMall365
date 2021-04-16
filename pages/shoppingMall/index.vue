<template>
	<div>
		<ticketPop :getCoupon="getCoupon"></ticketPop>
		<div class="shoppingCart_style" :class="classHome">
			<view class="header">
				<view class="nav_left" v-if="$store.state.orderType == 'takein'">
					<view class="store-name" @click="toShopAddress">
						<text>{{ currentStore.Name }}<text class="iconfont icon-jiantou"></text></text>								
					</view>
				</view>
				<view class="nav_left overflow-hidden" v-else>
					<view class="nav_leftAdd">
						<image src='/static/images/order/location.png' style="width: 30rpx; height: 30rpx;"></image>
						<view class="addresName" @click="toAddress">
							{{ addressInfo.Address }}
						</view>
					</view>
				</view>
				<view class="nav_right">
					<view class="dinein" :class="{active: $store.state.orderType == 'takein'}" @click="toziqu">
						<text>自取</text>
					</view>
					<view class="takeout" :class="{active: $store.state.orderType == 'takeout'}" @click="toAddress">
						<text>外卖</text>
					</view>
				</view>
			</view>
			<div v-if="!loadding">
				<!-- <button type="default" size="mini" @click="clickCoupon">优惠券</button> -->
				<!-- <button type="default" size="mini" @click="clickGoods">商品横向</button>
				<button type="default" size="mini" @click="integralMall">积分商城</button>
				<button type="default" size="mini" @click="seckill">秒杀</button>
				<button type="default" size="mini" @click="makeUpGroup">拼团</button>
				<br>
				<button @click="clickClear" size="mini">去除usermac</button> -->
				<!-- <button type="default" size="mini" @click="seckill">秒杀</button>
				<button type="default" size="mini" @click="makeUpGroup">拼团</button> -->				
				<div>
					<div v-for="(item,index) in listMode" :key="index">
						<component :is="item.viewComponets" ref="setModeRef" :propsObj="item.props"></component>
					</div>
				</div>
			</div>
			<!-- <div v-if="loadding&&JSON.stringify(location)==='{}'">获取定位中</div> -->
			<div v-if="loadding&&JSON.stringify(location)==='{}'">
				<!-- <a-nodeData v-if="listMode.length===0"></a-nodeData> -->
			</div>
		</div>
		<dragball :kefuUrl="kefuUrl" v-if="start === '1'" :x="widthX" :y="heightY"></dragball>
		<view>
			<tabBar :pagePath="'/pages/shoppingMall/index'"></tabBar>
		</view>			
	</div>
</template>
<script src="http://cs365.bak365.net/assets/front/cgwl_1.js?v=1611821588"></script>
<script>
	import {
		vipCard
	} from '@/api/http.js';
	import Mixins from "@/pages/mixins.js";
	import Cookie from '@/config/cookie-my/index.js';
	import msDropdownMenu from "@/components/ms-dropdown/dropdown-menu.vue"
	import msDropdownItem from "@/components/ms-dropdown/dropdown-item.vue"
	import ticketPop from "@/components/ticketPopup/ticketPopup.vue"
	import {getQueryString2,GetCrsInfo,GetCsrStart,GetAppNo} from '@/util/publicFunction.js'
	import dragball from "@/components/drag-ball/drag-ball.vue";
	export default {
		mixins: [Mixins],
		components: {
			msDropdownMenu,
			msDropdownItem,
			ticketPop,
			dragball,
			shopInformation:resolve => require(['@/components/autoComponents/shopInformation'],resolve),
			enterShops:resolve => require(['@/components/autoComponents/enterShops'],resolve),
			searchBox:resolve => require(['@/components/autoComponents/searchBox'],resolve),
			notice:resolve => require(['@/components/autoComponents/notice'],resolve),
			guide:resolve => require(['@/components/autoComponents/guide'],resolve),
			auxiliaryBlank:resolve => require(['@/components/autoComponents/auxiliaryBlank'],resolve),
			
			pictureAds:resolve => require(['@/components/autoComponents/pictureAds'],resolve),
			magicCube:resolve => require(['@/components/autoComponents/magicCube'],resolve),
			imgNav:resolve => require(['@/components/autoComponents/imgNav'],resolve),
			textBox:resolve => require(['@/components/autoComponents/textBox'],resolve),
			switchStores:resolve => require(['@/components/autoComponents/switchStores'],resolve),
			richText:resolve => require(['@/components/autoComponents/richText'],resolve),
			
			goods:resolve => require(['@/components/autoComponents/goods'],resolve),
			goodGroup:resolve => require(['@/components/autoComponents/goodsGroup'],resolve),
			titleBox:resolve => require(['@/components/autoComponents/titleBox'],resolve),
			seckill:resolve => require(['@/components/autoComponents/seckillGoods'],resolve),
			groupActivity:resolve => require(['@/components/autoComponents/groupActivity'],resolve),
			interests:resolve => require(['@/components/autoComponents/interests'],resolve),
		},
		data() {
			return {
				compName:this.name,
				classHome: getApp().globalData.mainStyle,
				valueSearch: "",
				value1: 0,
				getCoupon:[],
				activeColor:getApp().globalData.mainColor,
				list: [{
						text: '全部门店',
						value: 0
					},
					{
						text: 'item2',
						value: 1
					},
					{
						text: 'item3',
						value: 2
					}
				],
				listMode: [],
				filterDropdownValue: {},
				innerAudio: null,
				oldAudioObj: {},
				loadding: true,
				currentStoreInfo:{},//用来接收门店信息
				addressName: {}, //地址名称
				SID:'',
				LeaderSID:"",
				location:{},
				kefuUrl:GetCrsInfo(),
				start:GetCsrStart(),
				widthX:document.body.clientWidth-80,
				heightY:document.body.clientHeight-200
			};
		},
		created() {			
			this.init()			
		},
		computed:{
			currentStore(){
				return this.$store.state.currentStoreInfo				
			},
			addressInfo(){
				return this.$store.state.addressInfo
			},
			
		},
		watch:{
			// '$store.state.orderType':function(){
				// console.log(this.$store.state.orderType)
				// if(this.$store.state.orderType != sessionStorage.getItem('mealMode')){
				// 	this.$store.commit("SET_ORDER_TYPE", sessionStorage.getItem('mealMode'));
				// 	sessionStorage.setItem('mealMode',this.$store.state.orderType)//存自取状态
				// }
			// }
			// currentStore(val){
			// 	// console.log("watch--watch")
			// 	this.getAutoMode()//切换门店的时候重新获取一遍自定义页面商品
			// },
			// addressInfo(){
			// 	// console.log('2')
			// 	this.getAutoMode()
			// }
		},
		mounted() {
			
			// this.kefuUrl = `http://cs365.bak365.net/index/index/home?visiter_id=&visiter_name=&avatar=&business_id=${this.BusinessID}&groupid=${this.GroupID}&special=${this.SpecialID}`;
		},
		methods: {
			init(){ //初始化
				let mealMode = sessionStorage.getItem('mealMode');
				if(mealMode==null){
					this.$store.commit("SET_ORDER_TYPE", 'takein');
					sessionStorage.setItem('mealMode',this.$store.state.orderType)////存外卖状态
				}else{
					if(this.$store.state.orderType != sessionStorage.getItem('mealMode')){
						this.$store.commit("SET_ORDER_TYPE", 'takeout');
						sessionStorage.setItem('mealMode',this.$store.state.orderType)////存外卖状态
					}
				}
				if(!sessionStorage.getItem("IsCoupon")){
					 this.getCouponInfo();
				}
				let location = Cookie.get(GetAppNo()+'_location')
				if(!location){
					this.getWxConfig() // 获取授权地址	
				}
				// if(this.$store.state.currentLocation.longitude==undefined||this.$store.state.currentLocation.latitude==undefined){
				// 	this.getWxConfig() // 获取授权地址		
				// }
				uni.showLoading({
					title: '加载中'
				});				
				if(!this.addresses){
					this.addressName = JSON.parse(sessionStorage.getItem('takeOutAddress'))
				}else{
					this.addressName = JSON.parse(sessionStorage.getItem('takeOutAddress'))
				}
				if(JSON.parse(localStorage.getItem("localShop"))){
					this.currentStoreInfo.Name = JSON.parse(localStorage.getItem("localShop")).Name;
				}else{
					this.getShopList();
				}
				let url = Cookie.get('searchUrl')
				if(url!=null&&url.indexOf('FlagIndex')>-1 || url!=null&&url.indexOf('LeaderSID')>-1){
					if(url!=null&&url.lastIndexOf("?")){
						let index = url.lastIndexOf("?");
				        url = url.slice(index);
				        this.SID = getQueryString2("SID", url);
						this.LeaderSID = getQueryString2("LeaderSID", url);
					}
				}
				this.getAutoMode();
			},
			async getShopList() {//获取门店
				let {
					Data
				} = await vipCard({
						Action: "GetShopList",
						Longitude: this.$store.state.currentLocation.longitude,//获取授权的经纬度
						Latitude: this.$store.state.currentLocation.latitude
					},
					"UShopOpera"
				);
				this.currentStoreInfo = {
					Name: Data.ShopList[0].Name,
					Address: Data.ShopList[0].Address,
					SID: Data.ShopList[0].SID,
					Latitude: Data.ShopList[0].Latitude,
					Longitude: Data.ShopList[0].Longitude
				}
				this.$store.commit("SET_CURRENT_STORE",this.currentStoreInfo)
				localStorage.setItem("localShop",JSON.stringify(this.currentStoreInfo))
			},
			async getCouponInfo(){
				try {
					let { Data } = await vipCard({
						Action: "GiveCoupon"
					}, "UPromotionOpera");
					this.getCoupon = Data.TicketList?Data.TicketList:[];
				} catch (e) {
					console.log(e);
				}
			},			
			clickClear() {
				Cookie.remove("UserMACPhone");
			},
			clickCoupon() {
				this.$Router.push("/pages/shoppingMall/list/couponList");
			},
			clickGoods() {
				this.$Router.push("/pages/shoppingMall/list/goodsList");
			},
			clickGoods_two() {
				this.$Router.push("/shoppingMall/goodsList_two");
			},
			integralMall() {
				this.$Router.push("/pages/integralMall/index");
			},
			// 秒杀活动
			seckill() {
				// this.$Router.push("/pages/shoppingMall/seckill/index");
				this.$Router.push({
					path:'/pages/shoppingMall/seckill/index',
					query:{
						Type:'1'
					}
				});
			},
			makeUpGroup(){//拼团活动
			// this.$Router.push("/pages/shoppingMall/makeGroup/makeGroup")
			this.$Router.push({
				path:'/pages/shoppingMall/seckill/index',
				query:{
					Type:'5'
				}
			});
			},
			setVoice() {},
			voicePlay(obj) {
				//音频
				let arrVoice = uni.getStorageSync('arrVoice');
				if (obj.indexMy !== this.oldAudioObj.indexMy) {
					this.innerAudio.src = obj.url
					this.innerAudio.loop = obj.loopPlay === 'True' ? true : false
				}
				this.oldAudioObj = obj
				if (this.innerAudio.paused) {
					//暂停中
					let startTime = arrVoice.filter(D => D.index === obj.indexMy)[0].startTime
					if (startTime) {
						this.innerAudio.startTime = startTime
					}
					this.innerAudio.play()
				} else {
					// 播放中
					if (obj.anewAudio == '2') {
						this.innerAudio.pause()
						// 	暂停
						arrVoice.forEach(D => {
							if (D.index === obj.indexMy) {
								D.startTime = this.innerAudio.duration
							}
						})
						uni.setStorageSync('arrVoice', arrVoice);
					} else if (obj.anewAudio == '1') {
						//结束
						this.innerAudio.stop()
					}
				}
			},
			async getAutoMode() {
				uni.showLoading({
					title: '加载中'
				});
				let currentStore = JSON.parse(localStorage.getItem('currentStoreInfo'));
				try {
					let {
						Data
					} = await vipCard({
							Action: "GetDecorate",
							Type:'0',//
							SID:this.SID ? this.SID : '',//通过手机二维码扫描的时候需要的SID
							LeaderSID:this.LeaderSID?this.LeaderSID:'',//通过全民吸粉 二维码扫描的时候团长ID
							ShopSID:currentStore?currentStore.data.SID:''
						},
						"UShopOpera"
					);
					uni.hideLoading()
					this.loadding = false
					this.listMode = Data.Decorate.HtmlInfo?Data.Decorate.HtmlInfo : [];
					// let timeS = this.location.longitude ? 0 : 1000
					// setTimeout(() => {
					// 	uni.hideLoading()
					// 	this.loadding = false
					// 	this.listMode = Data.Decorate.HtmlInfo || [];
					// }, timeS)

					// let arrVoice = []
					// uni.getStorageSync('arrVoice');
					// this.listMode.forEach((D, index) => {
					// 	//处理多个音乐播放器
					// 	D.props.indexMy = index
					// 	if (D.viewComponets === 'voice') {
					// 		arrVoice.push({
					// 			'index': index
					// 		})
					// 	}
					// })
					// let bool = this.listMode.some(D => D.viewComponets === 'voice')
					// if (bool) {
					// 	//播放器
					// 	this.innerAudio = uni.createInnerAudioContext()
					// }
					// uni.setStorageSync('arrVoice', arrVoice);
				} catch (e) {
					this.$toast(e)
				}
			},
			toziqu() {
				this.$store.commit("SET_ORDER_TYPE", 'takein');	
				sessionStorage.setItem('mealMode',this.$store.state.orderType)//存自取状态
				let currentStore = JSON.parse(localStorage.getItem('currentStoreInfo'))				
				this.currentStoreInfo = {
					Name: currentStore.data.Name,
					Address: currentStore.data.Address,
					SID: currentStore.data.SID,
					Length:currentStore.data.Length
				}
			},
			// 点击跳转到门店地址列表
			toShopAddress(){
				this.$Router.push({
					path: '/pages/myAddress/myAddress',
					query: {
						flag: 'shopAuto'
					}
				})
			},
			toAddress() {
				// if(this.$store.state.orderType == 'takeout') return
				this.$store.commit("SET_ORDER_TYPE", 'takeout');
				sessionStorage.setItem('mealMode',this.$store.state.orderType)////存外卖状态
				this.$Router.push({
					path: '/pages/myAddress/myAddress',
					query: {
						flag: 'AutoWaimai'
					}
				})
			},
			
		}
	};
</script>

<style scoped lang="less" scoped>
	@import "@/assets/css/theme.less";
	@import '@/assets/css/cgwl_online.css';
	.shoppingCart_style {
		padding-bottom: 50px;

		/deep/.uni-navbar__header-btns-left {
			width: 160rpx;
		}

		/deep/.uni-navbar__header-right {
			// #ifdef H5
			width: 0px !important;
			padding: 0;
			// #endif
		}

		.van-popup--top {
			width: 145px !important;
		}

		.van-dropdown-menu {
			height: 54px;
		}
		.header {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20rpx;
			background-color: #ffffff;
			box-sizing: border-box;
		
			.dot {
				position: absolute;
				width: 34rpx;
				height: 34rpx;
				line-height: 34rpx;
				font-size: 22rpx;
				background-color: yellow;
				color: #ffffff;
				top: 16rpx;
				right: 10rpx;
				border-radius: 100%;
				text-align: center;
			}
		
			.nav_left {
				// display: flex;
				// flex-direction: column;
				// font-size: 16px;
				flex: 1;
				display: flex;
				flex-direction: column;
				.store-name {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					font-size: 17px;
					margin-bottom: 10rpx;
				
					.iconfont {
						margin-left: 10rpx;
						line-height: 100%;
					}
				}
				.store-location {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					color: #919293;
					font-size: 13px;
					.iconfont {
						vertical-align: middle;
						display: table-cell;
						// color: $color-primary;
						line-height: 100%;
					}
					image{
						padding-right: 5px;
						width: 30rpx;
						height: 30rpx;
					}
				}
				.nav_leftAdd{
					display: inline-block;
					// margin-bottom: 5px;
					.addresName{
						font-size: 15px;
						font-weight: 700;
						display: inline-block;
						margin-left: 5px;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
						width: 200px;
					}
				}
			}
		
			.nav_right {
				display: flex;
				height: 30px;
				background-color: #F5F5F5;
				border-radius: 19px;
				display: -webkit-box;
				display: -webkit-flex;
				display: flex;
				-webkit-box-align: center;
				-webkit-align-items: center;
				align-items: center;
				font-size: 12px;
				padding: 0 19px;
				color: #919293;
				.dinein {
					position: relative;
					display: flex;
					align-items: center;
					&.active {
						padding: 6px 19px;
						color: #ffffff;
						background-color: #ADB838;
						border-radius: 38rpx;
					}
				}
				
				.takeout {
					margin-left: 20rpx;
					height: 100%;
					line-height: 30px;
					align-items: center;
					flex: 1;
					padding: 14rpx 0;
					&.active {
						padding: 0px 19px;
						color: #ffffff;
						background-color: #ADB838;
						border-radius: 38rpx;
					}
				}
				
				.dinein.active {
					margin-left: -38rpx;
				}
				
				.takeout.active {
					margin-right: -38rpx;
				}
			}
		}
	}
</style>
