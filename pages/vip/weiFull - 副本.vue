<template>
	<div class="weiFull" :class="mainStyle">
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickGo" title="微卡充值" :status-bar="true" :shadow="false"></uni-nav-bar>
		<div class="surplusTop backgroundColor" v-if="!loading || MyCard.length>0">
			<div class="surplusD">卡号：{{MyCard.CardNo}}</div>
			<div class="surplusD">余额：{{MyCard.Balance}}元</div>
			<div class="surplusD">积分：{{MyCard.Score}}</div>
		</div>
		<div class="weiFullCenter" v-if="!loading">
			<div style="display: flex; flex-wrap:wrap">
				<div style="width:50%" v-for="(item,index) in IncomeList" :key="index" class="row-div">
					<div @click="showPopup(index)" :class="{weiFullBox:true,backColor:index === currentIndex&&show,backBorder:index === currentIndex&&show}">
						<div>
							¥&nbsp;<span class="moneyTop">{{item.IncomeAmt}}</span>
							<div class="moneyBottom">{{item.IncomeName}}</div>
						</div>
					</div>
				</div>
				<uni-popup type="bottom" ref="popup" @change="changePopup">
					<div class="popup-income">
						<span class="titleDialog">充值有礼相送</span>
						<div class="contentDialog" v-if="IncomeList[currentIndex]">
							<span>充值金额{{IncomeList[currentIndex].IncomeAmt}}元</span>
							<ol>
								<li v-if="Number(IncomeList[currentIndex].DonateAmt)">赠送金额{{IncomeList[currentIndex].DonateAmt}}元</li>
								<li v-if="Number(IncomeList[currentIndex].DonateMonth)">赠送分月返还{{IncomeList[currentIndex].DonateMonth}}元</li>
								<li v-if="Number(IncomeList[currentIndex].DonateScore)">赠送积分{{IncomeList[currentIndex].DonateScore}}</li>
								<li v-if="IncomeList[currentIndex].DonateProd">赠送商品{{IncomeList[currentIndex].DonateProd}}</li>
								<li v-if="IncomeList[currentIndex].DonateTicket">赠送券{{IncomeList[currentIndex].DonateTicket}}</li>
							</ol>
						</div>
						<div class="button-theme-big">
							<button :disabled="btnLoading" @click="clickSubmit(false)">立即充值</button>
						</div>
					</div>
				</uni-popup>
				<div style="width:50%">
					<div :class={weiFullBox:true,backColor:!showMoney,backBorder:!showMoney} @click="customMoney">
						<div class="moneyTopCustom" v-if="showMoney">自定义金额</div>
						<div v-if="!showMoney" class="moneyInput">
							<span class="symbolMark">¥</span>
							<input v-model="inputVal" ref="moneyInput" :focus="searchFocus" class="customInput" type="text" autofocus="autofocus"
							 @blur="blurInput">
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="btnfixedBottom" v-if="!loading">
			<button :disabled="btnLoading" class="buttonPage" type="redRaduis" @click="clickSubmit(true)" :loading="btnLoading">充值</button>
		</div>
	</div>
</template>

<script>
	import {
		vipCard
	} from '@/api/http.js'
	import {
		getTime,
		checkMobile,
		weChatPayment,
		setUrlDelCode
	} from "@/util/publicFunction";
	export default {
		components: {},
		name: "WeiFull",
		data() {
			return {
				mainStyle: getApp().globalData.mainStyle,
				loading: true,
				currentIndex: '',
				isBackBorder: false,
				showMoney: true,
				show: false,
				// 自定义金额
				inputVal: '',
				IncomeList: [],
				// 余额
				Balance: 0,
				submitMoney: '',
				searchFocus: false,
				btnLoading: false,
				testData: {},//微信支付接收
				MyCard:{}
			}
		},
		async created() {
			await this.getList()
		},
		mounted() {},
		updated() {
			if (this.showMoney === false && this.$refs.moneyInput) {
				//自动获取光标
				this.searchFocus = true
			}
		},
		methods: {
			async getList() {
				this.loading = true
				try {
					let data = await vipCard({
						Action: 'GetIncomeList'
					}, 'UCardTransOpera')
					if(data.Data.MyCard){
						this.MyCard = data.Data.MyCard
					}else{
						this.$Router.push({path:'/pages/vip/bind/index'})
					}
					this.IncomeList = data.Data.IncomeList || []
					this.loading = false
				} catch (e) {
					this.loading = false
				}
			},
			showPopup(i) {
				this.showMoney = true
				this.$refs.popup.open()
				this.show = true
				this.currentIndex = i
			},
			customMoney() {
				this.showMoney = false
			},
			blurInput() {
				if (!this.inputVal) {
					this.showMoney = true
				}
			},
			async clickSubmit(bool) {
				let currentStore = JSON.parse(localStorage.getItem('currentStoreInfo'));
				let customMoney = '' // 是否是自定义金额  1=>是  0=>不是
				let obj = {}

				if (bool) {
					this.submitMoney = this.inputVal
					customMoney = 1
					this.showMoney = false
				} else {
					customMoney = 0
					obj = this.IncomeList[this.currentIndex]
					if (this.IncomeList[this.currentIndex]) {
						this.submitMoney = this.IncomeList[this.currentIndex].IncomeAmt
					}
					this.showMoney = true
				}
				if (!this.submitMoney) {
					uni.showToast({
						title: '请选择充值方案',
						duration: 2000,
						icon:'none'
					})
					return
				}
				try {
					Object.assign(obj, {
						Action: 'CardRecharge',
						ShopSID:currentStore.data.SID
					})
					Object.assign(obj, {
						Type: customMoney
					})
					Object.assign(obj, {
						PayAmt: this.submitMoney
					})
					this.btnLoading = true
					let Data = await vipCard(obj, 'UCardTransOpera')
					this.testData = Data;
					try {
						weChatPayment(this, this.testData.Data, false);
					} catch (e) {
						that.$toast.fail(e);
						this.loading = false;
						uni.hideLoading();
					}

					this.btnLoading = false
				} catch (e) {
					this.btnLoading = false
				}
			},
			changePopup(e) {
				if (!e.show) {
					this.show = false
				}
			},
			clickGo(){
				this.$Router.push('/pages/home')
			}
		},
		watch: {
			// show(val) {
			// 	this.showMoney = true
			// 	this.inputVal = val ? '' : this.inputVal
			// }
		}
	}
</script>

<style scoped lang="less">
	@import '../../assets/css/weiFull';

	.weiFull {
		margin-bottom: 62px;

		.popup-income {
			background-color: #fff;
			padding-bottom: 10px;
		}

		.titleDialog {
			display: inline-block;
			width: 100%;
			height: 50px;
			line-height: 50px;
			text-align: center;
			border: 1px solid #eee;
		}

		.contentDialog {
			margin: 10px;
			word-wrap: break-word;
			word-break: normal;
			background: #eeeeee;
			padding: 10px 20px;
			border-radius: 20px;

			ol {
				list-style-type: none;
				counter-reset: sectioncounter;

				li:first-child {
					margin-top: 15px;
				}

				li:before {
					content: counter(sectioncounter) "、";
					counter-increment: sectioncounter;
				}
			}

			span:first-child {
				display: inline-block;
				font-weight: bold;
			}
		}
	}

	.weiFullCenter {
		padding: 10px;

		.backColor {
			.moneyInput {
				display: flex;
				align-items: center;

				input {
					background: transparent !important;
				}
			}
		}

		.row-div:nth-of-type(2n) {
			.weiFullBox {
				margin-left: 20rpx;
			}
		}

		.weiFullBox {
			cursor: pointer;
			border-radius: 10px;
			box-shadow: 1px 1px 3px 3px #e0e0e0;
			border: 1px solid #fff;
			height: 80px;
			margin-bottom: 10px;
			padding: 0 20px;

			.moneyTopCustom {
				font-size: 16px;
				line-height: 82px;
				font-weight: bold;
			}

			.moneyInput {
				line-height: 82px;

				input {
					background: #f9f9f9;
				}
			}

			.symbolMark {
				font-size: 14px;
				margin-right: 5px;
			}

			.customInput {
				width: 78%;
				height: 30px;
				font-size: 20px;
				font-weight: bold;
				border: none;
				outline: none;
			}

			.moneyTop {
				display: inline-block;
				font-size: 20px;
				font-weight: bold;
				margin-top: 20px;
				line-height: 18px;
			}

			.moneyBottom {
				display: inline-block;
				margin-top: 4px;
				width: 90%;
				/*加省略号*/
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				font-size: 14px;
				color: rgb(102, 102, 102);
			}

			.amountBoxImg {
				width: 100%;
				height: 100%;
				border-radius: 10px;
			}
		}

		.van-col:nth-child(2n) .weiFullBox {
			margin-left: 5px;
		}

		.van-col:nth-child(2n-1) .weiFullBox {
			margin-right: 5px;
		}

		.van-col {
			background: #f9f9f9;
		}
	}
</style>
