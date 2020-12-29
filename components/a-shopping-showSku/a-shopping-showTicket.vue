<template>
	<div :class="[mainStyle,'a-shopping-showSku']">
		<uni-popup class="van-popupSku" ref="popupSku" v-model="isShow" type="bottom" @change="closePopup">
			<div style="background-color: #fff;">
				<uni-icons type="closeempty" size="24" class="crossIcon" @click="crossIcon"></uni-icons>
				<div>
					<div class="skuTop">
						<div class="skuTopImg" @click="viewImg(objProdInfo.Img)">
							<a-up-img :key="objProdInfo.Img" :url="objProdInfo.Img |setImgPrex" ></a-up-img>
						</div>
						<div class="skuTopInfo">
							<div class="skuTopInfoMoney">
								¥
								<span class="skuTopInfoMoneyNum">{{sumPrice}}</span>
							</div>
							<div>
								<span class="skuTopInfoSurplus" v-if="objProdInfo.StockType!=0&&objProdInfo.StoreQty>0">剩余 {{objProdInfo.StoreQty}} 件</span>
								<span class="skuTopInfoLimit" v-if="objProdInfo.MaxBuyCnt&&objProdInfo.MaxBuyCnt>0">(每人限购{{objProdInfo.MaxBuyCnt}}件)</span>
								<div class="skuTopInfoSurplus">
									已选 {{objProdInfo.Name}}
									<!-- <span v-for="data in currentTast" :key="data.Name">-{{data.Name}}</span> -->
								</div>
							</div>
					
							<div class="skuTopInfoSurplus" v-if="skuDataInfo.IsBuy === '0'">
								购买时间：
								<span style="color:#ee0a24;font-size:14px">{{objProdInfo.BuyTime |setBuyTime}}</span>
							</div>
						</div>
					</div>
					<div class="skuBottom">
						<div class="skuStepper">
							<uni-number-box class="skuStepperStyle" :value="valueStepper" @change="stepperMain" :min="1" :max="setStepperMax()"
							 @overlimit="overlimit" />
						</div>
					</div>
					<div class="goods-action">
						<uni-view class="isProdType">
							<uni-view class="uni-tab__seat" @click="onClickButton">立即购买</uni-view>				
						</uni-view>
					</div>
				</div>
			</div>
		</uni-popup>

		<div class="imgPopup">
			<uni-popup ref="imgPopup">
				<a-up-img :url="images"></a-up-img>
			</uni-popup>
		</div>
	</div>
</template>

<script>
	import {
		vipCard
	} from "@/api/http.js";

	export default {
		name: "showSku",
		props: {
			show: Boolean,
			skuDataInfo: Object
		},
		data() {
			return {
				mainStyle: getApp().globalData.mainStyle,
				mainColor: getApp().globalData.mainColor,
				isShow: false,
				showImg: false,
				currentIndex: 0,
				valueStepper: 1,
				objProdInfo: {},
				normsList: [],
				flavorList: [],
				partsList: [],
				currentNorms: {},
				currentTast: [],
				currentParts: [],
				images: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2174909441,2495215020&fm=26&gp=0.jpg",
				resultPrice:0,
			};
		},
		created() {
			
		},
		computed: {
			sumPrice () {
				this.resultPrice = 0
				let num = Number(this.objProdInfo.SalePrice)
				if (this.objProdInfo.MemberPrice || this.objProdInfo.MemberPrice == 0) {
					num = Number(this.objProdInfo.MemberPrice)
				}
				this.resultPrice=(this.resultPrice + num)*this.valueStepper
				this.resultPrice = parseFloat(this.resultPrice.toFixed(2))
				return this.resultPrice
			},
		},
		methods: {
			onClickButton() {
				let obj = {
					ProdList:[]
				}
				let paramsArr = [];
				paramsArr[0] = {
					ProdNo: this.objProdInfo.ProdNo,
					ProdType: 1,
					BuyCnt: this.valueStepper,
					ProdSID: this.objProdInfo.SID
				};
				obj.ProdList = JSON.stringify(paramsArr);
				let currentItem = obj.ProdList;
				if (currentItem.length > 0) {
					this.$store.commit("SET_CURRENT_CARD", currentItem);
					this.$Router.push("/pages/shoppingMall/order/confirmOrderTic");
				}
			},
			closePopup(bool) {
				if (!bool.show) {
					this.valueStepper = 1;
					this.$emit("showPop", this.isShow);
				}
			},
			crossIcon() {
				this.$refs.popupSku.close()
			},
			stepperMain(val) {
				// console.log(val.inputValue,'valval')
				this.valueStepper = val.inputValue
			},
			overlimitParts(e) {},
			setStepperMax() {//加号
				if(Number(this.valueStepper)>=Number(this.objProdInfo.StoreQty)){
					return Number(this.objProdInfo.StoreQty)
				}
			},
			overlimit(e) {//减号
				if (e === "minus") {
					this.$toast("至少选择一件");
				}
				if(e === "plus"){
					let str = "";
					if(Number(this.valueStepper)>=Number(this.objProdInfo.StoreQty)){
						str = "商品库存不足";
					}else if(Number(this.valueStepper)>=Number(this.objProdInfo.MaxBuyCnt)){
							str = "每人限购" + this.objProdInfo.MaxBuyCnt + "件";
					}
					this.$toast(str);
				}
			},
			viewImg(img) {
				this.$refs.imgPopup.open()
				this.showImg = true;
				this.images = this.$VUE_APP_PREFIX + img;
			}
		},
		watch: {
			show(val) {
				this.isShow = val;
				if (val) {
					this.$refs.popupSku.open()
					let skuDataInfo = this.skuDataInfo;
					this.normsList = [];
					let arr = [];
					this.objProdInfo = this.skuDataInfo.ProdInfo;
					
					this.partsList = skuDataInfo.PartsList || [];
					this.partsList.forEach(D => {
						this.$set(D, "Stepper", 0);
					});
					this.disabledPay = this.skuDataInfo.IsBuy === "0" ? true : false; //是否可以立即购买

					this.currentIndex = 0;
				} else {
					this.$refs.popupSku.close()
					this.flavorList = [];
					this.currentTast = [];
					this.currentParts = [];
					this.partsList.forEach(D => {
						this.$set(D, "isActive", false);
					});
				}
			}
		}
	};

</script>

<style lang="less">
	.imgPopup {
		.uni-popup {
			background-color: rgba(0, 0, 0, 0.8);
		}
	}

	.a-shopping-showSku {
		.uni-popup {
			z-index: 999;
		}

		/deep/.uni-tab__cart-sub-left {
			padding: 0;
		}
	}

	.van-popupSku {
		font-size: 14px;

		.goods-action {
			background: #fff;
			padding: 10px 15px;
		}

		.crossIcon {
			position: absolute;
			font-size: 20px;
			right: 10px;
			top: 10px;
		}

		.skuTop {
			display: flex;
			padding: 20px;
			border: 1px solid #ebedf0;
		}

		.skuTopImg {
			width: 100px;
			height: 100px;

			.van-image,
			img,
			image {
				width: 100%;
				height: 100%;
			}
		}

		.skuTopInfo {
			margin-left: 20px;

			.skuTopInfoMoney {
				color: #ee0a24;
				font-weight: 500;
				font-size: 22px;
				vertical-align: middle;
				word-wrap: break-word;
			}

			.skuTopInfoSurplus {
				margin-top: 8px;
				color: #969799;
				font-size: 12px;
				line-height: 16px;
			}

			.skuTopInfoLimit {
				display: inline-block;
				color: #ee0a24;
				font-size: 12px;
			}
		}

		.skuTopChoice {
			padding: 20px;
			border-bottom: 1px solid #ebedf0;
			// max-height: 50%;

			.skuTopChoiceTitle {
				padding-bottom: 12px;
				display: block;
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
			}
		}

		.skuStepper {
			padding: 15px 20px;
			/*border-bottom: 1px solid #ebedf0;*/
			height: 28px;
			clear: both;

			.skuStepperStyle {
				float: right;
			}
		}

		.skuMessage {
			// margin-bottom: 60px;
		}

		.skuBottom {
			overflow: scroll;
			max-height: 50vh;
		}
		.isProdType{
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
</style>
