<template>
	<div :class="[mainStyle,'a-shopping-showSku']">
		<uni-popup class="van-popupSku" ref="popupSku" v-model="isShow" type="bottom" @change="closePopup">
			<div style="background-color: #fff;height: 70vh;">
				<uni-icons type="closeempty" size="24" class="crossIcon" @click="crossIcon"></uni-icons>
				<div>
					<div class="skuTop">
						<div v-if="goodsInfo.SpecType==='1'" style="display: flex;">
							<div class="skuTopImg" @click="viewImg(goodsInfo.Img)">
								<a-up-img :key="goodsInfo.Img" :url="goodsInfo.Img |setImgPrex"></a-up-img>
							</div>
							<div class="skuTopInfo">
								<div class="skuTopInfoMoney">
									¥
									<span v-if="goodsInfo.MemberPrice">{{sumPrice}}</span>
									<span  v-else class="skuTopInfoMoneyNum">{{sumPrice}}</span>
								</div>
								<div>
									<span class="skuTopInfoSurplus" v-if="goodsInfo.StoreQty>0">剩余 {{goodsInfo.StoreQty}} 件</span>
									<span class="skuTopInfoLimit" v-if="goodsInfo.MaxBuyCnt&&goodsInfo.MaxBuyCnt>0">(每人限购{{goodsInfo.MaxBuyCnt}}件)</span>
									<div class="skuTopInfoSurplus">
										已选 {{goodsInfo.Name}}
										<text style="margin-left: 5px;" v-for="(item,index) in checkStatic" :key="index + 'a'">
											<text v-if="index > 0"></text>{{item.Value.Name}}
											<text v-if="item.Value.Price && item.Value.Price !=0">￥{{item.Value.Price}}</text>
										</text>
									</div>
								</div>

								<div class="skuTopInfoSurplus" v-if="skuDataInfo.IsBuy === '0'">
									购买时间：
									<span style="color:#ee0a24;font-size:14px">{{goodsInfo.BuyTime |setBuyTime}}</span>
								</div>
							</div>
						</div>
						<div v-else style="display: flex;">
							<div class="skuTopImg" @click="viewImg(currentNorms.Img)">
								<a-up-img :key="currentNorms.Img" :url="currentNorms.Img |setImgPrex"></a-up-img>
							</div>
							<div class="skuTopInfo">
								<div class="skuTopInfoMoney">
									¥
									<span v-if="currentNorms.MemberPrice">{{sumPrice}}</span>
									<span  v-else class="skuTopInfoMoneyNum">{{sumPrice}}</span>
								</div>
								<div>
									<span class="skuTopInfoSurplus" v-if="goodsInfo.StoreQty>0">剩余 {{currentNorms.StoreQty}} 件</span>
									<span class="skuTopInfoLimit" v-if="goodsInfo.MaxBuyCnt&&goodsInfo.MaxBuyCnt>0">(每人限购{{goodsInfo.MaxBuyCnt}}件)</span>
									<div class="skuTopInfoSurplus">
										已选 {{goodsInfo.Name}}{{currentNorms.Name}}
										<text style="margin-left: 5px;" v-for="(item,index) in checkStatic" :key="index + 'a'">
											<text v-if="index > 0"></text>{{item.Value.Name}}
											<text v-if="item.Value.Price && item.Value.Price !=0">￥{{item.Value.Price}}</text>
										</text>
									</div>
								</div>

								<div class="skuTopInfoSurplus" v-if="skuDataInfo.IsBuy === '0'">
									购买时间：
									<span style="color:#ee0a24;font-size:14px">{{goodsInfo.BuyTime |setBuyTime}}</span>
								</div>
							</div>
						</div>
					</div>
					<div class="skuBottom">
						<scroll-view class="menus" :scroll-into-view="menuScrollIntoView" scroll-with-animation scroll-y>
							<view class="">
								<div class="skuTopChoice" v-if="normsList.length>0 || PartsList.length!==0 || attributeList.length >0">
									<div v-if="normsList.length>0">
										<span class="skuTopChoiceTitle">规格</span>
										<div :class="{'isActive': currentIndex === index, 'skuTopChoiceItem': true }" v-for="(item,index) in normsList"
										 :key="item.SID" @click="skuTopChoice(index)">{{item.Name}}</div>
									</div>									
								
									<!-- 商品属性-->
									<div v-if="attributeList.length >0 ">
										<!-- <div class="skuTopChoiceTitle" v-for="(item, index) in attributeList" :key="index">
											{{ item.Name }}
											<div :class="{'isActive': currentIndex === index, 'skuTopChoiceItem': true }" v-for="(value, index2) in item.Value" :key="value.Name"
											 @click="skuTopChoice(index)">{{value.Name}}<text v-if="value.Price !='0'">￥{{value.Price}}</text></div>
										</div>			 -->
										<view class="property" v-for="(item, index) in attributeList" :key="index">
											<view class="skuTopChoiceTitle">
												<text class="name">{{ item.Name }}</text>
												<text v-if="item.Radio == '1'">(必选)</text>
											</view>
											<view style="display: inline-block;" v-for="(value, index2) in item.Value" :key="value.Name"
											 @click="clickStatic(item, value,index2)">
												<view class="skuTopChoiceItem"  :class="isActiveName(value.Name)">
													{{value.Name}}
													<text v-if="value.Price !='0'" style="color: red;">￥{{value.Price}}</text>
												</view>
											</view>
										</view>
									</div>
									<div v-if="PartsList.length!==0">
										<span class="skuTopChoiceTitle">配件(单独售价)</span>
										<div class="partsStyle" v-for="(item,index) in PartsList" :key="item.SID">
											<div :class="{'isActive': item.isActive, 'skuTopChoiceItem': true }">{{item.Name}}<span style="color: red;padding-left: 5px;">¥{{item.SalePrice}}</span></div>
											<uni-number-box class="skuStepperStyle partsStepper" :value="item.Stepper" :min="0" :max="Number(item.StoreQty)"
											 @overlimit="overlimitParts(item.Stepper,index)" @change="skuTopChoiceParts($event,index)" />
										</div>
									</div>
								</div>
								<div class="skuStepper">
									<uni-number-box class="skuStepperStyle" :value="valueStepper" @change="stepperMain" :min="1" :max="setStepperMax()"
									 @overlimit="overlimit" />
								</div>
							</view>
						</scroll-view>
					</div>
				</div>
				<!-- 底部占位 -->
				<uni-goods-nav class="goods-action" :options="options" :buttonGroup="buttonGroup" :IsGoodBuyTime="IsGoodBuyTime" @buttonClick="onClickButton">
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
	import {GetBaseImgUrl} from "@/util/publicFunction.js"
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
				menuScrollIntoView: '',
				currentIndex: 0,
				valueStepper: 1,
				objProdInfo: {},
				maxPrice: "",//最高价
				minPrice: "",//最低价
				maxMemberPrice: "",//最高会员价
				minMemberPrice: "",//最低会员价
				resultPrice:0,
				// normsList: [],
				// flavorList: [],
				// partsList: [],
				// currentNorms: {},
				// currentTast: [],
				// currentParts: [],
				images: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2174909441,2495215020&fm=26&gp=0.jpg",
				//是否让立即购买
				disabledPay: false,
				options: [],
				IsGoodBuyTime:false,
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
				],
				normsList: [],
				PartsList: [],
				attributeList: [],
				goodsInfo: {},
				currentNorms: {}, //用来默认存放规格选中的第一个数据
				checkStatic: {}, //属性选中
				currentParts: [],
				currentTastArr:[],
				SpecResultPrice:0
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
			// if(this.skuDataInfo.ProdInfo.BuyTime !=undefined){
			// 	let BuyTime = this.skuDataInfo.ProdInfo.BuyTime.split(',')
			// 	this.IsGoodBuyTime = this.isDuringDate(BuyTime[0],BuyTime[1])
			// 	console.log(this.IsGoodBuyTime)
			// }else{
			// 	this.IsGoodBuyTime = true
			// }
		},
		computed: {
			isActiveName() {
				return function(name) {
					for (let i of this.checkStatic) {
						if (name === i.Value.Name) {
							return 'isActive'
						}
					}
					return ''
				}
			},
			sumPrice () {
				if(this.goodsInfo.SpecType==='1'){
					this.resultPrice = 0
					let num = Number(this.goodsInfo.SalePrice)
					if (this.goodsInfo.MemberPrice || this.goodsInfo.MemberPrice == 0) {
						num = Number(this.goodsInfo.MemberPrice)
					}
					if(this.skuDataInfo.AttributeList&&this.checkStatic.length>0){
						this.checkStatic.forEach(item => {
							if (item.Value.Name) {
								this.resultPrice += isNaN(Number(item.Value.Price)) ? 0 : Number(item.Value.Price)
							}
						});
					}
					this.resultPrice=(this.resultPrice + num)*this.valueStepper
					this.resultPrice = parseFloat(this.resultPrice.toFixed(2))
					return this.resultPrice
				}else{
					this.SpecResultPrice = 0;
					let num = Number(this.currentNorms.SalePrice)
					if (this.currentNorms.MemberPrice || this.currentNorms.MemberPrice == 0) {
						num = Number(this.currentNorms.MemberPrice)
					}
					if(this.skuDataInfo.AttributeList&&this.checkStatic.length>0){
						this.checkStatic.forEach(item => {
							if (item.Value.Name) {
								this.SpecResultPrice += isNaN(Number(item.Value.Price)) ? 0 : Number(item.Value.Price)
							}
						});
					}
					this.SpecResultPrice=(this.SpecResultPrice + num)*this.valueStepper
					this.SpecResultPrice = parseFloat(this.SpecResultPrice.toFixed(2))
					return this.SpecResultPrice
				}
			},
		},
		methods: {			
			isDuringDate(beginDateStr, endDateStr){
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
				let StartTime  = nowDate + ' ' +beginDateStr;
				let endTime  = nowDate + ' ' + endDateStr;
				if (nowddd >= StartTime && nowddd <= endTime) {
					return true;
				}
				return false
				
			},
			async onClickButton(bool) {
				if (this.isBrowse) {
					return;
				}
				// console.log(this.currentNorms, 11);
				// console.log(this.normsList, 555);
				// console.log(this.currentTast, 22)
				// console.log(this.currentParts, 33);
				// console.log(this.valueStepper, 44)
				// console.log(this.skuDataInfo, 6666);
				// if (Number(this.goodsInfo.StoreQty) < Number(this.valueStepper)) {
				// 	this.$toast("商品库存不足！");
				// 	return;
				// }
				if (this.goodsInfo.StockType!='0' && Number(this.goodsInfo.StoreQty) < Number(this.valueStepper)) {
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
							SID: D.SID,
							BuyCnt: D.Stepper
						});
						PartsNoArr.push(D.SID);
					});
					PartsNoArr = PartsNoArr.join(",");
				} else {
					PartsArr = "";
					PartsNoArr = "";
				}
				
				try {
					let obj = {
						ProdList: [],
						Action: "SetShopCart"
					};
					let paramsArr = []; //第一个为商品，后面的都是配件
					let ProdNo = ''
					// if(this.goodsInfo.SpecType =='2' || this.goodsInfo.SpecType =='3'){
					// 	ProdNo = this.currentNorms.ProdNo						
					// }	
					let defaultParamInfo = ""
					if(this.checkStatic &&　this.checkStatic.length){
						for (let i of this.checkStatic) {
							if(i.Value.Name) {
								defaultParamInfo += i.Value.Name+(i.Value.Price==='0'?'':'￥'+i.Value.Price)+"," 
							}
						}
						defaultParamInfo= defaultParamInfo.substring(0, defaultParamInfo.length - 1)
					}
					// 当我吧上面的if注释掉之后,他就可以加入购物车了
					paramsArr[0] = {
						ProdNo:this.goodsInfo.SpecType =='2' || this.goodsInfo.SpecType =='3' ? this.currentNorms.ProdNo : this.goodsInfo.ProdNo,
						SpecType:this.goodsInfo.SpecType,
						BuyCnt: this.valueStepper,
						ProdSID: this.goodsInfo.SID,
						SpecSID:this.goodsInfo.SpecType =='2' || this.goodsInfo.SpecType =='3' ? this.currentNorms.SID : "",
						ProdType: 0,//0是商品，1是电子券
						PartsNo:PartsNoArr,//配件编号
						PartsList:PartsArr ? JSON.stringify(PartsArr) : "",//配件数组
						ParamInfo:this.currentTastArr.length>0?this.currentTastArr:defaultParamInfo, //商品口味
						PromotionSID: this.currentNorms.hasOwnProperty("PromotionSID") ?this.currentNorms.PromotionSID : ""
					};
					// paramsArr[0] = {
					// 	ProdNo: this.currentNorms.ProdNo,
					// 	ProdType: 0,
					// 	SpecType: this.skuDataInfo.ProdInfo.SpecType,
					// 	ParamInfo: currentTastArr, //商品口味
					// 	BuyCnt: this.valueStepper,
					// 	PartsList: PartsArr ? JSON.stringify(PartsArr) : "",
					// 	PartsNo: PartsNoArr,
					// 	ProdSID: this.skuDataInfo.ProdInfo.SID,
					// 	DeliveryType: this.skuDataInfo.ProdInfo.DeliveryType,
					// 	SpecSID: this.skuDataInfo.ProdInfo.SpecType !== "1" ?
					// 		this.currentNorms.SpecSID ?
					// 		this.currentNorms.SpecSID :
					// 		this.currentNorms.SID : this.currentNorms.SpecSID || "",

					// 	PromotionSID: this.currentNorms.hasOwnProperty("PromotionSID") ?
					// 		this.currentNorms.PromotionSID : ""
					// };
					obj.ProdList = JSON.stringify(paramsArr);
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
							this.$Router.push("/pages/shoppingMall/order/confirmOrder");//暂时注释
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
			skuTopChoice(i) {//选择规格
				if (this.currentIndex === i) {
					return;
				}
				this.currentIndex = i;
				this.currentNorms = this.normsList[i];
			},
			clickStatic(item, value, key) { //选择属性
				for (let i of this.checkStatic) {
					if (item.Name === i.Name) {
						if (i.Value.Name === value.Name && item.Radio == '0') {
							i.Value = {}
						} else {
							i.Value = value;
						}
					}
				}
				if (this.checkStatic.length > 0) {
					this.currentTastArr = "";
					let sumPrice = 0 // 合计金额
					this.checkStatic.forEach(item => {
						sumPrice = Number(item.Value.Price)
						
						if (item.Value.Name) {
							this.currentTastArr  += item.Value.Name + (sumPrice===0?'': `￥${sumPrice}`)+",";
							// arr += item.Value.Name + `￥${sumPrice}`;
						}
					});
					this.currentTastArr = this.currentTastArr.substring(0, this.currentTastArr.length - 1)
					//this.currentTastArr = sumPrice===0?this.currentTastArr: this.currentTastArr + `￥${sumPrice}`
				}
			},
			skuTopChoiceParts(e, i) {//选择配件
				if (e.inputValue > 0) {
					this.$set(this.PartsList[i], "isActive", true);
				} else {
					this.$set(this.PartsList[i], "isActive", false);
				}
				let arr = this.PartsList
				let choose = []
				arr.forEach(D => {
					arr[i].Stepper = e.inputValue;
				});
				
				let newarr = arr.filter(D => {
					return Number(D.Stepper) !== 0;
				});
				
				this.currentParts = sortArr("parts", newarr);
			},
			stepperMain(val) {
				this.valueStepper = val.inputValue
			},
			overlimitParts(e) {},
			setStepperMax() { //加号
				if(this.goodsInfo.StockType === '0'){
					return Number(this.goodsInfo.MaxBuyCnt='99')
				}else if (Number(this.goodsInfo.MaxBuyCnt) < Number(this.goodsInfo.StoreQty) && Number(this.goodsInfo.MaxBuyCnt)
				) {
					return Number(this.goodsInfo.MaxBuyCnt);
				} else {
					return Number(this.goodsInfo.StoreQty);
				}
			},
			overlimit(e) { //减号
				if (e === "minus") {
					this.$toast("至少选择一件");
				}
				if (e === "plus") {
					let str = "";
					if (
						Number(this.goodsInfo.MaxBuyCnt) <
						Number(this.goodsInfo.StoreQty) &&
						Number(this.goodsInfo.MaxBuyCnt)
					) {
						str = "每人限购" + this.goodsInfo.MaxBuyCnt + "件";
					} else {
						str = "该商品库存不足";
					}
					this.$toast(str);
				}
			},
			viewImg(img) {
				this.$refs.imgPopup.open()
				this.showImg = true;
				// this.images = this.$VUE_APP_PREFIX + img;
				this.images = GetBaseImgUrl()+img
			}
		},
		watch: {
			show(val) {
				this.isShow = val;
				if (val) {
					this.$refs.popupSku.open()
					let skuDataInfo = this.skuDataInfo;
					this.goodsInfo = skuDataInfo.ProdInfo; //商品详情
					this.normsList = []; //规格
					this.PartsList = []; //配件
					this.attributeList = []; //属性
					if (skuDataInfo.SpecList) {
						this.normsList = skuDataInfo.SpecList || [];
						this.currentNorms = this.normsList[0];
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
					if (skuDataInfo.PartsList) {
						this.PartsList = skuDataInfo.PartsList || [];
					}
					if (skuDataInfo.AttributeList) {
						this.attributeList = skuDataInfo.AttributeList || [];
						
						// this.$nextTick(function(){
						// 	this.checkStatic = []
						// 	this.skuDataInfo.AttributeList.forEach((item, index) => {
						// 		item.Value.forEach((item1, index1) => {
						// 			if (item1.IsDefault == '1') {
						// 				this.checkStatic.push(item)
						// 			}
						// 		})
						// 	})
						// 	console.log(this.checkStatic,1111)
						// })
						this.checkStatic = this.attributeList.map(item => {
							let obj = item.Value.find(item => item.IsDefault == '1')
							// 是否必选是radio，默认是的default
							let Radio = 0
							if (item.Radio == 1) {
								Radio = 1
							}
							let IsDefault = 1
							if (!obj) {
								obj = { Name: "", Price: "" }
								IsDefault = 0
							}
							return {
								Name: item.Name,
								IsDefault,
								Radio,
								Value: obj
							}
						})
					}
					if(this.goodsInfo.BuyTime !=undefined){
						let BuyTime = this.goodsInfo.BuyTime.split(',')
						this.IsGoodBuyTime = this.isDuringDate(BuyTime[0],BuyTime[1])
					}else{
						this.IsGoodBuyTime = true
					}
					
					this.disabledPay = this.skuDataInfo.IsBuy === "0" ? true : false; //是否可以立即购买
					this.PartsList = skuDataInfo.PartsList || [];
					this.PartsList.forEach(D => {
						this.$set(D, "Stepper", 0);
					});

					this.currentIndex = 0;
				} else {
					this.$refs.popupSku.close()
					this.normsList = [];
					this.PartsList = [];
					this.attributeList = [];
					if (this.partsList && this.partsList.length) {
						
						this.partsList.forEach(D => {
							this.$set(D, "isActive", false);
						});
					}
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
		height: 475px;
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
			overflow: hidden;
			height: 37vh;
			// overflow-y: scroll !important;
			// height: 40vh;
			.menus {
				height: 100%;
				overflow: hidden;
			}
		}
	}
</style>
