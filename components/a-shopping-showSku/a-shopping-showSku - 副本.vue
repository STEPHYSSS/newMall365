<template>
	<div :class="[mainStyle,'a-shopping-showSku']">
		<uni-popup class="van-popupSku" ref="popupSku" v-model="isShow" type="bottom" @change="closePopup">
			<div style="background-color: #fff;">
				<uni-icons type="closeempty" size="24" class="crossIcon" @click="crossIcon"></uni-icons>
				<div>
					<div class="skuTop">
						<div class="skuTopImg" @click="viewImg(currentNorms.Img)">
							<a-up-img :key="currentNorms.Img" :url="currentNorms.Img |setImgPrex" ></a-up-img>
						</div>
						<div class="skuTopInfo">
							<div class="skuTopInfoMoney">
								¥
								<span class="skuTopInfoMoneyNum">{{currentNorms.SalePrice}}</span>
							</div>
							<div>
								<span class="skuTopInfoSurplus">剩余 {{currentNorms.StoreQty}} 件</span>
								<span class="skuTopInfoLimit" v-if="objProdInfo.MaxBuyCnt&&objProdInfo.MaxBuyCnt>0">(每人限购{{objProdInfo.MaxBuyCnt}}件)</span>
								<div class="skuTopInfoSurplus">
									已选 {{currentNorms.Name}}
									<span v-for="data in currentTast" :key="data.Name">-{{data.Name}}</span>
								</div>
							</div>
					
							<div class="skuTopInfoSurplus" v-if="skuDataInfo.IsBuy === '0'">
								购买时间：
								<span style="color:#ee0a24;font-size:14px">{{objProdInfo.BuyTime |setBuyTime}}</span>
							</div>
						</div>
					</div>
					<div class="skuBottom">
						<div class="skuTopChoice">
							<span class="skuTopChoiceTitle">规格</span>
					
							<div :class="{'isActive': currentIndex === index, 'skuTopChoiceItem': true }" v-for="(item,index) in normsList"
							 :key="item.SID" @click="skuTopChoice(index)">{{item.Name}}</div>
							
							<div v-for="(item, index) in flavorList" :key="index + 'a'">
								<span class="skuTopChoiceTitle">{{item.Name}}</span>
						
								<div :class="{'isActive': item1.isActive, 'skuTopChoiceItem': true }"
								v-for="(item1,index1) in item.Value" :key="index1"
								 @click="skuTopChoiceFlavor(index, index1)">{{item1.Name}}
									<span v-if="item1.Price && item1.Price != 0">￥{{item1.Price}}</span>
								 </div>
							 </div>
					
							<span class="skuTopChoiceTitle" v-if="partsList.length!==0">配件(单独售价)</span>
					
							<div class="partsStyle" v-for="(item,index) in partsList" :key="item.SID">
								<!-- @click="skuTopChoiceParts(index)" -->
								<div :class="{'isActive': item.isActive, 'skuTopChoiceItem': true }">售价¥{{item.SalePrice}} &nbsp;{{item.Name}}</div>
								<uni-number-box class="skuStepperStyle partsStepper" :value="item.Stepper" :min="0" :max="Number(item.StoreQty)"
								 @overlimit="overlimitParts(item.Stepper,index)" @change="skuTopChoiceParts($event,index)" />
							</div>
						</div>
						<div class="skuStepper">
							<uni-number-box class="skuStepperStyle" :value="valueStepper" @change="stepperMain" :min="1" :max="setStepperMax()"
							 @overlimit="overlimit" />
						</div>
					</div>
				</div>				
				<uni-goods-nav class="goods-action" :options="options" :buttonGroup="buttonGroup" @buttonClick="onClickButton">
				</uni-goods-nav>
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
			seckill: {
				type: String,
				default () {
					return "";
				}
			},
			isBrowse: {
				type: String,
				default () {
					return "";
				}
			},
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
				//是否让立即购买
				disabledPay: false,
				options: [],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ffa200',
						color: '#fff',
						borderRadius: '25px 0 0 25px'
					},
					{
						text: '立即购买',
						backgroundColor: getApp().globalData.mainColor,
						color: '#fff',
						borderRadius: '0 25px 25px 0'
					}
				]
			};
		},
		created() {
			if (this.seckill) {
				this.buttonGroup = [{
					text: '立即购买',
					backgroundColor: getApp().globalData.mainColor,
					color: '#fff',
					borderRadius: '25px'
				}]
			}
		},
		computed: {},
		methods: {
			async onClickButton(bool) {
				if (this.isBrowse) {
					return;
				}
				console.log(this.currentNorms, 11);
				console.log(this.normsList, 555);
				console.log(this.currentTast, 22)
				console.log(this.currentParts, 33);
				console.log(this.valueStepper, 44)
				console.log(this.skuDataInfo, 6666);
				if (Number(this.currentNorms.StoreQty) < Number(this.valueStepper)) {
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
				let PartsArr = [];
				let PartsNoArr = [];
				if (this.currentParts.length > 0) {
					this.currentParts.forEach(D => {
						PartsArr.push({
							ProdNo: D.ProdNo,
							BuyCnt: D.Stepper
						});
						PartsNoArr.push(D.ProdNo);
					});
					PartsNoArr = PartsNoArr.join(",");
				} else {
					PartsArr = "";
					PartsNoArr = "";
				}
				let currentTastArr = [];
				if (this.currentTast.length > 0) {
					// 口味
					for (let i of this.flavorList) {
						for (let y of i.Value) {
							if (y.isActive) {
								if (y.Price && y.Price != 0) {
									let name = y.Name + '￥' + y.Price
									currentTastArr.push(name)
								}else {
										currentTastArr.push(y.Name)
								}
							}
						}
					}
					// this.currentTast.forEach(D => {
					// 	currentTastArr.push(D.Name);
					// });
					currentTastArr = currentTastArr.join(",");
					// console.log(currentTastArr,'------')
				} else {
					currentTastArr = "";
				}
				try {
					let obj = {
						ProdList: [],
						Action: "SetShopCart"
					};
					let paramsArr = []; //第一个为商品，后面的都是配件

					paramsArr[0] = {
						ProdNo: this.currentNorms.ProdNo,
						ProdType: 0,
						SpecType: this.skuDataInfo.ProdInfo.SpecType,
						ParamInfo: currentTastArr,//商品口味
						BuyCnt: this.valueStepper,
						PartsList: PartsArr ? JSON.stringify(PartsArr) : "",
						PartsNo: PartsNoArr,
						ProdSID: this.skuDataInfo.ProdInfo.SID,
						DeliveryType: this.skuDataInfo.ProdInfo.DeliveryType,
						SpecSID: this.skuDataInfo.ProdInfo.SpecType !== "1" ?
							this.currentNorms.SpecSID ?
							this.currentNorms.SpecSID :
							this.currentNorms.SID : this.currentNorms.SpecSID || "",

						PromotionSID: this.currentNorms.hasOwnProperty("PromotionSID") ?
							this.currentNorms.PromotionSID : ""
					};
					obj.ProdList = JSON.stringify(paramsArr);
					// console.log(obj);
					// return;
					if (bool.index === 0 && !this.seckill) {
						// 加入购物车
						let data = await vipCard(obj, "UMemberOpera");
						if (data.Message) {
							this.$toast.success("成功加入购物车");
							this.isShow = false;
							this.$refs.popupSku.close()
						}
					} else {
						// 立即购买
						if (this.seckill) {
							//活动立即购买
							paramsArr[0].PromotionItemSID = this.currentNorms.SID;
						}
						let currentItem = [paramsArr[0]];
						if (currentItem.length > 0) {
							this.$store.commit("SET_CURRENT_CARD", currentItem);
							// this.$Router.push("/pages/shoppingMall/order/confirmOrder");//暂时注释
							this.$Router.push("/pages/shoppingMall/order/confirmOrderCustom")
						}
					}
				} catch (e) {
					this.$toast.error(e);
				}
			},
			closePopup(bool) {
				if (!bool.show) {
					this.valueStepper = 1;
					this.$emit("hideShow", this.isShow);
				}
			},
			crossIcon() {
				this.$refs.popupSku.close()
			},
			skuTopChoice(i) {
				if (this.currentIndex === i) {
					// eslint-disable-next-line no-mixed-spaces-and-tabs
					return;
				}
				this.currentIndex = i;

				// 切换口味
				if (
					Number(this.skuDataInfo.ProdInfo.SpecType) === 2 ||
					Number(this.skuDataInfo.ProdInfo.SpecType) === 3
				) {
					// let arr = this.skuDataInfo.SpecList[i].ParamInfo.split(",");//暂时注释
					let arr = this.skuDataInfo.SpecList[i];
					this.flavorList = setTast(arr, this);
				}

				this.currentNorms = this.normsList[i];
				this.currentTast = [];
			},
			skuTopChoiceFlavor(i, i1) {
				this.flavorList[i].Value.forEach((item, index) => {
					if (index === i1) {
						this.$set(item, 'isActive', true)
					}else {
						this.$set(item, 'isActive', false)
					}
				})
				// this.$set(this.flavorList[i].Value[i1], "isActive", !this.flavorList[i].Value[i1].isActive);
				this.currentTast = []
				for (let i of this.flavorList) {
					for (let y of i.Value) {
						if (y.isActive) {
							this.currentTast.push(y)
						}
					}
				}
				// if (this.flavorList[i].Value[i1].isActive) {
				// 	this.currentTast.push(this.flavorList[i].Value[i1].isActive);
				// } else {
				// 	this.currentTast.forEach((D, j) => {
				// 		if (!D.isActive) {
				// 			this.currentTast.splice(j, 1);
				// 		}
				// 	});
				// }
				this.currentTast = sortArr("flavor", this.currentTast);
			},
			skuTopChoiceParts(e, i) {
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
			stepperMain(val) {
				// console.log(val.inputValue,'valval')
				this.valueStepper = val.inputValue
			},
			overlimitParts(e) {},
			setStepperMax() {//加号
				if (
					Number(this.objProdInfo.MaxBuyCnt) <
					Number(this.currentNorms.StoreQty) &&
					Number(this.objProdInfo.MaxBuyCnt)
				) {
					return Number(this.objProdInfo.MaxBuyCnt);
				} else {
					return Number(this.currentNorms.StoreQty);
				}
			},
			overlimit(e) {//减号
				if (e === "minus") {
					this.$toast("至少选择一件");
				}
				if (e === "plus") {
					let str = "";
					if (
						Number(this.objProdInfo.MaxBuyCnt) <
						Number(this.currentNorms.StoreQty) &&
						Number(this.objProdInfo.MaxBuyCnt)
					) {
						str = "每人限购" + this.objProdInfo.MaxBuyCnt + "件";
					} else {
						str = "该规格商品库存不足";
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
					if (Number(skuDataInfo.ProdInfo.SpecType) === 1) {
						// 单规格商品
						// if (this.seckill) {
						// 	// 秒杀
						// 	this.normsList = skuDataInfo.SpecList;
						// } else {
							this.normsList.push(skuDataInfo.ProdInfo);
						// }
						arr=[]
						// arr = skuDataInfo.ProdInfo.ParamInfo.split(",") || [];//暂时注释
					} else if (Number(skuDataInfo.ProdInfo.SpecType) === 2) {
						// 多规格商品
						this.normsList = skuDataInfo.SpecList;
						// arr = skuDataInfo.SpecList[0].ParamInfo.split(",") || [];//暂时注释
						arr = skuDataInfo.SpecList[0] || [];//暂时注释
					} else if (Number(skuDataInfo.ProdInfo.SpecType) === 3) {
						// 单规格商品-不同总类
						console.log(skuDataInfo)
							this.normsList.push(skuDataInfo.ProdInfo);
						// arr = skuDataInfo.SpecList[0].ParamInfo.split(",") || [];//暂时注释
						arr = skuDataInfo.AttributeList || [];
					}
					this.partsList = skuDataInfo.PartsList || [];
					this.partsList.forEach(D => {
						this.$set(D, "Stepper", 0);
					});
					
					this.flavorList = arr
					// this.flavorList = setTast(arr, this);
					console.log(arr)
					this.currentNorms = this.normsList[0];

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

	function setTast(arr, _this) {
		// 把口味设置成['d','2'] => [{Name:'d'}]
		if (!arr[0]) {
			return [];
		}
		arr.forEach((D, i) => {
			arr[i] = {
				Name: D
			};
			_this.$set(arr[i], "Name", D);
		});

		return arr;
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
	}
</style>
