<template>
	<!-- 会员提现 -->
	<view>
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickGo" title="提现" :status-bar="true" :shadow="false"></uni-nav-bar>
		<div class="Cash-out">
			<div class="box">
				<p class="money">￥{{countMoney}}</p>
				<p class="tips">可提现金额</p>
			</div>
			<p class="IsTix">提现金额</p>
			<div class="lineBottom">
				<strong>￥</strong>
				<input type="text" placeholder="最低可提现1元" v-model="money">
				<button size="mini" class="btnAll" @click="allMoney">全部</button>
			</div>
		</div>
		<div class="btnBox">
				<button @click="btnApply">提现申请</button>
			</div>
		<!-- <div class="Cash-out"> -->

		<!-- <p class="CashP1">￥{{countMoney}}</p>
			<p class="CashP2">可提现金额</p> -->
		<!-- <div class="box">
			      <p class="box1">提现金额</p>
			      <p class="box2">
					<span>￥</span>
					<input id="cashInput" class="uni-input" focus placeholder="最低可提现1元,最高五万" v-model="money"/></p>
					<button :size="mini">修改</button>
			</div> -->
		<!-- <p>
				￥<input id="cashInput" class="uni-input" focus placeholder="最低可提现1元,最高五万" v-model="money"/>
				<button class="mini-btn" type="primary" size="mini" @click="allMoney">全部</button>
			</p> -->
		<!-- <div class="box">
			      <p class="box1">到账支付宝</p>
			      <p class="box2"><input class="uni-input" focus placeholder="请填写支付宝账号" v-model="applyNum"/></p>
			      <p class="box3"><button>修改</button></p>
			</div> -->
		<!-- <div class="btnBox">
				<button @click="btnApply">提现申请</button>
			</div>
		</div> -->
	</view>
</template>

<script>
	import {
		vipCard
	} from '@/api/http.js'
	export default {
		name: 'rebate',
		data() {
			return {
				money: '',
				applyNum: '102454455@11',
				countMoney: this.$Route.query.CountMoney, //可提现的金额
			}
		},
		methods: {
			// 返回
			clickGo() {
				this.$Router.pushTab({
					path: "/pages/vip/myEarnings"
				});
			},
			// 点击全部
			allMoney() {
				this.money = this.countMoney
			},
			// 申请提现
			async btnApply() {
				this.loading = true;
				// if (this.AlipayAccount === '') {
				// 	console.log(this.AlipayAccount)
				// 	return alert("请输入支付宝账号")
				// }
				try {
					let data = await vipCard({
						Action: "SubRebate",
						Money: this.money
					}, "UMemberOpera");
					// this.$message.success("操作成功");
					this.loading = false;
				} catch (e) {
					// this.$message.error(typeof e == "string" ? e : "请求失败，请重试");
					this.loading = false;
				}
			},
		}
	}
</script>

<style lang="less">
	.Cash-out {
		background-color: #fff;
		margin: 10px;
		border-radius: 10px;
		padding-bottom: 20px;
		.box {
			height: 100px;
			background-color: #cecece;
			text-align: center;
			
			.money {
				font-size: 26px;
				font-weight: 800;
				padding-top: 22px;
			}

			.tips {
				font-size: 16;
			}
		}
		.IsTix{
			margin: 10px;
			font-size: 16px;
		}

		.lineBottom {
			border-bottom: 1px solid #cfcfcf;
			margin: 10px;
			.btnAll {
				border: 0;
			}
			input{
				width: 240px;
				display: inline-block;
				padding-left: 10px;
			}
			strong{
				font-size: 20px;
			}
		}
	}
	.btnBox{
		width: 352px;
		margin: 0 auto;
		button{
			background-color: #FFFFFF;
		}
	}
</style>
