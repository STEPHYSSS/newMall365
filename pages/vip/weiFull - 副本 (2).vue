<template>
	<div class="weiFull" :class="mainStyle">
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickGo" title="微卡充值" :status-bar="true" :shadow="false"></uni-nav-bar>
		<!--  -->
		<div class="surplusTop" :style="{background:`url(${CardImg})`}" v-if="!loading || MyCard.length>0">
			<div class="imgFlex">
				<image :src="UserPhoto"></image>
				<p class="marFlex">
					{{MyCard.CardNo}}
					<span>{{CardBase.Name}}</span>
				</p>
			</div>
			<p class="word">账户余额（元）</p>
			<div class="imgFlex">
				<div class="flexLeft">					
					<span>{{MyCard.Balance}}</span>
				</div>
				<div class="flexright">
					<span>积分</span>
					<p>{{MyCard.Score}}</p>
				</div>
			</div>
		</div>
		<div class="leaderBox" v-if="IncomeList.length>0">
			<uni-grid :column="3">
			    <uni-grid-item class="Imglist" v-for="(item,index) in IncomeList" :key="index" style="height: 65px;">
			        <div @click="showPopup(index)" :class="{weiFullBox:true,backColor:index === currentIndex&&show,backBorder:index === currentIndex&&show}" v-if="item.IncomeName !='自定义充值'">
						<p><span style="display: inline-block;font-size: 14px;">¥&nbsp;</span><span>{{item.IncomeAmt}}</span></p>
						<p >{{item.IncomeName}}</p>
					</div>
			    </uni-grid-item>
				<div class="Imglist2">
					<div :class={weiFullBox:true,backColor:!showMoney,backBorder:!showMoney} @click="customMoney">
						<div style="text-align: center;line-height: 60px;font-size: 16px;" v-if="showMoney">自定义金额</div>
						<div v-if="!showMoney" style="display: flex;margin-top: 20px">
							<span style="width: 20px;text-align: center;font-size: 15px;">¥</span>
							<input v-model="inputVal" ref="moneyInput" :focus="searchFocus" style="flex: 1;height: 20px;" type="text" autofocus="autofocus" 
							 @blur="blurInput" maxlength="5">
							<!-- <span style="font-size: 15px;position: absolute;left: 6px;top: 17px;">¥</span>
							 -->
						</div>
					</div>
				</div>
				<!-- <div class="Imglist" style="line-height: 60px;"  v-if="IsOpenRecharge=='1'">
					<p @click="customMoney">
						<span style="font-size: 16px;padding: 0;" v-show="hideMoney">自定义充值</span>
						<span style="font-size: 16px;padding: 0;" v-show="showMoneydd">
							¥<input style="display: inline-block;width: 73%;font-size: 24px;" maxlength="5" v-model="inputVal" ref="moneyInput" :focus="searchFocus" type="number" autofocus="autofocus"@blur="blurInput">
						</span>
					</p>
				</div>			 -->	
			</uni-grid>						
		</div>
		<div class="btnfixedBottom" v-if="!loading">
			<button :disabled="btnLoading" class="buttonPage" type="redRaduis" @click="clickSubmit(true)" :loading="btnLoading">充值</button>
		</div>
		<uni-popup type="bottom" ref="popup" @change="changePopup">
			<div class="popup-income">
				<div style="height: 223px;">
					<div v-if="IncomeList[currentIndex]" style="padding: 15px 0 20px 15px;border-bottom: 1px solid #cccccc;font-size: 16px;letter-spacing: 1px;margin-bottom: 10px;">
						<p style="display: inline-block;width: 50%;">充值送好礼</p>
						<p style="display: inline-block;width: 50%;text-align: center;">充值金额<span style="font-weight: 800;font-size: 20px;padding: 0 5px;">{{IncomeList[currentIndex].IncomeAmt}}</span>元</p>
					</div>
					<div style="width: 92%;margin: 0 auto;" v-if="IncomeList[currentIndex]">
						<p v-if="Number(IncomeList[currentIndex].DonateAmt)">
							<span style="display: inline-block;width: 12px;height: 12px;border-radius: 50%;border: 1px solid #B2C119;"></span>
							<span style="font-size: 16px;padding-left: 8px;">赠送金额：<span style="font-size: 16px;color: #B2C119;font-weight: 800;">{{IncomeList[currentIndex].DonateAmt}}元</span></span>
						</p>
						<p v-if="Number(IncomeList[currentIndex].DonateMonth)">
							<span style="display: inline-block;width: 12px;height: 12px;border-radius: 50%;border: 1px solid #B2C119;"></span>
							<span style="font-size: 16px;padding-left: 8px;">赠送分月返还：<span style="font-size: 16px;color: #B2C119;font-weight: 800;">{{IncomeList[currentIndex].DonateMonth}}元</span></span>
						</p>
						<p v-if="Number(IncomeList[currentIndex].DonateScore)">
							<span style="display: inline-block;width: 12px;height: 12px;border-radius: 50%;border: 1px solid #B2C119;"></span>
							<span style="font-size: 16px;padding-left: 8px;">赠送积分：<span style="font-size: 16px;color: #B2C119;font-weight: 800;">{{IncomeList[currentIndex].DonateScore}}元</span></span>
						</p>
						<p v-if="Number(IncomeList[currentIndex].DonateProd)">
							<span style="display: inline-block;width: 12px;height: 12px;border-radius: 50%;border: 1px solid #B2C119;"></span>
							<span style="font-size: 16px;padding-left: 8px;">赠送商品：<span style="font-size: 16px;color: #B2C119;font-weight: 800;">{{IncomeList[currentIndex].DonateProd}}元</span></span>
						</p>
					</div>
				</div>
				<div class="button-theme-big">
					<button :disabled="btnLoading" @click="clickSubmit(false)">立即充值</button>
				</div>
			</div>
		</uni-popup>
		<!-- <uni-popup type="bottom" ref="popup" @change="changePopup">
			<div class="popup-income">
				<div v-if="IncomeList[currentIndex]" style="padding: 15px 0 20px 15px;border-bottom: 1px solid #cccccc;font-size: 16px;letter-spacing: 1px;margin-bottom: 10px;">
					<p style="display: inline-block;width: 50%;">充值送好礼</p>
					<p style="display: inline-block;width: 50%;text-align: center;">充值金额<span style="font-weight: 800;font-size: 20px;padding: 0 5px;">{{IncomeList[currentIndex].IncomeAmt}}</span>元</p>
				</div>
				<div style="width: 92%;margin: 0 auto;" v-if="IncomeList[currentIndex]">
					<p v-if="Number(IncomeList[currentIndex].DonateAmt)">
						<span style="display: inline-block;width: 12px;height: 12px;border-radius: 50%;border: 1px solid #B2C119;"></span>
						<span style="font-size: 16px;padding-left: 8px;">赠送金额：<span style="font-size: 16px;color: #B2C119;font-weight: 800;">{{IncomeList[currentIndex].DonateAmt}}元</span></span>
					</p>
					<p v-if="Number(IncomeList[currentIndex].DonateMonth)">
						<span style="display: inline-block;width: 12px;height: 12px;border-radius: 50%;border: 1px solid #B2C119;"></span>
						<span style="font-size: 16px;padding-left: 8px;">赠送分月返还：<span style="font-size: 16px;color: #B2C119;font-weight: 800;">{{IncomeList[currentIndex].DonateMonth}}元</span></span>
					</p>
					<p v-if="Number(IncomeList[currentIndex].DonateScore)">
						<span style="display: inline-block;width: 12px;height: 12px;border-radius: 50%;border: 1px solid #B2C119;"></span>
						<span style="font-size: 16px;padding-left: 8px;">赠送积分：<span style="font-size: 16px;color: #B2C119;font-weight: 800;">{{IncomeList[currentIndex].DonateScore}}元</span></span>
					</p>
					<p v-if="Number(IncomeList[currentIndex].DonateProd)">
						<span style="display: inline-block;width: 12px;height: 12px;border-radius: 50%;border: 1px solid #B2C119;"></span>
						<span style="font-size: 16px;padding-left: 8px;">赠送商品：<span style="font-size: 16px;color: #B2C119;font-weight: 800;">{{IncomeList[currentIndex].DonateProd}}元</span></span>
					</p>
				</div>
			</div>
			
		</uni-popup> -->
		<!-- <div class="weiFullCenter" v-if="!loading">
			<div style="display: flex; flex-wrap:wrap">
				<div style="width:32%" v-for="(item,index) in IncomeList" :key="index" class="row-div">
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
		</div> -->
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
		setUrlDelCode,
		GetBaseImgUrl
	} from "@/util/publicFunction";
	export default {
		components: {},
		name: "WeiFull",
		data() {
			return {
				hideMoney:true,
				showMoneydd:false,
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
				MyCard:{},
				UserPhoto:'',
				CardBase:{},
				CardImg:"",
				IsOpenRecharge:''
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
					if(data.Data.CardBase){
						this.CardBase = data.Data.CardBase;
						this.CardImg = GetBaseImgUrl() +this.CardBase.CardImg
					}
					if(data.Data.MyCard){
						this.MyCard = data.Data.MyCard
						this.UserPhoto =data.Data.Img;
					}else{
						this.$Router.push({path:'/pages/vip/bind/index'})
					}
					this.IsOpenRecharge = data.Data.ShopBase.IsOpenRecharge;
					// if(IsOpenRecharge == '1'){
					// 	let auto={
					// 		IncomeName:'自定义充值'
					// 	}
					// 	this.IncomeList = data.Data.IncomeList || []
					// 	this.IncomeList.push(auto)
					// }else{
						this.IncomeList = data.Data.IncomeList || []
					// }
					this.loading = false
				} catch (e) {
					this.loading = false
				}
			},
			showPopup(i) {
				this.showMoney = true;
				this.$refs.popup.open()
				this.show = true
				this.currentIndex = i
			},
			customMoney() {
				this.showMoney = false
			},
			blurInput() {
				if (!this.inputVal) {
					this.showMoney = true;
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
		// margin-bottom: 62px;
		height: 100vh;
		background-color: #fff;
		.popup-income {
			// height: 300px;
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
	.surplusTop{
		width: 90%;
		margin: 10px auto;
		border-radius: 10px;
		background-color: orange;
		.word{
			font-size: 16px;
			box-sizing: border-box;
			margin-left: 7%;
			margin-bottom: 5px;
			color: #e5e5e5;
		}
		.imgFlex{
			display: flex;
			.flexLeft,.flexright{
				position: relative;
				flex: 1;
				margin-left:7%;
				p{
					height: 30px;
					line-height: 30px;
					font-size: 16px;
				}
			}
			.flexLeft span{
				position: absolute;
				font-size: 30px;
				font-weight: 800;
				bottom: 0;
			}
			image{
				width: 60px;
				height: 60px;
				border-radius: 50%;
				border: 1px solid rgb(255, 255, 255);
				margin: 24px;
				box-sizing: border-box;
			}
			.marFlex{
				font-size: 20px;
				line-height: 28px;
				padding-top: 24px;
				span{
					display: block;
					font-size: 14px;
				}
			}
		}
	}
	.weiFullCenter {
		width: 90%;
		margin: 10px auto;
		// border: 1px solid;
		// background-color: pink;
		.moneySty{
			border: 1px solid;
			border-radius: 5px;
			padding: 14px;
			margin: 10px;
		}
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
				border: 1px solid;
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
	
	/deep/.uni-grid-item--border-top{
		border-bottom-color: #fff;
		border-bottom-style: none;
		border-bottom-width: 0;
		border-right-color: #fff;
		border-right-style: none;
		border-right-width: 0;
		/* border-top-color: #e5e5e5; */
		/* border-top-style: solid; */
		/* border-top-width: 1px; */
	}
	/deep/.uni-grid--border{
		border-left-color: #fff;
		border-left-style: none;
		border-left-width: 0px;
	}
	/deep/.uni-grid-item--border-top{
		border-top-style: none;
		border-top-width: 0px;
	}
	/deep/.uni-grid--border{
		border:none !important;
	}
	.leaderBox{
		width: 90%;
		margin: 10px auto;
		background-color: #fff;	
		.Imglist{
			color: #939393;
			width: 28.5% !important;
			margin: 10px 7px;
			border: 1px solid #CCCCCC;
			border-radius: 5px;
			box-sizing: border-box;
			p{
				text-align: center;
			}
			span{
				display: inline-block;
				padding-left: 4px;
				font-size: 30px;
			}
		}
	}
	/deep/.uni-input-input{
		font-size: 24px;
	}
	.Imglist2{
		color: #939393;
		width: 28.5% !important;
		margin: 10px 7px;
		border: 1px solid #CCCCCC;
		border-radius: 5px;
		box-sizing: border-box;
	}
</style>
