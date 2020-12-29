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
					<div class="search" style="position: relative;">
						<input type="text" placeholder="请输入搜索关键词..." v-model="name" placeholder-style="font-size:13px" @confirm="serch"/>
						<view @click="search2" style="display: inline-block;line-height: 29px;position: absolute;right: 12px;"><span class="iconfont icon-sousuo">搜索</span></view>
					</div>
					<view class="coupon">
						<text class="title">"霸气mini卡"超级购券活动，赶紧去购买</text>
						<view class="iconfont iconarrow-right"></view>
						
					</view>
				</view>
				<!-- 商品 滚动部分 -->
				<view class="content">
					<scroll-view class="menus" :scroll-into-view="menuScrollIntoView" scroll-with-animation scroll-y>
						<view class="wrapper">
							<view class="menu" :id="`menu-${item.SID}`" :class="{'current': item.SID === currentCateId}" v-for="(item, index) in goods" 
							:key="index" @tap="handleMenuTap(item.SID)">
								<text>{{ item.Name }}</text>
								<view class="dot" v-show="menuCartNum(item.SID)">{{ menuCartNum(item.SID) }}</view>
							</view>
						</view>
					</scroll-view>
					<!-- 右边商品展示部分 -->
					<scroll-view class="goods" scroll-with-animation scroll-y :scroll-top="cateScrollTop" @scroll="handleGoodsScroll">
						<view class="wrapper">
							<swiper class="ads" id="ads" autoplay :interval="3000" indicator-dots>
								<swiper-item v-for="(item, index) in ads" :key="index">
									<view class="swiper-item">
										<image :src="item.Img | fmtImgUrl" mode="aspectFill" />
									</view>
								</swiper-item>
							</swiper>
							<view class="list">
								<!-- category begin -->								
								<view class="category" v-for="(item, index) in goods" :key="index" :id="`cate-${item.SID}`">
									<view class="title">
										<text>{{ item.Name }}</text>
									</view>
									<view class="items">
										<!-- 商品 begin -->										
										<view class="good" v-for="(good, key) in item.children" :key="key">
											<image :src="good.Img | fmtImgUrl" class="image" @tap="showGoodDetailModal(item, good)" v-if="good.ProdType == '0'" ></image>
											<image src="@/static/img/shouqin.png" @tap="showGoodDetailModal(item, good)" style="width: 80px;height: 80px;position: absolute;" v-if="good.StockType != '0'&& good.StoreQty <= '0'"></image>											
											<view class="right" v-if="good.ProdType == '0'">
												<text class="name">{{ good.Name }}</text>
												<text class="tips">{{ good.Describe }}</text>
												<view class="price_and_action">
													<view class="" v-if="good.MemberPrice">
														<text class="price" style="margin-right: 2px;">￥{{ good.MemberPrice }}</text>
														<text class="price" style="text-decoration: line-through;font-size: 8pt;color:#999;line-height: 10px;font-weight: 100;">￥{{ good.SalePrice }}</text>
													</view>
													<view v-else>
														<text class="price">￥{{ good.SalePrice }}</text>
													</view>
													<!-- 当SpecType等于2的时候是多规格商品 -->
													<!-- 当库存type!=0的时候判断库存数量是否小于等于0，小于的话展示售罄-->
													<view class="" v-if="good.StockType != '0'&& good.StoreQty <= '0'">
														<view class="btn-group">
															<button class="btn property_btn" style="background-color: #b1b1b1;color: #fff;" hover-class="none" size="mini">
																已售罄
															</button>
														</view>
													</view>
													<view v-else>
														<view class="btn-group" v-if="good.SpecType == '2'|| good.SpecType == '3'">
															<button class="btn property_btn" style="background-color: #ADB838;color: #fff;" hover-class="none" size="mini"
															 @tap="showGoodDetailModal(item, good)">
																选规格
															</button>
															<view class="dot" v-show="goodCartNum(good.SID)">{{ goodCartNum(good.SID) }}</view>
														</view>
														<view class="btn-group" v-else>
															<div @tap="handleReduceFromCart(item, good)" v-show="goodCartNum(good.SID)">
																<view class="iconfont icon-jianhao" style="font-size: 25px;"></view>
															</div>
															<view class="number" v-show="goodCartNum(good.SID)">{{ goodCartNum(good.SID) }}</view>
															<div @tap="handleAddToCart(item, good, 1)">
																<view class="iconfont icon-add-fill" style="font-size: 22px;color: #ADB838;"></view>
															</div>
														</view>
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
			<modal :show="goodDetailModalVisible" class="good-detail-modal" color="#5A5B5C" 
					width="90%" custom padding="0rpx" radius="12rpx">
				<view class="cover">
					<image v-if="good.Img" :src="good.Img|fmtImgUrl" class="image"></image>
					<view class="btn-group2">
						<image src="/static/images/menu/close.png" @tap="closeGoodDetailModal"></image>
						<!-- <span @click="share">分享按钮</span> -->
					</view>
				</view>
				<scroll-view class="detail" scroll-y>
					<view class="wrapper">
						<view class="basic">
							<view class="name">{{ good.Name }}</view>
							<view class="tips">{{good.Tip }}</view>
						</view>
						<!-- v-if="good.SpecType==='2'" -->
						<view class="properties">
							<!-- 商品规格 -->
							<view class="" v-if="norms.length >0 ">
								<view class="titleSty">规格</view>
								<view class="specBox">
									<view class="static" :class="{'isActive': currentIndex === index }" v-for="(item, index) in norms" :key="index" @click="skuTopChoice(index, item)">
										<view class="title">
											<text class="name">{{ item.Name }}</text>
										</view>
									</view>
								</view>								
							</view>
							<view v-if="partsList.length > 0">
								<view class="titleSty">配件</view>
								<div class="partsStyle" v-for="(item,index) in partsList" :key="item.SID">
									<div :class="{'isActive': item.isActive, 'skuTopChoiceItem': true }">售价¥{{item.SalePrice}} &nbsp;{{item.Name}}</div>
									<uni-number-box :min="0" :max="Number(item.StoreQty)" :value="item.Stepper" @overlimit="overlimitParts(item.Stepper,index)" @change="bindChange($event,index)"></uni-number-box>
								</div>
							</view>
							<!-- 商品属性 -->
							<view class="" v-if="attribute.length >0 ">
								<view class="property" v-for="(item, index) in attribute" :key="index">
									<view class="title">
										<text class="name">{{ item.Name }}</text>
									</view>
									<view class="specBox">
										<view class="static" v-for="(value, index2) in item.Value" :key="value.Name" :class="isActiveName(value.Name)" @click="clickStatic(item, value,index2)">
											<view>
												{{value.Name}}
												<text v-if="value.Price && value.Price !='0'">￥{{value.Price}}</text>
											</view>											
										</view>
									</view>
								</view>
							</view>							
							<!-- <view class="skuTopInfoLimit" v-if="good.MaxBuyCnt&&good.MaxBuyCnt>0">(每人限购{{good.MaxBuyCnt}}件)</view> -->
						</view>
					</view>
				</scroll-view>
				<view class="action">
					<view class="left">
						<view v-if="good.MemberPrice&&good.SpecType=='1'">
							<text class="price" style="margin-right: 5px;">￥{{ good.MemberPrice }}</text>
							<text class="price" style="text-decoration: line-through;font-size: 8pt;color:#999;line-height: 10px;font-weight: 100;">￥{{ good.SalePrice }}</text>
						</view>
						<view class="" v-else>
							<view v-if="norms.length >0 || goodsPrice">
								<text class="price" style="margin-right: 5px;">￥{{ MemberPrice }}</text>
								<text class="price" style="text-decoration: line-through;font-size: 8pt;color:#999;line-height: 10px;font-weight: 100;">￥{{ goodsPrice }}</text>
							</view>
						</view>
						
						<view class="props">
							<text v-if="cooName.length>0">已选：{{ cooName }}</text>
							<text style="margin-left: 5px;" v-for="(item,index) in checkStatic" :key="index + 'a'">
								<text v-if="index > 0"></text>{{item.Value.Name}}
								<text v-if="item.Value.Price && item.Value.Price !=0">￥{{item.Value.Price}}</text>
							</text>
						</view>
					</view>
					<view class="btn-group">
						<div @tap="handlePropertyReduce">
							<view class="iconfont icon-jianhao" style="font-size: 25px;"></view>
						</div>
						<view class="number">{{ good.number }}</view>
						<div v-if="isStock">
							<view class="iconfont icon-add-fill" style="font-size: 22px;color: #b1b1b1;"></view>
						</div>
						<div @tap="handlePropertyAdd" v-else>
							<view class="iconfont icon-add-fill" style="font-size: 22px;color: #ADB838;"></view>
						</div>
					</view>
				</view>
				<view class="add-to-cart-btn" v-if="isStock" style="background-color: #b1b1b1;color: #fff;">					
					<view>{{isStock}}</view>
				</view>
				<view class="add-to-cart-btn" @tap="handleAddToCartInModal(good)" v-else>
					<view>加入购物车</view>
				</view>
			</modal>
			<!-- 商品详情模态框 end -->
			<!-- 购物车详情popup -->
			<popup-layer direction="top" :show-pop="cartPopupVisible" class="cart-popup">
				<template slot="content">
					<view class="top">
						<text @tap="handleCartClear">清空</text>
					</view>
					<scroll-view class="cart-list" scroll-y>
						<view class="wrapper">
							<view class="item" v-for="(item, index) in cart" :key="index">
								<view class="left">
									<view class="name">{{ item.Name }}</view>
								</view>
								<view class="center">
									<text>￥{{ item.SalePrice }}</text>
								</view>
								<view class="right">
									<div @tap="handleCartItemReduce(index,item)">
										<view class="iconfont icon-jianhao" style="font-size: 25px;"></view>
									</div>
									<view class="number">{{ item.BuyCnt }}</view>
									<div  @tap="handleCartItemAdd(index,item)">
										<view class="iconfont icon-add-fill" style="font-size: 22px;color: #ADB838;"></view>
									</div>
								</view>
							</view>
						</view>
					</scroll-view>
				</template>
			</popup-layer>
			<!-- 购物车详情popup -->			
		</view>
		<view>
			<tabBar :pagePath="'/pages/shoppingMall/menu_naixue/menu/menu'"></tabBar>
		</view>		
	</view>
</template>

<script>
	import modal from '@/components/modal/modal'
	import popupLayer from '@/components/popup-layer/popup-layer'
	import wx from 'weixin-js-sdk'
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"

	import {
		vipCard
	} from '@/api/http.js';
	export default {
		components: {
			modal,
			popupLayer,
			uniNumberBox
		},
		data() {
			return {
				goods: [], //所有商品
				ads:[],//轮播
				loading: true,
				currentCateId: 6905,//默认分类
				cateScrollTop: 0,
				menuScrollIntoView: '',
				cart: [], //购物车
				goodDetailModalVisible: false, //是否饮品详情模态框
				good: {}, //当前饮品
				category: {}, //当前饮品所在分类
				cartPopupVisible: false,
				sizeCalcState: false,
				currentStoreInfo:{},//用来接收门店信息
				addressName: {}, //地址名称
				attribute:[],//属性值
				norms:[],//规格
				currentIndex: 0,//规格默认
				currentIndex2:-1,//默认配件
				cooName:"",
				cooName2:"",
				MemberPrice:'',
				sizeSID:"",//多规格时商品SID
				sizeProdNo:"",//多规格时商品prodNo
				checkStatic:{}, //选择的口味
				isStock:'',//用来记录是否售罄
				name:'',//搜索
				partsList:[], //获取商品详情时接收的配件数组
				currentParts: [],
				goodsPrice:"",//选择规格尺寸的时候价格
				PartsArr : [],//用来接收选中的配件和数量数组
				PartsNoArr : [],//用来接收配件编号的
				currentTastArr:[]//用来接收选中的属性
			}
		},
		async onLoad(){			
			await this.init();
		},
		computed:{
			isActiveName () {
				return function (name) {
					for (let i of this.checkStatic) {
						if (name === i.Value.Name) {
							return 'isActive2'
						}
					}
					return ''
				}
			},
			goodCartNum() {	//计算单个饮品添加到购物车的数量
				return (id) => this.cart.reduce((acc, cur) => {
						if(cur.ProdSID === id) {
							
							return acc += cur.BuyCnt
						}
						return acc
					}, 0)
			},
			menuCartNum(){//菜单小角标
				return (SID) => this.cart.reduce((acc, cur) => {
						if(cur.CateSID === SID) {
							return acc += cur.BuyCnt
						}
						return acc
				}, 0)
			},
			getCartGoodsNumber() { //计算购物车总数
				return this.cart.reduce((acc, cur) => acc + cur.BuyCnt, 0)
			},
			getCartGoodsPrice() {	//计算购物车总价
				return parseFloat(this.cart.reduce((acc, cur) => acc + cur.BuyCnt * cur.SalePrice, 0).toFixed(2))
			},
			disabledPay() { //是否达到起送价
				return this.orderType == 'takeout' && (this.getCartGoodsPrice < this.store.min_price) ? true : false
			},
			spread() { //差多少元起送
				if(this.orderType != 'takeout') return
				return parseFloat((this.store.min_price - this.getCartGoodsPrice).toFixed(2))
			}
		},
		methods:{
			async init(){//页面初始化
				this.loading = true;
				// 获取门店列表
				if(this.$Route.query.flag =='Deflocation'){
					let currentStore = JSON.parse(localStorage.getItem('currentStoreInfo'))
					this.currentStoreInfo = {
						Name: currentStore.data.Name,
						Address: currentStore.data.Address,
						SID: currentStore.data.SID,
						Length:currentStore.data.Length
					}
				}else{
					if(this.$store.state.orderType === 'takein'){
						await this.getShopList();
					}
				}				
				// 获取商品列表
				await this.getTreeGoods();
				//获取轮播图列表
				await this.getLunBoImg();
				this.loading = false;
				this.cart = uni.getStorageSync('cart') || [];
				if(!this.addresses){
					this.addressName = JSON.parse(sessionStorage.getItem('takeOutAddress'))
				}else{
					this.addressName = JSON.parse(sessionStorage.getItem('takeOutAddress'))
				}
				// await this.getWxShare()
			},
			async getShopList() {// 获取门店
				let { Data } = await vipCard({
					Action: "GetShopList",
					Longitude: this.$store.state.currentLocation.longitude,//获取授权的经纬度
					Latitude: this.$store.state.currentLocation.latitude
				},"UShopOpera");
				this.currentStoreInfo = {
					Name: Data.ShopList[0].Name,	
					Address: Data.ShopList[0].Address,
					SID: Data.ShopList[0].SID,
					Length:Data.ShopList[0].Length,
					Longitude:Data.ShopList[0].Longitude,
					Latitude:Data.ShopList[0].Latitude
				}
				this.$store.commit("SET_CURRENT_STORE",this.currentStoreInfo);				
			},
			async getTreeGoods(){//获取商品树列表
				try {
					let { Data } = await vipCard({
						Action: "GetTreeProdList",
						SID:this.currentStoreInfo.SID,//门店id
						Name:this.name
					}, "UProdOpera");
					this.goods = Data.CateList;
				} catch (e) {
					console.log(e);
				}
			},
			async getLunBoImg(){// 轮播图
				try {
					let { Data } = await vipCard({
						Action: "GetImgList",
						Type:'4'
					}, "UShopOpera");
					this.ads = Data.BannerList;
				} catch (e) {
					console.log(e);
				}
			},
			serch(val){
				this.name = val.detail.value;
				this.getTreeGoods()
			},
			search2(){
				this.getTreeGoods()
			},
			clear(){
				this.name = "";
				this.getTreeGoods()
			},
			handleMenuTap(id){//点击左侧菜单项事件
				if(!this.sizeCalcState) { this.calcSize() }
				this.currentCateId = id
				this.$nextTick(() => this.cateScrollTop = this.goods.find(item => item.SID == id).top)
			},
			handleGoodsScroll({detail}) {	//商品列表滚动事件
				if(!this.sizeCalcState) { this.calcSize() }
				const {scrollTop} = detail
				let tabs = this.goods.filter(item=> item.top <= scrollTop).reverse()
				if(tabs.length > 0){
					this.currentCateId = tabs[0].id
				}
			},
			calcSize() {
				let h = 10				
				let view = uni.createSelectorQuery().select('#ads')
				view.fields({
					size: true
				}, data => {
					h += Math.floor(data.height)
				}).exec()
				
				this.goods.forEach(item => {
					let view = uni.createSelectorQuery().select(`#cate-${item.SID}`)
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
			handleAddToCart(cate,good,num){ // 单规格商品--加按钮 添加到购物车
				// console.log(cate,good,'添加按钮')
				const Buy = {
					BuyCnt: num
				}
				const index = this.cart.findIndex(item => {
					if(good.ParamInfo) {//ParamInfo代表商品属性
						return (item.SID === good.SID) && (item.Describe === good.Describe)
					} else {
						return item.SID === good.SID
					}
				})
				if(index > -1) {
					this.cart[index].BuyCnt += num
				} else {
					let obj = {}
					if(cate.SpecType == '2' || cate.SpecType == '3'){
						// const goodName = cate.Name +`-`+good.Name;
						obj = {						
							ProdNo:good.ProdNo,
							SpecType:cate.SpecType,
							BuyCnt: num,
							ProdSID: good.ProdSID,
							SpecSID:good.SID,//多规格的时候需要传规格里面商品sid
							Name: good.Name,
							SalePrice: good.MemberPrice?good.MemberPrice:good.SalePrice,
							Img: cate.Img,
							ProdType: 0,//0是商品，1是电子券
							PartsNo:this.PartsNoArr,//配件编号
							PartsList:this.PartsArr ? JSON.stringify(this.PartsArr) : [],//配件数组
							ParamInfo:this.currentTastArr
						}
					}else{
						obj = {						
							ProdNo:good.ProdNo,
							SpecType:good.SpecType,
							ParamInfo:this.currentTastArr,
							BuyCnt: num,
							PartsList: '',
							ProdSID: good.SID,							
							Name: good.Name,
							SalePrice: good.MemberPrice?good.MemberPrice:good.SalePrice,
							Img: good.Img,
							ProdType: 0,						
						}
					}
					// console.log(obj,'geuige')
					if(this.cart.length === 0){
						this.cart.push(obj);
					}else{
						let isHave = this.cart.some(val => {
							// console.log(obj,val)
							// return obj.ProdSID === val.ProdSID;
							if(obj.SpecType == '2'){
								return obj.ProdNo === val.ProdNo
							}else if(obj.SpecType == '3'){
								return 
							}else{
								return obj.ProdSID === val.ProdSID;
							}
							
						})
						if (isHave) { // 如果购物车已存在此商品
							// 找出购物车中已存在的商品  在BuyCnt进行加一
							const a = this.cart.findIndex(val => val.ProdSID === obj.ProdSID);
							this.cart[a].BuyCnt=this.cart[a].BuyCnt + 1
						} else {
							// 当购物车中不存在要添加的商品
							this.cart.push(obj);
						}
					}
				}
			},
			handleReduceFromCart(item,good){//普通商品--减按钮				
				const index = this.cart.findIndex(item => item.ProdSID === good.SID)
				this.cart[index].BuyCnt -= 1
				if(this.cart[index].BuyCnt <= 0) {
					this.cart.splice(index, 1)
				}
			},
			async showGoodDetailModal(item,good){//点击图片和选规格按钮时打开的模态框（商品详情）
				try {			
					let currentStore = JSON.parse(localStorage.getItem('currentStoreInfo'))
					let { Data } = await vipCard({
						Action: "GetProdInfo",
						SID:good.SID,
						ShopSID:currentStore.data.SID
					}, 
					"UProdOpera");
					
					let goodsInfo = Data.ProdInfo;
					if(goodsInfo.State !='1'){
						this.isStock = '已下架'
					}else if(goodsInfo.StockType != '0'){//判断库存数量
						if(goodsInfo.StoreQty <= '0'){
							this.isStock = '已售罄'
						}
					}					
					if(Data.SpecList){ //规格
						this.norms = Data.SpecList || [];
						this.goodsPrice = this.norms[0].SalePrice;//默认第一个商品价格
						this.MemberPrice = this.norms[0].MemberPrice;
						this.cooName = this.norms[0].Name;//
						// Math.max.apply(Math,this.norms.map(item => {return Number(item.SalePrice)}))
						
					};
					if(Data.AttributeList){//商品属性
						this.attribute = Data.AttributeList || [];
						this.checkStatic = this.attribute.map(item => {
							return {
								Name: item.Name,
								Value: {
									Name: "",
									Price: ""
								}
							}
						})
					};
					if(Data.PartsList){//配件
						this.partsList = Data.PartsList || [];
						this.partsList.forEach(D => {
							this.$set(D, "Stepper", 0);
						});
					}
						
					this.good = JSON.parse(JSON.stringify({ ...goodsInfo,number: 1}))
					this.category = JSON.parse(JSON.stringify(item))
					this.goodDetailModalVisible = true
				} catch (e) {
					// console.log(e);
					this.$toast(e)
				}
			},
			closeGoodDetailModal() { //关闭饮品详情模态框
				this.goodDetailModalVisible = false
				this.category = {}
				this.good = {}
			},
			getGoodSelectedProps(good, type = 'text') {	//计算当前饮品所选属性
				
			},
			handlePropertyAdd() {//加
				this.good.number += 1
			},
			handlePropertyReduce() {//减
				if(this.good.number === 1) return
				this.good.number -= 1
			},
			handleAddToCartInModal(good) {//模态框（商品详情）加入购物车按钮
				// const product = Object.assign({}, this.good, {Describe: this.getGoodSelectedProps(this.good), props: this.getGoodSelectedProps(this.good, 'id')})				
				// product.ProdNo = this.norms[0].ProdNo;
				// product.SpecSID = this.norms[0].SID;
				// this.handleAddToCart(this.category, product, this.good.number)
				// this.closeGoodDetailModal()				
				if (Number(this.good.StoreQty) < Number(this.valueStepper)) {
					this.$toast("商品库存不足！");
					return;
				}
				let boolParts = this.currentParts.every(D => {
					return Number(D.StoreQty) > 0;
				});
				if (!boolParts) {
					this.$toast("配件库存不足！");
					return;
				}
				// let PartsArr = [];
				// let PartsNoArr = [];
				if (this.currentParts.length > 0) {
					this.currentParts.forEach(D => {
						this.PartsArr.push({
							ProdNo: D.ProdNo,
							BuyCnt: D.Stepper
						});
						this.PartsNoArr.push(D.ProdNo);
					});
					this.PartsNoArr = this.PartsNoArr.join(",");
				} else {
					this.PartsArr = "";
					this.PartsNoArr = "";
				}
				if(good.SpecType === '1'){
					this.handleAddToCart(this.category,good, this.good.number)					
				}else{
					// console.log(good,this.norms[this.currentIndex])
					this.handleAddToCart(good,this.norms[this.currentIndex], this.good.number)
				}
				this.closeGoodDetailModal()
			},
			openCartPopup(){//打开/关闭购物车列表popup
				this.cartPopupVisible = !this.cartPopupVisible
			},
			handleCartItemAdd(index){//加
				this.cart[index].BuyCnt += 1
			},
			handleCartItemReduce(index){//减
				if(this.cart[index].BuyCnt === 1) {
					this.cart.splice(index, 1)
				} else {
					this.cart[index].BuyCnt -= 1
				}
				if(!this.cart.length) {
					this.cartPopupVisible = false
				}
			},
			
			handleCartClear() {	//清空购物车
				uni.showModal({
					title: '提示',
					content: '确定清空购物车么',
					success: ({confirm}) =>  {
						if(confirm) {
							this.cartPopupVisible = false
							this.cart = [];
							uni.removeStorageSync('cart')
						}
					}
				})
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
					obj.ProdList = JSON.parse(JSON.stringify(this.cart));
					// console.log(obj.ProdList)
					let currentItem = this.cart;
					if (currentItem.length > 0) {
						this.$store.commit("SET_CURRENT_CARD", currentItem);
						this.$Router.push({
							path: '/pages/shoppingMall/order/confirmOrder',
							query:{
								flag:'order'								
							}
						})
					}
				} catch (e) {
					console.log(e);
				}
				uni.hideLoading()
			},
			clickLeft() { // 头部返回
				this.$Router.push('/pages/shoppingMall/login')
			},
			// 点击自取和外卖时状态改变
			toziqu() {
				this.$store.commit("SET_ORDER_TYPE", 'takein');	
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
						flag: 'shop'
					}
				})
			},
			toAddress() {
				// if(this.$store.state.orderType == 'takeout') return
				this.$store.commit("SET_ORDER_TYPE", 'takeout');
				this.$Router.push({
					path: '/pages/myAddress/myAddress',
					query: {
						flag: 'towaimai'
					}
				})
			},
			// 切换选中规格
			skuTopChoice(i, item) {
				this.goodsPrice = item.SalePrice;
				this.cooName= item.Name;
				this.MemberPrice = item.MemberPrice;
				this.sizeSID = item.SID;
				this.sizeProdNo = item.ProdNo;
				if (this.currentIndex === i) {
					return;
				}
				this.currentIndex = i;
			},
			bindChange(e,i) {//选中配件
				if (e.inputValue > 0) {
					this.$set(this.partsList[i], "isActive", true);
				} else {
					this.$set(this.partsList[i], "isActive", false);
				}
				let arr = this.partsList
				arr.forEach(D => {
					arr[i].Stepper = e.inputValue;
				});
				let newarr = arr.filter(D => {
					return Number(D.Stepper) !== 0;
				});
				this.currentParts = sortArr("parts", newarr);
			},
			overlimitParts(e) {},
			clickStatic(item, value,key){//属性
				for (let i of this.checkStatic) {
					if (item.Name === i.Name) {
						if(i.Value.Name === value.Name){
							i.Value = {}
						}else {
							i.Value = value;
						}	
					}
				}
				if (this.checkStatic.length > 0) {
					this.currentTastArr = "";
					let sumPrice = 0 // 合计金额
					this.checkStatic.forEach(item => {
						sumPrice = Number(item.Value.Price)
						if (item.Value.Name) {
							this.currentTastArr  += item.Value.Name + (sumPrice===0?'': `￥${sumPrice}`)+",";
						}
					});
					this.currentTastArr = this.currentTastArr.substring(0, this.currentTastArr.length - 1)
				}
		// 		if (this.checkStatic.length > 0) {
		//           this.currentTastArr = "";
		//           let sumPrice = 0 // 合计金额
		//           let arr = []
		//           this.checkStatic.forEach(item => {
		//             sumPrice += Number(item.Value.Price)
		// 			if (item.Value.Name) {
		// 				arr.push(item.Value.Name)
		// 			}
		//             
		//             // this.currentTastArr.push(item.Value.Name+`￥`+item.Value.Price);
		//           });
					
		//           this.currentTastArr = arr.join(",");
		// //           this.currentTastArr = this.currentTastArr + `￥${sumPrice}`
		// 		  this.currentTastArr = sumPrice===0?this.currentTastArr: this.currentTastArr + `￥${sumPrice}`
		//         }
			},
			async getWxShare(){
				try {
					let {
						Data
					} = await vipCard({
						Action: "GetJSSDK",
						Url: window.location.href
					}, "UProdOpera");
					
					wx.config({
						debug: false,
						appId: 'wxb7a2e9fc043daf1c',
						timestamp: Data.SDK.timestamp,
						nonceStr: Data.SDK.noncestr,
						signature: Data.SDK.signature,
						jsApiList: ["onMenuShareAppMessage","onMenuShareTimeline"]
					});
					wx.ready(res => {
						console.log(res)
					})
					wx.error(function(res) {
						console.log(res)
					});
				} catch (e) {
				}
			},
			share(){//配置分享内容
				let urlLink = window.location.href;
				window.share_config = {
					share:{
						title:'这个是分享展示卡片的标题',
						dest:'这个是分享展示的说明',
						link:urlLink,
						imgUrl:'',
						success:function(res){
							console.log('成功'+JSON.stringify(res))
						},
						cancel:function(err){
							console.log('失败'+JSON.stringify(err))
						}
					}					
				};
				wx.ready(function(){
					wx.onMenuShareAppMessage(window.share_config.share);//微信好友
					wx.onMenuShareTimeline(window.share_config.share)//微信朋友圈
				});
				wx.error(function(res){
					console.log(res)
				});
			}
		},
		// filters:{
		// 	imgFilter(val){
		// 		let localUrl = window.location.href;
		// 		let localToken =localUrl.split("#")[0]
		// 		return `http://dingtalk.bak365.cn/WeixinNew/Dist/../` + val
		// 	}
		// }
	}
	function sortArr(type, Arr) {
		function compare(type) {
			let property = null;
			if (type === "parts") {
				//配件
				property = "ProdNo";
				return function(a, b) {
					let value1 = a[property];
					let value2 = b[property];
					return value1 - value2;
				};
			} else {
				property = "Name";
				return function(a, b) {
					return a[property].localeCompare(b[property], "zh-CN");
				};
			}
		}
	
		// 目前是以 id属性排序 ProdNo
		Arr = Arr.sort(compare(type));
		// console.log(Arr, "Arr");
		return Arr;
	}
</script>

<style lang="scss">
	@import '@/pages/shoppingMall/menu_naixue/menu/menu.scss';
	.container{
		margin-bottom: 50px;
	}
	.specBox{
		display: flex;
		.static{
			display: inline-block;
			border-radius: 4px;
			background-color: #F5F5F5;
			padding: 8px 7px;
			font-size: 13px;
			color: #919293;
			margin-right: 8px;
			margin-bottom: 8px;
			width: auto;
			text-align: center;
		}
		.isActive,.isActive2,.isActive3 {
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
	.skuTopChoiceItem {
		display: inline-block;
		/*min-width: 40px;*/
		margin: 0 12px 12px 0;
		overflow: hidden;
		color: #323233;
		font-size: 13px;
		line-height: 16px;
		vertical-align: middle;
		border-radius: 4px;
		padding: 8px;
		background: #f7f8fa;
	}
	
	.partsStyle {
		display: flex;
	
		.partsStepper {
			flex: 1;
			justify-content: flex-end;
		}
	
		.skuTopChoiceItem {
			display: inline-block;
			margin: 0 12px 12px 0;
			overflow: hidden;
			color: #323233;
			font-size: 13px;
			line-height: 16px;
			vertical-align: middle;
			border-radius: 4px;
			padding: 8px;
			background: #f7f8fa;
		}
		.isActive,.isActive2,.isActive3 {
			background-color: #ADB838;
			color: #ffffff;
		}
	}
</style>
