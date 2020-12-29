<template>
	<div>
		<!-- v-if="dataList&&dataList.length!==0" -->
		<div class="orderBox" >
			<div v-for="(item,index) in dataList" @click="panelOrder(item)" :key="index" class="van-panel van-hairline--top-bottom">
				<div slot="header" class="orderBoxHead">
					<span>订单：</span>
					<span class="orderBoxNum" :style="{color:mainColor}">{{item.ExchNo}}</span>
					<span class="orderBoxState" :style="{color:mainColor}">{{item.State |orderState}}</span>
				</div>
				<!-- 状态等于3 代表订单超时或者已取消 -->
				<!-- OrderType等于1代表充值，2代表普通商品，3代表电子券，4代表积分订单 -->
				<div class="orderBoxCenter" v-if="item.OrderType=='2'">
					<div class="boxImgSize">
					<!-- <a-up-img :url="urlImg" style="width: 100%;height: 100%"></a-up-img> -->
						<a-up-img :url="setImg(item.ProdList)" style="width: 100%;height: 100%"></a-up-img>
					</div>
					<div class="orderBoxTitle">{{setTitle(item.ProdList)}}</div>
				</div>
				<div class="orderBoxCenter" v-if="item.OrderType=='3'">
					<div class="boxImgSize">
						<a-up-img :url="`${$VUE_APP_PREFIX}`+item.Img" style="width: 100%;height: 100%"></a-up-img>
					</div>
					<div class="orderBoxTitle">{{item.Name}}</div>
				</div>
				<!-- <div class="boxAllNum" v-if="item.OrderType=='2'">
					<span v-if="item.ProdList.length>0">共{{setGoodNum(item.ProdList)}}件商品</span>
				</div> -->
				<!-- <div :style="{color:mainColor}" style="width:100%" v-if="item.OrderType==='1'">微卡充值</div> -->
				<div class="van-panel__footer van-hairline--top">
					总价：
					<span>¥{{item.PayAmt}}</span>
					<span v-if="item.PayAmt>0&&item.PayScore>0">&nbsp;+&nbsp;</span>
					<span v-if="item.PayScore>0">{{item.PayScore}}积分</span>
					<!--                如果是待付款,就显示 支付订单-->
					<button type="main" size="mini" class="btn">详情</button>
				</div>
			</div>
		</div>
		<!-- <div v-if="dataList.length===0" class="noOder">
			<img style="width:200px;height:200px" src="@/static/assets/img/norder.png" alt />
			<br />您还没有相关的订单
			<div style="font-size:12px;margin-top:10px;color:#b9bec5">你可以去看看商城选择想买的</div>
		</div> -->
		<!-- 状态等于3 代表订单超时或者已取消 -->
		<!-- <div v-if="dataList.length===0" class="noOder">
			<img style="width:200px;height:200px" src="/static/assets/img/norder.png" alt />
			<br />您还没有相关的订单
			<div style="font-size:12px;margin-top:10px;color:#b9bec5">你可以去看看商城选择想买的</div>
		</div> -->
	</div>
</template>

<script>
	import {GetBaseImgUrl} from "@/util/publicFunction";
	export default { 
		name: "orderBox",
		props: {
			dataList: {
				type: Array,
				default: function() {
					return []
				}
			},
			isActive: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				mainColor: getApp().globalData.mainColor,
				img: "",
				urlImg:""
				// loading: true
			};
		},
		created() {
			// console.log(this.dataList, 5555)
			// 获取接口返回的区分id
		},
		computed: {
			// setImg() {
			// 	return function (arr) {
			// 		if (arr) {
			// 			let str = "";
			// 			arr.forEach(D => {
			// 				if (D.Img) {
			// 					str = D.Img;
			// 				}
			// 			});
			// 			if (str) {
			// 				// return this.$VUE_APP_PREFIX + str;
			// 				return GetBaseImgUrl() + str
			// 			} else {
			// 				return "";
			// 			}
			// 			return str;
			// 		} else {
			// 			return "";
			// 		}
			// 	}
				
			// },
		},
		methods: {
			panelOrder(val) {
				this.$Router.push({
					path: "/pages/shoppingMall/order/orderInfo",
					query: {
						order_id: val.SID,
						OrderType:val.OrderType			
					}
				});
			},
			setImg(arr) {
				if (arr) {
					let str = "";
					arr.forEach(D => {
						if (D.Img) {
							str = D.Img;
						}
					});
					if (str) {
						// return this.$VUE_APP_PREFIX + str;
						return GetBaseImgUrl() + str
					} else {
						return "";
					}
					return str;
				} else {
					return "";
				}
			},
			setTitle(arr) {
				let str = "";
				if (arr) {
					arr.forEach(D => {
						str = D.Name + ";" + str;
					});
				}
				return str;
			},
			setGoodNum(arr) {
				let num = 0
				arr.forEach(D => {
					num += Number(D.BuyCnt)
				})
				return num
			}
		},
		watch: {
			dataList() {}
		}
	};
</script>

<style scoped lang="less">
	.noOder {
		width: 100%;
		height: 100vh;
		text-align: center;
		margin-top: 20%;
	}

	.orderBox {
		word-wrap: break-word;
		word-break: normal;
		font-size: 12px;

		.van-panel {
			padding: 10px 10px 0 10px;
			font-size: 12px;
			border-radius: 16px;
			margin: 10px;
		}

		.orderBoxHead {
			padding-bottom: 10px;
			/*text-align: right;*/

			.orderBoxState {
				float: right;
			}
		}

		.orderBoxCenter {
			display: flex;
			border-top: 1px solid #ebedf0;

			.boxImgSize {
				/*min-width: 80px;*/
				/*min-height: 80px;*/
				/*max-width: 100px;*/
				/*max-height: 100px;*/
				width: 80px;
				height: 80px;
				// border: 1px solid #ebedf0;
				margin: 10px 0 0;
				margin-right: 5px;
			}

			.orderBoxTitle {
				margin: 10px;
				width: 60%;
				overflow: hidden;
				height: 75px;
				line-height: 18px;
			}
		}

		.boxAllNum {
			color: #7d7e80;
			height: 12px;
			font-size: 12px;
			border-bottom: 1px solid #ebedf0;

			span {
				position: absolute;
				right: 15px;
				bottom: 48px;
			}
		}

		.van-panel__footer {
			height: 29px;
			line-height: 29px;
			padding: 8px 0;
		}

		.btn {
			border-radius: 16px;
			float: right;
		}
	}

	.van-panel {
		background: #fff;
	}

	.van-hairline--top-bottom {
		position: relative;
	}

	.van-hairline--top {
		position: relative;
	}
</style>
