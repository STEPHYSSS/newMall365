<template>
	<div class="confirm-order-style" style="padding-bottom: 50px;" :class="mainStyle">
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickLeft" title="确认订单" :status-bar="true" :shadow="false"></uni-nav-bar>
		<a-nodeData stringVal="获取数据失败" v-if="!loading&&prodList.length===0"></a-nodeData>
		<div v-if="prodList.length>0">
			<!-- 展示地址的位置 -->
			<div @click="radioChange" v-if="!$Route.query.isIntegral">
				<div class="order-area">
					<div class="order-area-icon">
						<image src="/static/assets/img/weizhi.png" alt />
					</div>
					<div v-if="currentArea&&JSON.stringify(currentArea) !== '{}'" style="flex: 1">
						<div>
							<span>{{currentArea.Name}}{{currentArea.Sex | setSex2}}</span>
							<span class="order-area-phone">{{currentArea.Mobile?currentArea.Mobile:currentArea.Tel}}</span>
						</div>
						<div class="order-area-location">{{currentArea.Address}}&nbsp;{{currentArea.House}}&nbsp;</div>
					</div>
					<div v-else style="flex: 1;margin:auto;font-size:14px;color:#909090">
						选择{{radioModes ===
					2?'收货':'取货'}}地址
					</div>
				</div>
			</div>
			<adCell text="门店自取" showArrow="false" v-if="$Route.query.isIntegral" />
			<div class="setADcell" v-if="radioModes === 1">
				<adCell text="姓名" showArrow="false">
					<input type="text" placeholder="请输入收件名字" v-model="name_user">
					<text class="iconfont icon-tongxunlu" @click="getAddress"></text>
				</adCell>
				<adCell text="手机号码" showArrow="false">
					<input type="text" placeholder="请输入手机号码" v-model="phone_user">
				</adCell>
				<adCell @click="clickDataTime" :text="radioModes === 1?'选择自取时间':'选择收货时间'" showArrow="false" v-if="prodList[0].DeliveryType&&!(prodList[0].DeliveryType.indexOf('3')>-1&&radioModes === 2)">
					<view class="customView">
						{{UserTime}}
					</view>
				</adCell>
				<adCell text="备注留言" showArrow="false" showBottomLine="false">
					<input type="text" placeholder="请输入留言" v-model="UserRemarks">
				</adCell>
			</div>
			<!-- 商品信息 -->
			<div class="good_card_box">
				<div v-for="(item,index) in prodList" :key="index" style="margin-bottom:10px">					
					<lineBoxConfirm :itemData="item" :isOrder="true" :isIntegral="$Route.query.isIntegral?true:false"></lineBoxConfirm>
				</div>
			</div>
			<!-- 优惠方案、电子券、会员权益 -->
			<!-- <adCell :text="UserDiscountName" detail="优惠方案" @click="clickUserDiscount" v-if="DiscountList.length>0" />			
			<adCell :text="UserTicketName" detail="可用电子券" @click="clickUserTicketName" v-if="TicketList.length>0"/>
			<adCell :text="interestName" detail="会员权益" @click="clickinterestName" v-if="BeneList.length>0" /> -->
			<div class="couponBox">
				<div class="coupon1" @click="clickUserTicketName" v-if="TicketList.length>0">
					<p class="couponName">优惠券</p>
					<p class="couponRight">{{UserTicketName}}<span class="iconfont icon-jiantou"></span></p>
				</div>
				<div class="coupon1" @click="clickinterestName" v-if="BeneList.length>0">
					<p class="couponName">会员权益</p>
					<p class="couponRight">{{interestName}}<span class="iconfont icon-jiantou"></span></p>
				</div>
				<div class="coupon1" @click="clickUserDiscount" v-if="DiscountList.length>0">
					<p class="couponName">优惠方案</p>
					<p class="couponRight">{{UserDiscountName}}<span class="iconfont icon-jiantou"></span></p>
				</div>
			</div>
			<adCell v-if="radioModes === 2" text="运费" showArrow="false" showBottomLine="false">
				<span>{{freight=='0'?'免运费':'¥'+freight}}</span>
			</adCell>
			<view class="FloatListInfo" v-if="FloatList.length>0">
				<view v-for="(item,index) in FloatList" :key="index">
					<view v-show="DiscPrice>='0'" class="onlySty Discount">
						<view style="flex: 1;">
							<span v-show="item.Type === '2'">卡优惠</span>
							<span v-show="item.Type === '3'">{{UserTicketName}}</span>
							<span v-show="item.Type === '4'">{{UserDiscountName}}</span>
							<span v-show="item.Type === '5'">{{interestName}}</span>
						</view>
						<view style="width: 100px;text-align: center;">
							<span class="" style="padding-left: 5px;">- ¥ {{item.Float}}</span>
							
						</view>
					</view>					
				</view>
				<view class="">
					<view  v-show="TicketPrice>0" class="onlySty Discount">
						<view style="flex: 1;">
							<span style="">{{UserTicketName}}</span>
						</view>
						<view style="width: 100px;text-align: center;">
							<span class="" style="padding-left: 5px;" >- ¥ {{TicketPrice}}</span>
							
						</view>
					</view>	
				</view>
			</view>
			<view v-if="total>0" class="onlySty onlyPrice">
				<view style="flex: 1;">
					<span>总计 ¥ {{ProdTotal}}</span> <span style="display: inline-block;margin-left: 10px;" v-if="sumPrice>0">优惠 ¥ {{sumPrice}}</span>
				</view>
				<view style="width: 110px;text-align: center;">
					实付<span style="padding-left: 5px;color: #ff8917;">¥ {{total}}</span>
				</view>
			</view>
			
			<!-- <div class="total-style">
				<span>
					小计：
					<span class="total-style__color">
						<span>￥{{total}}</span> -->
						<!-- <span v-if="allData.ScoreTotal">{{allData.ScoreTotal|spliceNum}}积分</span>
						<span v-if="totalCurrent>0 && radioModes === 1">¥{{ProdTotal |spliceNum}}</span>
						<span v-else>{{totalCurrent>0&&allData.ScoreTotal?'+':''}}¥{{totalCurrent |spliceNum}}</span> -->
					<!-- </span>
				</span>
			</div> -->

			<div class="radio-group-play">
				<div style="padding-bottom: 4px" v-if="$Route.query.isIntegral&&allData.CardInfo">当前卡积分：{{allData.CardInfo.Score}}</div>
				<div v-if="ScoreDeduction>0">
					<img class="wechat" src="@/static/assets/img/moneyPay.png" slot="right-icon" />
					<span class="custom-title">可用{{ScoreDeduction}}积分，抵用{{ScoreAmt}}元</span>
					<view style="float: right;">
						<checkbox-group @change="checkChange">
							<label>
								<checkbox value="0" :checked="allck" color="#FFCC33" style="transform:scale(0.7)" />
							</label>
						</checkbox-group>
					</view>
				</div>
				<view class="payStyle">支付方式</view>
				<radio-group @change="radioPayChange">
					<div v-if="(allData.SalePriceTotal&&$Route.query.isIntegral)||!$Route.query.isIntegral">
						<div v-if="allData.hasOwnProperty('CardInfo')" class="radio-group-item" @click="PayTypeClick('1')">
							<div>
								<img class="wechat" src="@/static/assets/img/moneyPay.png" slot="right-icon" />
								<span class="custom-title">卡支付（余额:{{CardInfo.Balance}}）</span>
							</div>
							<div style="flex:1;text-align: right;">
								<radio style="" slot="right-icon" value="1" :checked="radioPayType == '1'" v-if="Number(CardInfo.Balance)>=totalCurrent" />
								<span class="summaryNum" style="color:#777" v-else>余额不足</span>
							</div>
						</div>
						<div @click="PayTypeClick('2')" class="radio-group-item" v-if="$Route.query.isIntegral?allData.CardInfo?true:false:true">
							<div>
								<img class="wechat" src="@/static/assets/img/weixinPay.png">
								<span class="custom-title">微信支付</span>
							</div>
							<radio style="flex:1;text-align: right;" slot="right-icon" value="2" :checked="radioPayType == '2'" />
						</div>
					</div>
				</radio-group>
			</div>
			<!-- <a-bottomSubmit :isOrder="true" :allMoney="totalCurrent" :isType="radioModes" :ziquSumMoney="total" :scoreTatal="totalCurrentScore"
			 :cardInfo="allData.CardInfo" @submitMoney="submitMoney" :isIntegral="$Route.query.isIntegral"></a-bottomSubmit> -->
			<a-bottomSubmit :isOrder="true" :objPrice = "objPrice" :isType="radioModes" :scoreTatal="totalCurrentScore"
			 :cardInfo="allData.CardInfo" @submitMoney="submitMoney" :isIntegral="$Route.query.isIntegral"></a-bottomSubmit>
		</div>

		<div class="changeAreaStyle">
			<uni-popup ref="showAreaList" v-model="showAreaList" type="bottom">
				<div class="confirm-order-popup">
					<div class="top">
						<span class="cancel" @click="$refs.showAreaList.close()">取消</span>
						<span>选择地址</span>
					</div>
					<radio-group class="bottom-area" ref="checkboxAreaRef" @change="changeGroup">
						<div v-for="(item,index) in areaList" :key="index" class="bottom-area__box" @click="changeArea(item,index)">
							<!-- <radio :value="item.SID" class="checkbox-my" :checked="showAreaList == item.SID"></radio> -->
							<radio :value="item.SID" class="checkbox-my" :checked="item.SID === showSID"></radio>
							<!-- <radio :value="item.PrefNo" :checked="item.PrefNo === radioDiscount" /> -->
							<div class="bottom-area__info">
								<div>{{item.Address}}&nbsp;{{item.House}}</div>
								<div class="bottom-area__phone">
									{{item.Name}}
									<span v-if="item.Sex">{{item.Sex | setSex2}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
									<span>{{item.Mobile?item.Mobile:item.Tel}}</span>
								</div>
							</div>
							<span v-if="radioModes===2" class="icon iconfont icon-bianji bottom-area__icon" @click.stop="clickEdit(item)"></span>
						</div>
					</radio-group>
					<div class="bottom-area__add" v-if="radioModes===2" @click="areaSet">
						<uni-icons type="plus" style="vertical-align: middle;font-size: 18px;margin-right: 6px" class="colorStyle" />
						<span style="vertical-align: middle">新增收货地址</span>
					</div>
				</div>
			</uni-popup>
		</div>
		<!-- 编辑地址 -->
		<uni-popup ref="addEditArea" v-model="addEditArea" position="bottom" class="confirm-area-popup">
			<a-receive-address v-if="addEditArea" @clickGo="clickGo" :radioModes="radioModes" :areaInfo="areaInfo" @saveArea="saveAreaSet"
			 :currentDeliveryType="currentDeliveryType"></a-receive-address>
		</uni-popup>
		<!-- 选择时间 -->
		<uni-popup ref="selectTime" v-model="selectTime" type="bottom" style="max-height:50%">
			<div class="confirm-selectTime-popup">
				<div class="leftNavsidebar">
					<scroll-view class="menus" :scroll-into-view="menuScrollIntoView" scroll-with-animation scroll-y>
						<view :class="['homepageLeftFixed']">
							<view v-for="(item,index) in sidebarList" :key="index" :class="['homepageLeft',index===currentIndex?'activeCanteen':'']"
							 @click="changeSider(index)">
								{{item}}
							</view>
						</view>
					</scroll-view>
				</div>
			</div>
			<div class="rightTime" v-if="rightTimeList.length>0">
				<scroll-view class="menus" :scroll-into-view="menuScrollIntoView" scroll-with-animation scroll-y>
					<radio-group @change="radioTimeFun">
						<div v-for="(item,index) in rightTimeList" :key="index" :border="false">
							<ad-cell :text="item" @click="rightTimeClick(item)" showArrow="false" showBottomLine="false" style="width: 100%;">
								<radio :value="item" :checked="radioTime == item"></radio>
							</ad-cell>
						</div>
					</radio-group>
				</scroll-view>
			</div>
		</uni-popup>
		<!-- 优惠方案弹窗 -->
		<uni-popup ref="discountProgram" type="bottom">
			<radio-group @change="setDiscountClick">
				<ad-cell text="暂不使用" @click="DiscountClick('undefined')" showArrow="false">
					<radio style="display: inline-block;vertical-align: middle;margin-left:20px" value="undefined" :checked="'undefined' === radioDiscount" />
				</ad-cell>
				<div v-for="(item,index) in DiscountList" :key="index">
					<adCell :text="item.PrefName" showArrow="false" showBottomLine="false" @click="DiscountClick(item,1)">
						<radio :value="item.PrefNo" :checked="item.PrefNo === radioDiscount" />
					</adCell>
				</div>
			</radio-group>
		</uni-popup>
		<!-- 电子券弹窗 -->
		<uni-popup ref="ticketProgram" type="bottom" style="max-height:50%">
			<div >
				<scroll-view class="menus" :scroll-into-view="menuScrollIntoView" scroll-with-animation scroll-y>
					<radio-group @change="setTicketClick">
						<ad-cell text="暂不使用" @click="ticketClick('undefined')" showArrow="false">
							<radio style="display: inline-block;vertical-align: middle;margin-left:20px" value="undefined" :checked="'undefined' === radioTicket" />
						</ad-cell>
						<div v-for="(item,index) in TicketList" :key="index">
							<adCell :text="item.TicketName" showArrow="false" showBottomLine="false" @click="ticketClick(item,1)">
								<radio :value="item.TicketNo" :checked="item.TicketNo === radioTicket" />
							</adCell>
						</div>
					</radio-group>
				</scroll-view>
			</div>		
		</uni-popup>
		<!-- 权益弹窗 radioBene-->
		<uni-popup ref="interestProgram" type="bottom" style="max-height:50%">
			<div>
				<scroll-view class="menus" :scroll-into-view="menuScrollIntoView" scroll-with-animation scroll-y>
					<radio-group @change="setBeneClick">
						<ad-cell text="暂不使用" @click="beneClick('undefined')" showArrow="false">
							<radio style="display: inline-block;vertical-align: middle;margin-left:20px" value="undefined" :checked="'undefined' === radioBene" />
						</ad-cell>
						<div v-for="(item,index) in BeneList" :key="index">
							<adCell :text="item.BeneName" showArrow="false" showBottomLine="false" @click="beneClick(item,1)">
								<radio :value="item.BeneSID" :checked="item.BeneSID === radioBene" />
							</adCell>
						</div>
					</radio-group>
				</scroll-view>
			</div>		
		</uni-popup>
		<!-- 微卡支付弹窗 -->
		<uni-popup ref="payTypePop" type="center">
			<view style="width: 300px;background-color: #FFFFFF;height: auto;border-radius: 5x;">
				<div class="block block-form margin-bottom-normal">
					<div class="block-item">
						<div class="label" style="text-indent:10px;">微卡余额</div>
						<span type="digit" style="padding-left:10px;" name="balance" disabled="true">{{CardInfo.Balance}}</span>
					</div>
					<div class="block-item" v-if="CardInfo.Score">
						<div class="label" style="text-indent:10px;">积分余额</div>
						<span type="digit" style="padding-left:10px;" name="payScore" disabled="true">{{CardInfo.Score}}</span>
					</div>
					<div class="block-item">
						<div class="label" style="text-indent:10px;">本次支付</div>
						<span style="padding-left:10px;">{{total}}</span>
					</div>
					<div class="block-item" v-if="CardInfo.IsPass==='1'&&radioPayType==='1'">
						<div class="label" style="text-indent:10px;">微卡密码</div>
						<input type="password" style="padding-left:10px;width: 160px;" placeholder="请输入密码" name="password" v-model="password" />
					</div>
				</div>
				<div class="button-theme-big" style="padding-bottom: 20px;">
					 <!-- :disabled="isDisabled" -->
					<button @click="OrderCardPay" :disabled="isDisabled" class="btn-pay btn btn-block btn-large btn-codpay">确认支付</button>
				</div>
			</view>
		</uni-popup>
	</div>
</template>

<script>
	import {
		vipCard
	} from "@/api/http.js";
	// import receiveAddress from "@/components/receiveAddress";
	import {
		getTime,
		checkMobile,
		weChatPayment,
		setUrlDelCode
	} from "@/util/publicFunction";
	import wx from 'weixin-js-sdk'
	// import Mixins from "../mixins.js";
	import adCell from '@/node_modules/adcell/ADCell.vue';
	import lineBoxConfirm from '@/components/a-good-lineBox/a-good-lineBoxConfirm'
	import Cookies from '@/config/cookie-my/index.js';
	export default {
		name: "confirmOrder",
		// mixins: [Mixins],
		components: {
			// receiveAddress
			adCell,
			lineBoxConfirm
		},
		computed:{
			computedSumTotal(){
				return this.total
			},
			sumPrice(){
				this.money = Number(this.objPrice.DiscPrice)+Number(this.objPrice.TicketPrice);
				return this.money
			}
		},
		data() {
			return {
				mainStyle: getApp().globalData.mainStyle,
				mainColor: getApp().globalData.mainColor,
				isDisabled:false,
				loading: true,
				money:0,
				isActive:false,
				hideFloat:false,
				ProdJsonList:[],//用来存储商品数据
				currentItem: [],//用来接收商品信息的ProdList
				UserRemarks: "",
				UserTime: "",
				UserDiscount: "",
				UserDiscountName: "请选择方案",
				UserTicketName: '请选择电子券', //电子券名称
				interestName:'请选择权益',
				// 当前选择的地址
				showSID:'',
				currentArea: {},
				radioModes: 2,
				prodList: [],
				showAreaList: false,
				addEditArea: false,
				selectTime: false,
				discountProgram: false,
				ticketProgram: false, //电子券ref
				payTypePop: false, //微卡支付弹窗
				interestProgram:false,//权益ref
				resultArea: "",
				areaList: [], //弹出窗地址渲染列表
				DeliveryAreaList: [],
				// 收货地址
				takeOver: [],
				// 运费
				freight: 0,
				// 总金额
				total: 0,
				totalCurrent: 0,
				activeKey: 0,
				sidebarList: [],//左侧日期段
				rightTimeList: [],//右侧时间段
				radioTime: "",
				radioPayType: "1",
				// 卡信息
				CardInfo: {},
				// 自取时候用户电话
				phone_user: "",
				name_user: "",
				orderId: "",
				// 购物车列表sid
				cardSids: [],
				ProdTotal: 0,
				
				// 整天的时间段
				allTimeSlot: [],
				// 记录时间段
				RecordTime: {},
				// 编辑的地址
				areaInfo: {},
				//当前的配送类型
				currentDeliveryType: "",
				testData: {},
				allData: {},
				totalCurrentScore: 0,
				currentIndex: 0,
				location: {
					// longitude: 30.47988,
					// latitude: 114.41739
				},
				takeDeliveryTpey: '',				
				isMember: localStorage.getItem('isMember'),
				password: "", //微卡支付密码
				IsPass: "",
				ScoreDeduction: '', //可用积分
				ScoreAmt: '', //抵扣金额
				allck: true, //初始化选中
				menuScrollIntoView: '',
				CardType: localStorage.getItem('CardType'),
				// 弹窗字段
				// 优惠方案id
				radioDiscount: "",//优惠方案的（用作传给后台）
				DiscountList: [],
				DiscPrice: '', //优惠价格
				// PrefNo: '', //点击优惠方案编号 
				TicketPrice: '', //电子券价格
				// TicketNo: '', //点击电子券编号
				TicketList: [], //电子券列表
				radioTicket: "", //选中电子券sid
				BeneList:[],//权益列表
				BeneNo:'',//点击权益编号
				radioBene:"",//选中权益sid
				objPrice:{},//用于传递数据
				FloatList:[],//用于展示优惠明细
			};
		},
		async created() {
			if (
				!this.$store.state.currentCard ||
				this.$store.state.currentCard.length === 0
			) {
				this.$Router.back(2)
				this.$Router.back(100)
				// window.history.go(-1);
			}
			// if (this.isMember === '0' || this.isMember == undefined || this.isMember == null) {
			// 	this.radioPayType = "2"
			// }
			if(this.CardType === '0'){
				this.radioPayType = "2"
			}
			// 获取授权地址
			await this.getWxConfig();
			let item = this.$store.state.currentCard || [];
			item.forEach(D => {
				if (D.SID) {
					this.cardSids.push(D.SID);
				}
				if (D.PartsNo instanceof Array) {
					let arr = [];
					let newArr = JSON.parse(JSON.stringify(D.PartsNo));
					newArr.forEach(data => {
						arr.push(data.ProdNo);
					});
					D.PartsNo = arr.join(",");
				}
			});
			this.ProdJsonList = JSON.stringify(item);
			this.currentItem = JSON.stringify(item);
			this.cardSids = this.cardSids ? this.cardSids.join(",") : "";
			if (this.$Route.query.isIntegral) {
				await this.getInfoIntegral();
			} else {
				await this.getInfo();
			}
		},
		mounted() {
			if (this.$store.state.orderType === 'takein') {
				this.radioModes = 1;
				this.takeDeliveryTpey = '1'
				let currentStore = JSON.parse(localStorage.getItem('currentStoreInfo'))
				this.currentArea = currentStore.data;
			} else {
				this.takeDeliveryTpey = '2'
				this.currentArea = JSON.parse(sessionStorage.getItem('takeOutAddress'))
			}
		},
		methods: {
			// 从商品下单的信息
			async getInfo() {
				this.loading = true;
				uni.showLoading()
				try {
					// if (!this.location.longitude) {
					// 	uni.showToast({
					// 		title: '地址获取失败',
					// 		icon: 'none'
					// 	});
					// 	throw "地址获取失败";
					// }
					let currentItems = JSON.parse(this.currentItem);
					let shopLong = "";
					let shopLat = "";
					if (this.$store.state.orderType === 'takein') {
						shopLong = this.$store.state.currentLocation.longitude ? this.$store.state.currentLocation.longitude : '';
						shopLat = this.$store.state.currentLocation.latitude ? this.$store.state.currentLocation.latitude : '';
					}
					let currentStore = JSON.parse(localStorage.getItem('currentStoreInfo'))
					// 自取的时候传递的经纬度是授权的经纬度，如果是外卖的时候传递的经纬度就是收货地址的经纬度
					let obj = {
						Action: "SettlePay",
						ProdList: this.currentItem,
						Longitude: this.$store.state.orderType === 'takein' ? shopLong : this.currentArea.Longitude,
						Latitude: this.$store.state.orderType === 'takein' ? shopLat : this.currentArea.Latitude,
						DeliveryType: this.takeDeliveryTpey,
						ShopSID: currentStore?currentStore.data.SID:'',
						PayType: this.radioPayType //传给后台来判断优惠方案的
						// DeliveryType: this.currentDeliveryType						
					};
					if (currentItems[0].hasOwnProperty("PromotionItemSID")) {
						// 活动
						obj.PromotionItemSID = currentItems[0].PromotionItemSID;
					}
					Promise.all([this.saveArea(true), vipCard(obj, "UProdOpera")])
						.then(res => {
							if (res[1].Success == false) {
								uni.showToast({
									title: res[1].message,
									icon: 'none'
								});
							}
							this.takeOver = res[0];
							let Data = res[1].Data;
							this.allData = Data;
							this.prodList = Data.ProdList;
							this.currentItem = JSON.parse(JSON.stringify(this.prodList));
							this.currentDeliveryType = Data.ProdList[0].DeliveryType; //选择第一个商品的配送方式
							if (this.radioModes === 1) {
								this.areaList = Data.ShopInfoList;
							} else {
								this.areaList = Data.AddressList
							}
							// 自取时默认填写手机号
							if (this.takeDeliveryTpey === '1' && Data.AddressList.length > 0) {
								this.name_user = Data.AddressList[0].Name;
								this.phone_user = Data.AddressList[0].Mobile;
							}
							this.currentItem.forEach(D => {
								if (D.PartsList) {
									D.PartsList = JSON.stringify(D.PartsList);
								}
							});						
							if (Data.hasOwnProperty('CardInfo')) {
								this.IsPass = Data.CardInfo.IsPass ? Data.CardInfo.IsPass : ''
							}
							this.ScoreDeduction = Data.ScoreDeduction; //可用积分
							this.ScoreAmt = Data.ScoreAmt; //抵扣金额
							this.CardInfo = Data.CardInfo; //卡信息
							this.freight = Data.Freight; //运费
							this.DiscPrice = Data.DiscPrice; //优惠价格
							this.TicketList = Data.TicketList || []; //电子券列表
							this.TicketPrice = Data.TicketPrice; //电子券价格
							this.DiscountList = Data.DiscList || []; //优惠方案列表
							this.BeneList = Data.BeneList || [];//权益列表
							if (this.TicketList.length > 0) {
								this.radioTicket = this.TicketList[0].TicketNo;
								this.UserTicketName = this.TicketList[0].TicketName;
							}
							if (this.DiscountList.length > 0) {
								this.radioDiscount = this.DiscountList[0].PrefNo;
								this.UserDiscountName = this.DiscountList[0].PrefName;
							}
							if(this.BeneList.length>0){//会员权益
								this.radioBene = this.BeneList[0].BeneSID;
								this.interestName = this.BeneList[0].BeneName;
							}
							this.total = Data.SumTotal;
							this.ProdTotal = Data.ProdTotal;
							this.totalCurrent = parseFloat(Number(Data.SumTotal).toFixed(2));
							this.objPrice={
								total:this.total,								
								TicketPrice:this.TicketPrice,
								DiscPrice:this.DiscPrice
							}
							this.FloatList = Data.FloatList;
							this.CardInfo = Data.hasOwnProperty("CardInfo") ?
								Data.CardInfo : {};
							if (JSON.stringify(this.CardInfo) !== "{}") {
								if (Number(Data.CardInfo.Balance) < Number(Data.SumTotal)) {
									//余额不足默认微信支付
									this.radioPayType = "2";
								}
							} else {
								this.radioPayType = "2";
							}
							this.DeliveryAreaList = Data.ShopInfoList;
							//提前预约时间
							
							let FinTypeDay = '';//时间 当FinType==2&&FinHour>0就代表这有提前时间
							let FinTypeHour = '';//时间 当FinType==2&&FinHour>0就代表这有提前时间 FinHour小时或者天数
							let FinTypeCun =""
							if (this.prodList.length > 0) {
								this.prodList.forEach((D, index) => {
									if (D.DeliveryType && D.DeliveryType !== "") {
										D.DeliveryType = D.DeliveryType.split(",");
									}
									if(D.FinType==='1'&&D.FinHour>0){
										FinTypeDay = Math.max.apply(Math, this.prodList.map(item => {
											return Number(item.FinHour)
										}))
										 FinTypeCun = D.FinType
									}else{
										FinTypeHour = Math.max.apply(Math, this.prodList.map(item => {
											return Number(item.FinHour)
										}))
										FinTypeCun = D.FinType
									}
									
								});
							}
							let num = Number(Data.ShopBase.ScopeDay);//获取商城的提货期限 后台默认7天
							let dayAdvance = 0;//提前天数
							let tAdvance = 0;//提前时间
							let advanceTime = 0;//日期 当FinType==1&&FinHour>0就代表这有提前日期
							//提前的时间+当前的时间>下班时间 的情况下就延迟到第二天
							let endTime = countDown(Data.ShopBase.EndTime); //商城结束时间秒数
							let startTime = countDown(Data.ShopBase.StartTime);//商城开始时间秒数
							let cutTime = countDown(getTime(false, false, true));//获取当前电脑时间
							let acTime = Number(FinTypeHour) * 60 * 60;//提前小时
							if(FinTypeCun==='2'){//类型等于小时的时候
								let dayTime = parseInt(Data.ShopBase.EndTime) - parseInt(Data.ShopBase.StartTime)//一天营业时间
								let mallTime = (acTime-(endTime - cutTime));
								let time = Number(FinTypeHour)/dayTime;
								let time2 = Number(FinTypeHour)%dayTime;
								let splitTime = parseInt(time);
								if ((acTime + cutTime).toFixed(2) > endTime) {//如果提前的小时+当前时间> 商城结束时间
									FinTypeDay = Number(FinTypeDay) + splitTime;//就从第二天开始
									
									tAdvance = Number(FinTypeHour);//提前小时
								} else {
									tAdvance = Number(FinTypeHour);
									FinTypeDay = 0;
								}
							}else {
								if(cutTime>endTime){
									FinTypeDay = Number(FinTypeDay)+1
								}
							}
							if(FinTypeCun==='2'){//类型等于小时的时候
								/*
									
								*/ 
							   let mallTime = (acTime-(endTime - cutTime));
							}
							// 拿到天数之后调用setChangeData方法算出列表
							this.sidebarList = setChangeData(num, FinTypeDay); //左侧的天数
							let { arr, arrToday } = setChangeTime( Data.ShopBase, tAdvance, FinTypeDay );
							this.allTimeSlot = arr; //总的右侧时间间隔
							let arrTime = [];
							for (let i = 0; i < arrToday.length-1; i++) {
								arrTime.push(arrToday[i]+'-'+arrToday[i+1])								
							}
							this.rightTimeList = arrTime;
							this.todayTimeSlot = arrTime; //今天的右侧时间间隔
							
							// this.rightTimeList = arrToday; //当前页面的右侧时间间隔 ///暂时注释
							
							this.radioTime = arrTime[0];
							this.RecordTime = {
								radioTime: arrTime[0],
								index: 0
							};
							this.UserTime = this.sidebarList[this.activeKey] + " " + this.radioTime;
							this.loading = false;
							uni.hideLoading()
						})
						.catch(e => {
							this.$toast(e);
							this.loading = false;
							uni.hideLoading()
						});
				} catch (e) {
					this.loading = false;
					uni.hideLoading()
				}
			},
			async getInfoIntegral() { //积分活动商品信息
				try {
					uni.showLoading()
					let {
						Data
					} = await vipCard({
							Action: "SettlePay",
							ProdList: this.currentItem
						},
						"UIntegralOpera"
					);
					this.prodList = Data.ProdList;
					this.allData = Data;
					this.CardInfo = Data.CardInfo;
					this.currentItem = JSON.parse(JSON.stringify(this.prodList));
					this.totalCurrent = parseFloat(Number(Data.SalePriceTotal).toFixed(2));
					if (Data.ScoreTotal) {
						this.totalCurrentScore =
							parseFloat(Number(Data.ScoreTotal).toFixed(2)) || 0;
					}
					this.loading = false;
					uni.hideLoading()
				} catch (e) {
					this.loading = false;
					uni.hideLoading()
				}
			},
			checkChange(e) {
				//等于0 是选中，不等于0 就是没选中
				if (e.detail.value == '0') {
					this.allck = true;
					this.total = parseFloat((Number(this.total) - Number(this.ScoreAmt)).toFixed(2))
				} else {
					this.allck = false;
					this.total = parseFloat((Number(this.total) + Number(this.ScoreAmt)).toFixed(2))
				}
			},
			// changeTips(){//点击优惠修改样式
			// 	if(this.FloatList.length>0){
			// 		this.isActive = !this.isActive;
			// 		this.hideFloat = !this.hideFloat;
			// 	}
			// },
			orderArea() {},
			async getWxConfig() {
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
						jsApiList: ["getLocation", "openAddress", "scanQRCode"]
					});
					wx.ready(res => {
						let _this = this;
						wx.getLocation({
							type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
							success: function(res) {
								// alert(JSON.stringify(res))
								// _this.location.latitude = res.latitude;// 纬度，浮点数，范围为90 ~ -90
								// _this.location.longitude = res.longitude;// 经度，浮点数，范围为180 ~ -180。
								_this.location = {
									longitude: res.longitude,
									latitude: res.latitude
								}
								_this.$store.commit("SET_CURRENT_LOCATION", _this.location);
								sessionStorage.setItem('location', JSON.stringify(_this.location))
							},
							cancel: function(res) {
								this.$toast.fail(res);
							}
						});
						wx.error(function(res) {
							this.$toast.fail(res);
							// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
							console.log("调用微信接口获取当前位置失败", res);
						});
					})
				} catch (e) {
					this.$toast.fail(e);
				}
			},
			getAddress() { //获取共享地址
				let _this = this;
				wx.openAddress({
					success: function(res) {
						_this.name_user = res.userName;
						_this.phone_user = res.telNumber;
					},
					cancel: function(res) {
						this.$toast.fail(res);
					}
				});
			},
			// 自取和外卖的切换按钮，暂时不用了
			// changeMode(val) {
			// 	// 1自取，2 外卖
			// 	// console.log(val, '改变配送方式')
			// 	this.radioModes = val;
			// 	// this.$store.state.orderType === 'takein'
			// 	this.areaList = val == 1 ? this.DeliveryAreaList : this.takeOver;
			// 	this.currentArea = this.areaList[0];
			// 	if (val === 1) {
			// 		this.totalCurrent = this.total - this.freight;//
			// 		// this.currentArea = {};
			// 	} else {
			// 		this.totalCurrent = this.total;
			// 		if (this.takeOver.filter(D => D.Defaults === '1').length > 0) {
			// 			this.currentArea = this.takeOver.filter(D => D.Defaults === '1')[0]
			// 		}
			// 		this.resultArea = this.currentArea.SID;
			// 	}
			// 	this.totalCurrent = parseFloat(Number(this.totalCurrent).toFixed(2));
			// },
			radioChange() {
				// 控制地址的展示
				this.showAreaList = true;
				this.$refs.showAreaList.open()
			},
			radioPayChange(val) {
				if (this.CardInfo && Number(this.CardInfo.Balance) < this.totalCurrent) {
					return;
				}
				this.radioPayType = val.detail.value
			},
			changeGroup(val) {
				this.resultArea = val.detail.value
			},
			// 切换并选择地址  最后提交的时候把这个地方的经纬度传给后台
			async changeArea(val, index) {
				this.showSID = val.SID
				this.showAreaList = true;
				this.$refs.showAreaList.open()
				let currentStore = JSON.parse(localStorage.getItem('currentStoreInfo'))
				let api;
				if (this.radioModes === 1) {
					api = "IsPickShop";
				} else {
					if (this.currentDeliveryType.indexOf("2") > -1) {
						//外卖
						api = "CalcFreight";
					} else if (this.currentDeliveryType.indexOf("3") > -1) {
						//物流
						api = "CalcLogistics";
					}
				}
				try {
					this.loading = true;
					uni.showLoading()
					let obj = {
						Action: api,
						Latitude: val.Latitude || "",
						Longitude: val.Longitude || "",
						ShopSID: this.radioModes === 1 ? val.SID : "",
						DiscPrice: this.DiscPrice,
						ProdTotal: this.ProdTotal,
						TicketPrice: this.TicketPrice,
						// PayType: this.radioPayType,
						ProdList: JSON.stringify(this.currentItem),
						ScoreAmt: this.allck === true ? this.ScoreAmt : '' //判断积分抵扣是否选中
						// ProdList:this.currentItem
					}
					let {
						Data
					} = await vipCard(obj, "UProdOpera");
					// 把选择的地址赋值到页面上
					if (this.radioModes === 1) {
						this.currentArea = val;
						let currentStoreInfo = this.currentArea
						this.$store.commit("SET_CURRENT_STORE", currentStoreInfo)
					} else {
						this.currentArea = val;
						this.freight = Data.Freight;
						this.total = Data.SumTotal;
						this.totalCurrent = parseFloat(Number(Data.SumTotal).toFixed(2));
						sessionStorage.setItem('takeOutAddress', JSON.stringify(this.currentArea));
					}
					this.showAreaList = false;
					this.$refs.showAreaList.close()
				} catch (e) {
					this.$toast.fail(e);
					console.log(e)
				}
			},
			clickEdit(val) {
				this.areaInfo = val;
				this.$refs.addEditArea.open()
				this.addEditArea = true;
			},
			clickGo() {
				this.$refs.addEditArea.close()
				this.addEditArea = false;
			},
			clickLeft() {
				if (this.$Route.query.flag) {
					this.$Router.push({
						path: '/pages/shoppingMall/menu_naixue/menu/menu',
						query: {
							flag: 'Deflocation'
						}
					})
				} else {
					window.history.back(-1)
				}
				// else {
				// 	this.$Router.push(this.$store.state.historyUrl)
				// }
			},
			clickDataTime() { //选择时间弹窗
				this.selectTime = true;
				this.$refs.selectTime.open()
			},
			clickUserDiscount() { //优惠方案弹窗
				this.discountProgram = true;
				this.$refs.discountProgram.open()
			},
			clickUserTicketName() { //选择电子券弹窗
				this.ticketProgram = true;
				this.$refs.ticketProgram.open()
			},
			clickinterestName(){//选中权益弹窗
				this.interestProgram = true;
				this.$refs.interestProgram.open()
			},
			clickTime() {},
			async saveAreaSet() {
				this.$refs.addEditArea.close()
				this.addEditArea = false;
				this.loading = true;
				uni.showLoading()
				let listArea = await this.saveArea(false);
				this.areaList = listArea;
				this.takeOver = listArea;
				this.loading = false;
				uni.hideLoading()
			},
			async saveArea(bool) {
				try {
					let type;
					if (this.currentDeliveryType.indexOf("2") > -1) {
						type = 1;
					} else if (this.currentDeliveryType.indexOf("3") > -1) {
						type = 2;
					}
					let {
						Data
					} = await vipCard({
							Action: "GetAddressList",
							Type: type
						},
						"UMemberOpera"
					);
					if (bool) {
						uni.showLoading()
					}
					return Data.AddressList;
				} catch (e) {
					return [];
				}
			},
			PayTypeClick(item) {//支付方式
				if (this.CardInfo && Number(this.CardInfo.Balance) < this.totalCurrent) {
					return;
				}
				this.radioPayType = item;
				this.Discount(item, 2)
			},
			changeSider(index) {//左侧日期选择
				this.currentIndex = index
				this.activeKey = index
				if (this.RecordTime.index === index) {
					this.radioTime = this.RecordTime.radioTime;
				} else {
					this.radioTime = "";
				}
				let arrTime = [];
				if (index !== 0) {
					for (let i = 0; i < this.allTimeSlot.length - 1; i++) {
						arrTime.push(this.allTimeSlot[i] + '-' + this.allTimeSlot[i + 1])
					}
					this.rightTimeList = arrTime;
				} else {
					this.rightTimeList = this.todayTimeSlot;
				}
			},
			rightTimeClick(item) {//右侧时间选择
				this.RecordTime = {
					radioTime: item,
					index: this.activeKey
				};
				this.radioTime = item;
				this.selectTime = false;
				this.$refs.selectTime.close()
				this.UserTime = this.sidebarList[this.activeKey] + " " + this.radioTime;
			},
			radioTimeFun(val) {
				this.radioTime = val.detail.value
			},
			// 优惠方案
			setDiscountClick(val) {
				this.radioDiscount = val.detail.value
			},
			DiscountClick(item, type) { //优惠券
				if (item === "undefined") {
					this.radioDiscount="undefined";
					this.UserDiscountName = "暂不使用";
				} else {
					this.UserDiscountName = item.PrefName;
					this.radioDiscount = item.PrefNo;
				}
				this.discountProgram = false;
				this.Discount(item, 1);
				this.$refs.discountProgram.close();
			},
			
			// 电子券开始
			setTicketClick(val) { //电子券
				this.radioTicket = val.detail.value
			},
			ticketClick(item, type) {
				if (item === "undefined") {
					this.radioTicket = "undefined";
					this.UserTicketName = "暂不使用";
				} else {
					this.UserTicketName = item.TicketName;
					this.radioTicket = item.TicketNo;
				}
				this.ticketProgram = false;
				this.Discount(item, 3);
				this.$refs.ticketProgram.close();
			},
			// 权益开始
			setBeneClick(val){
				this.radioBene = val.detail.value
				console.log(this.radioBene)
			},
			beneClick(item, type){
				if (item === "undefined") {
					this.radioBene = 'undefined';
					this.interestName = "暂不使用";
				} else {
					this.interestName = item.BeneName;
					this.radioBene = item.BeneSID
				}
				this.interestProgram = false;
				this.Discount(item, 4);
				this.$refs.interestProgram.close();
			},
			// 方案事件
			async Discount(item, type) {
				// SelectDisc(优惠方案 type=1) SelectPay(支付方式 type=2) SelectTicket(电子券 type=3)
				// const SelectType = type === 1 ? "SelectDisc" : type === 2 ? "SelectPay" : type === 3 ? "SelectTicket" : "";
				try {
					let obj = {
						Action: "SelectDisc",
						// SelectType: SelectType, //按钮类型
						ProdList: this.ProdJsonList,
						PayType: type === 2 ? item : 1,
						Freight: this.freight, //运费
						ProdTotal: this.ProdTotal, //商品总价						
						BeneSID:this.radioBene==='undefined'?'暂不使用':this.radioBene,
						PrefNo: this.radioDiscount==='undefined'?'暂不使用':this.radioDiscount,
						TicketNo: this.radioTicket==='undefined'?'暂不使用':this.radioTicket,
						ScoreAmt: this.allck === true ? this.ScoreAmt : '' ,//判断积分抵扣是否选中
						// TicketPrice: type != 3 ? this.TicketPrice : '', //type为1和2的时候传，电子券金额
						// DiscPrice: type === 3 ? this.DiscPrice : '', //type 为3的时候传,优惠金额
					}
					let {
						Data
					} = await vipCard(obj, "UProdOpera");
					if (type === 2) {
						this.TicketList = Data.TicketList || []; //电子券列表
						this.DiscountList = Data.DiscList || []; //优惠方案列表
						this.BeneList = Data.BeneList || [];//权益列表
					}
					this.freight = Data.Freight; //运费
					this.DiscPrice = Data.DiscPrice; //优惠价格
					this.TicketPrice = Data.TicketPrice; //电子券价格
					this.total = Data.SumTotal; //合计和小计
					this.ProdTotal = Data.ProdTotal; //商品总价格
					this.objPrice={
						total:this.total,								
						TicketPrice:this.TicketPrice,
						DiscPrice:this.DiscPrice
					}
					this.FloatList = Data.FloatList;
					// this.totalCurrent = parseFloat(Number(Data.SumTotal).toFixed(2)); //合计和小计	
					if (JSON.stringify(this.CardInfo) !== "{}") {
						if (Number(this.CardInfo.Balance) < Number(Data.SumTotal)) {
							//余额不足默认微信支付
							this.radioPayType = "2";
						}
					} else {
						this.radioPayType = "2";
					}
				} catch (e) {
					this.$toast.fail(e);
					console.log(e)
				}
			},
			areaSet() {
				this.areaInfo = {};
				this.addEditArea = true;
				this.$refs.addEditArea.open()
			},
			submitMoney() { //点击结算按钮，展示弹窗
				if (JSON.stringify(this.currentArea) === "{}" && !this.$Route.query.isIntegral) {
					this.$toast("请选择地址");
					return;
				}
				if (this.radioModes === 1) {
					if (!this.phone_user || this.phone_user === "") {
						this.$toast("请填写手机号码");
						return;
					} else {
						if (!checkMobile(this.phone_user)) {
							this.$toast("手机号格式错误");
							return;
						}
					}
				
					if (!this.name_user || this.name_user === "") {
						this.$toast("请填写收件名字");
						return;
					}
				}
				if (this.password === "" && this.IsPass === "1") {
					this.$toast("请填写密码");
					return;
				}
				if (this.radioPayType === "1") {
					this.payTypePop = true;
					this.$refs.payTypePop.open()
				} else {
					this.OrderCardPay();
				}
			},
			async OrderCardPay() { // 支付
				this.isDisabled = true;
				setTimeout(() => {
				  this.isDisabled = false;
				}, 5000)
				let DeliveryType = this.radioModes; //2、1       //获取当前配送方式
				if (this.radioModes === 2) {
					if (this.currentDeliveryType.indexOf("2") > -1) {
						DeliveryType = 2;
					} else if (this.currentDeliveryType.indexOf("3") > -1) {
						DeliveryType = 3;
					}
				} else {
					DeliveryType = 1;
				}
				if (typeof this.currentItem !== "string") {
					this.currentItem = JSON.stringify(this.currentItem);
				}
				let shopLong = "";
				let shopLat = "";
				if (this.$store.state.orderType === 'takein') {
					shopLong = this.$store.state.currentLocation.longitude ? this.$store.state.currentLocation.longitude : '';
					shopLat = this.$store.state.currentLocation.latitude ? this.$store.state.currentLocation.latitude : '';
				}
				// if(this.allck === true){//判断是否勾选积分抵扣
				// 	// true代表选中，false代表未选中
				// }
				let currentStore = this.$store.state.currentStoreInfo || {}
				let splitTime= this.RecordTime.radioTime.split("-")
				let obj = {
					Action: "OrderPay",
					DeliveryType: DeliveryType,
					UserName: this.radioModes === 2 ? this.currentArea.Name : this.name_user,
					Mobile: this.radioModes === 1 ? this.phone_user : this.currentArea.Mobile,
					Address: this.radioModes === 2 ? this.currentArea.Address : "",
					ProdList: this.ProdJsonList,
					Longitude: this.$store.state.orderType === 'takein' ? shopLong : this.currentArea.Longitude,
					Latitude: this.$store.state.orderType === 'takein' ? shopLat : this.currentArea.Latitude,
					Province: this.currentArea.Province || "",
					ShopSID: this.radioModes === 1 ? currentStore.SID : "",
					UserRemarks: this.UserRemarks,
					PayType: this.radioPayType,
					PickDate: this.sidebarList[this.RecordTime.index],
					// PickTime: this.RecordTime.radioTime,
					PickTime:splitTime[0],
					CartSID: this.cardSids,
					BeneSID:this.radioBene==='undefined'?'暂不使用':this.radioBene,
					PrefNo: this.radioDiscount==='undefined'?'暂不使用':this.radioDiscount,
					TicketNo: this.radioTicket==='undefined'?'暂不使用':this.radioTicket,
					SumTotal:this.total,
					PassWord: this.password ? this.password : '',
					ScoreDeduction: this.allck === true ? this.ScoreDeduction : ''
				};
				if (JSON.parse(this.currentItem)[0].hasOwnProperty("PromotionItemSID")) {
					// 活动
					obj.PromotionItemSID = JSON.parse(this.currentItem)[0].PromotionItemSID;
				}
				if (this.$Route.query.isIntegral) {
					let currentItems = JSON.parse(this.currentItem);
					obj = currentItems[0];
					obj.Action = "OrderPay";
					obj.PayType = this.radioPayType;
					obj.UserRemarks = this.UserRemarks;
					obj.DeliveryType = 1;
					//积分
					if (!this.CardInfo) {
						this.$toast.fail("未绑定微卡");
						return;
					}
				}
				let Opera = this.$Route.query.isIntegral ?
					"UIntOrderOpera" :
					"UOrderOpera";
				this.loading = true;
				uni.showLoading();
				try {
					let {
						Data
					} =await vipCard(obj, Opera);
					this.loading = false;
					uni.hideLoading();
					this.$store.commit("SET_CURRENT_CARD", []); //清掉购物车
					uni.removeStorageSync("alreadyPaid"); //清点之前标记的已经下单的字段
					if (this.radioPayType === "1") {
						//微卡支付
						this.$toast("订单正在处理中...");
						setTimeout(() => {
							// this.$Router.push("/pages/shoppingMall/order/paySuccess");
							this.$Router.push({
								path:"/pages/vip/allMyOrder",
								query:{
									id:'0'
								}
							})
						}, 3000);
						this.payTypePop = false;
						this.$refs.payTypePop.close();
					} else {
						// 微信支付
						this.testData = Data;
						try {
							if(Data.PaySuccess){
								this.$toast("订单正在处理中...");
								setTimeout(() => {
									this.$Router.push({
										path: "/pages/vip/allMyOrder",
										query: {id: '0'}
									})
								}, 3000);
							}else{
								weChatPayment(this, Data, false);
							}
						} catch (e) {
							this.$toast.fail(e)
							// this.$toast.fail("微信调起失败");
							this.loading = false;
							uni.hideLoading();
						}
					}
				} catch (e) {
					this.$toast.fail(e);
					// this.$toast.fail("支付失败");
					this.payTypePop = false;
					this.$refs.payTypePop.close();
					// setTimeout(() => {
					// 	this.$Router.push("/pages/shoppingMall/order/paySuccess");
					// }, 600);
					this.loading = false;
					uni.hideLoading();
				}
			},
			// 点击icon调用微信共享地址中的通讯录
		},
		filters: {
			setSex2(val) {
				if (val == 0) {
					return '先生'
				} else if (val == 1) {
					return '女士'
				}
			},
			priceFilter(val){
				if(val === '2'){
					return '卡优惠'
				}else if(val === '3'){
					return '电子券优惠'
				}else if(val === '4'){
					return '方案优惠'
				}else if(val === '5'){
					return '权益优惠'
				}
			}
		},
	};
	function setChangeData(num, FinTypeDay) {//商城提货天数，传进来的天数
		let arrData = []; //日期
		let toDay = "";
		num = Number(num);
		for (let i = 0; i < num; i++) {
			let dayM = 24 * 60 * 60 * 1000; //一天的时间戳
			let date = FinTypeDay >= 1 ? new Date().getTime() + FinTypeDay * dayM : new Date().getTime();
			toDay = i * dayM + date;
			arrData.push(getTime(toDay, true));
		}
		return arrData;
	}
	function setChangeTime(ShopBase, tAdvance, dayAdvance) {//商城对象，提前小时，超过的天数
		let arr = [];
		let arrToday = [];//今天一天的时间段数组
		let dayM = 60 * 60; //秒值
		let a = 60 * Number(ShopBase.IntervalMinute); //求秒值 间隔时长
		let acTime = Number(tAdvance) * 60 * 60;//提前小时
		let startTime = Number(countDown(ShopBase.StartTime));
		let endTime = countDown(ShopBase.EndTime);
		let cutTime = countDown(getTime(false, false, true));//当前时间
		if((acTime + cutTime).toFixed(2) > endTime){//提前小时+当前时间>商城结束时间	
			let dayTime = parseInt(ShopBase.EndTime) - parseInt(ShopBase.StartTime)//一天营业时间			
			/*
				1、先用商城结束时间减去当前系统时间-->剩下营业几个小时
				2、用 商品提前时间减去剩下营业时间-->就能知道剩下多长时间，以便于从第二天商城营业时间开始算
			
			*/
			let mallTime = (acTime-(endTime - cutTime));
			console.log(mallTime,'算从十点开始生几个小时')
			dayAdvance+=Number(tAdvance)/dayTime
			console.log(dayAdvance)
		    // let time = Number(tAdvance)/dayTime;//算出超出营业时间 天
		    // let shenTime = Number(cutTime)-Number(tAdvance);//当前时间减去提前时间
			// let time2 = Number(tAdvance)%dayTime;//剩下的小时
			while (Number(startTime)+Number(mallTime) <= endTime) {
					arr.push(changeCountDown(Number(startTime)+Number(mallTime)));
					startTime += a;
				}
				arrToday = arr;
			
		}else{
			while (startTime <= endTime) {
				arr.push(changeCountDown(startTime));
				startTime += a;
			}
			if (dayAdvance == 0) {
				arr.forEach(DATA => {
					DATA = countDown(DATA);
					if (
						dayAdvance == 0 &&
						DATA > countDown(getTime(false, false, true)) + Number(tAdvance) * dayM
					) {
						arrToday.push(changeCountDown(DATA));
					}
				});
			} else {
				tAdvance+=1;
				arrToday = arr;
			}
		}
			
		return {
			arr,
			arrToday
		};
	}
	function countDown(time) {
		//20:08:90转换为秒
		var s = 0;
		var hour = time.split(":")[0];
		var min = time.split(":")[1];
		var sec = time.split(":")[2];
		// s = Number(hour * 3600) + Number(min * 60) + Number(sec);
		s = Number(hour * 3600) + Number(min * 60) ;
		return s;
	}
	function changeCountDown(value) {
		//秒转换为 20:08:90
		var theTime = parseInt(value);
		var middle = 0;
		var hour = 0;
		var result = "";
		if (theTime > 60) {
			middle = parseInt(theTime / 60);
			theTime = parseInt(theTime % 60);
			if (middle > 60) {
				hour = parseInt(middle / 60);
				middle = parseInt(middle % 60);
			}
		}
		hour = hour < 10 ? "0" + hour : hour;
		middle = middle < 10 ? "0" + middle : middle;
		theTime = theTime < 10 ? "0" + theTime : theTime;
		// result = hour + ":" + middle + ":" + theTime;
		result = hour + ":" + middle ;
		return result;
	}
</script>

<style lang="less">
	@import "../../../assets/css/radioModes";
	.setADcell {
		margin: 5px 0;
	}
	.onlySty{
		background-color: rgb(255, 255, 255);
		width: 100%;
		display: inline-block;
		align-items: center;
		padding-top: 13px;
		padding-bottom: 13px;
		// text-align: right;
		color: rgb(94, 94, 94);
		font-size: 14px;
		
	}
	.FloatListInfo{
		margin-top: 5px;
	}
	.onlyPrice{
		padding: 0 12px;display: inline-block;height: 40px;line-height: 40px;display: flex;
	}
	.Discount{
		padding: 0 12px;display: inline-block;height: 34px;line-height: 34px;display: flex;color: #ff8917;
	}
	.activePrice{
		padding-bottom: 50px !important;
	}
	.confirm-order-style {
		margin-bottom: 80px;
		.uni-popup {
			z-index: 999
		}
		.setADcell {
			/deep/.detailView1 {
				flex: none;
			}
			/deep/.headView {
				flex: none;
				width: 90px;
				padding-right: 8px;
			}
		}
		.radio-group-play {
			background-color: #fff;
			align-items: center;
			padding: 5px 24rpx;
			margin-top: 5px;
			margin-bottom: 25px;
			.payStyle {
				background: rgb(255, 255, 255);
				font-size: 14px;
				color: rgb(90, 91, 92);
				padding: 13px 0px;
			}
			.radio-group-item {
				padding: 6px 0;
				display: flex;
			}
			.custom-title {
				vertical-align: middle;
			}
		}
		.total-style {
			background: #fff;
			text-align: right;
			line-height: 40px;
			font-size: 16px;
			padding-right: 10px;
			border-bottom: 1rpx solid #ebedf0;
			&__color {
				color: red;
			}
		}
		.order-area {
			background: #ffffff;
			padding: 14px 6px;
			display: flex;
		}
		.order-area-icon {
			margin: auto;
			img,
			image {
				margin: 0 10px;
				width: 40px;
				height: 40px;
			}
		}
		.order-area-phone {
			font-size: 14px;
			color: #909090;
			margin-left: 8px;
		}
		.order-area-location {
			font-size: 12px;
			margin-top: 3px;
		}
		.good_card_box {
			background: #ffffff;
			margin: 5px 0 5px;
			padding: 10px;
			.boxShadow {
				box-shadow: none;
			}
			.rightBox {
				margin: 0 10px;
			}
		}
		// .goodsBox-parts {
		/*margin-left: 10px !important;*/
		// }
		.confirm-order-popup {
			background-color: #fff;
			max-height: 50%;
			.top {
				padding: 10px 20px 10px;
				text-align: center;
				border-bottom: 1px solid #eee;
				position: relative;
			}
			.cancel {
				font-size: 12px;
				position: absolute;
				left: 20px;
				top: 50%;
				transform: translateY(-50%);
				color: #777;
			}
		}
		.bottom-area {
			max-height: 60vh;
			overflow: scroll;
			&__box {
				display: flex;
				padding: 8px 12px;
				align-items: center;
			}
			&__info {
				flex: 1;
				font-size: 14px;
			}
			&__icon {
				width: 30px;
				text-align: center;
				margin: auto;
			}
			&__phone {
				color: #969799;
				font-size: 12px;
				margin-top: 5px;
			}
			&__add {
				text-align: center;
				padding: 10px;
				border-top: 1px solid #eee;
			}
			.checkbox-my {
				margin-right: 10px;
			}
		}
		.confirm-area-popup {
			height: 100%;
			/deep/.uni-popup__wrapper-box {
				height: 100%;
				background: #fff;
			}
		}
		.confirm-selectTime-popup {
			// height: 50vh;
			.leftNavsidebar {
				// width: 130px;
				width: 98px;
				display: fixed;
				position: fixed;
				bottom: 0;
				overflow-y: scroll;
				background: #f8f8f8;
				height: 50vh;
			}
			.leftNavsidebar {
				.activeCanteen {
					background: #fff;
				}
				.homepageLeft {
					line-height: 60px;
					padding-left: 6px;
				}
			}
		}
		.rightTime {
			height: 50vh;
			padding: 8px;
			box-sizing: border-box;
			// margin-left: 130px;
			margin-left: 98px;
			background: #fff;
			overflow-y: scroll;
		}
		.wechat {
			width: 18px;
			height: 18px;
			margin-right: 8px;
			display: inline-block;
			font-size: 18px;
			vertical-align: middle;
			image {
				width: 100%;
				height: 100%;
			}
		}
		button {
			height: auto;
		}
		.content {
			width: 100%;
			margin: 0 auto;
		}
		.account-form {
			overflow: hidden;
		}
		.container .content {
			zoom: 1;
		}
		.account-form .form-title {
			margin: 50px 0 10px;
			padding: 0 12px;
			line-height: 24px;
			font-size: 14px;
			color: #7c7b83;
			text-transform: uppercase;
			text-shadow: 0 1px rgba(255, 255, 255, 0.2);
		}
		.account-form .big {
			font-size: 20px;
			text-align: center;
			color: #7c7b83;
		}
		.block {
			overflow: hidden;
			-webkit-border-image: url(http://wxd.bak365.net/wxcs/MobileHtml/PrePur5/img/border-line-2.png) 2 stretch;
			-moz-border-image: url(http://wxd.bak365.net/wxcs/MobileHtml/PrePur5/img/border-line-2.png) 2 stretch;
			border-image: url(http://wxd.bak365.net/wxcs/MobileHtml/PrePur5/img/border-line-2.png) 2 stretch;
			border-top: 2px solid #e5e5e5;
			border-bottom: 2px solid #e5e5e5;
			margin: 10px 0;
			background-color: #fff;
			display: block;
			position: relative;
			font-size: 14px;
		}
		.block {
			border-top-width: 1px;
			border-bottom-width: 1px;
		}
		.block.block-form {
			width: 100%;
			margin: 0;
			padding: 0;
			padding-left: 10px;
			padding-right: 10px;
			list-style: none;
			font-size: 14px;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
		}
		.block.block-form.margin-bottom-normal {
			margin-bottom: 20px;
		}
		.block-item {
			position: relative;
			display: block;
			padding: 10px;
			line-height: 22px;
			border: 0px none;
			-webkit-border-image: url(http://wxd.bak365.net/wxcs/MobileHtml/PrePur5/img/border-line.png) 2 stretch;
			-moz-border-image: url(http://wxd.bak365.net/wxcs/MobileHtml/PrePur5/img/border-line.png) 2 stretch;
			border-image: url(http://wxd.bak365.net/wxcs/MobileHtml/PrePur5/img/border-line.png) 2 stretch;
			border-bottom: 2px solid #e5e5e5;
			overflow: hidden;
		}
		.block.block-form .block-item {
			display: table;
			width: 100%;
			padding: 0;
		}
		.block.block-form .block-item:last-child {
			border-bottom: 0px none;
		}
		.block.block-form .block-item .label {
			display: table-cell;
			width: 90px;
			padding: 10px 0;
			vertical-align: middle;
		}
		.block.block-form .block-item textarea,
		.block.block-form .block-item input,
		.block.block-form .block-item select,
		.block.block-form .block-item a,
		.block.block-form .block-item span {
			display: table-cell;
			overflow: hidden;
			padding: 10px 0;
			min-height: 28px;
			line-height: 28px;
			font-size: 14px;
		}
		.block.block-form .block-item textarea,
		.block.block-form .block-item input,
		.block.block-form .block-item select {
			background-color: #fff;
			border: 0px none;
			outline: none;
		}
		.action-container {
			padding: 0 10px;
			text-align: center;
			margin-top: 20px;
			margin-bottom: 20px;
		}
		.account-form button {
			border: 1px solid #e5e5e5;
		}
		.btn.btn-green {
			color: #fff;
			background-color: #06bf04;
			border-color: #03b401;
		}
		.btn.btn-block {
			color: #fff;
			text-align: center;
			padding: 11px 10px;
			font-size: 16px;
			line-height: 16px;
			border-radius: 4px;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
		}
		.menus {
			height: 100%;
			overflow: hidden;
		}
		.couponBox{
			background-color: #fff;
			.coupon1{
				display: flex;
				padding: 10px 0;
				.couponName{
					display: inline-block;
					font-size: 14px;
					color: rgb(94, 94, 94);
					flex: 1;
					padding-left: 12px;
				}
				.couponRight{
					display: inline-block;
					text-align: right;
					flex: 1;
					font-size: 14px;
					padding-right: 8px;
					color: rgb(179, 179, 179);
					.iconfont{
						color: #BBBBBB;
						font-size: 14px;
					}
				}
			}
		}
	}
</style>