<template>
	<div :class="['order-info-style',classHome]">
		<uni-nav-bar v-if="!showArea" :fixed="true" left-icon="back" @clickLeft="clickGo" title="订单详情" :status-bar="true"
		 :shadow="false"></uni-nav-bar>
		<div v-if="!loading&&OrderInfo.SID">
			<div class="order-area-fa" @click="clickAreaGo" v-if="JSON.stringify(currentArea) !== '{}'&&OrderInfo.OrderType!=='1'&&OrderInfo.OrderType!='3'">
				<div class="order-area-delivery" v-if="OrderInfo.DeliveryType === '1'&&JSON.stringify(currentArea) !== '{}'">
					<span class="order-area-info iconfont icon-dianpu" />
					<span style="vertical-align: middle;">提货门店</span>
				</div>
				<div class="order-area">
					<div class="order-area-icon">
						<image src="/static/img/weizhi.png" alt />
					</div>
					<div v-if="JSON.stringify(currentArea) !== '{}'" style="flex: 1">
						<div>
							<span>{{currentArea.hasOwnProperty('UserName')?currentArea.UserName:currentArea.Name}}{{currentArea.Sex |setSex}}</span>
							<span class="order-area-phone">{{currentArea.Mobile?currentArea.Mobile:currentArea.Tel}}</span>
						</div>
						<div class="order-area-location">{{currentArea.Address}}</div>
					</div>
				</div>
			</div>
			<div class="good_card_box" style="margin-bottom:10px" v-if="OrderInfo.OrderType=='2'">
				<div v-for="(item,index) in prodList" :key="index">
					<a-good-lineBox :itemData="item" :isOrder="true" :isIntegral="OrderInfo.OrderType==4"></a-good-lineBox>
				</div>
			</div>
			<div class="good_card_box" style="margin-bottom:10px" v-if="OrderInfo.OrderType=='3'">
				<a-good-lineBox :itemData="OrderInfo" :isOrder="true" :isIntegral="OrderInfo.OrderType==4"></a-good-lineBox>
			</div>
			<div style="background-color: #fff;">
				<!-- <adCell detailColor="#969799" text="商品总价" showArrow="false" :detail="OrderInfo.ProdAmt" v-if="Number(OrderInfo.ProdAmt)>0" />
				<adCell detailColor="#969799" text="方案优惠" showArrow="false" :detail="'-'+OrderInfo.DiscAmt" v-if="Number(OrderInfo.DiscAmt)>0" />
				<adCell detailColor="#969799" text="电子券优惠" showArrow="false" :detail="'-'+OrderInfo.TicketAmt" v-if="Number(OrderInfo.TicketAmt)>0" />
				<adCell detailColor="#969799" text="积分抵扣" showArrow="false" :detail="'-'+OrderInfo.ScoreAmt" v-if="Number(OrderInfo.ScoreAmt)>0"/>
				<adCell detailColor="#969799" text="运费" showArrow="false" :detail="Number(OrderInfo.Freight)?'¥'+OrderInfo.Freight:'免运费'" />
				<adCell detailColor="#969799" text="实付金额" showArrow="false" :detail="OrderInfo.PayAmt" /> -->
				<!-- <adCell detailColor="#969799" text="实付金额" showArrow="false" :detail="setScore(OrderInfo)" /> -->
				
				<div class="orderData">
					<div class="orderTime">
						<div class="orderTime_label">商品总价</div>
						<span class="priceSpan">¥{{OrderInfo.ProdAmt}}</span>
					</div>
					<div class="orderTime" v-if="Number(OrderInfo.DiscAmt)>0">
						<div class="orderTime_label">方案优惠</div>
						<span class="priceSpan">-¥{{OrderInfo.DiscAmt}}</span>
					</div>
					<div class="orderTime" v-if="Number(OrderInfo.TicketAmt)>0">
						<div class="orderTime_label">电子券优惠</div>
						<span class="priceSpan">-¥{{OrderInfo.TicketAmt}}</span>
					</div>
					<div class="orderTime" v-if="Number(OrderInfo.ScoreAmt)>0">
						<div class="orderTime_label">积分抵扣</div>
						<span class="priceSpan">-¥{{OrderInfo.ScoreAmt}}</span>
					</div>
					<div class="orderTime" v-if="OrderInfo.OrderType =='2'">
						<div class="orderTime_label">运费</div>
						<span class="priceSpan">{{Number(OrderInfo.Freight)?'¥'+OrderInfo.Freight:'免运费'}}</span>
					</div>
					<div class="orderTime">
						<div class="orderTime_label priceName">实付金额</div>
						<span class="priceSpan priceColor">¥{{OrderInfo.PayAmt}}</span>
					</div>
				</div>
				<div style="text-align: right;padding:10px" v-if="OrderInfo.State==='-1'">
					<button type="main" size="mini" style="margin-right:10px" @click="payBtnSubmit">微信支付</button>
					<button type="default" size="mini" @click="cancelBtn">取消订单</button>
				</div>
				<div class="btn-fa-style" style="text-align: right;padding:10px" v-if="OrderInfo.State==='0'">
					<button type="main" v-if="OrderInfo.OrderType==='4'" size="mini" @click="pickCode">取货码</button>
					<!-- 退款 -->
					  <!-- orderType 充值 = 1, 销售 = 2, 电子券 = 3, 积分兑换 = 4 -->
					  <!-- refundAllow是否支持退款 -->
					<button v-if="refundAllow!=='2'&&OrderInfo.OrderType!=='4'" type="default" size="mini" @click="cancelrefund(OrderInfo.RefundState)">
					{{OrderInfo.RefundState |RefundState}}</button>
					<!-- 已提货才能评价 -->
					<button v-if="OrderInfo.OrderType==='3'" type="main" size="mini" @click="cancelEvaluate(OrderInfo)">评价</button>
				</div>
			</div>			
			<div class="orderData">
				<div class="orderTime" v-if="OrderInfo.OrderType&&OrderInfo.OrderType>0&&OrderInfo.OrderType!=='2'">
					<div class="orderTime_label">商品类型：</div>
					<span>{{OrderInfo.OrderType |orderType}}</span>
				</div>
				<div class="orderTime">
					<div class="orderTime_label">支付状态：</div>
					<span>{{OrderInfo.State |orderState}}</span>
				</div>
				<div class="orderTime">
					<div class="orderTime_label">支付方式：</div>
					<span>{{OrderInfo.PayType | payTypeOrder}}</span>
				</div>
				<div class="orderTime">
					<div class="orderTime_label">订单编号：</div>
					<span>{{OrderInfo.ExchNo}}</span>
					<span class="copyText colorStyle" id="copyText" @click="copyTextFun(OrderInfo.SID)">复制</span>
					<div id="NewsToolBox"></div>
				</div>
				<div class="orderTime" v-if="OrderInfo.OrderType!=='3'">
					<div class="orderTime_label">订单配送方式：</div>
					<span>{{OrderInfo.DeliveryType |deliveryType}}</span>
				</div>
				<div class="orderTime">
					<div class="orderTime_label">创建时间：</div>
					<span>{{OrderInfo.AddTime}}</span>
				</div>
				<div class="orderTime">
					<div class="orderTime_label">支付时间：</div>
					<span v-if="OrderInfo.PayTime">{{OrderInfo.PayTime}}</span>
					<span v-else>--</span>
				</div>
			</div>
		</div>
		<div class="confirm-area-popup-fa">
			<uni-popup ref="showArea" position="bottom" class="confirm-area-popup" @change="showAreaChange">
				<!-- <head-nav title="查看门店位置" :noG0="false" @clickGo="clickGoAddress"></head-nav> -->
				<uni-nav-bar v-if="showArea" :fixed="true" left-icon="back" @clickLeft="clickGoAddress" title="查看门店位置" :status-bar="true"
				 :shadow="false"></uni-nav-bar>
				<iframe id="mapPage" width="100%" height="100%" frameborder="0" :src="`https://apis.map.qq.com/tools/poimarker?type=0&marker=coord:${currentArea.Latitude},${currentArea.Longitude}&key=IB5BZ-HF53W-5KLRH-R3VUL-35KO7-Y2BUT&referer=365商城管理`"></iframe>
			</uni-popup>
		</div>
		<!-- <uni-popup type="bottom" ref="popupPay" style="padding:10px;width:70%;text-align: center">
			<div style="background: #fff;padding: 20px;">
				<button type="main" size="mini" style="margin-right:20px" @click="payBtnSubmit(1)">微卡支付</button>
				<button size="mini" @click="payBtnSubmit(2)">微信支付</button>
			</div>
		</uni-popup> -->
	</div>
</template>

<script>
	// import cardBox from "@/components/goodsBox/lineBox";
	import {
		vipCard
	} from "@/api/http.js";
	import {
		weChatPayment
	} from "@/util/publicFunction";
	import adCell from '@/node_modules/adcell/ADCell.vue';

	export default {
		components: {
			adCell
		},
		data() {
			return {
				classHome: getApp().globalData.mainStyle,
				currentArea: {},
				prodList: [],
				OrderInfo: {},
				loading: true,
				payType: 1, //卡支付，2微信支付,
				showArea: false,
				refundAllow: null, //是否支持退款
				Refund: {}, //退款信息
				infoData: {},
				orderId:'',
				OrderType:''
			};
		},
		created() {
			if(this.$route.query.query){
				console.log(this.$route.query.query)
				let getDecode = decodeURIComponent(this.$route.query.query);
				console.log(getDecode)
				let getDQuery = JSON.parse(getDecode)
				this.orderId=getDQuery.order_id;
				this.OrderType = getDQuery.OrderType
				this.getInfo();
				// this.CateSID= getDQuery.order_id
				// let abc = JSON.parse(this.$route.query.query)
				// let getDQuery = JSON.parse(getDecode)
				// let getObj = JSON.parse(getDQuery.query)
				// let key = Object.keys(getObj)
				// if(key=="SID"){
				// 	this.SID = Object.values(getObj)
				// }
			}
			
			// this.$store.commit("SET_HISTORY_URL", {
			// 	path: '/pages/shoppingMall/order/orderInfo',
			// 	query: {
			// 		order_id: this.$Route.query.order_id,
			// 		OrderType:this.$Route.query.OrderType
			// 	}
			// })
		},
		computed: {},
		methods: {
			async getInfo() {
				try {
					let {
						Data
					} = await vipCard({
							Action: "GetOrderInfo",
							SID:this.orderId,
							OrderType:this.OrderType
							// SID: this.$Route.query.order_id,
							// OrderType:this.$Route.query.OrderType
						},
						"UOrderOpera"
					);
					this.infoData = Data
					if (Data.OrderInfo.DeliveryType === "1") {
						//到店自取
						this.currentArea = Data.ShopInfo;
					} else {
						this.currentArea = Data.OrderInfo;
					};
					this.prodList = Data.OrderItem;
					this.OrderInfo = Data.OrderInfo;
					this.CardInfo = Data.hasOwnProperty("CardInfo") ? Data.CardInfo : {};

					this.refundAllow = Data.IsRefund;//状态等于3的时候才能申请退款

					this.Refund = Data.Refund ? Data.Refund : Data.Refund;
					this.loading = false;
				} catch (e) {
					this.loading = false;
				}
			},
			setScore(val) {
				let str = "";
				if (val.PayScore > 0) {
					// 积分商品
					str = val.PayScore + "积分" + (val.PayAmt > 0 ? "+¥" + val.PayAmt : "");
				} else {
					str = "¥" + val.PayAmt;
				}
				return str;
			},
			clickGo() {
				this.$Router.push({
					path: "/pages/vip/allMyOrder"
				});
			},
			copyTextFun(val) {
				let bool
				// #ifdef H5
				bool = copyText(val);
				// #endif
				// #ifndef H5
				uni.setClipboardData({
					data: val,
					success: function() {
						bool = true
					}
				});
				// #endif
				if (bool) {
					uni.showToast({
						title: '复制成功',
						duration: 2000,
						icon: 'none'
					});
				}
			},
			payBtn() {
				this.$refs.popupPay.open()
			},
			async payBtnSubmit() {
				let Opera =
					this.OrderInfo.OrderType == "4" ? "UIntOrderOpera" : "UOrderOpera";
				try {
					let {
						Data
					} = await vipCard({
							Action: "PayMoney",
							SID: this.OrderInfo.SID,						
							OrderType:this.OrderInfo.OrderType,
						},
						Opera
					);
					try {
						weChatPayment(this, Data, true);
					} catch (e) {
						uni.showToast({
							title: '微信调起失败',
							duration: 2000,
							icon: 'none'
						});
					}
				} catch (e) {}
			},
			async cancelBtn() {
				try {
					await vipCard({
							Action: "CancelOrder",
							SID: this.OrderInfo.SID,
							OrderType:this.$Route.query.OrderType
						},
						"UOrderOpera"
					);
					uni.showToast({
						title: '订单取消成功',
						duration: 2000,
						icon: 'none'
					});
					setTimeout(() => {
						this.getInfo();
					}, 1000);
				} catch (e) {}
			},
			async cancelrefund(val) {
				this.$Router.push({
					path: "/pages/shoppingMall/order/refundReason",
					query: {
						refund: val,
						PayAmt: this.OrderInfo.PayAmt,
						SID: this.OrderInfo.SID,
						RefundTime: this.OrderInfo.RefundTime,
						RefCompleteTime: this.Refund ? this.Refund.UpTime : "",
						Reply: this.Refund ? this.Refund.Reply : "",
						OrderType:this.OrderInfo.OrderType
					}
				});
			},
			cancelEvaluate() {
				// this.$Router.push({
				// path: "/shoppingMall/order/releaseEvaluate"
				// });
			},
			clickAreaGo() {
				// #ifdef H5
				if (this.OrderInfo.DeliveryType === "1") {
					this.$refs.showArea.open()
					this.showArea = true;
				}
				// #endif
			},
			showAreaChange(e) {
				if (!e.show) {
					this.showArea = false;
				}
			},
			clickGoAddress() {
				this.showArea = false;
				this.$refs.showArea.close()
			},
			pickCode() {}
		}
	};

	function copyText(text) {
		var textarea = document.createElement("textarea"); //创建input对象
		var currentFocus = document.activeElement; //当前获得焦点的元素
		var toolBoxwrap = document.getElementById("NewsToolBox"); //将文本框插入到NewsToolBox这个之后
		toolBoxwrap.appendChild(textarea); //添加元素
		textarea.value = text;
		textarea.focus();
		if (textarea.setSelectionRange) {
			textarea.setSelectionRange(0, textarea.value.length); //获取光标起始位置到结束位置
		} else {
			textarea.select();
		}
		try {
			var flag = document.execCommand("copy"); //执行复制
		} catch (eo) {
			var flag = false;
		}
		toolBoxwrap.removeChild(textarea); //删除元素
		currentFocus.focus();
		return flag;
	}
</script>

<style lang="less">
	.order-info-style {
		margin-bottom: 50px;
		.btn-fa-style {
			button {
				margin-left: 5px;
			}
		}

		.order-area-fa {
			background: #fff;

			.order-area-info {
				vertical-align: middle;
				font-size: 16px;
				margin-right: 3px;
			}

			.order-area-delivery {
				padding: 8px 8px 0 8px;
				font-size: 14px;
			}
		}

		.confirm-area-popup-fa {
			.confirm-area-popup {
				height: 100%;
				width: 100%;
			}

			/deep/.uni-popup__wrapper-box {
				height: 100%;
				width: 100%;
			}
		}


		.goodBox {
			padding: 8px !important;
		}

		.goodsBoxLine {
			margin: 0;
		}

		.orderData {
			color: #777;
			background: #ffffff;
			margin-top: 8px;
			padding-bottom: 8px;
		}

		.orderTime {
			padding: 8px 0px 0px 16px;
		}
		.orderTime .priceSpan{
			display: inline-block;
			width: 67%;
			text-align: right;
		}
		.orderTime .priceColor{
			color: #f60;
			font-size: 14px;
		}
		.orderTime .orderTime_label {
			width: 105px;
			text-align: left;
			display: inline-block;
		}
		.orderTime .priceName{
			font-size: 14px;
		}
		.copyText {
			margin-left: 20px;
			// float: right;
		}
	}

	.order-area {
		background: #ffffff;
		padding: 14px 6px;
		display: flex;
		margin-bottom: 8px;

		.order-area-icon {
			margin: auto;

			uni-image,image {
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
	}
</style>
