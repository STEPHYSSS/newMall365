<template>
	<!-- 会员提现 -->
	<view>
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickGo" title="我的收益" :status-bar="true" :shadow="false"></uni-nav-bar>		
		<div class="Mybox">
			<p>账户余额（元）</p>
			<div class="money">
				<p class="left">￥{{moneyCount.SumMoney}}</p>
				<p class="right">
					<button class="mini-btn" type="primary" @click="btn" size="mini">提现</button>
				</p>
			</div>
		</div>
	</view>
</template>

<script>
	import {vipCard} from '@/api/http.js'
	export default {
		name: "myEarnings",
		data() {
			return {
				moneyCount:{},
				loading: true,
			}
		},
		// async onLoad(option) {
		// 	await this.getList();
		// },
		created(){
			this.getList()
		},
		methods: {
			// 列表信息
			async getList() {
				this.loading = true;
				try {
					let data = await vipCard({
						Action: "GetIncome"
					}, "UMemberOpera");
					this.moneyCount = data.Data; 
					this.loading = false;
				} catch (e) {
					this.loading = false;
				}
			},
			// 返回
			clickGo() {
				this.$Router.pushTab({
					path: "/pages/vip/SpreadOrder"
				});
			},
			btn(){
				this.$Router.push({path:'/pages/vip/rebate',query:{
					CountMoney:this.moneyCount.SumMoney
				}})
			}
		}
	}
</script>

<style lang="less">
	.Mybox{
		height: 150px;
		background-color: #fdfae1;
		p{
			font-size: 15px;
		}
		.money{
			display: flex;
			.left{
				flex: 1;
				background-color: orange;
			}.right{
				flex: 1;
				background-color: pink;
				button{
					width: 120px;
					border-radius: 25px;
					border: 0;
					background-color: #000000;
					color: #FFFFFF;
				}
			}
		}
	}
</style>
