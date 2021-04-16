<template>
	<div>
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickGo" :title="title" :status-bar="true" :shadow="false"></uni-nav-bar>
		<div class="shoppingCart_style" :class="classHome">
			<div v-if="!loadding">			
				<div>
					<div v-for="(item,index) in listMode" :key="index">
						<component :is="item.viewComponets" ref="setModeRef" :propsObj="item.props"></component>
					</div>
				</div>
			</div>
			<div v-if="loadding&&JSON.stringify(location)==='{}'">
			</div>
		</div>
		<view>
			<tabBar :pagePath="'/pages/shoppingMall/index'"></tabBar>
		</view>			
	</div>
</template>
<script>
	import { vipCard } from '@/api/http.js';
	import Cookie from '@/config/cookie-my/index.js';
	import {getQueryString2} from '@/util/publicFunction.js'
	export default {
		components: {
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
				classHome: getApp().globalData.mainStyle,
				activeColor:getApp().globalData.mainColor,
				
				listMode: [],
				filterDropdownValue: {},
				innerAudio: null,
				oldAudioObj: {},
				loadding: true,
				SID:'',
				location:{},
				title:""
			};
		},
		created() {			
			this.init()
		},
		methods: {
			init(){ //初始化
				uni.showLoading({
					title: '加载中'
				});
				// let url = sessionStorage.getItem('searchUrl');
				let url = Cookie.get('searchUrl')
				if(url!=null&&url.indexOf('FlagAutoIndex')>-1){
					if(url!=null&&url.lastIndexOf("?")){
						let index = url.lastIndexOf("?");
				        url = url.slice(index);
				        this.SID = getQueryString2("SID", url);
					}
				}			
				this.getAutoMode();
			},
			clickGo(){
				uni.navigateBack({
				    delta: 1
				});
				// this.$Router.push('/pages/home')
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
							ShopSID:currentStore?currentStore.data.SID:''
						},
						"UShopOpera"
					);
					uni.hideLoading()
					this.loadding = false
					this.listMode = Data.Decorate.HtmlInfo?Data.Decorate.HtmlInfo : [];					
					this.title = Data.Decorate.Name?Data.Decorate.Name:''
					console.log(this.title,'000')
				} catch (e) {
					this.$toast(e)
				}
			},
			async getShopList() {//获取门店
				let {
					Data
				} = await vipCard({
						Action: "GetShopList",
						// DefLongitude: this.location.longitude,
						// DefLongitude: this.location.latitude
						Longitude: this.$store.state.currentLocation.Longitude,//获取授权的经纬度
						Latitude: this.$store.state.currentLocation.Latitude
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
			clickGoods() {
				this.$Router.push("/pages/shoppingMall/list/goodsList");
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
