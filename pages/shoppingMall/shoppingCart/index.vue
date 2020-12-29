<template>
	<div>
		<div class="shopping-cart-style" :class="classHome">
			<!-- #ifndef H5 -->
			<uni-nav-bar :status-bar="true" :shadow="false" title="购物车"></uni-nav-bar>
			<!-- #endif -->
			<div v-if="!loading">
				<div class="top-cart backgroundColor">
					<div class="top-cart__title">购物车</div>
					<div class="top-cart__num">共{{dataList.length}}件宝贝</div>
					<span class="top-cart__batch" @click="clickBatch" style="font-size: 16px;">{{batchState?'完成':'管理'}}</span>
				</div>
				<div class="bottom-cart">
					<checkbox-group @change="changeGroup">
						<div v-for="(item,index) in dataList" :key="index" class="bottom-cart__box">
							<checkbox :value="item.SID" class="checkbox-my" :checked="result.some(D=>D === item.SID)" :disabled="item.IsBuy==='0'&&!batchState"></checkbox>
							<a-good-lineBox :itemData="item" :isShoppingCard="true" class="bottom-cart__cardBox" @goodBox="goodBox"
							 @changeStepper="changeStepper($event,index,item.SID)" @changePartsNum="changePartsNum($event,item,index)"></a-good-lineBox>
						</div>
					</checkbox-group>
				</div>
				
				<a-bottomSubmit :batchState="batchState" @checkAll="checkAll" @submitMoney="submitMoney" @delButton="delButton"
				 :allMoney="allMoney" style="margin-bottom: 50px;" :allResult="allResult"></a-bottomSubmit>
				<!-- 配件弹窗 -->
				<uni-popup class="uni-popupSku" ref="setParts" type="bottom" @change="setPartsChange">
					<div class="uni-popupSku-box">
						<div style="height: 33px;">
							<uni-icons type="closeempty" size="24" class="crossIcon" @click="$refs.setParts.close()"></uni-icons>
						</div>
						<div class="partsStyle" v-for="(item,index) in PartsList" :key="item.SID">
							<div class="skuTopChoiceItem">售价¥{{item.SalePrice}} &nbsp;{{item.Name}}</div>
							<uni-number-box class="skuStepperStyle partsStepper" v-model="item.Stepper" :min="0" :max="Number(item.StoreQty)"
							 @change="skuTopChoiceParts($event,index)" :value="item.Stepper" />
						</div>
		
						<div style="margin-top:15px;">
							<!-- linear-gradient(to right, #ffd01e, #ff8917)" -->
							<button class="buttonPage" type="main" @click="changeNumParts">确 定</button>
						</div>
					</div>
				</uni-popup>
			</div>
			<a-nodeData v-if="dataList.length===0&&loading==false" stringVal="暂无宝贝,可前往商城选择哦～"></a-nodeData>
		</div>
		<view>
			<tabBar :pagePath="'/pages/shoppingMall/shoppingCart/index'"></tabBar>
		</view>	
	</div>
</template>

<script>
	import {
		vipCard
	} from "@/api/http.js";

	export default {
		components: {},
		data() {
			return {
				classHome: getApp().globalData.mainStyle,
				result: [],
				dataList: [],
				batchState: false,
				allMoney: 0,
				loading: true,
				allResult: false,
				currentItem: [],
				filterIsBuyList: [],
				// 当前配件列表
				PartsList: [],
				// 当前
				currentIndex: null
			};
		},
		created() {
			this.getList();
			// console.log('购物车')
		},
		onPullDownRefresh: function() {
			//开启导航条加载动画
			uni.showNavigationBarLoading()
			this.getList()
		},
		methods: {
			async getList() {
				uni.showLoading({
					title: '加载中'
				})
				try {
					let {
						Data
					} = await vipCard({
						Action: "GetShopCart"
					}, "UMemberOpera");
					this.dataList = Data.ShopCartList;
					this.filterIsBuyList = Data.ShopCartList.filter(D => D.IsBuy !== "0"); //过滤不能购买选中的商品

					this.loading = false;
					uni.hideLoading();
					uni.stopPullDownRefresh() //停止下拉刷新
					uni.hideNavigationBarLoading() //隐藏导航条加载动画  
				} catch (e) {
					this.$toast.fail(e)
					// console.log(e);
					this.loading = false;
					uni.stopPullDownRefresh() //停止下拉刷新
					uni.hideNavigationBarLoading() //隐藏导航条加载动画  
				}
			},
			clickBatch() {
				this.batchState = !this.batchState;
				if (this.batchState) {
					this.allMoney = 0;
				}
				if (!this.batchState) {
					this.result = [];
					this.allResult = false;
				}
				if (this.result.length > 0) {
					this.changeGroup();
				}
			},
			checkAll(bool) {
				this.result = [];
				this.allResult = true;
				if (!bool) {
					let arr = JSON.parse(JSON.stringify(this.dataList));
					arr = this.batchState ? arr : arr.filter(D => D.IsBuy !== "0");
					arr.forEach(D => {
						this.result.push(D.SID);
					});
				}
			},
			submitMoney() {
				if (this.currentItem.length > 0) {
					let currentItem = JSON.parse(JSON.stringify(this.currentItem));
					let bool = currentItem.every(D => {
						let num = 0;
						currentItem.forEach(data => {
							if (D.ProdSID === data.ProdSID) {
								num += Number(data.BuyCnt);
							}
						});
						if (D.MaxBuyCnt < num && D.MaxBuyCnt != 0) {
							this.$toast(D.Name + "限购" + D.MaxBuyCnt + "件");
							return false;
						}
						return true;
					});
					if (!bool) {
						return;
					}

					let arr = [];
					currentItem.forEach(D => {
						D.PartsList = JSON.stringify(D.PartsList);
					});
					// console.log(currentItem,9999)
					// return;
					this.$store.commit("SET_CURRENT_CARD", currentItem);
					this.$Router.push("/pages/shoppingMall/order/confirmOrder");
				} else {}
			},
			async delButton() {
				if (this.result.length === 0) {
					return;
				}
				let val = this.result.join(",");
				try {
					await vipCard({
							Action: "RemoveAllShopCart",
							SIDList: val
						},
						"UMemberOpera"
					);
					this.result.forEach(DATA => {
						this.dataList.forEach((D, index) => {
							if (D.SID == DATA) {
								this.dataList.splice(index, 1);
							}
						});
					});
					this.result = [];
					this.allResult = false;
				} catch (e) {}
			},
			async changeStepper(val, index, SID) {
				let currentData = this.dataList[index];
				let num = Number(currentData.BuyCnt);
				let sid = currentData.SID;
				if (val.boolBlur) {
					if (val.bool) {
						// 新增
						num++;
					} else {
						num--;
					}
				} else {
					num = val.numNew;
				}

				try {
					await vipCard({
							Action: "SetShopCnt",
							BuyCnt: num,
							SID: sid
						},
						"UMemberOpera"
					);
					this.dataList[index].BuyCnt = num
					if (this.result.indexOf(SID) > -1) {
						//新增的这个商品，被选中
						countTotal(this, this.currentItem);
					}
				} catch (e) {
					if (val.boolBlur) {
						if (val.bool) {
							// 新增
							// this.dataList[index].BuyCnt = num - 1;
						} else {
							// this.dataList[index].BuyCnt = num + 1;
						}
					} else {
						this.dataList[index].BuyCnt = val.oldNum;
					}
				}
			},
			goodBox(val) {
				this.$Router.push({
					path: "/pages/shoppingMall/list/infoGood",
					query: {
						SID: val.ProdSID,
						isCard: true
					}
				});
			},
			changeGroup(val) {
				this.result = val ? val.detail.value : []
				let arrLength = this.batchState ? this.dataList : this.filterIsBuyList;
				if (this.result.length < arrLength.length) {
					this.allResult = false;
				} else if (
					this.result.length > 0 &&
					this.result.length === arrLength.length
				) {
					this.allResult = true;
				}
			},
			skuTopChoiceParts(event, index) {
				this.PartsList[index].Stepper = event.inputValue
			},
			async changePartsNum(val, item, index) {
				this.$refs.setParts.open()
				val.forEach((D, index) => {
					D.Stepper = D.BuyCnt;
				});
				this.PartsList = val;
				this.currentIndex = index;
			},
			async changeNumParts() {
				// console.log(this.PartsList,'PartsList')
				// console.log(this.dataList,'dataList')
				// console.log(this.currentIndex,'index')	
				
				let partsList = [];
				let dataParams = this.dataList[this.currentIndex];
				this.PartsList.forEach((D, index) => {
					partsList[index] = {
						BuyCnt: D.Stepper,
						SID: D.SID
					};
				});
				partsList = partsList.filter(D => Number(D.BuyCnt) !== 0);
				let PartsNo = [];
				partsList.forEach(D => {
					PartsNo.push(D.SID);
				});
				PartsNo = PartsNo.join(",");
				
				try {
					await vipCard({
							Action: "SetShopCnt",
							SID: dataParams.SID,
							ProdSID:dataParams.ProdSID,
							PartsList: JSON.stringify(partsList),
							PartsNo: PartsNo
						},
						"UMemberOpera"
					);
					this.$refs.setParts.close()
					this.PartsList.forEach((D, index) => {
						D.BuyCnt = D.Stepper;
					});
					this.PartsList = this.PartsList.filter(D => Number(D.BuyCnt) !== 0);
					this.dataList[this.currentIndex].PartsList = this.PartsList;
					countTotal(this, this.dataList);
					
				} catch (e) {}
			},
			setPartsChange(bool) {
				if (!bool.show) {}
			}
		},
		watch: {
			result(arr) {
				let newArr = [];

				arr.forEach(D => {
					let val = this.dataList.filter(data => data.SID === D)
					
					newArr.push(...val);
				});

				this.currentItem = newArr;

				countTotal(this, newArr);
			}
		}
	};

	function countTotal(_this, newArr) {
		let allMoney = 0;
		let SalePriceAll = 0;
		let Tast=0;
		newArr.forEach(data => {
			if (data.PartsList && data.PartsList.length > 0) {
				data.PartsList.forEach(dataParts => {
					SalePriceAll += Number(dataParts.SalePrice) * Number(dataParts.BuyCnt);
				});
			}
			if(data.ParamInfo){
				var list= data.ParamInfo.split(',')
				if(list.length>0){
					list.forEach(item=>{
						var Param = item.split("￥")
						if(Param.length>1){
							// Tast+=Number(Param[1])
							Tast+=Number(Param[1])* Number(data.BuyCnt)
						}
					})
				}
			}
			if(data.MemberPrice){
				allMoney += Number(data.MemberPrice) * Number(data.BuyCnt);
			}else{
				allMoney += Number(data.SalePrice) * Number(data.BuyCnt);
			}
			
		});
		allMoney = allMoney + SalePriceAll+Tast;	
		allMoney = parseFloat(allMoney.toFixed(2));
		_this.allMoney = allMoney;
	}
</script>

<style scoped lang="less">
	.shopping-cart-style {
		box-sizing: border-box;
		// padding-bottom: 100px;
		height: 100%;
		margin-bottom: 50px;
		.uni-popup {
			z-index: 1000
		}

		/deep/uni-checkbox .uni-checkbox-input {
			border-radius: 50%;
		}

		.uni-popupSku {
			.uni-popupSku-box {
				border-radius: 10px 10px 0 0;
				padding: 10px 20px;
				background-color: #fff;
			}

			.crossIcon {
				position: absolute;
				font-size: 20px;
				right: 10px;
				top: 10px;
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

		.van-pull-refresh {
			min-height: 100%;
			padding-bottom: 100px;
		}

		.top-cart {
			color: #fff;
			height: 120px;
			padding: 0 10px;

			&__title {
				line-height: 50px;
				font-size: 24px;
			}

			&__num {
				font-size: 14px;
			}

			&__batch {
				position: absolute;
				top: 8px;
				right: 10px;
			}
		}

		.bottom-cart {
			margin: -30px 10px 60px 10px;
			border-radius: 30px;

			&__box {
				display: flex;
				background: #ffffff;
				border-radius: 10px;
				margin-bottom: 10px;
				padding: 10px 0 0 10px;
				min-height: 110px;
			}

			&__cardBox {
				flex: 1;
			}

			.checkbox-my {
				display: flex;
				margin-bottom: 10px;
				padding-right: 10px;
			}
		}
	}
</style>
