<template>
	<div class="home">
		<!-- #ifndef H5 -->
		<uni-nav-bar :status-bar="true" :shadow="false" title="会员中心"></uni-nav-bar>
		<!-- #endif -->
		<div v-if="!loading" class="homeFa">
			<div class="homeImg" :style="'background:url('+ ImgUrl +')  no-repeat center;background-size:cover;'">
				<span class="homeImgTitle">{{data.CardNo}}</span>
			</div>
			<div class="homeInfo">
				<div class="homeBalanceRow backgroundF">
					<div class="homeBalance" style="width:50%">
						<div @click="clickBalance">
							<div class="homeBalanceM">
								<span v-if="data.Balance&&Number(data.Balance)>0">
									{{data.Balance |spliceNum}}
									<span>{{String(data.Balance).length>6?'+':''}}</span>
								</span>
								<span v-else>0</span>
							</div>
							<span class="homeBalanceB">余额</span>
						</div>
					</div>
					<div class="homeBalance" style="width:50%">
						<div @click="clickBalance">
							<div class="homeBalanceM">
								<span v-if="data.Score&&Number(data.Score)>0">
									{{data.Score |spliceNum}}
									<span>{{String(data.Score).length>6?'+':''}}</span>
								</span>
								<span v-else>0</span>
							</div>
							<span class="homeBalanceB">积分</span>
						</div>
					</div>
					<!-- <van-col span="6" class="homeBalance" v-if="false">
						<router-link to="/home/redPacket">
							<div class="homeBalanceM">0.00</div>
							<span class="homeBalanceB">红包</span>
						</router-link>
					</van-col>
					<van-col span="6" class="homeBalance" v-if="false">
						<router-link to="/home/electron">
							<div class="homeBalanceM">0.00</div>
							<span class="homeBalanceB">劵</span>
						</router-link>
					</van-col> -->
				</div>
				<div class="backgroundF homeOrderRow">
					<adCell text="我的订单" detail="查看全部订单" @click="clickAll" />
					<uni-grid @change="clickGrid" :column="5" :show-border="false" style="color:#2c3e50">
						<uni-grid-item :index="1">
							<view class="grid-item-box">
								<div class="iconfont icon-gerenzhongxindingdandaifukuan"></div>
								<div>待付款</div>
							</view>
						</uni-grid-item>
						<uni-grid-item :index="2">
							<view class="grid-item-box">
								<div class="iconfont icon-yifukuan-xianxing"></div>
								<div>已付款</div>
							</view>
						</uni-grid-item>
						<uni-grid-item :index="3">
							<view class="grid-item-box">
								<div class="iconfont icon-yitihuo"></div>
								<div>已提货</div>
							</view>
						</uni-grid-item>
						<uni-grid-item :index="4">
							<view class="grid-item-box">
								<div class="iconfont icon-pingjia"></div>
								<div>已取消</div>
							</view>
						</uni-grid-item>
						<uni-grid-item :index="55">
							<view class="grid-item-box">
								<div class="iconfont icon-pingjia"></div>
								<div>评价</div>
							</view>
						</uni-grid-item>						
					</uni-grid>
				</div>
				<!-- 会员新功能模块 -->
				<!-- 会员相关九宫格 -->
				<div class="backgroundF homeOrderRow">
					<adCell text="会员中心"/>
					<uni-grid :column="5"  @change="ABCd" :show-border="false" style="color:#2c3e50">
					    <uni-grid-item :index="1">
					        <view class="grid-item-box">
					        	<div class="iconfont icon-shenqingtuanchang"></div>
					        	<div v-if="data.LeaderAudit != '1'">申请团长</div>
								<div v-else>团长信息</div>
					        </view>
					    </uni-grid-item>
					    <uni-grid-item :index="2">
					       <view class="grid-item-box"  >
					       	<div class="iconfont icon-fenxiang1"></div>
					       	<div>我的分享</div>
					       </view>
					    </uni-grid-item>
					    <uni-grid-item :index="3">
					        <view class="grid-item-box">
					        	<div class="iconfont icon-fensi"></div>
					        	<div>我的粉丝</div>
								<!-- <div>申请提现</div> -->
					        </view>
					    </uni-grid-item>
						<uni-grid-item :index="4">
						    <view class="grid-item-box">
						    	<div class="iconfont icon-zuji"></div>
						    	<div>足迹</div>
						    </view>
						</uni-grid-item>
						<uni-grid-item :index="5">
						    <view class="grid-item-box">
						    	<div class="iconfont icon-guanggaozhuhuodongtuiguang"></div>
						    	<div>我的推广</div>
						    </view>
						</uni-grid-item>
					</uni-grid>
				</div>
				<div class="cardWei">
					<div>
						<adCell v-if="isMember!=='1'||(isMember&&CardType!=='05')" text="绑定实体会员卡"@click="bindEntity(1)"/>
					</div>
					<div>
						<adCell v-if="isMember!=='1'||(isMember&&CardType!=='05'&&CardType!=='04')" text="申请会员卡" @click="bindEntity(2)"/>
					</div>
				</div>
				<div class="cardWei" v-if='isMember==="1"'>
					<div>
						<adCell text="微卡充值" @click="$Router.push('/pages/vip/weiFull')" />
					</div>
					<div>
						<adCell text="付款码" @click="$Router.push('/pages/vip/payCode')" />
					</div>
				</div>
				<div class="cardWei">
					<div>
						<adCell text="交易记录" @click="$Router.push('/pages/vip/surplus')" />
					</div>
					<!--                    <van-cell title="积分记录" is-link to="/home/integral"/>-->
				</div>
				<div class="cardWei">
					<div>
						<adCell text="收货地址" to="/home/myAddress" />
					</div>
				</div>
				<div style="text-align: center;margin-top:40px" class="callInfo">
					<div class="logBottom">烘焙365提供技术支持</div>
					<!--                <van-icon name="fire-o"/>-->
					<div class="phoneStyle">
						<uni-icons type="phone" size="10"></uni-icons>
						<span @click="callClick">027-85750188</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		vipCard
	} from '@/api/http.js';
	import Cookie from '@/config/cookie-my/index.js';
	import adCell from '@/node_modules/adcell/ADCell.vue';
	import {
		bottomScrollbar
	} from "@/util/publicFunction";
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	import Mixins from "@/pages/shoppingMall/mixins.js";
	export default {
		name: "home",
		components: {
			adCell,
			uniGrid,
			uniGridItem
		},
		data() {
			return {
				showListCard: false,
				CardNoId: "",
				ImgUrl: require("@/assets/img/defaule_back.jpg"),
				data: {
					Balance: 0,
					Score: 0,
					ImgUrl: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=107094959,3836410772&fm=26&gp=0.jpg"
				},
				loading: false,
				// 判断是否绑定了卡
				isMember: null,
				// 绑定的类型
				CardType: null
			};
		},
		async created() {
			// console.log(Cookie.get("isMember"), Cookie.get("CardType"))
			//1 绑定了卡但是不知道绑定的是哪个卡；
			this.isMember = Cookie.get("isMember");
			this.CardType = Cookie.get("CardType"); //卡信息 04 申请卡 05绑定卡
			await this.getInfo();
			// bottomScrollbar(this, ".callInfo", ".homeFa", 60);
		},
		methods: {
			clickBalance() {
				this.$router.push('/pages/vip/surplus')
			},
			async getInfo() {
				this.loading = true;
				try {
					let data = await vipCard({
						Action: "MemberCenter"
					}, "UMemberOpera");
					// console.log(data, 5555)
					this.ImgUrl =
						this.$VUE_APP_PREFIX + data.Data.CardImg || this.ImgUrl;
					// this.data = data.Data.CardInfo || {};	
					this.data = data.Data || {};
					this.loading = false;
					uni.hideLoading();
				} catch (e) {
					this.loading = false;
				}
			},
			callClick() {
				uni.makePhoneCall({
					phoneNumber: '027-85750188' //仅为示例
				});
			},
			clickAll() {
				this.$Router.push({
					path: "/pages/vip/allMyOrder",
					query: {
						id: "0"
					}
				});
			},
			clickGrid(val) {
				let id = val.detail.index.toString()
				if (id === '55') {
					// this.$Router.push({
					// 	path: '/home/evaluateMy',
					// 	query:{id: id}
					// })
				} else {
					this.$Router.push({
						path: '/pages/vip/allMyOrder',
						query: {
							id: id
						}
					})
				}
			},
			bindEntity(num){
				this.$Router.push({
					path: '/pages/vip/bind/index',
					query: {
						id: num
					}
				})
			},
			ABCd(val){
				let id = val.detail.index
				if(id=='1'){
					this.$router.push('/pages/vip/applyLeader')
				}else if(id=='2'){
					this.$router.push('/pages/vip/spreadList')
				}else if(id=='3'){
					this.$router.push('/pages/vip/myFans')
				} else if(id=='4'){
					this.$router.push('/pages/vip/FootPrint')
				}else if(id=='5'){
					this.$router.push('/pages/vip/SpreadOrder')
				}				
			},
		}
	};
</script>
<style lang="less">
	// #ifdef H5
	.cardWei>:last-child {
		/deep/.bottomLine {
			border-color: transparent;
		}
	}
	// #endif
	// #ifdef MP
	.cardWei {
		& div:last-child {
			.bottomLine {
				border-color: transparent;
			}
		}
	}
	// #endif

	.homeInfo {
		padding: 10px;

		.backgroundF {
			background: #fff;
		}

		.homeBalanceRow {
			display: flex;
			border-radius: 10px;

			.homeBalance {
				line-height: 20px;
				text-align: center;
				padding: 10px 0;
			}

			.homeBalanceM {
				font-weight: 700;
			}

			.homeBalanceB {
				font-size: 12px;
				color: #9f9f9f;
				margin-top: 3px;
				display: inline-block;
			}
		}

		.homeOrderRow {
			border-radius: 10px;
			margin-top: 10px;
			overflow: hidden;

			.grid-item-box {
				display: flex;
				flex-direction: column;
				box-sizing: border-box;
				height: 100%;
				background-color: #fff;
				align-items: center;
				justify-content: center;
				box-align: center;
			}

			.van-cell {
				border-radius: 10px;
			}

			.van-goods-action-icon {
				color: #000;
				line-height: 1;
				font-size: 12px;
			}

			.van-goods-action-icon__icon {
				font-size: 23px;
				margin-top: 15px;
			}
		}

		.cardWei {
			margin-top: 10px;
			border-radius: 10px;
			overflow: hidden;
		}

		.PaymentCode {
			margin-top: 10px;

			.van-cell {
				border-radius: 10px;
			}
		}

		.logBottom {
			font-size: 14px;
			color: #b9bec5;
			line-height: 25px;
		}

		.phoneStyle {
			font-size: 14px;
			color: #b9bec5;

			i {
				vertical-align: middle;
			}
		}
	}

	.homeImg {
		width: 100%;
		height: 190px;
		background-size: cover !important;
		padding-top: 50px;
		box-sizing: border-box;
		position: relative;

		.homeImgTitle {
			height: 40px;
			background: #392f2b;
			position: absolute;
			bottom: 0;
			width: 94%;
			left: 3%;
			border-radius: 10px 10px 0 0;
			color: #e0e0e0;
			text-align: right;
			padding-right: 15px;
			line-height: 40px;
			font-size: 14px;
			box-sizing: border-box;
		}
	}

	.headImg {
		width: 70px;
		height: 70px;
		border-radius: 50%;
		margin-left: 50px;

		img {
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}