<template>
	<div class="confirm-order-style" :class="mainStyle">
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickLeft" title="确认订单" :status-bar="true" :shadow="false"></uni-nav-bar>
		<a-nodeData stringVal="获取数据失败" v-if="!loading&&prodList.length===0"></a-nodeData>
		<div v-if="prodList.length>0">
			<!-- 商品信息 -->
			<div class="good_card_box">
				<div v-for="(item,index) in prodList" :key="index">
					<a-good-lineBox :itemData="item" :isOrder="true" :isIntegral="$Route.query.isIntegral?true:false"></a-good-lineBox>
				</div>
				<div class="total-style">
					<p v-if="ScoreAmt>0">积分优惠：- ¥{{ScoreAmt}}</p>
					<span>
						小计：
						<span class="total-style__color">
							<span>¥{{SumTotal}}</span>
						</span>
					</span>
				</div>
			</div>
			
			<div class="radio-group-play">				
				<view class="payStyle">支付方式</view>
				<radio-group @change="radioPayChange">
					<div>
						<div class="radio-group-item" @click="PayTypeClick('1')">
							<div>
								<img class="wechat" src="@/static/assets/img/moneyPay.png" slot="right-icon" />
								<span class="custom-title">卡支付（余额:{{CardInfo.Balance}}）</span>
							</div>
							<div style="flex:1;text-align: right;">
								<radio style="" slot="right-icon" value="1" :checked="radioPayType == '1'" v-if="Number(CardInfo.Balance)>totalCurrent" />
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
				<button @click="submitMoney" class="submitMargin">结算</button>
			</div>
			
		</div>
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
						<span style="padding-left:10px;">{{SumTotal}}</span>
					</div>
					<div class="block-item" v-if="CardInfo.IsPass==='1'">
						<div class="label" style="text-indent:10px;">微卡密码</div>
						<input type="password" style="padding-left:10px;width: 160px;" placeholder="请输入密码" name="password" v-model="password" />
					</div>					
				</div>
				<div class="button-theme-big" style="padding-bottom: 20px;">
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
	import adCell from '@/node_modules/adcell/ADCell.vue';

	export default {
		name: "confirmOrder",
		components: {
			adCell
		},
		data() {
			return {
				isDisabled: false,
				mainStyle: getApp().globalData.mainStyle,
				mainColor: getApp().globalData.mainColor,
				loading: true,
				currentItem: [],//用来接收下单商品
				radioModes: 2,
				prodList: [],
				totalCurrent: 0,
				radioPayType: "1",
				// 卡信息
				CardInfo: {},
				// 购物车列表sid
				cardSids: [],
				testData: {},
				allData: {},
				SumTotal:'',
				ScoreAmt:'',//积分优惠
				password: "",//微卡支付密码
				IsPass: "",
				payTypePop:false,//微卡支付弹窗
			};
		},
		async created() {
			if (
				!this.$store.state.currentCard ||
				this.$store.state.currentCard.length === 0
			) {
				this.$Router.back(2)
				this.$Router.back(100)
			}
			let item = this.$store.state.currentCard || [];
			this.currentItem = item;
			this.cardSids = this.cardSids ? this.cardSids.join(",") : "";
			await this.getInfo();
		},
		methods: {
			// 电子券下单的信息
			async getInfo() {
				this.loading = true;
				// uni.showLoading()
				let currentStore = JSON.parse(localStorage.getItem('currentStoreInfo'));
				
				let currentCard = JSON.parse(localStorage.getItem('currentCard'));
				try {
					let data = await vipCard(
					  {
						Action: "TicketBuy",
						ShopSID:currentStore.data.SID,
						ProdList:this.currentItem,
						PromotionItemSID:currentCard[0].PromotionItemSID
					  }, "UProdOpera")
					  this.prodList = data.Data.ProdList;
					  this.SumTotal = data.Data.SumTotal;//总价
					  this.ScoreAmt = data.Data.ScoreAmt;//积分优惠
					  this.CardInfo =data.Data.hasOwnProperty("CardInfo") ? data.Data.CardInfo : {};					  
					  if (JSON.stringify(this.CardInfo) !== "{}") {
					  	if (Number(data.Data.CardInfo.Balance) < Number(data.Data.SumTotal)) {
					  		//余额不足默认微信支付
					  		this.radioPayType = "2";
					  	}
					  } else {
					  	this.radioPayType = "2";
					  }
				} catch (e) {
					this.$toast(e)
				}
			},
			// 支付方式点击按钮
			PayTypeClick(item) {
				if (this.CardInfo && Number(this.CardInfo.Balance) < this.totalCurrent) {
					return;
				}
				this.radioPayType = item;
			},
			radioPayChange(val) {
				if (this.CardInfo && Number(this.CardInfo.Balance) < this.totalCurrent) {
					return;
				}
				this.radioPayType = val.detail.value
			},
			// 调用微信接口
			async getWxConfig(){
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
						jsApiList: ["getLocation","openAddress","scanQRCode"]
					});
					// console.log(wx.config)
					wx.ready(res => {
						let _this = this;
					    wx.getLocation({
					       type: 'gcj02',  // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
					      success: function(res) {
							  // alert(JSON.stringify(res))
					        // _this.location.latitude = res.latitude;// 纬度，浮点数，范围为90 ~ -90
					        // _this.location.longitude = res.longitude;// 经度，浮点数，范围为180 ~ -180。
							_this.location = {
								longitude: res.longitude,
								latitude: res.latitude
							}
							_this.$store.commit("SET_CURRENT_LOCATION", _this.location);
							sessionStorage.setItem('location',JSON.stringify(_this.location))							
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
					// console.log(e, "55555");
				}
			},			
			// 返回控制
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

			},
			submitMoney(){//点击结算按钮，展示弹窗
				if(this.radioPayType === "1"){
					this.payTypePop = true;
					this.$refs.payTypePop.open()
				}else{
					this.OrderCardPay();
				}
			},
			async OrderCardPay() {
				this.isDisabled = true;
				setTimeout(() => {
					this.isDisabled = false;
				}, 5000)
				let currentStore = JSON.parse(localStorage.getItem('currentStoreInfo'));
				// let currentStore = this.$store.state.currentStoreInfo || {}
				if (this.password === "" && this.IsPass === "1") {
					this.$toast("请填写密码");
					return;
				}
				let currentCard = JSON.parse(localStorage.getItem('currentCard'));
				try {
					let {Data} = await vipCard(
					  {
						Action: "TicketPay",
						ShopSID:currentStore.data.SID,
						// ProdList:JSON.stringify(this.prodList),
						ProdList:this.currentItem,
						PayType:this.radioPayType,
						PromotionItemSID:currentCard[0].PromotionItemSID
					  }, "UOrderOpera")
					  if (this.radioPayType === "1") {
					  	//微卡支付
						// if(Data.Success==true){
						// 	this.$toast.success("支付成功");
						// 	setTimeout(() => {
						// 		this.$Router.push("/pages/shoppingMall/order/paySuccess");
						// 	}, 600);
						// }
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
					  		weChatPayment(this, Data, false);
					  	} catch (e) {
					  		that.$toast.fail(e);
					  		this.loading = false;
					  		uni.hideLoading();
					  	}
					  }
				} catch (e) {
					this.$toast.error(e)
				}
				// if (JSON.parse(this.currentItem)[0].hasOwnProperty("PromotionItemSID")) {
				// 	// 活动
				// 	obj.PromotionItemSID = JSON.parse(this.currentItem)[0].PromotionItemSID;
				// }
			}	
		}
	};

	function setChangeData(num, aceTime) {
		let arrData = []; //日期
		let toDay = "";
		num = Number(num);
		for (let i = 0; i < num; i++) {
			let dayM = 24 * 60 * 60 * 1000; //一天的时间戳

			let date =
				aceTime > 1 ?
				new Date().getTime() + aceTime * dayM :
				new Date().getTime();

			toDay = i * dayM + date;
			arrData.push(getTime(toDay, true));
		}
		return arrData;
	}

	function setChangeTime(ShopBase, aceTime, dayAdvance) {
		let dayM = 60 * 60; //秒值
		let a = 60 * Number(ShopBase.IntervalMinute); //求秒值
		let endTime = countDown(ShopBase.EndTime);

		let startTime = Number(countDown(ShopBase.StartTime));
		let arr = [];
		let arrToday = [];
		while (startTime <= endTime) {
			arr.push(changeCountDown(startTime));
			startTime += a;
		}
		if (dayAdvance == 0) {
			arr.forEach(DATA => {
				DATA = countDown(DATA);
				if (
					dayAdvance == 0 &&
					DATA > countDown(getTime(false, false, true)) + Number(aceTime) * dayM
				) {
					arrToday.push(changeCountDown(DATA));
				}
			});
		} else {
			arrToday = arr;
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
		s = Number(hour * 3600) + Number(min * 60) + Number(sec);
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
		result = hour + ":" + middle + ":" + theTime;
		return result;
	}
</script>

<style lang="less">
	@import "../../../assets/css/radioModes";

	.setADcell {
		margin: 5px 0;
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
			}
		}

		.radio-group-play {
			background-color: #fff;
			align-items: center;
			padding: 5px 24rpx;
			margin-top: 5px;

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
		.radio-group-play .submitMargin{
			margin: 20px 0;
			background-color: #adb838;
			color: #fff;
		}
		.total-style {
			background: #fff;
			text-align: right;
			line-height:25px;
			font-size: 14px;
			padding-right: 10px;

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
			height: 50vh;

			.leftNavsidebar {
				width: 130px;
				display: fixed;
				position: fixed;
				top: 0;
				overflow-y: scroll;
				background: #f8f8f8;
				height: 100vh;
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
			margin-left: 130px;
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
	}
</style>
