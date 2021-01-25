<template>
	<div class="goodCoupon" :class="classHome">
		<div class="vanImage-style">
			<swiper class="goodCouponSwipe" :style="classA">
				<swiper-item v-for="(thumb,index) in goods.ImgList" :key="index">
					<!-- #ifndef H5-->
					<image :src="thumb |fmtImgUrl" />
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<img :src="thumb |fmtImgUrl" />
					<!-- #endif -->
				</swiper-item>
			</swiper>
			<div class="timer-style" v-if="seckill">
				<span class="timer-left">限时秒杀</span>
				<div class="timer-right">
					<span style="margin-right:4px">{{startIS==='end'?'活动结束':'距'+(startIS?'结束':'开始')+'仅剩'}}</span>
					<uni-countdown color="#fff" splitor-color="#fff" background-color="transparent" :day="activeTimeMy.day" :hour="activeTimeMy.hours"
					 :minute="activeTimeMy.minute" :second="activeTimeMy.second" @timeup="finishTimer"></uni-countdown>
				</div>
			</div>
		</div>
		<div>
			<div class="wu-cell" style="display: block;">
				<div class="goodCoupon-title">{{ goods.Name }}</div>
				<div class="goodCoupon-express" style="padding:0" v-if="skuDataInfo.IsBuy === '0'">
					可购买时间：
					<span style="color:#ee0a24;font-size:14px" v-if="goods.BuyTime">{{goods.BuyTime|setBuyTime}}</span>
					<span style="color:#ee0a24;font-size:14px" v-if="goods.ActivityDate">{{goods.ActivityDate|setBuyTime}}</span>
				</div>
				<div class="goodCoupon-price ">
					<div v-if="isIntegral!='true'">
						<!-- <div v-if="maxMemberPrice>0||minMemberPrice>0">
							<span class="colorStyle">¥{{minMemberPrice}}-{{maxMemberPrice}}</span>
							<p style="text-decoration: line-through;font-size: 8pt;color:#999;line-height: 10px;font-weight: 100;">
								¥{{minPrice}}-{{maxPrice}}
							</p>
						</div>
						<div v-else>
							<span class="colorStyle">¥{{minPrice}}-{{maxPrice}}</span>
						</div> -->
						<div v-if="goods.SpecType==='2'">
							<div v-if="maxMemberPrice>0||minMemberPrice>0">
								<span class="colorStyle">¥{{minMemberPrice}}-{{maxMemberPrice}}</span>
								<p style="text-decoration: line-through;font-size: 8pt;color:#999;line-height: 10px;font-weight: 100;">
									¥{{minPrice}}-{{maxPrice}}
								</p>
							</div>
							<div v-else>
								<span class="colorStyle" v-if="minPrice==maxPrice">¥{{goods.SalePrice}}</span>
								<span v-else class="colorStyle">¥{{minPrice}}-{{maxPrice}}</span>
							</div>
						</div>
						<div v-if="goods.SpecType ==='1'">
							<div class="colorStyle">
								<div v-if="goods.MemberPrice">
									¥{{goods.MemberPrice}}
									<p style="text-decoration: line-through;font-size: 8pt;color:#999;line-height: 10px;font-weight: 100;">
										¥{{goods.SalePrice}}
									</p>
								</div>
								<div v-else>¥{{goods.SalePrice}}</div>
							</div>
						</div>
						<!-- 电子券商品 -->
						<div v-if="goods.ProdType==='1'&& goods.SpecType ==='0'">
							<div class="colorStyle">
								<span>¥{{goods.SalePrice>0?goods.SalePrice:0}}</span>
								<span v-if="goods.maxPrice">- ¥{{ goods.SalePriceMaxPrice }}</span>
							</div>
						</div>
					</div>
					<div v-else>
						<span>{{goods.Score}}积分</span>
						<span v-if="goods.SalePrice>0&&isIntegral">&nbsp;+&nbsp;</span>
						<span v-if="goods.SalePrice>0">¥</span>
						<span v-if="goods.SalePrice>0">{{goods.SalePrice}}</span>
					</div>
				</div>
			</div>
			<div class="wu-cell goodCoupon-express lineTop">
				<div style="flex:1" v-if="isIntegral!=='true'">销量：{{ goods.SaleCnt |setMoney}}</div>
				<div style="flex:1" v-if="goods.StockType != 0">剩余库存：{{ Number(goods.StoreQty)}}</div>
				<!--                <div v-if="!isCouponPage">规格：</div>-->
			</div>
			<div class="ImportantNotes-cell-group">
				<span class="goodCoupon-notice-title titleSize" v-if="goods.Tip">预定提示</span>
				<span style="margin: 5px 0;display: block;" v-if="goods.Tip">{{goods.Tip}}</span>
			</div>
		</div>

		<div>
			<adCell text="商城" icon="/static/img/shangcheng1.png" @click="clickShop" detail="进入店铺" :showBottomLine="false">
			</adCell>
		</div>
		<div v-if="!isIntegral&&!seckill">
			<adCell detail="查看全部" :text="`用户评价(${goods.CommentCnt&&Number(goods.CommentCnt)!==0?goods.CommentCnt:0})`" @click="userEvaluation(goods)"
			 :showBottomLine="false">
			</adCell>
		</div>
		<div style="background-color: #fff" class="lineTop">
			<view class="goodInfoNewsTitle">
				<wuc-tab textFlex :tab-list="tabList" :tabCur.sync="TabCur" tab-class="'text-center','text-black','bg-white'"
				 select-class="wuc-tab-select"></wuc-tab>
			</view>
			<view class="contentStyle" v-show="TabCur==0">
				<div class="udStyle" v-html="goods.Features"></div>
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
		<div class="ImportantNotes-cell-group" v-if="!isCouponPage&&(goods.ImportantNotes||goods.Tip)">
			<div>
				<!-- <span class="goodCoupon-notice-title" v-if="goods.ImportantNotes">重要提示</span> -->
				<div class="goodCoupon-notice-content" v-if="goods.ImportantNotes">
					<div v-html="goods.ImportantNotes"></div>
				</div>
				<!-- <span class="goodCoupon-cell-line" v-if="goods.Tip&&goods.ImportantNotes"></span>
				<span class="goodCoupon-notice-title" v-if="goods.Tip">预定提示</span>
				<div class="goodCoupon-notice-content" v-if="goods.Tip">{{goods.Tip}}</div> -->
			</div>
		</div>
		<div class="goods-action" v-show="goods.ProdType == '0'">
			<!-- 当状态等于0下面的框是绿色，如果下面goods.StockType != '0'&& item.StoreQty <= '0'" 那么下面的框就是灰色不让点击 -->
			<!-- <uni-goods-nav :options="options" :buttonGroup="buttonGroup"></uni-goods-nav> -->
			<uni-goods-nav :options="options" :buttonGroup="buttonGroup" :IsGoodBuyTime="IsGoodBuyTime" :skuDataInfo="skuDataInfo.ProdInfo" v-if="goods.State==='0'||goods.StockType != '0'&& goods.StoreQty <= '0'|| IsGoodBuyTime==false"></uni-goods-nav>
			<uni-goods-nav :options="options" :buttonGroup="buttonGroup" @buttonClick="addCart" @click="jumpCart" v-else></uni-goods-nav>
		</div>
		<div class="goods-action" v-show="goods.ProdType =='1' ">
			<uni-view class="isProdType">
				<uni-view class="uni-tab__seat" @click="buyNow(goods)">立即购买</uni-view>
			</uni-view>
		</div>
		<!-- 购物车详情 -->
		<a-shopping-showSku :show="show" @hideShow="hideShow" :skuDataInfo="skuDataInfo" :seckill="seckill" :isBrowse="isBrowse"></a-shopping-showSku>
		<!-- 电子券弹窗 -->
		<showTicket :show="showPop" @hideShow="hidePop" :skuDataInfo="skuDataInfo"></showTicket>
	</div>
</template>
<script>
	// import "@/config/jquery.base64.js";
	import {
		GetBaseImgUrl
	} from "@/util/publicFunction";
	import {
		vipCard
	} from "@/api/http.js";
	import {
		Base64
	} from 'js-base64';
	import adCell from '@/node_modules/adcell/ADCell.vue';
	import showTicket from '@/components/a-shopping-showSku/a-shopping-showTicket'
	export default {
		name: "couponPage",
		components: {
			adCell,
			showTicket
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
			// userList: {
			//   type: Array,
			//   default() {
			//     return [{ name: "计划及粉底" }];
			//   }
			// },
			skuDataInfo: {
				type: Object,
				default () {
					return {};
				}
			},
			isIntegral: {
				type: String,
				default: "false"
			},
			seckill: {
				type: String,
				default () {
					return "";
				}
			},
			// 是否是浏览页面
			isBrowse: {
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
				showPop: false, //电子券弹窗
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
				maxPrice: "",
				minPrice: "",
				maxMemberPrice: "",
				minMemberPrice: "",
				IsGoodBuyTime: false,
			};
		},
		created() {
			// $.base64.atob(this.goods.Features, "utf8")				
			this.goods.ImgList = this.goods.ImgList ? this.goods.ImgList.split(",") : [];
			this.goods.ImgList.unshift(this.goods.Img)
			this.goods.Features = this.goods.Features ?
				Base64.decode(this.goods.Features) : "";
			this.goods.ImportantNotes = this.goods.ImportantNotes ?
				Base64.decode(this.goods.ImportantNotes) : "";

			//加图片 ../前缀
			this.goods.Features = setfix(this.goods.Features, this);
			this.goods.ImportantNotes = setfix(this.goods.ImportantNotes, this);
			if (this.isIntegral != 'true' && !this.isCouponPage && !this.seckill) {
				if (this.skuDataInfo.SpecList) {
					this.maxPrice = Math.max.apply(Math, this.skuDataInfo.SpecList.map(item => {
						return Number(item.SalePrice)
					}))
					this.minPrice = Math.min.apply(Math, this.skuDataInfo.SpecList.map(item => {
						return Number(item.SalePrice)
					}))
					this.maxMemberPrice = Math.max.apply(Math, this.skuDataInfo.SpecList.map(item => {
						return Number(item.MemberPrice)
					}))
					this.minMemberPrice = Math.min.apply(Math, this.skuDataInfo.SpecList.map(item => {
						return Number(item.MemberPrice)
					}))
				}
			}
			this.tradeList()
			if (this.skuDataInfo.ProdInfo.BuyTime) {
				let BuyTime = this.skuDataInfo.ProdInfo.BuyTime.split(',')
				this.IsGoodBuyTime = this.isDuringDate(BuyTime[0], BuyTime[1])
			} else {
				this.IsGoodBuyTime = true
			}
			if (this.isIntegral != 'true' && !this.isCouponPage && !this.seckill) {
				this.buttonGroup.push({
					text: '加入购物车',
					// backgroundColor: (this.skuDataInfo.IsBuy === '0' || this.goods.StockType != '0'&& this.goods.StoreQty <= '0')?'#FFC868':'#ffa200',
					backgroundColor: '#ffa200',
					color: '#fff',
					borderRadius: '25px 0 0 25px',
					isbuy: this.skuDataInfo.IsBuy,
					disabled: (this.skuDataInfo.IsBuy === '0' || this.goods.StockType != '0' && this.goods.StoreQty <= '0') ? true :
						false
				})
				this.options.push({
					icon: 'cart',
					text: '购物车'
				})
			}
			if (this.isIntegral != 'true' && !this.isCouponPage && !this.seckill) {
				this.buttonGroup.push({
					text: '立即购买',
					backgroundColor: getApp().globalData.mainColor,
					color: '#fff',
					borderRadius: '0 25px 25px 0',
					isbuy: this.skuDataInfo.IsBuy,
					// disabled: (this.skuDataInfo.IsBuy === '0' || this.goods.StoreQty == 0) ? true : false
					disabled: (this.skuDataInfo.IsBuy === '0' || this.goods.StockType != '0' && this.goods.StoreQty <= '0') ? true :
						false
				})
			}
			if (this.isIntegral == 'true' || this.isCouponPage || this.seckill) {
				this.buttonGroup.push({
					text: '立即抢购',
					backgroundColor: getApp().globalData.mainColor,
					color: '#fff',
					borderRadius: '25px',
					disabled: (this.skuDataInfo.IsBuy === '0' || this.goods.StoreQty == 0 || this.startIS !== true) ? true : false
				})
			}
		},
		mounted() {
			this.classA = {
				// 图片和屏幕的width一样大
				height: uni.getSystemInfoSync().windowWidth + "px"
			};
			// #ifdef H5
			document.title = this.goods.Name;
			// #endif
		},
		computed: {
			isCouponPage() {
				// 是优惠券购买页面  //否则商品购买界面
				return (
					this.$route.matched[0].path === "/shoppingMall/couponPage/:id" || false
				);
			}
		},

		methods: {
			isDuringDate(beginDateStr, endDateStr) {
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
				var nowddd = year + "-" + month + "-" + day + ' ' + h + ':' + minute + ':' + second
				let StartTime = nowDate + ' ' + beginDateStr;
				let endTime = nowDate + ' ' + endDateStr;
				if (nowddd >= StartTime && nowddd <= endTime) {
					return true;
				}
				return false

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
			addCart(val) {
				if (val.content.text === '立即抢购') {
					this.orderNow()
				} else {
					// 点击购物车，出现弹框
					this.show = true;
					this.isAddCart = true;
				}
			},
			jumpCart() {
				if (this.isBrowse) {
					return;
				}
				this.$Router.pushTab({
					path: "/pages/shoppingMall/shoppingCart/index"
				});
			},
			orderNow() {
				if (this.isCouponPage || this.isIntegral == "true") {
					// 优惠券购买，直接 调取微信支付
					let currentItem = [{
						ProdSID: this.goods.SID,
						ProdNo: this.goods.ProdNo,
						BuyCnt: 1
					}];
					let bool = this.isIntegral ? {
						isIntegral: "1"
					} : {};
					this.$store.commit("SET_CURRENT_CARD", currentItem);
					this.$Router.push({
						path: "/pages/shoppingMall/order/confirmOrder",
						query: bool
					});
				} else {
					this.show = true;
					this.isAddCart = false;
				}
			},

			hideShow() {
				this.show = false;
			},
			// 电子券相关的开始
			buyNow() {
				this.showPop = true;
			},
			hidePop() {
				this.showPop = false;
			},
			// 电子券结束
			finishTimer() {
				setTimeout(() => {
					this.getTimeout();
				}, 1000)
			},
			// 商品成交记录
			async tradeList() {
				try {
					let {
						Data
					} = await vipCard({
						Action: 'GetNewDeal',
						ProdType: this.goods.ProdType,
						ProdSID: this.goods.SID
					}, 'UProdOpera')
					this.userList = Data.CommentList
					this.getTimeout()
				} catch (e) {

				}
			},
			getTimeout(current) {
				let currentT = new Date().getTime()
				let End = new Date(this.goods.EndDate.replace(/-/g, '/')).getTime()
				let Start = new Date(this.goods.StartDate.replace(/-/g, '/')).getTime()
				// let Start = new Date('2020-05-18 14:55:00').getTime()
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

				if (this.seckill) {
					this.buttonGroup[0].disabled =
						(this.skuDataInfo.IsBuy === '0' || this.goods.StoreQty == 0 || this.startIS !== true) ? true : false
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
		.udStyle{
			p{
				width: 100%;
				border: 1px solid blue !important;
			}
		}
		.goods-action {
			position: fixed;
			right: 0;
			bottom: 0;
			left: 0;
			align-items: center;
			height: 50px;
			background-color: #fff;
			display: flex;

			.isProdType {
				background-color: rgb(173, 184, 56);
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
	}
</style>
