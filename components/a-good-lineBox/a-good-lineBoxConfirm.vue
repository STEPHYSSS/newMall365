<template>
	<!--    横着-->
	<div :class="{'boxShadow':!isShoppingCard,'goodsBoxLine':true,'isNoPay':true}">
		<div class="goodBox" @click="goodBoxCoupon(itemData,$event)">
			<a-up-img :key="itemData.Img" :url="itemData.Img|setImgPrex" :height="imgHeight" :width="imgHeight"></a-up-img>
			<!-- <img :src="require('../../assets/img/defaultGood.png')" alt=""> -->
			<div class="rightBox" style="width:50%">
				<!-- 商品名称 -->
				<div class="rightBoxTitle">{{itemData.Name}}
				<p>
					<span style="vertical-align: middle;">x</span>
					<span style="vertical-align: middle">{{itemData.BuyCnt}}</span>
				</p>
				</div>
				<!-- 商品口味：-->
				<!-- <div class="rightBox_tastName" v-if="itemData.ParamInfo">{{itemData.ParamInfo}}</div> -->
				<div class="rightBox_quota" v-if="isShoppingCard&&Number(itemData.MaxBuyCnt)>0&&!isOrder">限购{{itemData.MaxBuyCnt}}件</div>
				<div class="rightBoxBottom" v-if="!isOrder">
					<span v-if="itemData.MemberPrice">
						¥{{itemData.MemberPrice}}<br />
						<span style="text-decoration: line-through;font-size: 8pt;color:#999;line-height: 10px;font-weight: 100;">
							¥{{itemData.SalePrice}}
						</span>
					</span>
					<span v-else>¥{{itemData.SalePrice}}</span>
				</div>
				<div class="rightBoxBottomBuyCnt" v-if="isOrder">

					<span v-if="!isIntegral" style="float: right;color:#000;font-size: 14px;">
						<span v-if="itemData.OrderType==='3'">¥{{itemData.ProdAmt}}</span>
						<span v-else>¥{{Number(itemData.SalePrice)*Number(itemData.BuyCnt) | numSet}}</span>
					
						<!-- <span style="vertical-align: middle;">x</span>
						<span style="vertical-align: middle">{{itemData.BuyCnt}}</span> -->
					</span>
					<span style="float: right;color:#000;font-size: 14px;" v-else>
						<span v-if="itemData.Score">{{itemData.Score|spliceNum}}积分</span>
						<span v-if="itemData.SalePrice>0">{{itemData.SalePrice>0&&itemData.Score?'+':''}}¥{{itemData.SalePrice |spliceNum}}</span>
					</span>
				</div>
				<div>
					<uni-number-box class="rightBoxBottom-stepper" v-if="isShoppingCard" @change="changeStepper($event,itemData)" :min="1"
					 :max="Number(itemData.MaxBuyCnt)>0?Number(itemData.MaxBuyCnt):Number(itemData.StockType)==0?999:
					  Number(itemData.BuyCnt)>Number(itemData.StoreQty)?Number(itemData.BuyCnt):Number(itemData.StoreQty)"
					 @overlimit="stepperOverlimit" :value="itemData.BuyCnt"></uni-number-box>
				</div>
				<uni-icons v-if="!isShoppingCard&&!isOrder" type="plus" class="addIcon" @click.stop="addCart" />
			</div>
		</div>
		<div class="goodsBox-parts" style="margin-top: 10px;">
			<div class="parts-norms-style" v-if="itemData.ParamInfo">属性：</div>
			<div class="parts-norms-info" v-if="itemData.ParamInfo">
				<span style="display: inline-block;width: 73%;">{{itemData.ParamInfo}} <span style="margin-left:4px">x{{itemData.BuyCnt}}</span></span>
				<div class="parts-norms-one-prodAmt" style="float: right; " v-if="isOrder">¥{{kouweiPrice}}</div>
			</div>
		</div>
		<div class="goodsBox-parts" v-if="(isOrder||isShoppingCard)&&itemData.hasOwnProperty('PartsList')&&itemData.PartsList.length>0 ">
			<div class="parts-norms-style">配件：</div>
			<div class="parts-norms-info">
				<div class="parts-norms-info-one" v-for="(item,index) in itemData.PartsList" :key="index">
					<div class="parts-norms-one-salePrice" @click.stop="changePartsNum(itemData.PartsList)">
						<span>{{item.Name}}</span>
						<div class="parts-buyMoney">
							¥{{item.SalePrice}}/份
							<span style="margin-left:4px">x{{item.BuyCnt}}</span>
							<uni-icons color="#7a7878" v-if="!isOrder" style="vertical-align: middle;margin-left:8px" type="arrowdown" />
						</div>
					</div>
					<div class="parts-norms-one-prodAmt" v-if="isOrder">¥{{Number(item.SalePrice)*Number(item.BuyCnt) | numSet}}</div>
				</div>
			</div>
		</div>
		<!-- {{itemData}} -->
		<div class="parts-norms-style" v-if="itemData.IsBuy === '0'" style="font-size:10px">
			可购买时间：
			<span style="color:red;font-size:14px">{{itemData.BuyTime|setBuyTime}}</span>
		</div>
	</div>
</template>

<script>
	import {
		Mixin
	} from "./public";

	export default {
		name: "lineBox",
		mixins: [Mixin],
		data() {
			return {
				// stepperValue: ''
				// itemDataNew:this.itemData
				stepperNumOld: "",
				kouweiPrice: 0, //多口味
			};
		},
		created() {
			this.stepperNumOld = this.itemData.BuyCnt;
			if(this.itemData.ParamInfo){
				let price = 0;
				var list= this.itemData.ParamInfo.split(',')
				if(list.length>0){
					list.forEach(item=>{
						var Param = item.split("￥")
						if(Param.length>1){
							price+=Number(Param[1])*this.itemData.BuyCnt
						}
					})
				}
				this.kouweiPrice = parseFloat(price.toFixed(2));
			}
		},
		computed: {},
		methods: {
			goodBoxCoupon(val, event) {
				this.$emit("goodBox", val);
			},
			// addCart(){
			// 	// 加入购物车
			// }
			stepperOverlimit(val) {
				event.stopPropagation();
				// 新增
				if (val === "plus") {
					this.$toast("该宝贝不能购买更多咯");
				} else {
					this.$toast("该宝贝不能减少咯");
				}
			},
			changeStepper(event, val) {
				// this.$emit("changeStepper", {
				// 	bool: true,
				// 	boolBlur: true,
				// 	num: event.inputValue,
				// 	type: event.type
				// });
				if (event.type === 'plus') {
					//增加
					this.$emit("changeStepper", {
						bool: true,
						boolBlur: true
					});
				}
				if (event.type === 'minus') {
					this.$emit("changeStepper", {
						bool: false,
						boolBlur: true
					});
				}
			},
			changePartsNum(list) {
				this.$emit("changePartsNum", list);
			}
		}
	};
</script>

<style scoped lang="less">
	.goodsBoxLine {
		background: #fff;
		margin-bottom: 6px;
		padding: 5px 0 5px 5px;

		.goodsBox-parts {
			display: flex;
			// margin: 6px 0;
		}

		.parts-norms-style {
			color: #807e7e;
			min-width: 50px;
			font-size: 10pt;
		}

		.parts-norms-info {
			color: #7a7878;
			font-size: 12px;
			flex: 1;
			/* margin-right: 30px; */
			margin-top: 1px;
		}

		.parts-buyMoney {
			display: inline-block;
			margin-left: 2px;
			margin-right: 15px;
			color: #7a7878;
			font-size: 12px;
		}

		.parts-norms-info-one {
			display: flex;
			line-height: 18px;
		}

		.parts-norms-one-salePrice {
			flex: 1;
		}

		.parts-norms-one-prodAmt {
			margin-right: 2px;
			min-width: 60px;
			text-align: right;
			color: #000;
		}
	}

	.boxShadow {
		box-shadow: 1px 1px 3px #e0e0e0;
	}

	.goodBox {
		display: flex;

		.van-image {
			display: block;
		}

		.leftBox {}

		.rightBox {
			position: relative;
			// margin: 0 10px;
			margin-left: 10px;
			flex: 1;
			margin-bottom: 0;

			.rightBox_tastName {
				font-size: 12px;
				background: #f7f8fa;
				color: #909090;
				display: inline-block;
				padding: 3px 5px;
			}

			.rightBox_quota {
				margin-top: 6px;
				color: red;
				font-size: 12px;
			}

			.rightBoxTitle {
				overflow: hidden;
				height: 38px;
				line-height: 18px;
				word-wrap: break-word;
				overflow-wrap: break-word;
				color: #313131;
				font-size: 12px;
			}

			.rightBoxBottom {
				/*position: absolute;*/
				bottom: 3px;
				color: red;
				margin-top: 5px;
			}

			.rightBoxBottomBuyCnt {
				font-size: 12px;
				color: #707070;
				// margin-top: 10px;
			}

			.rightBoxBottom-stepper {
				/*float: right;*/
				position: absolute;
				right: 0;
				bottom: 0;
			}

			.addIcon {
				position: absolute;
				bottom: 0;
				right: 0;
				color: red;
				font-size: 20px;
				cursor: pointer;
			}
		}
	}
</style>
