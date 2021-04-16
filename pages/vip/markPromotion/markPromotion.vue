<template>
	<view>
		<view class="box">
			<div class="surplusTop">
				<div class="imgFlex">
					<image :src="UserInfo.Headimgurl"></image>
					<p class="marFlex" style="flex:1">
						{{UserInfo.CardNo}}
						<span>{{UserInfo.NickName}}</span>
					</p>
				</div>
			</div>
			<!-- <image src="@/static/img/btCenter.jpg"></image>s -->
			<view class="boxWhite">
				<view class="myShouyi">
					<view class="title">我的收益 （元）</view>
					<view class="shouyiFlex" style="text-align: center">
						<text class="money" style="font-size: 34px;font-weight: 700;">{{ToDayAmount}}</text>
						<text class="shouyi">今日收益</text>
					</view>
					<view class="flexBoxView">
						<view class="flexViewLeft">
							<div class="iconfont icon-shouyi1"></div>
							<view class="shouyiFlex">
								<text class="money"><strong style="font-size: 13px;">￥</strong>{{ToDayAmount}}</text>
								<text class="shouyi">当月收益（元）</text>
							</view>
						</view>
						<view class="flexViewRight">
							<div class="iconfont icon-shouyi"></div>
							<view class="shouyiFlex">
								<text class="money"><text class="money"><strong style="font-size: 13px;">￥</strong></text>{{SumMoney}}</text>
								<text class="shouyi">总收益（元）</text>
							</view>
						</view>
					</view>		
				</view>
				<view class="btnBox2">
					<view class="tupian" @click="toSpreadOder">
						<image src="@/static/img/tuiguang.png"></image><br>
						推广订单
					</view>
					<view class="tupian" @click="toShare">
						<image src="@/static/img/myShare.png"></image><br>
						我的分享
					</view>
					<view class="tupian" @click="totixian">
						<image src="@/static/img/tixian.png"></image><br>
						申请提现
					</view>
					<view class="tupian" @click="tojilu">
						<image src="@/static/img/fanyong.png"></image><br>
						返佣记录
					</view>
				</view>
			</view>
			<view class="boxWhiteView">
				<view class="btnBox">
					<text class="ruleTips">提现规则：</text>
					<view class="ruleBox">
						<text style="font-size: 13px;">每月 {{ShopBase.DrawingsStartDate}} 号 ~ {{ShopBase.DrawingsEndDate}} 号可提现</text>
						<text style="font-size: 13px;">佣金比例 {{ShopBase.Ratio}}%</text>
					</view>
				</view>
			</view>			
		</view>
		<!-- <a-nodeData stringVal="暂无数据" v-else></a-nodeData> -->
	</view>
</template>

<script>
	import {
		vipCard
	} from '@/api/http.js'
	import { formatDate } from '@/util/publicFunction.js'
	export default {
		data() {
			return {
				ImgUrl: require("@/assets/img/defaule_back.jpg"),
				ToDayAmount: '', //当日收益
				ToMonthAmount: '', //当月收益
				SumMoney: '', // 累计收益
				UserInfo: {}, //用户信息
				ShopBase: {}, //商城基础设置
				loading: true,
				formatDate,
			}
		},
		activated(){
			this.getmarkPromotion();
		},
		created() {
			this.getmarkPromotion();
		},
		methods: {
			// 列表信息
			async getmarkPromotion() {
				this.loading = true;
				try {
					let data = await vipCard({
						Action: "HomeSpread"
					}, "UMemberOpera");
					this.UserInfo = data.Data.UserInfo;
					this.SumMoney = data.Data.SumMoney|| 0;
					this.ToDayAmount = data.Data.ToDayAmount || 0;
					this.ToMonthAmount = data.Data.ToMonthAmount || 0;
					this.ShopBase = data.Data.ShopBase || {};
					this.loading = false;
				} catch (e) {
					this.loading = false;
				}
			},
			toSpreadOder(){
				this.$router.push('/pages/vip/SpreadOrder')
			},
			toShare(){
				this.$router.push('/pages/vip/spreadList')
			},
			totixian(){
				var now   = new Date();
				 let day = now .getDate(); //获取当前日(1-31);
				 if(day>=Number(this.ShopBase.DrawingsStartDate)&&day<=Number(this.ShopBase.DrawingsEndDate)){
					if(Number(this.ToDayAmount)>0||Number(this.ToMonthAmount)>0){
						this.SubRebate(); 
					}else{
						this.$toast('暂无可提现金额')
					 }
				 }else{
					this.$toast('请在提现日期内申请')
				 }
			},
			tojilu(){
				this.$router.push('/pages/vip/markPromotion/returnRecord')
			},
			async SubRebate(){
				try {
					let data = await vipCard({
						Action: "SubRebate"
					}, "UMemberOpera");
					this.$toast('您已申请成功')
				} catch (e) {
				}
			},			
		},
		filters:{
			DrawingsType(val){
				if(val == '1'){
					return '微卡'
				}else{
					return '支付宝'
				}
			},
			DrawingsRatioWay(val){
				if(val == '1'){
					return '订单金额'
				}else{
					return '支付金额'
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.box {
		background: #F0F0F0;
		position: relative;
		.boxWhite{
			height: 60vh;
			box-sizing: border-box;
			background-color: #F0F0F0;
			position: relative;
			width: 88%;
			margin: -15% auto 0;
			border-radius: 5px;
			.myShouyi{
				margin: 0 auto;
				background: #fff;				
				box-sizing: border-box;
				border-radius: 10px;
				.title{
					text-align: center;
					font-size: 17px;
					margin: 5px 0px;
					line-height: 57px;
				}
				.shouyiFlex{
					display: flex;
					flex-direction: column;
					.money{font-size: 16px;color: #333;}
					.shouyi{font-size: 14px;color: #CCCCCC;}
				}
				.flexBoxView{
					display: flex;
					width: 94%;
					margin: 0 auto;
					padding: 15px 0;
					.flexViewRight{
						margin-left: 15px;
					}
					.flexViewLeft,.flexViewRight{
						padding-left: 8px;
						border-radius: 5px;
						// border: 1px solid #ed8a61;
						height:50px;
						box-sizing: border-box;
						width: 48%;
						display: flex;
						.iconfont{
							font-size: 28px;
							line-height: 50px;
							color: #ed8a61;
						}
						.shouyiFlex{
							display: flex;
							flex-direction: column;
							padding-top: 0px;
							padding-left: 5px;
							.money{font-size: 22px;color: #333;}
							.shouyi{font-size: 14px;color: #CCCCCC;}
						}
					}
					
				}
			}			
		}
		.boxWhiteView{
			height: 25vh;
			background: #fff;
			width: 100%;
			display: block;
			border-radius: 20px 20px 0px 0px;
			background-color: #fff;
			position: fixed;
			bottom: 0;
			
		}
		.surplusTop {
			width: 100%;
			color: #fff;
			// background-color: #adb838;
			// background-image: url(@/static/img/btCenter.jpg);
			background-image: url(../../../static/img/btCenter.jpg);
			padding-top: 15px;
			height: 28vh;
			box-sizing: border-box;
			background-size: 100% 100%;
			.word {
				font-size: 16px;
				box-sizing: border-box;
				margin-left: 7%;
				margin-bottom: 5px;
				color: #e5e5e5;
				position: relative;

				.interests {
					display: inline-block;
					background: orange;
					color: #fff;
					padding: 2px 6px;
					border-radius: 10px 0 0 10px;
					font-size: 14px;
					position: absolute;
					right: 0;

					i {
						font-size: 12px;
						padding-left: 5px;
					}
				}
			}

			.imgFlex {
				display: flex;

				.flexLeft,
				.flexright {
					position: relative;
					flex: 1;
					margin-left: 7%;

					p {
						height: 30px;
						line-height: 30px;
						font-size: 16px;
					}
				}

				.flexLeft span {
					position: absolute;
					font-size: 30px;
					font-weight: 800;
					bottom: 0;
				}

				image {
					width: 66px;
					height: 66px;
					border-radius: 50%;
					border: 1px solid rgb(255, 255, 255);
					margin: 18px 24px;
					box-sizing: border-box;
				}

				.marFlex {
					font-size: 20px;
					line-height: 28px;
					padding-top: 24px;
					flex: 1;

					span {
						display: block;
						font-size: 14px;
					}
				}

				.erweima {
					width: 85px;
					line-height: 99px;
					text-align: center;

					span {
						font-size: 38px;
					}
				}
			}
		}
		.btnBox2{
			margin-top: 25px;
			display: flex;
			line-height: 34px;
			font-size: 14px;
			letter-spacing: 1px;
			.tupian{
				width: 25%;
				text-align: center;
				image{
					width: 55px;
					height: 55px;
				}
			}
		}
		.btnBox{
			width: 88%;
			margin: 0 auto;
			color: #888;
			.btn{
				display: inline-block;
				border: 1px solid #c5b4b4;
				padding: 8px 20px;
				border-radius: 5px;
				font-size: 14px;
				letter-spacing: 1px;
				margin-right: 10px;
			}
			.ruleTips{
				display: block;
				margin: 10px 0;
				font-size: 15px;
			}
			.ruleBox{
				font-size: 14px;
				text{
					display: block;
				}
			}
		}
		
	}
</style>
