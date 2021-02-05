<template>
	<div>
		<div class="home">
			<!-- #ifndef H5 -->
			<uni-nav-bar :status-bar="true" :shadow="false" title="会员中心"></uni-nav-bar>
			<!-- #endif -->
			<div v-if="!loading" class="homeFa">
				<!-- <div class="homeImg" :style="'background:url('+ ImgUrl +')  no-repeat center;background-size:cover;'">
					<div class="imgFlex">
						<image :src="UserPhoto"></image>
						<p class="marFlex">
							<span>{{CardBase.Name}}</span>
						</p>
						<p class="marFlex">
							<span>{{CardBase.Name}}</span>
						</p>
					</div>
					<p>
						<span>{{data.CardNo}}</span>
					</p>
				</div> -->
				<div class="surplusTop backgroundColor" v-if="!loading || data.length>0" :style="'background:url('+ ImgUrl +')  no-repeat center;background-size:cover;'">
					<!-- :style="'background:url('+ ImgUrl +')  no-repeat center;background-size:cover;'" -->
					<div class="imgFlex">
						<image :src="UserPhoto"></image>
						<p class="marFlex" style="flex:1">
							{{data.CardNo}}
							<span>{{CardBase.Name}}</span>
						</p>
						<p class="erweima" @click="toPayMeng">
							<span class="iconfont icon-zhifuma"></span>
						</p>
					</div>
					<p class="word">账户余额（元）
						<span class="interests" @click="interests">会员权益<i class="iconfont icon-jiantou"></i></span>	
					</p>
					<div class="imgFlex">
						<div class="flexLeft">					
							<span v-if="data.Balance&&Number(data.Balance)>0">{{data.Balance}}</span>
							<span v-else>0</span>
						</div>
						<div class="flexright">
							<span>积分</span>
							<p v-if="data.Score&&Number(data.Score)>0">{{data.Score}}</p>
							<p v-else>0</p>
						</div>
					</div>
				</div>
				<div class="homeInfo">
					<div class="homeBalanceRow backgroundF">
						<!-- <div class="homeBalance" style="width:50%">
							<div @click="clickBalance">
								<div class="homeBalanceM">
									<span v-if="data.Balance&&Number(data.Balance)>0">
										{{data.Balance}}
									</span>
									<span v-else>0</span>
								</div>
								<span class="homeBalanceB">余额</span>
							</div>
						</div> -->
						<!-- <div class="homeBalance" style="width:50%">
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
						</div> -->
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
						<uni-grid @change="clickGrid" :column="4" :show-border="false" style="color:#2c3e50">
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
							<!-- <uni-grid-item :index="55">
								<view class="grid-item-box">
									<div class="iconfont icon-pingjia"></div>
									<div>评价</div>
								</view>
							</uni-grid-item> -->
						</uni-grid>
					</div>
					<!-- 会员相关九宫格 -->
					<div class="backgroundF homeOrderRow">
						<adCell2 text="会员中心"/>
						<uni-grid :column="5"  @change="toGrid" :show-border="false" style="color:#2c3e50">
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
							    	<div class="iconfont icon-wodezuji" ></div>
							    	<div>足迹</div>
							    </view>
							</uni-grid-item>
							<uni-grid-item :index="5">
							    <view class="grid-item-box">
							    	<div class="iconfont icon-wodetuiguangyuan" style="color: #7F7F7F;"></div>
							    	<div>我的推广</div>
							    </view>
							</uni-grid-item>
							<uni-grid-item :index="6">
							    <view class="grid-item-box">
							    	<div class="iconfont icon-youhuiquan1" style="font-size: 18px;"></div>
							    	<div>优惠券</div>
							    </view>
							</uni-grid-item>
							<uni-grid-item :index="7">
							    <view class="grid-item-box" @tap="packages">
							    	<div class="iconfont icon-quanyiguanli-" style="font-size: 18px;"></div>
							    	<div>更多权益</div>
							    </view>
							</uni-grid-item>
						</uni-grid>
					</div>
					
					<div class="cardWei">
						<!-- // ismenber:0 未绑定会员卡，1 绑定了会员卡  CardType :0 未绑定会员卡,net:微卡 ，mang||shop 实体卡 -->
						<!-- 当cardType等于微卡的时候，就要展示实体卡按钮，如果绑定的是实体卡，那么两个按钮都不展示 -->
						<div>
							<adCell v-if="CardType=='0' || CardType=='Net'" text="绑定实体会员卡" @click="bindEntity(1)"/>						
						</div>
						<div>
							<adCell v-if="CardType=='0'" text="申请会员卡" @click="bindEntity(2)"/>
						</div>
					</div>
					
					<div class="cardWei" v-if="CardType!='0'">
						<div>
							<adCell text="微卡充值" @click="$Router.push('/pages/vip/weiFull')"></adCell>
						</div>
						<div>
							<adCell text="付款码" @click="toPayMeng"></adCell>
						</div>
					</div>
					<div class="cardWei">
						<div>
							<adCell text="交易记录" @click="$Router.push('/pages/vip/surplus')" />
						</div>
						<!--<van-cell title="积分记录" is-link to="/home/integral"/>-->
					</div>
					<div class="cardWei">
						<div>
							<adCell text="收货地址" @click="$Router.push({path:'/pages/myAddress/myAddress',query:{flag:'homeD'}})"  />
						</div>
					</div>
					<div class="cardWei">
						<div>
							<adCell text="退出" @click="clickClear" />
						</div>
					</div>
					<div style="text-align: center;margin-top:40px" class="callInfo">
						<div class="logBottom">烘焙365提供技术支持</div>
						<div class="phoneStyle">
							<uni-icons type="phone" size="10"></uni-icons>
							<span @click="callClick">027-85750188</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="cgwl-form" id="cgwl-kefu" style="background:none" v-if="start === '1'">
			 <p style="width: 60px;height:60px;">
				<a :href="kefuUrl"><image src="@/static/img/kefu.png" style="width: 100%;height: 100%;"></image></a>	
			 </p>
		</div>
		<view>
			<tabBar :pagePath="'/pages/home'"></tabBar>
		</view>	
	</div>
</template>
<script>
	import {
		vipCard
	} from '@/api/http.js';
	import Cookie from '@/config/cookie-my/index.js';
	import adCell from '@/node_modules/adcell/ADCell.vue';
	import adCell2 from '@/node_modules/adcell/ADCell2.vue';
	import { bottomScrollbar,GetAppNo,GetCrsInfo,GetBaseImgUrl ,GetCsrStart} from "@/util/publicFunction";
	export default {
		name: "home",
		components: {
			adCell,
			adCell2
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
				CardType: 0,
				UserPhoto:'',
				CardBase:{},
				AwaitPayCnt:'',//待支付数量
				kefuUrl:GetCrsInfo(),
				start:GetCsrStart()
			};
		},
		async created() {
			// ismenber:0 未绑定会员卡，1 绑定了会员卡  CardType :0 未绑定会员卡,net:微卡(会员卡) ，mang||shop 实体卡
			// console.log(Cookie.get("isMember"), Cookie.get("CardType"))
			// //1 绑定了卡但是不知道绑定的是哪个卡；
			//this.isMember = Cookie.get("isMember");
			this.CardType = Cookie.get("CardType"); //卡信息 04 申请卡 05绑定卡

			await this.getInfo();
			// this.CardType = this.data.CardType
			// sessionStorage.setItem('CardType',this.CardType)
			// this.isMember = Cookie.get("isMember");
			// bottomScrollbar(this, ".callInfo", ".homeFa", 60);			
		},
		mounted() {
			
			// this.kefuUrl = `http://cs365.bak365.net/index/index/home?visiter_id=&visiter_name=&avatar=&business_id=${this.BusinessID}&groupid=${this.GroupID}&special=${this.SpecialID}`;
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
					
					// this.ImgUrl = this.$VUE_APP_PREFIX + data.Data.CardBase.CardImg || this.ImgUrl;
					this.ImgUrl = GetBaseImgUrl()+ data.Data.CardBase.CardImg || this.ImgUrl;
					this.UserPhoto = data.Data.Img;//头像
					this.CardBase = data.Data.CardBase;//卡信息
					this.data = data.Data.MyCard|| {};
					this.AwaitPayCnt = data.Data.AwaitPayCnt;
					// if(this.data.IssueType != undefined ){
					// 	Cookies.set('CardType', this.data.IssueType)
					// 	Cookie.set("isMember",'1')
					// }
					if(data.Data.IssueType){
						this.CardType = data.Data.IssueType;
						// console.log(this.CardType,'获取卡号')
						Cookies.set('CardType', data.Data.IssueType)
					}
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
			// toGrid
			toGrid(val){
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
				}else if(id=='6'){
					this.$router.push('/pages/vip/myCoupon/myCoupon')
				}		
			},
			bindEntity(num){
				// http://manage.bak365.cn/WebApp/WXCard/?AppNo=001&Type=ApplyCard
				window.location.href = "http://manage.bak365.cn/WebApp/WXCard/?Type=ApplyCard&AppNo="+GetAppNo()
				// this.$Router.push({
				// 	path: '/pages/vip/bind/index',
				// 	query: {
				// 		id: num
				// 	}
				// })
			},
			toPayMeng(){
				window.location.href = "http://manage.bak365.cn/WebApp/WXCard/?Type=PayCode&AppNo="+GetAppNo()
			},
			interests(){//跳转到权益列表
				this.$router.push({path:"/pages/vip/interests/interests"})
			},
			packages() {
				uni.navigateTo({
					url: '/pages/packages/index'
				})
			},
			acWeFull(){
				this.$router.push('/pages/vip/weiFull')
			},
			clickClear() {//清除缓存		
				this.remove();
				Cookie.remove("UserMACPhone");
				Cookie.remove("isMember");
				Cookie.remove("CardType");
				// sessionStorage.removeItem("UserMACPhone")
				sessionStorage.removeItem('takeOutAddress')
				sessionStorage.removeItem('ShopRadio')
				
			},			
			async remove() {
				try {
					let { Data } =  await vipCard({}, "ClearCache");
					this.$toast.fail("清除成功");
				} catch (e) {
					console.log(e);
				}
			}
		}
	};
</script>
<style lang="less">
	@import '@/assets/css/cgwl_online.css';
	.home{
		margin-bottom: 50px;
	}
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
	.surplusTop{
		width: 95%;
		color: #fff;
		margin: 10px auto;
		border-radius: 10px;
		background-color: orange;
		padding-bottom: 15px;
		.word{
			font-size: 16px;
			box-sizing: border-box;
			margin-left: 7%;
			margin-bottom: 5px;
			color: #e5e5e5;
			position: relative;
			.interests{
				display: inline-block;
				background: orange;
				color: #fff;
				padding: 2px 6px;
				border-radius: 10px 0 0 10px;
				font-size: 14px;
				position: absolute;
				right: 0;
				i{
					font-size: 12px;
					padding-left: 5px;
				}
			}
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
				flex: 1;
				span{
					display: block;
					font-size: 14px;
				}
			}
			.erweima{
				width: 85px;line-height: 99px;text-align: center;
				span{
					font-size: 38px;
				}
			}
		}
	}
	.homeImg {
		width: 100%;
		margin: 0 auto;
		border-radius: 5px;
		height: 180px;
		background-size: cover !important;
		// padding-top: 50px;
		box-sizing: border-box;
		position: relative;
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
		// .homeImgTitle {
		// 	height: 40px;
		// 	background: #d6d8c3;
		// 	position: absolute;
		// 	bottom: 0;
		// 	width: 94%;
		// 	left: 3%;
		// 	border-radius: 10px 10px 0 0;
		// 	color: #000;
		// 	text-align: right;
		// 	padding-right: 15px;
		// 	line-height: 40px;
		// 	font-size: 14px;
		// 	box-sizing: border-box;
		// }
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
</style>
