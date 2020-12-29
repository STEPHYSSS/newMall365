<template>
	<div class="applyLeader">
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickGo" :title="title" :status-bar="true" :shadow="false"></uni-nav-bar>
		<div class="leaderBox" >
			<adCell text="头 像"><img :src="leaderInfo.Img" mode=""></img></adCell>
			<!-- 卡号  头像 名称 审核状态默认未审核 -->
			<adCell text="名 字">{{leaderInfo.Name}}</adCell>
			<adCell text="卡 号">{{leaderInfo.CardNo}}</adCell>
			<adCell text="审核状态" v-if="leaderInfo.Audit == '1'" style="color: #00CC33;">通过</adCell>
			<adCell text="审核状态" v-else style="color: #ff0000;">未通过</adCell>
			<adCell v-if="leaderInfo.Audit == '0'"><p><span>支付宝账号</span><input id="allPay" maxlength="50" v-model="AlipayAccount"></input></p></adCell>			
			<div class="btnBox">
				<button @click="btnApply" v-if="leaderInfo.Audit == '0'">申请团长</button>
			</div>
		</div>
		
	</div>
</template>

<script>
	import {vipCard} from '@/api/http.js'
	import adCell from '@/node_modules/adcell/ADCell2.vue';
	export default {
		name: "applyLeader",
		components: {
			adCell
		},
		data() {
			return {
				loading: true,
				leaderInfo:{},
				AlipayAccount:'',//支付宝账号
				title:''
			}
		},
		async onLoad(option) {
			await this.getList();
			if(this.leaderInfo.Audit == '0'){
				this.title = '申请团长'
			}else{
				this.title = '团长信息'
				uni.setNavigationBarTitle({
				    title: '团长信息'
				});
			}
		},
		
		methods: {
			// 列表信息
			async getList() {
				this.loading = true;
				try {
					let data = await vipCard({
						Action: "GetLeader"
					}, "UMemberOpera");
					this.leaderInfo = data.Data.Leader;
					this.loading = false;
				} catch (e) {
					this.loading = false;
				}
			},
			// 申请团长
			async btnApply(){
				this.loading = true;
				if(this.AlipayAccount === ''){
					console.log(this.AlipayAccount)
					return alert("请输入支付宝账号")
				}
				try {
					let data = await vipCard({
						Action: "ApplyLeader",
						AlipayAccount:this.AlipayAccount
					}, "UMemberOpera");
					this.$toast('申请成功');
					const timer = setTimeout(() => {
					    clearTimeout(timer);
							this.$Router.pushTab({path: "/pages/home"});
					    }, 1000);
					this.loading = false;
				} catch (e) {
					// this.$message.error(typeof e == "string" ? e : "请求失败，请重试");
					this.loading = false;
				}
			},
			// 返回
			clickGo() {
				this.$Router.pushTab({
					path: "/pages/home"
				});
			}
		},
	}
</script>
haod
<style scoped lang="less">
	.applyLeader{
		.leaderBox{
			height: 45px;
			img{
				width: 45px;
				height: 45px;
				border-radius: 5px;
				float: right;
			}
			span{
				display: inline-block;
				position: absolute;
				left: 13px;
				top: 22px;
				color: rgb(94, 94, 94);
			}
			#allPay{
				width: 270px;
				padding: 7px 0 7px 5px;
				margin-left: 5px;
				display: inline-block;
				border: 1px solid #f7f7f7;
			}
			button{
				    background: #fff;
				    margin-top: 30px;
			}
		}
	}
</style>
