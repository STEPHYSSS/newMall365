<template>
	<!-- 仿奈雪自取点单页面 -->
	<view>
		<uni-nav-bar :status-bar="true" @clickLeft="clickLeft" title="点餐" :shadow="false" :fixed="true" left-icon="back"></uni-nav-bar>
		<view class="container">
			<view class="main">
				<view class="nav">
					<view class="header">
						<view class="nav_left" v-if="$store.state.orderType == 'takein'">
							<view class="store-name" @click="toShopAddress">
								<text>{{ currentStoreInfo.Name }}<text class="iconfont icon-jiantou" v-show="currentStoreInfo.Address"></text></text>								
							</view>
							<view class="store-location">
								<image src='/static/images/order/location.png'></image>
								<text style="color: #919293;">距离您 {{ currentStoreInfo.Length }}</text>
							</view>
						</view>
						<view class="nav_left overflow-hidden" v-else>
							<view class="nav_leftAdd">
								<image src='/static/images/order/location.png' style="width: 30rpx; height: 30rpx;"></image>
								<view class="addresName" @click="toAddress">
									{{ addressName.Address }}{{addressName.House}}
								</view>
							</view>
							<!-- <view style="color: #919293;">
								由<text style="margin: 0 10rpx;color: #5A5B5C;">{{ currentStoreInfo.Name }}</text>配送
							</view> -->
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
					<view class="coupon">
						<text class="title">"霸气mini卡"超级购券活动，赶紧去购买</text>
						<view class="iconfont iconarrow-right"></view>
					</view>
				</view>
				<!-- 商品 滚动部分 -->
				<view class="content">
					<scroll-view class="menus" :scroll-into-view="menuScrollIntoView" scroll-with-animation scroll-y>
						<view class="wrapper" style="">
							<view class="menu" :id="`menu-${item.SID}`" :class="{'current': item.SID === currentCateId}" v-for="(item, index) in goods"
							 :key="index" @tap="handleMenuTap(item.SID,index)">
								<text>{{ item.Name }}</text>
								<!-- <view class="dot" v-show="menuCartNum(item.SID)">{{ menuCartNum(item.SID) }}</view> -->
								<view class="dot" v-show="item.cartNum">{{ item.cartNum }}</view>
							</view>
						</view>
					</scroll-view>
					<!-- 右边商品展示部分 -->
					<scroll-view class="goods" scroll-with-animation scroll-y :scroll-top="cateScrollTop" @scroll="handleGoodsScroll">
						<view class="wrapper">
							<swiper class="ads" id="ads" autoplay="true" circular="true" indicatorDots="true" indicator-active-color="#ffaa00">
								<swiper-item v-for="(item, index) in goodsLunbo" :key="index">
									<view class="swiper-item">
										<image :src="item.Img | imgFilter" mode="aspectFill" />
									</view>
								</swiper-item>
							</swiper>
							<!-- 轮播图结束 -->
							<view class="list">
								<!-- category begin -->
								<view class="category" >
									<view class="title">
										<text>{{ currentType.Name }}</text>
									</view>
									<view class="items">
										<!-- 商品 begin -->
										<view class="good" v-for="(good, key) in goods_list" :key="key">
											<image :src="good.Img | imgFilter" class="image" @tap="addCart(good)" v-if="good.ProdType == '0'"></image>
											<view class="right" v-if="good.ProdType == '0'">
												<text class="name">{{ good.Name }}</text>
												<text class="tips">{{ good.Describe }}</text>
												<view class="price_and_action">
													<text class="price">￥{{ good.SalePrice }}</text>
													<view class="btn-group" v-if="good.SpecType == '2'">
														<button class="btn property_btn" style="background-color: #ADB838;color: #fff;" hover-class="none" size="mini"
														 @tap="addCart(good)">
															选规格
														</button>
														<!-- <view class="dot" v-show="goodCartNum(good.SID)">{{ goodCartNum(good.SID) }}</view> -->
														<view class="dot" v-show="good.cartNum">{{ good.cartNum }}</view>
													</view>
													<!-- 常规加商品 -->
													<view class="btn-group" v-else>
														<!-- <button type="default" plain class="btn reduce_btn" size="mini" style="color: #b9b7b7;border: 1px solid #b9b7b7;"
														 hover-class="none" @tap="handleReduceFromCart(good)" v-show="good.cartNum">
															<text class="iconSty">-</text>
														</button> -->
														<div @tap="handleReduceFromCart(good)" v-show="good.cartNum">
															<view class="iconfont icon-jianhao" style="font-size: 25px;"></view>
														</div>
														<view class="number" v-show="good.cartNum">{{ good.cartNum }}</view>
														<!-- <button type="primary" class="btn add_btn" style="background-color: #ADB838;" size="min" hover-class="none"
															 @tap="handleAddToCart(good, 1, '单规格')">
															 <text class="iconStyAdd">+</text>
															 <view class="iconfont icon-add-fill"></view>
														</button> -->
														<div @tap="handleAddToCart(good, 1, '单规格')">
															<view class="iconfont icon-add-fill" style="font-size: 22px;color: #ADB838;"></view>
														</div>
													</view>
												</view>
											</view>
										</view>
										<!-- 商品 end -->
									</view>
								</view>
								<!-- category end -->
							</view>
						</view>
					</scroll-view>
				</view>
				<!-- 购物车栏 begin -->
				<view class="cart-box" v-if="cart.length > 0">
					<view class="mark">
						<image src="/static/images/menu/cart.png" class="cart-img" @tap="openCartPopup"></image>
						<view class="tag">{{ getCartGoodsNumber }}</view>
					</view>
					<view class="flexBtn">
						<view class="price">￥{{getCartGoodsPrice}}</view>
						<button type="primary" class="pay-btn" @tap="toPay" :disabled="disabledPay">
							{{ disabledPay ? `差${spread}元起送` : '去结算' }}
						</button>
					</view>
				</view>
				<!-- 购物车栏 end -->
			</view>
			<!-- 商品详情模态框 begin -->
			<modal :show="goodDetailModalVisible" class="good-detail-modal" color="#5A5B5C" width="90%" custom padding="0rpx"
			 radius="12rpx">
				<view class="cover">
					<image :src="good.Img|imgFilter" class="image"></image>
					<view class="btn-group2">
						<!-- <image src="/static/images/menu/share-good.png"></image> -->
						<view class="iconfont icon-fenxiang1" id="share" @click="share"></view>
						<image src="/static/images/menu/close.png" @tap="closeGoodDetailModal"></image>
					</view>
				</view>

				<scroll-view class="detail" scroll-y>
					<view class="wrapper">
						<view class="basic">
							<view class="name">{{ goodsInfo.Name }}</view>
							<view class="tips">{{goodsInfo.Tip }}</view>
						</view>
						<view class="properties" v-if="goodsInfo.SpecType==='2'">
							<view class="titleSty">规格</view>
							<view class="specBox">
								<view class="static" :class="{'isActive': currentIndex === index }" v-for="(item,index) in normsList"
								 :key="item.SID" @click="skuTopChoice(index, item)">
									<view class="guige">
										{{item.Name}}
									</view>
								</view>
							</view>
							<view class="favo" v-if="kouwei">
								<view class="titleSty">口味</view>
								<view class="teast" v-for="(item, index) in kouwei" :key="index">
									<view :class="currentIndex2 === index ? 'testBoxCheck' : 'testBox'" @click="skuTopChoicekw(index, item)">{{item}}</view>									
								</view>
							</view>
							<!--  -->
							<view class="skuTopInfoLimit" v-if="goodsInfo.MaxBuyCnt&&goodsInfo.MaxBuyCnt>0">(每人限购{{goodsInfo.MaxBuyCnt}}件)
							</view>							
						</view>
						<view class="properties" v-else-if="kouwei2">
							<view class="favo">
								<view class="titleSty">口味</view>
								<view class="teast" >
									<view class="testBoxCheck">{{kouwei2}}</view>									
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="action">
					<view class="left">
						<view class="price">￥{{ goodsInfo.SalePrice }}</view>
						<!-- <view class="props" v-if="goodsInfo.SpecType==='2'">
							{{ this.normsList && this.normsList.length && `${this.normsList[this.currentIndex].Name}
							${this.normsList[this.currentIndex].ParamInfo.split(',')[currentIndex2]}` }}
						</view> -->
						<view class="props" v-if="goodsInfo.SpecType==='1'">
						</view>
					</view>
					<view class="btn-group">
						<!-- <button type="default" plain class="btn" size="mini" hover-class="none" @tap="handlePropertyReduce">
							<text class="iconSty">-</text>
						</button> -->
						<!-- <button type="default" plain class="btn reduce_btn" size="mini" style="color: #b9b7b7;border: 1px solid #b9b7b7;"
						 hover-class="none" @tap="handlePropertyReduce">
							<text class="iconSty" style="background: #fff;">-</text>
						</button> -->
						<div @tap="handlePropertyReduce">
							<view class="iconfont icon-jianhao" style="font-size: 25px;"></view>
						</div>
						<view class="number">{{ good.number }}</view>
						<div @tap="handlePropertyAdd">
							<view class="iconfont icon-add-fill" style="font-size: 22px;color: #ADB838;"></view>
						</div>
						
						<!-- <button type="primary" class="btn" size="min" hover-class="none" @tap="handlePropertyAdd">
							<text class="iconStyAdd">+</text>
						</button> -->
					</view>
				</view>
				<view class="add-to-cart-btn" @tap="AddToCartInModal(goodsInfo)">
					<view>加入购物车</view>
				</view>
			</modal>
			<!-- 结束 -->
			<popup-layer direction="top" :show-pop="cartPopupVisible" class="cart-popup" style="z-index: 99;">
				<template slot="content">
					<view class="top">
						<text @tap="handleCartClear">清空</text>
					</view>
					<scroll-view class="cart-list" scroll-y>
						<view class="wrapper">
							<view class="item" v-for="(item, index) in cart" :key="index">
								<view class="left">
									<view class="name">{{ item.Name }}</view>
									<!-- <view class="props">{{ item.props_text }}</view> -->
								</view>
								<view class="center">
									<text>￥{{ item.SalePrice }}</text>
								</view>
								<view class="right">
									<!-- <button type="default" plain size="mini" class="btn" hover-class="none" @tap="handleCartItemReduce(index,item)">
										-
									</button>
									<view class="number">{{ item.BuyCnt }}</view>
									<button type="primary" class="btn" size="min" style="background-color: #ADB838;" hover-class="none" @tap="handleCartItemAdd(index,item)">
										+
									</button> -->
									<div @tap="handleCartItemReduce(index,item)">
										<view class="iconfont icon-jianhao" style="font-size: 25px;"></view>
									</div>
									
									<view class="number">{{ item.BuyCnt }}</view>
									<div  @tap="handleCartItemAdd(index,item)">
										<view class="iconfont icon-add-fill" style="font-size: 22px;color: #ADB838;"></view>
									</div>
								</view>
							</view>
							<!-- <view class="item" v-if="orderType == 'takeout' && store.packing_fee">
								<view class="left">
									<view class="name">包装费</view>
								</view>
								<view class="center">
									<text>￥{{ parseFloat(store.packing_fee) }}</text>
								</view>
								<view class="right invisible">
									<button type="default" plain size="mini" class="btn" hover-class="none">
										<view class="iconfont iconsami-select"></view>
									</button>
									<view class="number">1</view>
									<button type="primary" class="btn" style="background-color: #ADB838" size="min" hover-class="none">
										<view class="iconfont iconadd-select"></view>
									</button>
								</view>
							</view> -->
						</view>
					</scroll-view>
					<div style="height: 30px;"></div>
				</template>
			</popup-layer>
		</view>
	</view>
</template>

<script>
	import modal from '@/components/modal/modal'
	import popupLayer from '@/components/popup-layer/popup-layer'
	// import Mixins from "../../mixins.js"
	import wx from 'weixin-js-sdk'
	
	import {
		vipCard
	} from '@/api/http.js';
	export default {
		// mixins: [Mixins],
		data() {
			return {
				curDes: '', // 多规格  已选信息
				kouwei: '',
				kouwei2:'',
				currentType: {},
				goods: [],
				menuScrollIntoView: '',
				cateScrollTop: 0,
				currentCateId: "4898881376767269607", //默认分类
				sizeCalcState: false,
				goodDetailModalVisible: false, //是否饮品详情模态框
				good: {}, //当前饮品
				category: {}, //当前饮品所在分类
				cart: [], //购物车
				cartPopupVisible: false, //已选择商品弹窗
				goods_list: [], //商品列表
				goodsLunbo: [],
				currentArea: {}, //当前选择的地址
				skuDataInfo: {}, //商品弹窗
				goodsInfo: {},
				addressName: {}, //地址名称
				currentTast: [], //口味数组
				flavorList: [], //口味list
				normsList: [], //规格数组
				currentIndex: 0,
				currentIndex2: 0,
				currentStoreInfo:{},//商家地址
				addresses:{},
				location:JSON.parse(sessionStorage.getItem('location')),

			}
		},
		async onLoad() {			
			await this.getCouponList();
			await this.getList();
			this.getLunBoImg();
			if(this.$Route.query.flag =='Deflocation'){
				let currentStore = JSON.parse(localStorage.getItem('currentStoreInfo'))
				this.currentStoreInfo = {
					Name: currentStore.data.Name,
					Address: currentStore.data.Address,
					SID: currentStore.data.SID,
					Length:currentStore.data.Length
				}
			}else{
				await this.getShopList()
			}
			this.currentType = this.goods[0];
			this.cart = uni.getStorageSync('cart') || [];
			if(!this.addresses){				
				this.addressName = JSON.parse(sessionStorage.getItem('takeOutAddress'))
			}else{
				this.addressName = JSON.parse(sessionStorage.getItem('takeOutAddress'))
			}
			if(this.cart.length!=0){
				this.changeMenuNum();
				this.changeInfo();
			}
			
		},
		mounted() {
			this.getWxShare();
		},
		components: {
			modal
		},
		computed: {
			goodCartNum() { //计算单个饮品添加到购物车的数量
				return (SID) => this.cart.reduce((acc, cur) => {
					if (cur.SID === SID) {
						return acc += cur.BuyCnt
					}
					return acc
				}, 0)
			},
			getCartGoodsNumber() { //计算购物车总数
				// return this.cart.length;
				if(this.cart.length>0){uni.setStorageSync('cart', JSON.parse(JSON.stringify(this.cart)))}
				return this.cart.reduce((acc, cur) => acc + cur.BuyCnt, 0)
			},
			getCartGoodsPrice() { //计算购物车总价
				// return this.cart.reduce((acc, cur) => +cur.SalePrice + acc, 0)
				// return this.cart.reduce((acc, cur) => acc + cur.BuyCnt * cur.SalePrice, 0)
				return parseFloat(this.cart.reduce((acc, cur) => acc + cur.BuyCnt * cur.SalePrice, 0).toFixed(2))
			},
			disabledPay() { //是否达到起送价
				return this.orderType == 'takeout' && (this.getCartGoodsPrice < this.store.min_price) ? true : false
			},
			spread() { //差多少元起送
				if (this.orderType != 'takeout') return
				return parseFloat((this.store.min_price - this.getCartGoodsPrice).toFixed(2))
			},
			// 左侧类别小角标数量
			menuCartNum() {
				return (SID) => this.cart.reduce((acc, cur) => {
					if (cur.ProdSID === SID) {
						return acc += cur.BuyCnt
					}
					return acc
				}, 0)
			},
		},
		methods: {
			// 轮播图
			async getLunBoImg(){
				try {
					let {
						Data
					} = await vipCard({
						Action: "GetImgList",
						Type:'4'
					}, "UShopOpera");
					this.goodsLunbo = Data.BannerList;
				} catch (e) {
					console.log(e);
				}
			},
			// 获取店铺地址
			async getShopList() {
				let {
					Data
				} = await vipCard({
						Action: "GetShopList",
						Longitude: this.$store.state.currentLocation.longitude,
						Latitude: this.$store.state.currentLocation.latitude
					},
					"UShopOpera"
				);
				this.currentStoreInfo = {
					Name: Data.ShopList[0].Name,	
					Address: Data.ShopList[0].Address,
					SID: Data.ShopList[0].SID,
					Length:Data.ShopList[0].Length,
					Longitude:Data.ShopList[0].Longitude,
					Latitude:Data.ShopList[0].Latitude
				}
				this.$store.commit("SET_CURRENT_STORE",this.currentStoreInfo)
			},
			// 商品类别
			async getCouponList() {
				try {
					let {
						Data
					} = await vipCard({
						Action: "GetCateList"
					}, "UProdOpera");
					this.goods = Data.ProdCateList;
					this.changeInfo()
				} catch (e) {
					console.log(e);
				}
			},
			// 商品
			async getList(val) {
				try {
					let params = val ? val : this.goods[0].SID;
					let {
						Data
					} = await vipCard({
							Action: "GetProdInfoList",
							CateSID: params
						},
						"UProdOpera"
					);
					this.goods_list = Data.Prod_InfoList;
					this.goods_list = this.goods_list.map(val => {
						let obj = { ...val };
						this.$set(obj, 'cartNum', 0);
						return obj
					});
					this.changeMenuNum();
					this.changeInfo()
					this.loading = false;
				} catch (e) {
					this.loading = false;
				}
			},

			handleMenuTap(id, index) { //点击菜单项事件
				this.currentType = this.goods[index];
				if (!this.sizeCalcState) {
					this.calcSize()
				}
				this.currentCateId = id;
				this.$nextTick(() => this.cateScrollTop = this.goods.find(item => item.SID == id).top);
				// 
				this.getList(id);
			},

			handleGoodsScroll({
				detail
			}) { //商品列表滚动事件
				if (!this.sizeCalcState) {
					this.calcSize()
				}
				const {
					scrollTop
				} = detail
				let tabs = this.goods.filter(item => item.top <= scrollTop).reverse()
				if (tabs.length > 0) {
					this.currentCateId = tabs[0].id
				}
			},
			// 计算滚动
			calcSize() {
				let h = 10

				let view = uni.createSelectorQuery().select('#ads')
				view.fields({
					size: true
				}, data => {
					h += Math.floor(data.height)
				}).exec()

				this.goods.forEach(item => {
					let view = uni.createSelectorQuery().select(`#menu-${item.SID}`)
					view.fields({
						size: true
					}, data => {
						item.top = h
						h += data.height
						item.bottom = h
					}).exec()
				})
				this.sizeCalcState = true
			},
			clickLeft() { // 头部返回
				this.$Router.push('/pages/shoppingMall/login')
			},
			// 点击自取和外卖时状态改变
			toziqu() {
				this.$store.commit("SET_ORDER_TYPE", 'takein');
				
			},
			// 点击跳转到门店地址列表
			toShopAddress(){
				this.$Router.push({
					path: '/pages/myAddress/myAddress',
					query: {
						flag: 'shop'
					}
				})
			},
			toAddress() {
				if(this.$store.state.orderType == 'takeout') return
				this.$store.commit("SET_ORDER_TYPE", 'takeout');
				this.$Router.push({
					path: '/pages/myAddress/myAddress',
					query: {
						flag: 'towaimai'
					}
				})
			},
			// 点击规格、图片需要调用的商品详情接口
			// 多规格商品要传specSID
			async addCart(item) {
				try {
					let obj = {
						Action: "GetProdInfo"
					};
					Object.assign(obj, item);
				
					let {
						Data
					} = await vipCard(obj, "UProdOpera");
					this.skuDataInfo = Data;
					this.goodsInfo = Data.ProdInfo;
					if (this.goodsInfo.SpecType === '2') {
						this.normsList = Data.SpecList;
						this.normsList.forEach(val => {
							this.$set(val, 'type', 2);
						});
						// this.kouwei = this.normsList[0].ParamInfo.split(',');		//暂时注释			
					}else if(this.goodsInfo.SpecType === '1'){
						this.kouwei2 = this.goodsInfo.ParamInfo;
					}
					this.good = JSON.parse(JSON.stringify({ ...this.goodsInfo,
						number: 1
					}))
					this.category = JSON.parse(JSON.stringify(item))
					this.goodDetailModalVisible = true
				} catch (e) {
					console.log(e);
				}
			},
			
			// 切换规格
			skuTopChoice(i, item) {
				if (this.currentIndex === i) {
					return;
				}
				this.currentIndex = i;
				this.currentIndex2 = 0;
				// this.kouwei = item.TastName;
				// this.kouwei = item.ParamInfo.split(',');//暂时注释	
			},
			//切换口味
			skuTopChoicekw(i){
				if (this.currentIndex2 === i) {
					return;
				}
				this.currentIndex2 = i;
			},
			// 普通商品---添加
			async handleAddToCart(good, num, shopType) { //添加到购物车
				const Buy = {
					BuyCnt: num
				}
				// this.publicGoodsInfo(good,Buy);
				const index = this.cart.findIndex(item => {
					if (good.ParamInfo) {
						return (item.SID === good.SID) && (item.Describe === good.Describe)
					} else {
						return item.SID === good.SID
					}
				})
				if (index > -1) {
					this.cart[index].BuyCnt += num
				} else {
					const obj = {
						CateSID: shopType === '多规格' ? this.goodsInfo.CateSID : good.CateSID,
						ProdNo: good.ProdNo,
						SpecType: shopType === '多规格' ? this.goodsInfo.SpecType : good.SpecType,
						ParamInfo: good.ParamInfo,
						BuyCnt: num,
						PartsList: '',
						ProdSID: good[good.type === 2 ? 'ProdSID' : 'SID'],
						Name: good.Name,
						SalePrice: good.SalePrice,
						Img: good.Img,
						Describe: good.Describe,
						DeliveryType: '2,1',
						ProdType: 0,
						PromotionSID: "",
					};
					if (good.type === 2) {
						this.$set(obj, 'SpecSID', good.SID);
					}
					if(this.cart.length === 0){
						this.cart.push(obj);						
					}else{
					// 	this.cart.forEach(val => {
					// 		console.log(val.ProdSID);
					// 		console.log(obj.ProdSID);
					//       if (obj.ProdSID === val.ProdSID) {
					// 		console.log(val.ProdSID, '已有的商品id');
					// 		console.log(obj.ProdSID, '新增的商品id');
					//         val.BuyCnt++;
					//       } else {
					// 		console.log('没有重复');
					//         this.cart.push(obj);
					//       }
					//     });
					let isHave = this.cart.some(val => {
						return obj.ProdSID === val.ProdSID;
					})
					if (isHave) {   // 如果购物车已存在此商品
						// 找出购物车中已存在的商品  在BuyCnt进行加一
						const a = this.cart.findIndex(val => val.ProdSID === obj.ProdSID);
						let num = this.cart[a].BuyCnt + 1;
						// BuyCnt数量加一
						this.$set(this.cart[a], 'BuyCnt', num);
					} else {
						// 当购物车中不存在要添加的商品
						this.cart.push(obj);
					}
					}
					// SpecSID对应的多规格的SpecList中sid， ProdSID对应的是prodInfo中SID
					this.changeMenuNum();
					this.goods_list.forEach(val => {
						this.cart.forEach(item => {
							if (val.SID === item.ProdSID) {
								this.$set(val, 'cartNum', item.BuyCnt);
								// num = val.cartNum + 1;
							};
						})
					});
				}
			},
			// 普通商品--减
			handleReduceFromCart(good) {
				const index = this.cart.findIndex(item => item.ProdSID === good.SID)
				this.cart[index].BuyCnt -= 1
				this.changeInfo();
				this.changeMenuNum();
				if (this.cart[index].BuyCnt <= 0) {
					this.cart.splice(index, 1)					
				}
			},
			// 点击加号和图片和规格调用的商品信息
			async publicGoodsInfo(good,Buy){
				try {
					let obj = {
						Action: "GetProdInfo"
					};
					Object.assign(obj, good, Buy);
				
					let {
						Data
					} = await vipCard(obj, "UProdOpera");
					this.skuDataInfo = Data;
					this.goodsInfo = Data.ProdInfo;
					this.normsList = Data.SpecList;
					// this.flavorList = this.goodsInfo.TastName.split(',')
				} catch (e) {
					console.log(e);
				}
			},
			// 点击图片或者选择规格时弹窗里的加入购物车按钮
			async AddToCartInModal(good) {
				// 点击的时候会把商品信息带入，数量buycut，价格
				if(good.SpecType === '1'){
					this.handleAddToCart(good, this.good.number, '单规格')
				}else{
					this.handleAddToCart(this.normsList[this.currentIndex], this.good.number, '多规格')
				}
				this.closeGoodDetailModal()
			},

			closeGoodDetailModal() { //关闭饮品详情模态框
				this.goodDetailModalVisible = false
				this.category = {}
				this.good = {}
			},
			// 模态框里的加减
			handlePropertyAdd() {
				if(this.goodsInfo.MaxBuyCnt == '0'){
					this.good.number += 1
				}else if(this.goodsInfo.MaxBuyCnt != '0'){
					this.good.number += 1
					if (this.good.number > this.goodsInfo.MaxBuyCnt) {
						this.good.number = this.goodsInfo.MaxBuyCnt
					}
				}				
			},
			handlePropertyReduce() {
				if (this.good.number === 1) return
				this.good.number -= 1
			},
			openCartPopup() { //打开/关闭购物车列表popup
				this.cartPopupVisible = !this.cartPopupVisible
			},
			handleCartClear() { //清空购物车
				uni.showModal({
					title: '提示',
					content: '确定清空购物车么',
					success: ({
						confirm
					}) => {
						if (confirm) {
							this.cartPopupVisible = false
							this.cart = []
							 // try {
							 //     // uni.removeStorageSync('cart');
								 
							 // } catch (e) {
							 //     // error
							 // }
							this.changeMenuNum();
							this.changeInfo();
						}
					}
				})
			},
			// 购物车数据改变  也改变商品数据
			changeInfo() {
				this.goods_list.forEach(val => {
					let num = 0;
					this.cart.forEach(item => {
						if (val.SID === item.ProdSID){
							num = item.BuyCnt
						};
					})
					this.$set(val, 'cartNum', num);
				});
			},
			handleCartItemAdd(index) {
				this.cart[index].BuyCnt += 1;
				this.changeMenuNum();
				this.changeInfo();
			},

			handleCartItemReduce(index,item) { //购物车里面的加减
				if (this.cart[index].BuyCnt === 1) {
					this.cart.splice(index, 1)
				} else {
					this.cart[index].BuyCnt -= 1
				}
				this.changeMenuNum();
				this.changeInfo();
				if (!this.cart.length) {
					this.cartPopupVisible = false
					uni.removeStorageSync('cart')
				}
			},
			// 根据购物车变化 改变侧边menu的角标
			changeMenuNum() {
				this.goods.forEach(val => {
					let num = 0;
					this.cart.forEach(item => {
						if (val.SID === item.CateSID) {
							num = num + item.BuyCnt;
						};
					})
					this.$set(val, 'cartNum', num);
					
				});
			},
			toPay() { //去结算			
				uni.showLoading({
					title: '加载中'
				})
				uni.setStorageSync('cart', JSON.parse(JSON.stringify(this.cart)))
				try {
					let obj = {
						ProdList: [],
						Action: "SetShopCart"
					};
					// 	let paramsArr = []; //第一个为商品，后面的都是配件

					// 	paramsArr[0] = {
					// 		ProdNo: '',//商品库存
					// 		ProdType: 0,
					// 		SpecType: this.skuDataInfo.ProdInfo.SpecType,
					// 		TastName: this.flavorList,
					// 		BuyCnt: this.acc,
					// 		PartsList:'',
					// 		PartsNo: '',
					// 		ProdSID: this.skuDataInfo.ProdInfo.SID,
					// 		DeliveryType: this.skuDataInfo.ProdInfo.DeliveryType,
					// 		SpecSID: this.skuDataInfo.ProdInfo.SpecType,

					// 		PromotionSID:""
					// 	};
					// obj.ProdList = JSON.stringify(paramsArr);
					obj.ProdList = JSON.parse(JSON.stringify(this.cart));
					// console.log(obj);
					// return;
					// let currentItem = [paramsArr[0]];
					let currentItem = this.cart;
					if (currentItem.length > 0) {
						this.$store.commit("SET_CURRENT_CARD", currentItem);
						this.$Router.push({
							path: '/pages/shoppingMall/order/confirmOrder',
							query:{
								flag:'order',
								
							}
						})
					}
				} catch (e) {
					console.log(e);
				}
				uni.hideLoading()
			},
			// 微信分享
			async getWxShare(){
				try {
					let {
						Data
					} = await vipCard({
						Action: "GetJSSDK",
						Url: window.location.href
					}, "UProdOpera");
					
					wx.config({
						debug: true,
						appId: Data.SDK.appId,
						timestamp: Data.SDK.timestamp,
						nonceStr: Data.SDK.noncestr,
						signature: Data.SDK.signature,
						jsApiList: ["onMenuShareAppMessage","onMenuShareTimeline"]
					});
					wx.ready(res => {
						console.log(res)
						// var title = "魔法妈咪学院入学啦！好妈咪快进来！";
						// var myurl = "http://diy-haier.highset.cn/index.jsp";		
						// //分享给朋友
						// wx.onMenuShareAppMessage({
						// 	title : title, // 分享标题
						// 	desc : '海尔定制母婴家电，让你魔法加身，搞定养娃的大问题！', // 分享描述
						// 	link : myurl, // 分享链接
						// 	imgUrl : 'http://diy-haier.highset.cn/fx.jpg', // 分享图标
						// 	type : 'link', // 分享类型,music、video或link，不填默认为link
						// 	success : function() {
						// 		// 用户确认分享后执行的回调函数
						// 	},
						// 	cancel : function() {
						// 		// 用户取消分享后执行的回调函数
						// 	}
						// });
						// wx.onMenuShareTimeline({
						// 	title : title, // 分享标题
						// 	link : myurl, // 分享链接
						// 	imgUrl : 'http://diy-haier.highset.cn/fx.jpg', // 分享图标
						// 	success : function() {
						// 		// 用户确认分享后执行的回调函数
						// 	},
						// 	cancel : function() {
						// 		// 用户取消分享后执行的回调函数
						// 	}
						// });
					})
					wx.error(function(res) {
						console.log(res.errMsg);
					});
				} catch (e) {
				}
			},
			share(){
				var title = "魔法妈咪学院入学啦！好妈咪快进来！";
				var myurl = "http://diy-haier.highset.cn/index.jsp";		
				//分享给朋友
				wx.onMenuShareAppMessage({
					title : title, // 分享标题
					desc : '海尔定制母婴家电，让你魔法加身，搞定养娃的大问题！', // 分享描述
					link : myurl, // 分享链接
					imgUrl : 'http://diy-haier.highset.cn/fx.jpg', // 分享图标
					type : 'link', // 分享类型,music、video或link，不填默认为link
					success : function() {
						// 用户确认分享后执行的回调函数
						console.log('success')
					},
					cancel : function() {
						console.log('error')
						// 用户取消分享后执行的回调函数
					}
				});
				wx.onMenuShareTimeline({
					title : title, // 分享标题
					link : myurl, // 分享链接
					imgUrl : 'http://diy-haier.highset.cn/fx.jpg', // 分享图标
					success : function() {
						// 用户确认分享后执行的回调函数
					},
					cancel : function() {
						// 用户取消分享后执行的回调函数
					}
				});
			}
		},
		filters:{
			imgFilter(val){
				let localUrl = window.location.href;
				let localToken =localUrl.split("#")[0]
				return `http://dingtalk.bak365.cn/WeixinNew/Dist/../` + val
			}
		}
	}
</script>

<style lang="scss">
	@import '@/pages/shoppingMall/menu_naixue/menu/menu.scss';
	.specBox{
		display: flex;
		.static{
			display: inline-block;
			border-radius: 4px;
			background-color: #F5F5F5;
			padding: 8px 15px;
			font-size: 13px;
			color: #919293;
			margin-right: 8px;
			margin-bottom: 8px;
			width: auto;
			text-align: center;
		}
		.isActive {
			background-color: #ADB838;
			color: #ffffff;
		}
	}
	.testBoxCheck{
		display: inline-block;
		width: auto;
		background-color: #ADB838;
		padding: 8px 15px;
		color: #fff;
		margin-bottom: 10px;
	}
	.testBox{
		display: inline-block;
		width: auto;
		background-color: #fff;
		padding: 8px 15px;
		color: gary;
		margin-bottom: 10px;
	}
	.skuTopInfoLimit{
		margin-bottom: 15px;
	}
	.teast{
		display: inline-block;
		margin-left: 5px;
	}
	.btn-group{
		.iconSty{
			width: 20px;
			height: 20px;
			border-radius: 50%;
			font-size: 20px;
			line-height: 19px;
			font-weight: 600;
			text-align: center;
			color: rgb(185, 183, 183);
			border: 1px solid rgb(185, 183, 183);
			background: #fff;
		}
		.iconStyAdd{
			display: inline-block;
			width: 22px;
			height: 22px;
			background: #ADB838;
			border-radius: 50%;
			font-size: 20px;
			line-height: 19px;
			text-align: center;
			color: #fff;
		}
	}
	.iconfont{
		font-size: 13px;
		padding-left: 5px;
		color: #868181;
	}
</style>
