<template>
	<div :class="['container','js-modal-login',classHome]">
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickGo" title="微卡支付" :status-bar="true" :shadow="false"></uni-nav-bar>
		<!-- <van-loading type="spinner" class="vanLoading" v-if="loading" /> -->
		<!--        <form>-->
		<div class="content account-form bind-taobao">
			<div class="form-title big"></div>
			<div class="block block-form margin-bottom-normal">
				<div class="block-item">
					<div class="label" style="text-indent:10px;">微卡余额</div>
					<span type="digit" style="padding-left:10px;" :value="Balance" name="balance" disabled="true">{{Balance}}</span>
				</div>
				<div class="block-item" v-if="Score">
					<div class="label" style="text-indent:10px;">积分余额</div>
					<span type="digit" style="padding-left:10px;" :value="Score" name="payScore" disabled="true">{{Score}}</span>
				</div>
				<div class="block-item">
					<div class="label" style="text-indent:10px;">本次支付</div>
					<span style="padding-left:10px;">{{total}}</span>
					<!-- <input type="digit" style="padding-left:10px;" :value="total" name="payedAmt" disabled="true" /> -->
				</div>
				<!--                    <div class='block-item' v-if="dataInfo.CardCashFloat&&dataInfo.CardCashFloat>0">-->
				<!--                        <div class='label' style="text-indent:10px;">卡优惠</div>-->
				<!--                        <input type='digit' style="padding-left:10px;" :value='dataInfo.CardCashFloat' name="payedAmt"-->
				<!--                               disabled="true"/>-->
				<!--                    </div>-->

				<div class="block-item" v-if="IsPass==='1'">
					<div class="label" style="text-indent:10px;">微卡密码</div>
					<input type="password" style="padding-left:10px;" placeholder="请输入密码" name="password" v-model="password" />
				</div>
			</div>
			<div class="button-theme-big">
				<button @click="OrderCardPay" :disabled="loading" class="btn-pay btn btn-block btn-large btn-codpay">确认支付</button>
			</div>
		</div>
		<!--        </form>-->
	</div>
</template>

<script>
	// import headNav from "@/components/headNav";
	import {
		vipCard
	} from "@/api/http.js";

	export default {
		name: "index",
		components: {},
		data() {
			return {
				classHome: getApp().globalData.mainStyle,
				Balance: "",
				total: "",
				password: "",
				loading: false,
				Score: "",
				IsPass: "",
				OrderType:''
			};
		},
		created() {
			// console.log(this.$Route.query,'454545')
			// console.log(this.$Router,'confirm')
			if (uni.getStorageSync('alreadyPaid')) {
				//支付过，订单已经形成
				this.$Router.push(this.$store.state.historyUrl)
				return;
			}
			uni.removeStorageSync("alreadyPaid");
			this.PayNo = this.$Route.query.PayNo;
			this.Balance = this.$Route.query.Balance;
			this.Score = this.$Route.query.Score || "";
			this.OrderType=this.$Route.query.OrderType;
			this.PayScore = Number(this.$Route.query.PayScore) || "";
			if (this.PayScore&&this.PayScore>0) {
				this.total =
					this.PayScore +
					"积分" +
					(this.$Route.query.total > 0 ? "+¥" + this.$Route.query.total : "");
			} else {
				this.total = "¥" + this.$Route.query.total;
			}
			this.sid = this.$Route.query.sid || false;
			this.IsPass = this.$Route.query.hasOwnProperty("IsPass") ?
				this.$Route.query.IsPass :
				false;
		},
		onShow(){
			if (uni.getStorageSync('alreadyPaid')) {
				//支付过，订单已经形成
				this.$Router.push(this.$store.state.historyUrl)
				return;
			}
		},
		methods: {
			async OrderCardPay(e) {
				if (Number(this.Balance) < Number(this.total)) {
					this.$toast("卡余额不足");
					return;
				}
				if (this.password === "" && this.IsPass === "1") {
					this.$toast("请填写密码");
					return;
				}
				this.loading = true;
				let obj = {
					Action: "CartPay",
					PayNo: this.PayNo,
					PassWord: this.password,
					OrderType:this.$Route.query.OrderType
				};
				try {
					let Opera = this.PayScore ? "UIntOrderOpera" : "UOrderOpera";
					let {
						Data
					} = await vipCard(obj, Opera);
					uni.setStorageSync('alreadyPaid', true)
					this.$toast.success("支付成功");
					setTimeout(() => {
						this.$Router.push("/pages/shoppingMall/order/paySuccess");
					}, 600);
				} catch (e) {
					uni.setStorageSync('alreadyPaid', true)
					// setTimeout(() => {
					// 	this.$Router.push({
					// 		path: "/pages/shoppingMall/order/paySuccess",
					// 		query: {
					// 			error: "error"
					// 		}
					// 	});
					// }, 2000);
					this.loading = false;
				}
			},
			clickGo() {
				if (this.sid) {
					this.$Router.push({
						path: "/pages/shoppingMall/order/orderInfo",
						query: {
							order_id: this.sid
						}
					});
				} else {
					// window.history.go(-1);
					this.$Router.back(2)
					// uni.navigateBack()
					// this.$Router.push(this.$store.state.historyUrl)
				}
			}
		},
		watch: {
			$Router(to, from) {
				console.log(to.path);
			}
		}
	};
</script>

<style scoped>
	button {
		height: auto;
	}

	.content {
		width: 100%;
		margin: 0 auto;
	}

	.account-form {
		overflow: hidden;
	}

	.container .content {
		zoom: 1;
	}

	.account-form .form-title {
		margin: 50px 0 10px;
		padding: 0 12px;
		line-height: 24px;
		font-size: 14px;
		color: #7c7b83;
		text-transform: uppercase;
		text-shadow: 0 1px rgba(255, 255, 255, 0.2);
	}

	.account-form .big {
		font-size: 20px;
		text-align: center;
		color: #7c7b83;
	}

	.block {
		overflow: hidden;
		-webkit-border-image: url(http://wxd.bak365.net/wxcs/MobileHtml/PrePur5/img/border-line-2.png) 2 stretch;
		-moz-border-image: url(http://wxd.bak365.net/wxcs/MobileHtml/PrePur5/img/border-line-2.png) 2 stretch;
		border-image: url(http://wxd.bak365.net/wxcs/MobileHtml/PrePur5/img/border-line-2.png) 2 stretch;
		border-top: 2px solid #e5e5e5;
		border-bottom: 2px solid #e5e5e5;
		margin: 10px 0;
		background-color: #fff;
		display: block;
		position: relative;
		font-size: 14px;
	}

	.block {
		border-top-width: 1px;
		border-bottom-width: 1px;
	}

	.block.block-form {
		width: 100%;
		margin: 0;
		padding: 0;
		padding-left: 10px;
		padding-right: 10px;
		list-style: none;
		font-size: 14px;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	.block.block-form.margin-bottom-normal {
		margin-bottom: 20px;
	}

	.block-item {
		position: relative;
		display: block;
		padding: 10px;
		line-height: 22px;
		border: 0px none;
		-webkit-border-image: url(http://wxd.bak365.net/wxcs/MobileHtml/PrePur5/img/border-line.png) 2 stretch;
		-moz-border-image: url(http://wxd.bak365.net/wxcs/MobileHtml/PrePur5/img/border-line.png) 2 stretch;
		border-image: url(http://wxd.bak365.net/wxcs/MobileHtml/PrePur5/img/border-line.png) 2 stretch;
		border-bottom: 2px solid #e5e5e5;
		overflow: hidden;
	}

	.block.block-form .block-item {
		display: table;
		width: 100%;
		padding: 0;
	}

	.block.block-form .block-item:last-child {
		border-bottom: 0px none;
	}

	.block.block-form .block-item .label {
		display: table-cell;
		width: 90px;
		padding: 10px 0;
		vertical-align: middle;
	}

	.block.block-form .block-item textarea,
	.block.block-form .block-item input,
	.block.block-form .block-item select,
	.block.block-form .block-item a,
	.block.block-form .block-item span {
		display: table-cell;
		overflow: hidden;
		padding: 10px 0;
		min-height: 28px;
		line-height: 28px;
		font-size: 14px;
	}

	.block.block-form .block-item textarea,
	.block.block-form .block-item input,
	.block.block-form .block-item select {
		background-color: #fff;
		border: 0px none;
		outline: none;
	}

	.action-container {
		padding: 0 10px;
		text-align: center;
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.account-form button {
		border: 1px solid #e5e5e5;
	}

	.btn.btn-green {
		color: #fff;
		background-color: #06bf04;
		border-color: #03b401;
	}

	.btn.btn-block {
		color: #fff;
		text-align: center;
		padding: 11px 10px;
		font-size: 16px;
		line-height: 16px;
		border-radius: 4px;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
</style>
