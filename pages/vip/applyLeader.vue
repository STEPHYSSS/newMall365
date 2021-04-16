<template>
	<div class="applyLeader">
		<!-- <uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickGo" :title="title" :status-bar="true" :shadow="false"></uni-nav-bar> -->
		<view class="topBox">
			<view class="infoBox">
				<img :src="UserInfo.Headimgurl?UserInfo.Headimgurl:ImgUrl" mode=""></img>
				<view style="font-size: 14px;">{{UserInfo.NickName}}</view>
			</view>
		</view>
		<div class="leaderBox" >
			<view class="myFanIcon">
				<image :src="cardIcon" style="width: 20px;height: 20px;"></image>
				<text style="width: 100px;">卡号</text>
				<text class="infoRight">{{UserInfo.CardNo}}</text>
			</view>
			<view class="myFanIcon" v-if="leaderInfo.Audit">
				<image :src="checkIcon" style="width: 20px;height: 20px;"></image>
				<text style="width: 100px;">审核状态</text>
				<text class="infoRight" v-if="leaderInfo.Audit == '1'" style="color: #00CC33;">通过</text>
				<text class="infoRight" v-else style="color: #ff0000;">待审核</text>
			</view>
			<view class="myFanIcon">
				<image :src="zhifubaoIcon" style="width: 20px;height: 20px;"></image>
				<text style="width: 100px;">支付宝账号</text>
				<view class="infoRight"><input id="allPay" maxlength="50" type="number" v-model="AlipayAccount"></input></view>
			</view>
			<view class="myFanIcon">
				<image :src="phoneIcon" style="width: 20px;height: 20px;"></image>
				<text style="width: 100px;">手机号</text>
				<view class="infoRight"><input id="allPay" type="number" @blur="blur1(Mobile)" maxlength="11" v-model="Mobile"></input></view>
			</view>
			<view class="flexbottom">
				<view class="shengqing" @click="btnApply">{{msg}}</view>
			</view>
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
				ImgUrl: require("@/static/img/defaultPhoto.png"),
				imgUrl:require("@/static/img/myFanIcon.png"),
				cardIcon:require("@/static/img/cardIcon.png"),//卡号
				zhifubaoIcon:require("@/static/img/zhifubaoIcon.png"),//支付宝
				checkIcon:require("@/static/img/checkIcon.png"),//审核
				phoneIcon:require("@/static/img/phoneIcon.png"),//手机号
				loading: true,
				leaderInfo:{},
				UserInfo:{},//用户基本信息
				AlipayAccount:'',//支付宝账号
				Mobile:'',//手机号
				title:'',
				msg:'申请团长'
			}
		},
		activated(){
			this.getList();
		},
		created(){			
			this.getList();
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
					this.UserInfo = data.Data.UserInfo;
					this.msg = this.leaderInfo.Audit?"更新团长":'申请团长'	
					this.AlipayAccount = this.leaderInfo.AlipayAccount;
					this.Mobile = this.leaderInfo.Mobile;
					this.loading = false;
				} catch (e) {
					this.loading = false;
				}
			},
			// 申请团长
			async btnApply(){
				this.loading = true;
				if(this.AlipayAccount === ''){
					return alert("请输入支付宝账号")
				}
				try {
					let data = await vipCard({
						Action: "ApplyLeader",
						AlipayAccount:this.AlipayAccount,
						Mobile:this.Mobile
					}, "UMemberOpera");
					if(this.msg =='更新团长'){						
						this.$toast('更新成功');
					}else{
						this.$toast('申请成功');
					}
					const timer = setTimeout(() => {
					    clearTimeout(timer);
							this.getList();
							// this.$Router.pushTab({path: "/pages/home"});
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
			},
			blur1(val){
				if (val !== '') {
				  var reg=/^1[3456789]\d{9}$/;
				  if(!reg.test(val)){
					  this.$toast("请输入有效的手机号码")
					// callback(new Error('请输入有效的手机号码'));
				  }
				}
			}
		},
	}
</script>

<style scoped lang="less">
	.applyLeader{
		.topBox{
			height: 200px;
			background-size: 100% 100%;
			background-image: url(@/static/img/btCenter.jpg);
			.infoBox{
				letter-spacing: 2px;
				color: #FFFDEF;
				text-align: center;
				padding-top: 18px;
				width: 90px;
				margin: 0 auto;
				img{
					width: 90px;
					height: 90px;
					border-radius: 50%;
					margin-bottom: 3px;
				}
			}
		}
		.leaderBox{
			height: calc(100vh - 200px);
			background-color: #F0F0F0;
			.myFanIcon{
				height: 55px;
				display: flex;
				border-bottom: 1px solid #d3dae4;
				image{
					display: inline-block;
					margin: 17px 5px 15px 10px;
				}
				text{
					display:inline-block;
					font-size: 16px;
					letter-spacing: 1px;
					margin: 16px 0;
				}
				.infoRight{
					display: inline-block;
					text-align: right;
					flex: 1;
					margin-right: 6%;
					box-sizing: border-box;
					#allPay{
						width: 100%;
						background-color: #fff;
						text-align: left;
						border-radius: 5px;
						height: 36px;
						margin-top: 10px;
						padding-left: 10px;
					}
				}
			}
			.flexbottom{
				position: fixed;bottom: 0;height: 55px;background-color: #ADB838;width: 100%;
				.shengqing{
					width: 175px;
					margin: 0 auto;
					text-align: center;
					font-size: 16px;
					color: #FF7C92;
					background: #fff;
					border-radius: 20px;
					padding: 8px 0;
					margin-top: 9px;
					letter-spacing: 2px;
					box-shadow: 0px 0px 1px 1px #ccc;
				}
			}
			span{
				display: inline-block;
				position: absolute;
				left: 13px;
				top: 22px;
				color: rgb(94, 94, 94);
			}
			// #allPay{
			// 	width: 260px;
			// 	padding: 7px 0 7px 5px;
			// 	margin-left: 5px;
			// 	display: inline-block;
			// 	border: 1px solid #f7f7f7;
			// }
			button{
				    background: #fff;
				    margin-top: 30px;
			}
		}
	}
</style>
