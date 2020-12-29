<template>
	<div class="Spreadorder">
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickGo" title="我的订单推广" :status-bar="true" :shadow="false"></uni-nav-bar>		<!-- 推广商品列表 -->
		<div class="main" v-if=" ShopBase2.length>0">
			<p>今日收益 {{ToDayAmount}}</p>
			<p>本月收益 {{ToMonthAmount}}</p>
			<!-- 提现日期DrawingsDate 提现类型DrawingsType，佣金核算方式RatioWay  有效期-->
			<div v-for="(item,index) in SpreadList" :key="index">
				<p class="tips">订单编号：{{item.SID}}</p>
				<p class="tips">可提现日期：{{formatDate(ShopBase.DrawingsDate.split(',')[0], 'm-d')}} ~ {{formatDate(ShopBase.DrawingsDate.split(',')[1], 'm-d')}}</p>
				<div class="flexB">
					<span><img :src="item.Headimgurl" ></img></span>
					<p>
						<span>支付金额：{{item.PayAmt}}元</span>
						<span>支付积分：{{item.PayScore}}分</span>
						<span>支付时间：{{item.PayTime}}</span>
					</p>
				</div>				
			</div>
		</div>
		<a-nodeData stringVal="暂无数据" v-else></a-nodeData>
	
		
	</div>
</template>

<script>
	import {vipCard} from '@/api/http.js'
	import {formatDate} from '@/util/publicFunction.js'
	export default {
		name: "Spreadorder",
		data() {
			return {
				ShopBase:{},
				SpreadList:[],
				ShopBase2:{},
				ToDayAmount:'',//今日收益
				ToMonthAmount:'',//本月收益
				loading: true,
				formatDate,
			}
		},
		// async onLoad(option) {
		// 	await this.getList();
		// },
		created(){
			this.getList();
			// console.log(formatDate('2020-08-10 00:00:00', 'm-d'));
		},
		methods: {
			// 列表信息
			async getList() {
				this.loading = true;
				try {
					let data = await vipCard({
						Action: "GetSpreadOrder"
					}, "UMemberOpera");
					this.SpreadList = data.Data.SpreadList;
					this.ShopBase = data.Data.ShopBase;
					this.ShopBase2 = data;
					this.ToDayAmount = data.Data.ToDayAmount
					this.ToMonthAmount=data.Data.ToMonthAmount
					this.loading = false;
				} catch (e) {
					this.loading = false;
				}
			},
			// 返回
			clickGo() {
				this.$Router.pushTab({
					path: "/pages/home"
				});
			},
			goMyEng(SID){
				this.$Router.push('/pages/vip/myEarnings')
			}
		},
	}
</script>

<style scoped lang="less">
.Spreadorder{
	.main{
		margin: 10px 10px;
		background-color: #FFFFFF;
		font-size: 16px;
		.flexB{
			padding-top: 10px;
			display: flex;
			padding-bottom: 20px;
			span{
				width: 80px;
				display: inline-block;
				padding-left: 10px;
				img{
					width: 100%;
					height: 100%;
					border-radius: 5px;
				}
			}
			p{
				flex: 1;
				padding-right: 20px;
				span{
					width: 100%;
					display: block;
					margin: 4px 0;
				}
			}
		}
		.tips{
			padding-top: 10px;
			padding-left: 10px;
		}
	}
}
</style>
