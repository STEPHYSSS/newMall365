<template>
	<view class="goodCoupon" :class="classHome">
		<view class="vanImage-style">
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
			<div class="timer-style" style="height: 35px;">
				<span class="timer-left">2人拼团价格</span>
				<div class="timer-right">
					<span style="margin-right:4px">距开始12天</span>					
				</div>
			</div>
		</view>
		<view style="background-color: #fff;width: 100%;padding: 0 13px 10px;">
			<p style="color: red;font-size: 20px;">￥{{goods.price}}</p>
			<p style="font-size: 15px;margin-bottom: 5px;">{{goods.Name}}</p>
			<view>
				<span style="display: inline-block;padding: 3px 5px;background-color:#fe5252;color: #fff;border-radius: 3px;margin-right: 7px;">领券</span>
				<span style="display: inline-block;padding: 3px 5px;border: 1px solid rgb(243, 88, 88);color: #cf0000;margin-right: 6px;border-radius: 3px;">6元无门槛商品券</span>
				<span style="display: inline-block;padding: 3px 5px;border: 1px solid rgb(243, 88, 88);color: #cf0000;border-radius: 3px;">5元无门槛商品券</span>
			</view>
		</view>
		<view style="background-color: #fff;margin: 8px 0;padding-bottom: 15px;">
			<adCell text="拼团玩法"  detail="详细规则" :showBottomLine="false" @click="toGroupPlay"></adCell>
			<p style="width: 96%;margin: 0 13px;">支付开团邀请1人参团，人数不足自动退款</p>
		</view>
		<view style="background-color: #fff;margin: 8px 0;">
			<adCell text="以下小伙伴正在发起拼团,可直接参与"  :showBottomLine="false"></adCell>
			<view style="display: flex;box-sizing: border-box;padding-bottom: 10px;">
				<p style="flex: 1;margin-left: 10px;display: flex;">
					<image style="width: 35px;height: 35px;border-radius: 50%;background-color: orange;margin-right: 8px;"></image>
					<view style="flex: 1;">
						<p style="margin-bottom: 5px;">燕子</p>
						<p style="color: #7e7e7e;letter-spacing: 1px;">还差<text style="color:#f30000 ;">1人</text>成团</p>
					</view>
				</p>
				<p style="width: 100px;text-align: center;">
					<button style="display: inline-block;padding: 0px 10px;background-color:#fe5252;color: #fff;border-radius: 3px;
					line-height: 30px;font-size: 14px;letter-spacing: 1px ;">去凑团</button>
				</p>
				
			</view>
		</view>
		<view>
			<adCell text="商城" icon="/static/img/shangcheng1.png" @click="clickShop" detail="进入店铺" :showBottomLine="false"></adCell>
		</view>
		<div class="goods-action">
			<navGroup  @buttonClick="buySeparately" @click="jumpCart"></navGroup>
		</div>
		<a-shopping-showSku :show="show" @hideShow="hideShow" :isBrowse="isBrowse" :isGroup = "isGroup"></a-shopping-showSku>
	</view>
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
	import navGroup from "@//components/uni-goods-nav/uni-goods-navGroup"
	export default {
		name: "couponPage",
		components: {
			adCell,
			showTicket,
			navGroup
		},
		props: {
			goods: {
				type: Object,
				default () {
					return {
						Name: "小分子玻尿酸紧致保湿弹润面膜20片",
						desc:"小分子玻尿酸技术，深层渗透，精致滋润，补水保湿，肌肤保持Q弹嫩感",
						price: 179,
						maxPrice: 100,
						Deal: "100",
						ImgList: [
							"https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg",
							"https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg"
						]
					};
				}
			},
			skuDataInfo: {
				type: Object,
				default () {
					return {};
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
				isAddCart: true,// 点击的是购物车
				isGroup:true,//拼团
				classA: "",
				userList: [],
				TabCur: 0,
				tabList: [{
					name: '商品详情'
				}, {
					name: '最近成交'
				}],
			};
		},
		created(){},
		mounted() {
			this.classA = {
				// 图片和屏幕的width一样大
				height: uni.getSystemInfoSync().windowWidth + "px"
			};
			// #ifdef H5
			document.title = this.goods.Name;
			// #endif
		},
		methods: {
			buySeparately(val) {//购买按钮				
				this.show = true;
				this.isAddCart = true;
			},
			hideShow() {
				this.show = false;
			},
			jumpCart() {//加入购物车
				if (this.isBrowse) {
					return;
				}
				this.$Router.pushTab({
					path: "/pages/shoppingMall/shoppingCart/index"
				});
			},
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
			clickShop() {//进入商城
				if (this.isBrowse) {
					return;
				}
				this.$Router.push({
					path: "/pages/shoppingMall/index"
				});
			},
			
			async tradeList() {// 商品成交记录
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
			toGroupPlay(){
				uni.navigateTo({
				    url: '/pages/shoppingMall/makeGroup/groupPlay'
				});
			}
		}
	};

	function setfix(val, _this) {
		let str = "";
		let strWidth=""
		if (!val) { return '' }
		let abc = GetBaseImgUrl();
		strWidth = val.replace(/<img/g, "<img style='max-width:100%;height:auto;'");
		str = strWidth.replace(/src="Files/g, `src="${abc}../Files`)
		return str;
	}
</script>

<style lang="less">
	.actime-style{
		display: flex;
		.actime_left,.actime_right{
			flex: 1;
		}
		.actime_left text:first-letter{
			font-size: 2em;
			padding: 0.1em;
			color: #cf0000;
			vertical-align: middle;
		}
	}
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
