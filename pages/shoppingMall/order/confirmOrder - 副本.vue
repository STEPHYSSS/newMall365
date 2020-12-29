<template>
	<div class="confirm-order-style" :class="mainStyle">
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickLeft" title="确认订单" :status-bar="true" :shadow="false"></uni-nav-bar>
		<a-nodeData stringVal="获取数据失败" v-if="!loading&&prodList.length===0"></a-nodeData>
		<!-- 当点击外卖配送时，选择地址，缓存未做，选择了新地址，返回到点餐页面，地址渲染有问题，电话调用有问题 -->
		<div v-if="prodList.length>0">
			<!--2 外卖 ；3物流-->
			<!-- <div class="indexTop colorStyle" v-if="!$Route.query.isIntegral">
				<div :class="['changeMode','changeModeLeft',radioModes === 2?'borderColor':'']" @click="changeMode(2)" v-if="currentDeliveryType.indexOf('2')>-1||currentDeliveryType.indexOf('3')>-1">
					<span v-if="radioModes === 2" class="iconfont icon-xuanzhong changeTopIcon"></span>
					<image class="changeModeImg" src="/static/assets/img/Pack.png" />
					
					<span>{{currentDeliveryType.indexOf('2')>-1?'外卖配送':'物流配送'}}</span>
				</div>
				<div :class="['changeMode','changeModeRight',radioModes === 1?'borderColor':'']" @click="changeMode(1)" v-if="currentDeliveryType.indexOf('1')>-1">
					<span v-if="radioModes === 1" class="iconfont icon-xuanzhong changeTopIcon"></span>
					<image class="changeModeImg" src="/static/assets/img/Eat.png" />
					到店自取
				</div>
			</div> -->
			<!-- 展示地址的位置 -->
			<div @click="radioChange" v-if="!$Route.query.isIntegral">
				<div class="order-area">
					<div class="order-area-icon">
						<image src="/static/assets/img/weizhi.png" alt />
					</div>
					<div v-if="currentArea&&JSON.stringify(currentArea) !== '{}'" style="flex: 1">
						<div>
							<span>{{currentArea.Name}}{{currentArea.Sex | setSex2}}</span>
							<span class="order-area-phone">{{currentArea.Mobile?currentArea.Mobile:currentArea.Tel}}</span>
						</div>
						<div class="order-area-location">{{currentArea.Address}}&nbsp;{{currentArea.House}}</div>
					</div>
					<div v-else style="flex: 1;margin:auto;font-size:14px;color:#909090">
						选择{{radioModes ===
					2?'收货':'取货'}}地址
					</div>
				</div>
			</div>


			<adCell text="门店自取" showArrow="false" v-if="$Route.query.isIntegral" />

			<!-- <adCell @click="clickDataTime" :text="radioModes === 1?'选择自取时间':'选择收货时间'" showArrow="false" v-if="prodList[0].DeliveryType&&!(prodList[0].DeliveryType.indexOf('3')>-1&&radioModes === 2)">
				<view class="customView">
					{{UserTime}}
				</view>
			</adCell> -->

			<adCell :text="UserDiscountName" @click="clickUserDiscount" v-if="DiscountList.length>0">
				<view>{{UserDiscount}}</view>
			</adCell>
			<div class="setADcell" v-if="radioModes === 1">
				<adCell text="姓名" showArrow="false">
					<input type="text" placeholder="请输入收件名字" v-model="name_user">
					<text class="iconfont icon-tongxunlu" @click="getAddress"></text>
				</adCell>
				<adCell text="手机号码" showArrow="false">
					<input type="text" placeholder="请输入手机号码" v-model="phone_user">
				</adCell>
			</div>
			<!-- <div class="setADcell" v-if="radioModes === 1">
				<adCell text="手机号码" showArrow="false">
					<input type="text" placeholder="请输入手机号码" v-model="phone_user">
				</adCell>
			</div> -->

			<div class="setADcell">
				<adCell text="备注留言" showArrow="false" showBottomLine="false">
					<input type="text" placeholder="请输入留言" v-model="UserRemarks">
				</adCell>
			</div>
			<!-- 商品信息 -->
			<div class="good_card_box">
				<div v-for="(item,index) in prodList" :key="index" style="margin-bottom:10px">
					<a-good-lineBox :itemData="item" :isOrder="true" :isIntegral="$Route.query.isIntegral?true:false"></a-good-lineBox>
				</div>
			</div>

			<adCell text="商品总价格" showArrow="false" showBottomLine="false">
				<span>¥{{ProdTotal}}</span>
			</adCell>
			<adCell v-if="radioModes === 2" text="运费" showArrow="false" showBottomLine="false">
				<span>{{freight=='0'?'免运费':'¥'+freight}}</span>
			</adCell>

			<div class="total-style">
				<span>
					小计：
					<span class="total-style__color">
						<span v-if="allData.ScoreTotal">{{allData.ScoreTotal|spliceNum}}积分</span>
						<span v-if="totalCurrent>0 && radioModes === 1">¥{{ProdTotal |spliceNum}}</span>
						<span v-else>{{totalCurrent>0&&allData.ScoreTotal?'+':''}}¥{{totalCurrent |spliceNum}}</span>
					</span>
				</span>
			</div>

			<div class="radio-group-play">
				<div style="padding-bottom: 4px" v-if="$Route.query.isIntegral&&allData.CardInfo">当前卡积分：{{allData.CardInfo.Score}}</div>
				<view class="payStyle">支付方式</view>
				<radio-group @change="radioPayChange">
					<div v-if="(allData.SalePriceTotal&&$Route.query.isIntegral)||!$Route.query.isIntegral">
						<div v-if="allData.hasOwnProperty('CardInfo')" class="radio-group-item" @click="PayTypeClick('1')">
							<div>
								<img class="wechat" src="/static/assets/img/moneyPay.png" slot="right-icon" />
								<span class="custom-title">卡支付（余额:{{CardInfo.Balance}}）</span>
							</div>
							<div style="flex:1;text-align: right;">
								<radio style="" slot="right-icon" value="1" :checked="radioPayType == '1'" v-if="Number(CardInfo.Balance)>totalCurrent" />
								<span class="summaryNum" style="color:#777" v-else>余额不足</span>
							</div>
						</div>
						<div @click="PayTypeClick('2')" class="radio-group-item" v-if="$Route.query.isIntegral?allData.CardInfo?true:false:true">
							<div>
								<img class="wechat" src="/static/assets/img/weixinPay.png" />
								<span class="custom-title">微信支付</span>
							</div>
							<radio style="flex:1;text-align: right;" slot="right-icon" value="2" :checked="radioPayType == '2'" />
						</div>
					</div>
				</radio-group>
			</div>

			<a-bottomSubmit :isOrder="true" :allMoney="totalCurrent" :isType="radioModes" :ziquSumMoney="ProdTotal" :scoreTatal="totalCurrentScore"
			 :cardInfo="allData.CardInfo" @submitMoney="submitMoney" :isIntegral="$Route.query.isIntegral"></a-bottomSubmit>
		</div>

		<div class="changeAreaStyle">
			<uni-popup ref="showAreaList" v-model="showAreaList" type="bottom">
				<div class="confirm-order-popup">
					<div class="top">
						<span class="cancel" @click="$refs.showAreaList.close()">取消</span>
						<span>选择地址</span>
					</div>
					<radio-group class="bottom-area" ref="checkboxAreaRef" @change="changeGroup">
						<div v-for="(item,index) in areaList" :key="index" class="bottom-area__box" @click="changeArea(item,index)">
							<radio :value="item.SID" class="checkbox-my" :checked="showAreaList == item.SID"></radio>
							<div class="bottom-area__info">
								<div>{{item.Address}}&nbsp;{{item.House}}</div>
								<div class="bottom-area__phone">
									{{item.Name}}
									<span v-if="item.Sex">{{item.Sex | setSex2}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
									<span>{{item.Mobile?item.Mobile:item.Tel}}</span>
								</div>
							</div>
							<span v-if="radioModes===2" class="icon iconfont icon-bianji bottom-area__icon" @click.stop="clickEdit(item)"></span>
						</div>
					</radio-group>
					<div class="bottom-area__add" v-if="radioModes===2" @click="areaSet">
						<uni-icons type="plus" style="vertical-align: middle;font-size: 18px;margin-right: 6px" class="colorStyle" />
						<span style="vertical-align: middle">新增收货地址</span>
					</div>
				</div>
			</uni-popup>
		</div>

		<uni-popup ref="addEditArea" v-model="addEditArea" position="bottom" class="confirm-area-popup">
			<a-receive-address v-if="addEditArea" @clickGo="clickGo" :radioModes="radioModes" :areaInfo="areaInfo" @saveArea="saveAreaSet"
			 :currentDeliveryType="currentDeliveryType"></a-receive-address>
		</uni-popup>
		<!-- 选择时间 -->
		<!-- <uni-popup ref="selectTime" v-model="selectTime" type="bottom" style="max-height:50%">
			<div class="confirm-selectTime-popup">
				<div class="leftNavsidebar">
					<view :class="['homepageLeftFixed']" style="width:130px">
						<view v-for="(item,index) in sidebarList" :key="index" :class="['homepageLeft',index===currentIndex?'activeCanteen':'']"
						 @click="changeSider(index)">
							{{item}}
						</view>
					</view>
				</div>
			</div>
			<div class="rightTime" v-if="rightTimeList.length>0">
				<radio-group @change="radioTimeFun">
					<div v-for="(item,index) in rightTimeList" :key="index" :border="false">
						<ad-cell :text="item" @click="rightTimeClick(item)" showArrow="false" showBottomLine="false">
							<radio :value="item" :checked="radioTime == item"></radio>
						</ad-cell>
					</div>
				</radio-group>
			</div>
		</uni-popup> -->
		<uni-popup ref="discountProgram" type="bottom">
			<radio-group @change="setDiscountClick">
				<ad-cell text="暂不使用" @click="DiscountClick('undefined')" showArrow="false">
					<radio style="display: inline-block;vertical-align: middle;margin-left:20px" value="undefined" :checked="'undefined' === radioDiscount" />
				</ad-cell>
				<div v-for="(item,index) in DiscountList" :key="index">
					<adCell :text="item.PrefName" showArrow="false" showBottomLine="false" @click="DiscountClick(item)">
						<span style="margin-right: 20px">-¥{{item.DiscPrice || 0}}</span>
						<radio :value="item.PrefNo" :checked="item.PrefNo === radioDiscount" />
					</adCell>
				</div>
			</radio-group>
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
	import Mixins from "../mixins.js";
	import adCell from '@/node_modules/adcell/ADCell.vue';

	export default {
		name: "confirmOrder",
		mixins: [Mixins],
		components: {
			// receiveAddress
			adCell
		},

		data() {
			return {
				mainStyle: getApp().globalData.mainStyle,
				mainColor: getApp().globalData.mainColor,
				loading: true,
				currentItem: [],
				UserRemarks: "",
				UserTime: "",
				UserDiscount: "",
				UserDiscountName: "请选择方案",
				// 当前选择的地址
				currentArea: {},
				radioModes: 2,
				prodList: [],
				showAreaList: false,
				addEditArea: false,
				selectTime: false,
				discountProgram: false,
				resultArea: "",
				areaList: [], //弹出窗地址渲染列表
				DeliveryAreaList: [],
				// 收货地址
				takeOver: [],
				// 运费
				freight: 0,
				// 总金额
				total: 0,
				totalCurrent: 0,
				location: {},
				activeKey: 0,
				sidebarList: [],
				rightTimeList: [],
				radioTime: "",
				radioPayType: "1",
				// 卡信息
				CardInfo: {},
				// 自取时候用户电话
				phone_user: "",
				name_user: "",
				orderId: "",
				// 购物车列表sid
				cardSids: [],
				ProdTotal: 0,
				// 优惠方案id
				radioDiscount: "",
				DiscountList: [],
				// 整天的时间段
				allTimeSlot: [],
				// 记录时间段
				RecordTime: {},
				// 编辑的地址
				areaInfo: {},
				//当前的配送类型
				currentDeliveryType: "",
				testData: {},
				allData: {},
				totalCurrentScore: 0,
				currentIndex: 0
			};
		},
		async created() {
			if (
				!this.$store.state.currentCard ||
				this.$store.state.currentCard.length === 0
			) {
				this.$Router.back(2)
				this.$Router.back(100)
				// window.history.go(-1);
			}
			console.log(this.$store.state.currentStoreInfo)
			// 获取授权地址
			await this.getWxConfig();
			
			let item = this.$store.state.currentCard || [];
			item.forEach(D => {
				if (D.SID) {
					this.cardSids.push(D.SID);
				}
				if (D.PartsNo instanceof Array) {
					let arr = [];
					let newArr = JSON.parse(JSON.stringify(D.PartsNo));
					newArr.forEach(data => {
						arr.push(data.ProdNo);
					});
					D.PartsNo = arr.join(",");
				}
			});

			// console.log(item, 7777);
			this.currentItem = JSON.stringify(item);
			this.cardSids = this.cardSids ? this.cardSids.join(",") : "";

			if (this.$Route.query.isIntegral) {
				await this.getInfoIntegral();
			} else {
				await this.getInfo();
			}
		},
		mounted() {
			if (this.$store.state.orderType === 'takein') {
				this.radioModes = 1;
				let currentStore = JSON.parse(localStorage.getItem('currentStoreInfo'))
				this.currentArea = currentStore.data;
			} else {
				this.currentArea = JSON.parse(sessionStorage.getItem('takeOutAddress'))
			}
		},
		methods: {
			// 从商品下单的信息
			async getInfo() {
				this.loading = true;
				uni.showLoading()
				try {
					if (!this.location.longitude) {
						uni.showToast({
							title: '地址获取失败',
							duration: 2000
						});
						throw "地址获取失败";
					}
					let currentItems = JSON.parse(this.currentItem);
					this.currentDeliveryType = currentItems[0].DeliveryType;

					let obj = {
						Action: "SettlePay",
						ProdList: this.currentItem,
						DefLongitude: this.location.longitude,
						DefLatitude: this.location.latitude,
						DeliveryType: this.currentDeliveryType
					};
					// console.log(currentItems, "currentItems[0]");

					if (currentItems[0].hasOwnProperty("PromotionItemSID")) {
						// 活动
						obj.PromotionItemSID = currentItems[0].PromotionItemSID;
					}
					// console.log(obj, "obj");
					// return;
					Promise.all([this.saveArea(true), vipCard(obj, "UProdOpera")])
						.then(res => {
							// this.areaList = res[0];
							this.takeOver = res[0];
							let Data = res[1].Data;
							console.log(Data, 77765655)
							this.allData = Data;
							this.prodList = Data.ProdList;
							this.currentItem = JSON.parse(JSON.stringify(this.prodList));
							this.currentDeliveryType = Data.ProdList[0].DeliveryType; //选择第一个商品的配送方式
							if (this.radioModes === 1) {
								this.areaList = Data.ShopInfoList;
							} else {
								this.areaList = res[0];
							}
							// this.currentItem.forEach(D => {
							// 	if (typeof D.PartsNo !== "string") {
							// 		D.PartsNo.forEach((data, index) => {
							// 			D.arr = [];
							// 			D.arr.push(data.ProdNo);
							// 		});
							// 		D.PartsNo = D.arr ? D.arr.join(",") : "";
							// 		delete D.arr;
							// 	}
							// 	if (D.PartsList) {
							// 		D.PartsList = JSON.stringify(D.PartsList);
							// 	}
							// });

							// // console.log(this.currentItem,'this.currentItem')
							// this.currentItem = JSON.stringify(this.currentItem);
							// //提前预约时间
							// let advanceTime = 0;
							// if (this.prodList.length > 0) {
							// 	this.prodList.forEach((D, index) => {
							// 		if (D.DeliveryType && D.DeliveryType !== "") {
							// 			D.DeliveryType = D.DeliveryType.split(",");
							// 		}
							// 		if (D.FinHour > advanceTime) {
							// 			advanceTime = D.FinHour;
							// 		}
							// 	});
							// }

							this.freight = Data.Freight;
							// this.DiscountList = Data.DiscList || [];
							//     [
							// 	{DiscPrice: 20, PrefName: '方案q', PrefNo: 11},
							// 	{DiscPrice: 30, PrefName: '方案xx', PrefNo: 22}
							// ]
							// if (this.DiscountList.length > 0) {
							// 	this.radioDiscount = this.DiscountList[0].PrefNo;
							// 	this.UserDiscount = "¥" + (this.DiscountList[0].DiscPrice || 0);
							// 	this.UserDiscountName = this.DiscountList[0].PrefName;
							// }
							this.total = Data.SumTotal;
							this.ProdTotal = Data.ProdTotal;
							this.totalCurrent = parseFloat(Number(Data.SumTotal).toFixed(2));
							this.CardInfo = Data.hasOwnProperty("CardInfo") ?
								Data.CardInfo : {};

							if (JSON.stringify(this.CardInfo) !== "{}") {
								if (Number(Data.CardInfo.Balance) < Number(Data.SumTotal)) {
									//余额不足默认微信支付
									this.radioPayType = "2";
								}
							} else {
								this.radioPayType = "2";
							}

							this.DeliveryAreaList = Data.ShopInfoList;
							// if(this.$store.state.orderType === 'takein'){
							// 	let DefaultsArea = this.areaList.filter(D => D.Defaults === '1')[0]
							// }
							// if (this.radioModes === 1) {
							// 	this.areaList = this.DeliveryAreaList;
							// 	let DefaultsArea = this.areaList[0]
							// 	this.currentArea = DefaultsArea ? DefaultsArea : {}
							// } else {
							// 	this.currentArea = JSON.parse(sessionStorage.getItem('takeOutAddress'))
							// 	// let DefaultsArea = this.areaList.filter(D => D.Defaults === '1')[0];
							// 	// this.currentArea = DefaultsArea ? DefaultsArea : {};
							// 	// this.resultArea = DefaultsArea ? DefaultsArea.SID : "";
							// }
							// let DefaultsArea = _.find(this.areaList, {
							// 	Defaults: "1"
							// }); 
							// //是否有默认地址
							// let DefaultsArea = this.areaList.filter(D => D.Defaults === '1')[0]
							// this.currentArea = DefaultsArea ? DefaultsArea : {};
							// this.resultArea = DefaultsArea ? DefaultsArea.SID : "";

							// let num = Number(Data.ShopBase.ScopeDay);

							// let dayAdvance = 0;
							// let tAdvance = 0;
							// if (Number(advanceTime) / 24 >= 1) {
							// 	//   // 按天数提前
							// 	dayAdvance = Number(advanceTime) / 24;
							// 	tAdvance = 0;
							// } else {
							// 	//   // 提前的时间+当前的时间>下班时间
							// 	let endTime = countDown(Data.ShopBase.EndTime);
							// 	let cutTime = countDown(getTime(false, false, true));
							// 	let acTime = Number(advanceTime) * 60 * 60;

							// 	if ((acTime + cutTime).toFixed(2) > endTime) {
							// 		// 当提前预约时间大于下班时间后,重第二天0开始加预约时间
							// 		tAdvance = Number(advanceTime);
							// 		dayAdvance = dayAdvance + 1;
							// 	} else {
							// 		tAdvance = Number(advanceTime);
							// 		dayAdvance = 0;
							// 	}
							// }
							// // setChangeData(num); //左侧的天数
							// this.sidebarList = setChangeData(num, dayAdvance);
							// let {
							// 	arr,
							// 	arrToday
							// } = setChangeTime(
							// 	Data.ShopBase,
							// 	tAdvance,
							// 	dayAdvance
							// );
							// this.allTimeSlot = arr; //总的右侧时间间隔
							// this.todayTimeSlot = arrToday; //今天的右侧时间间隔
							// this.rightTimeList = arrToday; //当前页面的右侧时间间隔
							// this.radioTime = arrToday[0];
							// this.RecordTime = {
							// 	radioTime: arrToday[0],
							// 	index: 0
							// };

							// this.UserTime =
							// 	this.sidebarList[this.activeKey] + " " + this.radioTime;

							this.loading = false;
							uni.hideLoading()
						})
						.catch(e => {
							this.loading = false;
							uni.hideLoading()
						});
				} catch (e) {
					this.loading = false;
					uni.hideLoading()
				}
			},
			async getInfoIntegral() {
				try {
					uni.showLoading()
					let {
						Data
					} = await vipCard({
							Action: "SettlePay",
							ProdList: this.currentItem
						},
						"UIntegralOpera"
					);
					this.prodList = Data.ProdList;
					this.allData = Data;
					this.CardInfo = Data.CardInfo;
					this.currentItem = JSON.parse(JSON.stringify(this.prodList));
					this.totalCurrent = parseFloat(Number(Data.SalePriceTotal).toFixed(2));
					if (Data.ScoreTotal) {
						this.totalCurrentScore =
							parseFloat(Number(Data.ScoreTotal).toFixed(2)) || 0;
					}
					this.loading = false;
					uni.hideLoading()
				} catch (e) {
					this.loading = false;
					uni.hideLoading()
				}
			},
			orderArea() {},
			getAddress() { //获取共享地址
				let _this = this;
				wx.openAddress({
					success: function(res) {
							alert(JSON.stringify(res))
						_this.name_user = res.userName;
						_this.phone_user = res.telNumber;
					}
				});
			},
			// 自取和外卖的切换按钮，暂时不用了
			changeMode(val) {
				// 1自取，2 外卖
				console.log(val, '改变配送方式')
				this.radioModes = val;
				// this.$store.state.orderType === 'takein'
				this.areaList = val == 1 ? this.DeliveryAreaList : this.takeOver;
				this.currentArea = this.areaList[0];

				if (val === 1) {
					this.totalCurrent = this.total - this.freight;
					// this.currentArea = {};
				} else {
					this.totalCurrent = this.total;
					if (this.takeOver.filter(D => D.Defaults === '1').length > 0) {
						this.currentArea = this.takeOver.filter(D => D.Defaults === '1')[0]
					}
					this.resultArea = this.currentArea.SID;
				}
				this.totalCurrent = parseFloat(Number(this.totalCurrent).toFixed(2));
			},
			radioChange() {
				// 控制地址的展示
				this.showAreaList = true;
				this.$refs.showAreaList.open()
			},
			radioPayChange(val) {
				if (this.CardInfo && Number(this.CardInfo.Balance) < this.totalCurrent) {
					return;
				}
				this.radioPayType = val.detail.value
			},
			changeGroup(val) {
				this.resultArea = val.detail.value
			},
			// 切换并选择地址
			async changeArea(val, index) {
				this.showAreaList = val.SID
				let api;
				if (this.radioModes === 1) {
					api = "IsPickShop";
				} else {
					if (this.currentDeliveryType.indexOf("2") > -1) {
						//外卖
						api = "CalcFreight";
					} else if (this.currentDeliveryType.indexOf("3") > -1) {
						//物流
						api = "CalcLogistics";
					}
				}

				// try {
				// 	this.loading = true;
				// 	uni.showLoading()
				// 	let obj = {
				// 		Action:api,
				// 		Latitude: val.Latitude || "",
				// 		Longitude: val.Longitude || "",
				// 		ShopSID: val.SID,
				// 		PayType: this.radioPayType
				// 	}
				// 	let { Data } = await vipCard(obj, "UProdOpera");
				// 	console.log(Data)

				if (this.radioModes === 1) {
					this.currentArea = val;
					let currentStoreInfo = this.currentArea
					this.$store.commit("SET_CURRENT_STORE", currentStoreInfo)
				} else {
					this.currentArea = val;
					sessionStorage.setItem('takeOutAddress', JSON.stringify(this.currentArea));
				}
				this.showAreaList = false;
				this.$refs.showAreaList.close()
				// 	this.resultArea = val.SID;
				// 	this.areaList.splice(index, 1);
				// 	this.areaList.unshift(val);
				// 	//改变位置，重新算运费和总价
				// 	this.freight = Data.Freight;
				// 	this.totalCurrent = parseFloat(Number(Data.SumTotal).toFixed(2));

				this.loading = false;
				uni.hideLoading()
				// } catch (e) {
				// 	this.loading = false;
				// 	uni.hideLoading()
				// }
			},
			clickEdit(val) {
				this.areaInfo = val;
				this.$refs.addEditArea.open()
				this.addEditArea = true;
			},
			clickGo() {
				this.$refs.addEditArea.close()
				this.addEditArea = false;
			},
			clickLeft() {
				if (this.$Route.query.flag) {
					this.$Router.push({
						path: '/pages/shoppingMall/menu_naixue/menu/menu',
						query: {
							flag: 'Deflocation'
						}
					})
				} else {
					this.$Router.push(this.$store.state.historyUrl)
				}

			},
			clickDataTime() {
				console.log('吊起时间')
				this.selectTime = true;
				this.$refs.selectTime.open()
			},
			clickUserDiscount() {
				this.discountProgram = true;
				this.$refs.discountProgram.open()
			},
			clickTime() {},
			async saveAreaSet() {
				this.$refs.addEditArea.close()
				this.addEditArea = false;
				this.loading = true;
				uni.showLoading()
				let listArea = await this.saveArea(false);
				this.areaList = listArea;
				this.takeOver = listArea;
				this.loading = false;
				uni.hideLoading()
			},
			async saveArea(bool) {
				try {
					let type;
					if (this.currentDeliveryType.indexOf("2") > -1) {
						type = 1;
					} else if (this.currentDeliveryType.indexOf("3") > -1) {
						type = 2;
					}
					let {
						Data
					} = await vipCard({
							Action: "GetAddressList",
							Type: type
						},
						"UMemberOpera"
					);
					if (bool) {
						uni.showLoading()
					}
					return Data.AddressList;
				} catch (e) {
					return [];
				}
			},
			PayTypeClick(item) {
				if (this.CardInfo && Number(this.CardInfo.Balance) < this.totalCurrent) {
					return;
				}
				this.radioPayType = item;
			},
			changeSider(index) {
				this.currentIndex = index
				this.activeKey = index
				if (this.RecordTime.index === index) {
					this.radioTime = this.RecordTime.radioTime;
				} else {
					this.radioTime = "";
				}
				if (index !== 0) {
					this.rightTimeList = this.allTimeSlot;
				} else {
					this.rightTimeList = this.todayTimeSlot;
				}
			},
			rightTimeClick(item) {
				this.RecordTime = {
					radioTime: item,
					index: this.activeKey
				};
				this.radioTime = item;
				this.selectTime = false;
				this.$refs.selectTime.close()
				this.UserTime = this.sidebarList[this.activeKey] + " " + this.radioTime;
			},
			radioTimeFun(val) {
				this.radioTime = val.detail.value
			},
			setDiscountClick(val) {
				this.radioDiscount = val.detail.value
			},
			async DiscountClick(item) {
				let PrefNo = item.PrefNo;
				if (item === "undefined") {
					PrefNo = "";
				}
				this.discountProgram = false;
				this.$refs.discountProgram.close()
				try {
					let obj = {
						Action: "SelectDisc",
						PrefNo: PrefNo,
						ProdList: this.currentItem,
						PayType: this.radioPayType,
						Latitude: this.currentArea.Latitude,
						Longitude: this.currentArea.Longitude
					};
					this.loading = true;
					uni.showLoading();
					let {
						Data
					} = await vipCard(obj, "UProdOpera");
					this.UserDiscountName =
						item === "undefined" ? "优惠券方案" : item.PrefName;
					this.UserDiscount =
						item === "undefined" ? "暂不使用" : "¥" + item.DiscPrice;
					this.radioDiscount = item === "undefined" ? item : item.PrefNo;
					this.totalCurrent = parseFloat(Number(Data.Total ? Data.Total : Data.SumTotal).toFixed(2));
					this.loading = false;

					uni.hideLoading();
				} catch (e) {
					this.loading = false;
					uni.hideLoading();
				}
			},
			areaSet() {
				this.areaInfo = {};
				this.addEditArea = true;
				this.$refs.addEditArea.open()
			},
			async submitMoney() {
				// 结算
				if (JSON.stringify(this.currentArea) === "{}" && !this.$Route.query.isIntegral) {
					this.$toast("请选择地址");
					return;
				}
				if (this.radioModes === 1) {
					if (!this.phone_user || this.phone_user === "") {
						this.$toast("请填写手机号码");
						return;
					} else {
						if (!checkMobile(this.phone_user)) {
							this.$toast("手机号格式错误");
							return;
						}
					}

					if (!this.name_user || this.name_user === "") {
						this.$toast("请填写收件名字");
						return;
					}
				}

				if (this.radioDiscount === "undefined") {
					this.radioDiscount = "";
				}

				let DeliveryType = this.radioModes; //2、1       //获取当前配送方式
				if (this.radioModes === 2) {
					if (this.currentDeliveryType.indexOf("2") > -1) {
						DeliveryType = 2;
					} else if (this.currentDeliveryType.indexOf("3") > -1) {
						DeliveryType = 3;
					}
				} else {
					DeliveryType = 1;
				}

				if (typeof this.currentItem !== "string") {
					this.currentItem = JSON.stringify(this.currentItem);
				}
				let obj = {
					Action: "OrderPay",
					DeliveryType: DeliveryType,
					UserName: this.radioModes === 2 ? this.currentArea.Name : this.name_user,
					Mobile: this.radioModes === 1 ? this.phone_user : this.currentArea.Mobile,
					Address: this.radioModes === 2 ?
						this.currentArea.Address + "  " + this.currentArea.House : "",
					ProdList: this.currentItem,
					Latitude: this.currentArea.Latitude || "",
					Longitude: this.currentArea.Longitude || "",
					Province: this.currentArea.Province || "",
					AddressSID: this.radioModes === 2 ? this.resultArea.SID : "",
					ShopSID: this.radioModes === 1 ? this.resultArea : "",
					UserRemarks: this.UserRemarks,
					PayType: this.radioPayType,
					PickDate: this.sidebarList[this.RecordTime.index],
					PickTime: this.RecordTime.radioTime,
					CartSID: this.cardSids,
					PrefNo: this.radioDiscount
				};

				if (JSON.parse(this.currentItem)[0].hasOwnProperty("PromotionItemSID")) {
					// 活动
					obj.PromotionItemSID = JSON.parse(this.currentItem)[0].PromotionItemSID;
				}
				if (this.$Route.query.isIntegral) {
					let currentItems = JSON.parse(this.currentItem);
					obj = currentItems[0];
					obj.Action = "OrderPay";
					obj.PayType = this.radioPayType;
					obj.UserRemarks = this.UserRemarks;
					obj.DeliveryType = 1;
					//积分
					if (!this.CardInfo) {
						this.$toast.fail("未绑定微卡");
						return;
					}
				}
				let Opera = this.$Route.query.isIntegral ?
					"UIntOrderOpera" :
					"UOrderOpera";

				// console.log(JSON.stringify(obj), "objobj");
				// return;
				this.loading = true;
				uni.showLoading();
				try {
					let {
						Data
					} = await vipCard(obj, Opera);
					this.loading = false;
					uni.hideLoading();
					this.$store.commit("SET_CURRENT_CARD", []); //清掉购物车

					uni.removeStorageSync("alreadyPaid"); //清点之前标记的已经下单的字段
					if (this.radioPayType === "1") {
						//微卡支付
						this.$Router.push({
							path: "/pages/shoppingMall/order/confirmCard",
							query: {
								Balance: this.CardInfo.Balance,
								Score: this.CardInfo.Score,
								PayScore: Data.hasOwnProperty("PayScore") ? Data.PayScore : "",
								total: Data.SumTotal,
								PayNo: Data.PayNo,
								IsPass: Data.IsPass
							}
						});
					} else {
						// 微信支付
						this.testData = Data;
						try {
							weChatPayment(this, Data, false);
						} catch (e) {
							that.$toast.fail("微信调起失败");
							this.loading = false;
							uni.hideLoading();
						}
					}
				} catch (e) {
					// that.$toast.fail("微信调起失败");
					this.loading = false;
					uni.hideLoading();
				}
			},
			// 点击icon调用微信共享地址中的通讯录
		},
		filters: {
			setSex2(val) {
				if (val == 0) {
					return '先生'
				} else if (val == 1) {
					return '女士'
				}
			}
		},
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

		.total-style {
			background: #fff;
			text-align: right;
			line-height: 40px;
			font-size: 16px;
			padding-right: 10px;
			border-bottom: 1rpx solid #ebedf0;

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
	}
</style>
