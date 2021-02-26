<template>
	<div class="goodCoupon" :class="classHome">
		<div class="vanImage-style">
			<swiper class="goodCouponSwipe" :style="classA">
				<swiper-item v-for="thumb in goods.ImgList" :key="thumb">
					<!-- #ifndef H5-->
					<image :src="thumb |fmtImgUrl" />
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<img :src="thumb |fmtImgUrl" />
					<!-- #endif -->
				</swiper-item>
			</swiper>
			<div class="timer-style">
				<!-- 拼团名称 -->
				<span class="timer-left">
					<span>¥ {{goods.SalePrice>0?goods.SalePrice:0}}</span>
					<span class="PromWhereIndex">{{goods.PromWhere.split(',')[1]}}人拼团价</span></br>
					<span class="oldPrice1">价格</span><span class="oldPrice">¥{{goods.OldPrice>0?goods.OldPrice:0}}</span>
				</span>
				<div class="timer-right">
					<span style="margin-right:4px">{{startIS==='end'?'活动结束':'距'+(startIS?'结束':'开始')+'仅剩'}}</span>
					<uni-countdown color="#fff" splitor-color="#fff" background-color="transparent" :day="activeTimeMy.day" :hour="activeTimeMy.hours"
					 :minute="activeTimeMy.minute" :second="activeTimeMy.second" @timeup="finishTimer"></uni-countdown>
				</div>
			</div>
		</div>
		<div>
			<div class="wu-cell" style="display: block;">
				<div class="goodCoupon-title">
					{{ goods.Name }}
					<!-- <span style="float: right;font-size: 13px;" @click="share">分享</span> -->
				</div>
				<!-- v-if="skuDataInfo.IsBuy === '0'" -->
				<div class="goodCoupon-express" style="padding:0">					
					<span v-if="goods.BuyTime" style="display: block;">商品购买时间：<span class="timeSty">{{goods.BuyTime|setBuyTime}}</span></span>					
					<span v-if="goods.StartTime">商品购买时间段：<span class="timeSty">{{goods.StartTime}}至{{goods.EndTime}}</span></span>
				</div>
			</div>
			<div class="wu-cell goodCoupon-express lineTop">
				<div style="flex:1">剩余库存：{{stockNum}}<br/>
				<span class="timeSty" v-if="goods.PickTime">提货时间：{{goods.PickTime.split(',')[0]}}至{{goods.PickTime.split(',')[1]}}</span>
				</div>
				
			</div>
			<div class="ImportantNotes-cell-group">
				<span class="goodCoupon-notice-title titleSize" v-if="goods.Tip">预定提示</span>
				<span style="margin: 5px 0;display: block;" v-if="goods.Tip">{{goods.Tip}}</span>
			</div>
		</div>
		<div>
			<!-- 拼团人数列表 拼团玩法 -->
			<view class="GroupNum" v-if="skuDataInfo.GroupList.length>0">
				<adCell text="以下小伙伴正在发起拼团,可直接参与"  :showBottomLine="false"></adCell>
				<view class="listBox" v-for="(item,index) in skuDataInfo.GroupList" :key="index">
					<p style="flex: 1;margin-left: 10px;display: flex;">
						<image :src="item.Headimgurl" style="width: 35px;height: 35px;border-radius: 50%;background-color: orange;margin-right: 8px;"></image>
						<view style="flex: 1;">
							<p style="margin-bottom: 5px;">{{item.NickName}}</p>
							<p style="color: #7e7e7e;letter-spacing: 1px;">还差<text style="color:#f30000 ;">{{item.SurplusCnt}}人</text>成团</p>
						</view>
					</p>
					<p style="width: 100px;text-align: center;">
						<button style="display: inline-block;padding: 0px 10px;background-color:#fe5252;color: #fff;border-radius: 3px;
						line-height: 30px;font-size: 14px;letter-spacing: 1px ;" @click="toPoolGroup(item)">去凑团</button>
					</p>
					
				</view>
			</view>
			<view style="background-color: #fff;margin: 8px 0;padding-bottom: 15px;">
				<adCell text="拼团玩法"  detail="详细规则" :showBottomLine="false" @click="toGroupPlay"></adCell>								
				<p style="width: 96%;margin: 0 13px;" v-if="skuDataInfo.GroupInfo.GroupNum =='1'">支付开团，人数不足自动退款</p>
				<p style="width: 96%;margin: 0 13px;" v-else>支付开团邀请{{skuDataInfo.GroupInfo.GroupNum - 1}}人参团，人数不足自动退款</p>
			</view>
		</div>
		<div>
			<adCell text="商城" icon="/static/img/shangcheng1.png" @click="clickShop" detail="进入店铺" :showBottomLine="false">
			</adCell>
		</div>

		<div style="background-color: #fff" class="lineTop">
			<view class="goodInfoNewsTitle">
				<wuc-tab textFlex :tab-list="tabList" :tabCur.sync="TabCur" tab-class="'text-center','text-black','bg-white'"
				 select-class="wuc-tab-select"></wuc-tab>
			</view>
			<view class="contentStyle" v-show="TabCur==0">
				<div v-html="goods.Features"></div>
			</view>
			<view class="DealList" v-show="TabCur==1&&userList.length>0">
				<view class="tableStyle_head tableRow">
					<view class="setWidth">买家</view>
					<view class="setWidth" style="width:160rpx">数量</view>
					<view class="tableRow_col">成交时间</view>
				</view>
				<view class="tableStyle_body tableRow" v-for="item in userList" :key="item.Name">
					<view class="setWidth">{{item.NickName |setName}}</view>
					<view class="setWidth" style="width:160rpx">{{item.BuyCnt}}</view>
					<view class="tableRow_col">{{item.AddTime}}</view>
				</view>
			</view>
		</div>
		<div v-if="(goods.ImportantNotes||goods.PromImportantNotes)" style="background-color: #FFFFFF;">
			<!-- <span class="goodCoupon-notice-title titleSize">重要提示</span> -->
			<div v-html="goods.ImportantNotes" v-if="goods.ImportantNotes"></div>
			<div v-html="goods.PromImportantNotes" v-if="goods.PromImportantNotes"></div>
		</div>
		<!-- 底部占位 -->
		<div class="goods-action">
			<!-- <navSeckill :options="options" :buttonGroup="buttonGroup" :skuDataInfo = "skuDataInfo" @buttonClick="addCart" :IsTimeObj = "IsTimeObj"></navSeckill> -->
			<navGroup :buttonGroup="buttonGroup" @buttonClick="addCart" :skuDataInfo = "skuDataInfo" @click="jumpCart"></navGroup>
		</div>
		<!-- 商品弹窗 -->
		<showSkuSeckill :show="show" @hideShow="hideShow" :skuDataInfo="skuDataInfo" :PromWhereFlag="PromWhereFlag"></showSkuSeckill>
	</div>
</template>

<script>
	// import "@/config/jquery.base64.js";
	import {
		vipCard
	} from "@/api/http.js";
	import showSkuSeckill from '@/components/a-shopping-showSku/a-shopping-showSkuSeckill';
	import navSeckill from '@/components/uni-goods-nav/uni-goods-navSeckill.vue';
	import navGroup from "@/components/uni-goods-nav/uni-goods-navGroup"
	import {
		Base64
	} from 'js-base64';
	import adCell from '@/node_modules/adcell/ADCell.vue';
	import {
		GetBaseImgUrl
	} from "@/util/publicFunction";
	export default {
		name: "couponPage",
		components: {
			adCell,
			showSkuSeckill,
			navSeckill,
			navGroup
		},
		props: {
			goods: {
				type: Object,
				default () {
					return {
						Name: "名字",
						price: 0,
						maxPrice: 100,
						Deal: "100",
						ImgList: [
							"https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg",
							"https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg"
						]
					};
				}
			},
			skuDataInfo: {//skuDataInfo整个商品详情
				type: Object,
				default () {
					return {};
				}
			},
			seckill: {
				type: String,
				default () {
					return "";
				}
			},
			clickUrl: [String]
		},
		data() {
			return {
				classHome: getApp().globalData.mainStyle,
				active: "",
				show: false,
				// 点击的是购物车
				isAddCart: true,
				classA: "",
				timeCountDown: "",
				endActive: false,
				startIS: false,
				userList: [],
				TabCur: 0,
				tabList: [{
					name: '商品详情'
				}, {
					name: '最近成交'
				}],
				options: [],
				buttonGroup: [],
				activeTimeMy: {},
				IsGoodBuyTime:false,
				IsTimeObj:{},//所有时间数组
				showStock:true,
				stockNum:'',
				PromWhereFlag:""
			};
		},
		created() {
			if(this.goods.ImgList){
				this.goods.ImgList = this.goods.ImgList ? this.goods.ImgList.split(",") : [];
				this.goods.ImgList.unshift(this.goods.Img)
			}
			this.goods.Features = this.goods.Features ? Base64.decode(this.goods.Features) : "";
			this.goods.ImportantNotes = this.goods.ImportantNotes ? Base64.decode(this.goods.ImportantNotes) : "";
			this.goods.PromImportantNotes = this.goods.PromImportantNotes?Base64.decode(this.goods.PromImportantNotes):"";
			//加图片 ../前缀
			this.goods.Features = setfix(this.goods.Features, this);
			this.goods.ImportantNotes = setfix(this.goods.ImportantNotes, this);
			this.goods.PromImportantNotes = setfix(this.goods.PromImportantNotes, this);
			this.tradeList()
			let BuyTime ;
			if(this.goods.BuyTime){
				BuyTime = this.goods.BuyTime.split(',')
			}
			let IsGoodBuyTime = BuyTime ? this.isDuringDate(BuyTime[0],BuyTime[1]):true;
			let IsEndDate = (this.goods.StartDate,this.goods.EndDate) ? this.isDuringDate(this.goods.StartDate,this.goods.EndDate):true//活动日期
			let IsSeckillTime = (this.goods.StartTime&&this.goods.EndTime) ? this.isDuringDate(this.goods.StartTime,this.goods.EndTime):true//活动时间段
			let IsPromWeeks = this.goods.PromWeeks ? this.isDuringDate(this.goods.PromWeeks):true//秒杀活动的周
			let IsPromDate = this.goods.PromDates ? this.isDuringDate(this.goods.PromDates):true//秒杀活动的天
			let IsBuy = this.skuDataInfo.IsBuy !== '0'? true : false;
			let IsStart = this.startIS !== true? true : false;
			this.IsTimeObj = {
				IsEndDate:IsEndDate,
				IsSeckillTime:IsSeckillTime,
				IsGoodBuyTime:IsGoodBuyTime,
				IsPromWeeks:IsPromWeeks,
				IsPromDate:IsPromDate,
				IsBuy:IsBuy,
				IsStart:IsStart
			}			
			// console.log(IsEndDate+'日期',IsSeckillTime+'时间段',IsPromWeeks,IsPromWeeks,IsPromDate,IsGoodBuyTime)
			this.buttonGroup.push({
				text: '单独购买',
				backgroundColor: '#FA895D',
				color: '#fff',
				Price:'￥'+this.goods.OldPrice,
				borderRadius: '25px 0 0 25px',
			},{
				// text: this.skuDataInfo.GroupInfo.MyGroup === '1'?'查看我的团':'立即开团',
				text: this.skuDataInfo.GroupInfo.MyGroup === '1'?'查看我的团':this.skuDataInfo.GroupInfo.MaxGroup === '1'?'已达团上限':'立即开团',
				backgroundColor: '#fe5252',
				Price:this.skuDataInfo.GroupInfo.MyGroup === '1'?'':this.skuDataInfo.GroupInfo.MaxGroup === '1'?'':'￥'+this.goods.SalePrice,
				color: '#fff',
				borderRadius: '0 25px 25px 0'
				// disable:this.skuDataInfo.GroupInfo.MaxGroup === '1'?'false':'true'
			})
				
			// 判断当商品库存状态为0的时候同时判断活动库存是否大于0，大于的话就展示
			if(this.goods.StockType == '0'&& this.skuDataInfo.TotalSurplusQty>=0){
				this.stockNum = this.skuDataInfo.TotalSurplusQty;
			}else if(this.goods.StockType == '1'&&this.goods.StoreQty<=0){
				this.stockNum = this.goods.StoreQty;
			}else if(this.goods.StockType == '1'&&this.goods.StoreQty>=0&&this.skuDataInfo.TotalSurplusQty>=0){
				this.stockNum = this.skuDataInfo.TotalSurplusQty;
			}
		},
		mounted() {		
			// console.log(this.skuDataInfo.GroupList,'skuDataInfo')
			this.classA = {
				// 图片和屏幕的width一样大
				height: uni.getSystemInfoSync().windowWidth + "px"
			};
			// #ifdef H5
			document.title = this.goods.Name;
			// #endif			
		},
		methods: {
			share(){},
			getWeekDate(Prweek) {
			   var now = new Date();
			   var day = now.getDay();
			   var weeks = new Array("0", "1", "2", "3", "4", "5", "6");			  
			   var week = weeks[day];
			   if(Prweek){
				   if(Prweek.indexOf(week)>-1){
				   				 return true;
				   }
				   return false;
			   }else{
					return true
				}
			   
			},
			IsDuringDay(PromDates){
				var date = new Date();
				var day = date.getDate();
				if (day < 10) {
				    day = "0" + day;
				}
				let nowDay =  day;
				if(PromDates){
					if(PromDates.indexOf(nowDay)>-1){
						return true;
					}
					return false;
				}else{
					return true
				}
				
			},
			isDuringDate(beginDateStr, endDateStr){//判断系统时间是否在这个范围
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				if (month < 10) {
				    month = "0" + month;
				}
				if (day < 10) {
				    day = "0" + day;
				}
				var nowDate = year + "-" + month + "-" + day;
				var h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				var minute = date.getMinutes();
				var second = date.getSeconds();
				minute = minute < 10 ? ('0' + minute) : minute;
				second = second < 10 ? ('0' + second) : second;
				var nowddd =  year + "-" + month + "-" + day+' '+h+':'+minute+':'+second
				let StartTime ="",endTime=""
				if(beginDateStr.indexOf(' ')>-1){
					StartTime  =beginDateStr;
					endTime  = endDateStr;
				}else{
					StartTime  = nowDate + ' ' +beginDateStr;
					endTime  = nowDate + ' ' + endDateStr;
				}
				if (nowddd >= StartTime && nowddd <= endTime) {
					return true;
				}
				return false
				
			},
			addCart(val) {
				// if (val.content.text === '立即抢购' ) {
				// 	this.show = true;
				// 	this.isAddCart = false;
				// }
				if(val.content.text === '单独购买'){
					this.PromWhereFlag = 'aloneBuy';
					this.show = true;
					this.isAddCart = false;
				}
				if(val.content.text === '立即开团'){
					this.PromWhereFlag = 'promptlyBuy';
					this.show = true;
					this.isAddCart = false;
				}
				if(val.content.text === '查看我的团'){
					// this.$Router.pushTab({
					// 	path: "/pages/shoppingMall/makeGroup/groupInfoSuccess"
					// 	// query:{
					// 	// 	SID:this.skuDataInfo.
					// 	// }
					// });
					this.$router.push({path:"/pages/shoppingMall/makeGroup/groupInfoSuccess",query:{
						GroupSID:this.skuDataInfo.GroupInfo.GroupSID,
						info:this.skuDataInfo.ProdInfo.PromotionItemSID
					}})
					sessionStorage.setItem('GroupSID',this.skuDataInfo.GroupInfo.GroupSID)				
					this.show = true;
					this.isAddCart = false;
				}
				if(val.content.text === '已达团上限'){
					this.show = false;
					this.isAddCart = false;
				}
				// this.show = true;
				// this.isAddCart = false;
			},
			toPoolGroup(info){//去凑团
				this.$router.push({path:"/pages/shoppingMall/makeGroup/groupInfoSuccess",query:{
					GroupSID:info.GroupSID,
					info:info.PromotionItemSID
				}});
				sessionStorage.setItem('GroupSID',info.GroupSID);
			},
			jumpCart() {
				if (this.isBrowse) { 
					return;
				}
				this.$Router.pushTab({
					path: "/pages/shoppingMall/shoppingCart/index"
				});
			},
			hideShow() {
				this.show = false;				
			},
			clickShop() {
				if (this.isBrowse) {
					return;
				}
				this.$Router.push({
					path: "/pages/shoppingMall/index"
				});
			},
			userEvaluation(row) {
				if (this.isBrowse) {
					return;
				}
				let num = row.CommentCnt;
				// 用户评价
				if (num && Number(num) > 0) {
					this.$Router.push({
						path: "/pages/shoppingMall/evaluation/goodEvaluationList",
						query: {
							id: row.SID
						}
					});
				}
			},
			toGroupPlay(){//拼团玩法
				uni.navigateTo({
				    url: '/pages/shoppingMall/makeGroup/groupPlay'
				});
			},
			finishTimer() {
				setTimeout(() => {
					this.getTimeout();
				}, 1000)
			},
			async tradeList() {
				try {
					let {
						Data
					} = await vipCard({
						Action: 'GetNewDeal',
						SID: this.goods.PromotionItemSID,
						ProdType:this.goods.ProdType
					}, 'UPromotionOpera')
					this.userList = Data.CommentList
					this.getTimeout()
				} catch (e) {

				}
			},
			getTimeout(current) {
				let currentT = new Date().getTime()
				let End = new Date(this.goods.EndDate.replace(/-/g, '/')).getTime()
				let Start = new Date(this.goods.StartDate.replace(/-/g, '/')).getTime()
				// let End = new Date('2020-05-18 14:55:50').getTime()
				// false 活动未开始 true 活动开始了 end为活动结束
				this.startIS = Start - currentT >= 0 ? false : End - currentT > 0 ? true : 'end'				
				let activeTimeMy = this.startIS ? End - currentT : Start - currentT
				let myTime = activeTimeMy
				this.activeTimeMy = {
					day: parseInt(myTime / (1000 * 60 * 60 * 24)),
					hours: parseInt((myTime % (1000 * 60 * 60 * 24)) / (60 * 60 * 1000)),
					minute: parseInt((myTime % (1000 * 60 * 60)) / (60 * 1000)),
					second: parseInt((myTime % (1000 * 60)) / 1000)
				}				
			},
		}
	};

	function setfix(val, _this) {
		//console.log(val,'url地址')
		let str = "";
		let strWidth=""
		if (!val) {
			return ''
		}
		let abc = GetBaseImgUrl();
		strWidth = val.replace(/<img/g, "<img style='max-width:100%;height:auto;'");
		// console.log(strWidth)
		str = strWidth.replace(/src="Files/g, `src="${abc}../Files`)
		// console.log(str)
		//str = val.replace(/src="/g, `src="${_this.$VUE_APP_PREFIX}`);
		return str;
	}
</script>

<style lang="less">
	.goodCoupon {
		margin-bottom: 55px;

		.goods-action {
			position: fixed;
			right: 0;
			bottom: 0;
			left: 0;
			align-items: center;
			height: 50px;
			background-color: #fff;
			display: flex;
		}

		.wu-cell {
			position: relative;
			display: flex;
			box-sizing: border-box;
			width: 100%;
			padding: 10px 16px;
			overflow: hidden;
			color: #323233;
			font-size: 14px;
			line-height: 24px;
			background-color: #fff;
		}

		.lineTop {
			border-top: 1px solid #ebedf0;
		}

		.goodCoupon-express {
			color: #999;
			font-size: 12px;
		}

		.vanImage-style {
			position: relative;
		}

		.ImportantNotes-cell-group {
			background-color: #fff;
			padding: 5px 16px;
		}

		.goodCoupon-cell-line {
			margin-top: 10px;
		}

		.timer-style {
			position: absolute;
			width: 100%;
			background: #fe5252;
			bottom: 0;
			color: #fff;
			font-size: 14px;
			display: flex;
			align-items: center;

			.van-count-down {
				font-size: 12px;
				color: #fff;
				// line-height: 40px;
			}

			.timer-right {
				flex: 1;
				margin-left: auto;
				align-items: center;
				text-align: end;
				padding-right: 10px;
				.item-time {
					display: inline-block;
					width: 22px;
					margin-right: 5px;
					color: #fe5252;
					font-size: 12px;
					text-align: center;
					background-color: #fff;
				}

				.uni-countdown {
					justify-content: flex-end;
				}
			}

			.timer-left {
				padding-left: 16px;
			}
		}
		
		.goodCouponSwipe {
			width: 100%;
			text-align: center;
			display: block;

			uni-image,
			image {
				width: 100%;
				height: 100%;
			}

			img {
				overflow: hidden;
				background: #ffffff;
				text-align: center;
				max-width: 100%;
				max-height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				margin: auto;
				vertical-align: middle;
			}
		}

		.FeaturesStyle {
			text-align: center;
			background: #ffffff;
			padding: 10px;

			p {
				margin: 0;
			}
		}

		.van-tabs__line {
			z-index: 0;
		}

		&-title {
			font-size: 16px;
		}

		&-price {
			font-size: 16px;
			font-weight: 700;
		}

		&-express {
			font-size: 12px;
			padding: 5px 15px;

			.van-cell__value--alone {
				color: #999;
			}
		}

		&-notice-title {
			font-weight: 600;
		}

		&-notice-content {
			font-size: 12px;
			color: #8d9099;
		}

		&-cell-group {
			margin-top: 15px;

			.van-cell__value {
				color: #999;
			}
		}

		&-cell-line {
			display: block;
			border-bottom: 1px solid #ebedf0;
			transform: scaleY(0.5);
			margin: 4px 0;
		}

		.DealList {
			background: #ffffff;
			font-size: 14px;

			.tableStyle_head {
				background: #f2f2f2;
			}

			.DealListHead {
				background: #eeeeee;
			}

			.tableRow {
				display: flex;
				justify-content: space-around;
				padding: 0 10px;
			}

			.tableRow_col {
				flex: 1;
				line-height: 30px;
				height: 30px;
				text-align: center;
			}

			.setWidth {
				line-height: 30px;
				height: 30px;
				text-align: center;
				width: 45px;
			}
		}
		.isProdType{
			background-color: #fe5252;
			color: rgb(255, 255, 255);
			border-radius: 25px;
			width: 89%;
			text-align: center;
			height: 40px;
			margin: 0 auto;
			line-height: 40px;
			font-size: 16px;
			letter-spacing: 2px;
		}
		.isActive2{
			background-color: #fe5252;
			color: rgb(255, 255, 255);
			border-radius: 25px;
			width: 89%;
			text-align: center;
			height: 40px;
			margin: 0 auto;
			line-height: 40px;
			font-size: 16px;
			letter-spacing: 2px;
			opacity:0.7;
		}
		.timeSty{
			color:#ee0a24;
			font-size:14px
		}
		.titleSize{
			font-size: 14px;
		}
		.PromWhereIndex{
			display: inline-block;
			background: #fff;
			color: red;
			margin-left: 10px;
			border-radius: 16px;
			padding: 3px 10px;
			font-size: 12px;
			letter-spacing: 1px;
		}
		.oldPrice{
			letter-spacing: 1px;
			text-decoration: line-through;
			font-size: 8pt;
			color:#f9f3f3;
			line-height: 10px;
			padding-left: 5px;
		}
		.oldPrice1{
			font-size: 8pt;
			color:#f9f3f3;
		}
		.GroupNum{
			background-color: #fff;
			margin: 8px 0;
			max-height: 180px;
			overflow-y: scroll;
		}
		.listBox{
			display: flex;
			box-sizing: border-box;
			padding-bottom: 10px;
		}
	}
</style>
