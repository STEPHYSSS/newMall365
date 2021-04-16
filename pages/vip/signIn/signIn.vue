<template>
	<!-- 每日签到 -->
	<view class="weiFullqiandao" :class="mainStyle">
		<!-- <uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickGo" title="每日签到" :status-bar="true" :shadow="false"></uni-nav-bar> -->
		<!-- v-if="!loading" -->
		<view class="signBox" v-if="!loading">
			<view class="flexInfo">
				<view style="display: flex;">
					<view class="flexLeft">
						<!-- <image :src="UserInfo.Headimgurl?UserInfo.Headimgurl:imgUrl"></image> -->
						<image :src="UserInfo.Headimgurl?UserInfo.Headimgurl:imgUrl"></image>
					</view>
					<view class="userName">
						<span>{{UserInfo.NickName}}</span>
						<span class="signGZ" @click="signRule">签到规则</span>
					</view>
				</view>
				<view class="infoSign">
					<view class="infoSignBox">
						<p class="signP">当前积分</p>
						<p class="signN">{{MyCard.Score}}</p>
						<p v-if="IsSign!='1'" @click="clickSetUserSign" class="signBtn" :class="{Active:IsSign=='1'}">{{msg}}</p>
						<p v-else class="signBtn" :class="{Active:IsSign=='1'}">{{msg}}</p>
					</view>
				</view>
			</view>
			<view class="timeBox">
				<view class="calendar">
					<text class="calendarDay">
						<span>{{currentYear}}年{{currentMonth}}月</span>
						<span style="float: right;">已连续签到<span style="padding: 0 2px;color: #b2d39f;">{{UserInfo.ContinuousSignCnt?UserInfo.ContinuousSignCnt:0}}</span>天</span>
					</text>
					<ul>
						<li v-for="(item, index) in dateList" :key="index" >
						  <span class="spn_content" :class="showSignIn(item.num)">
						  {{item?item.num:""}}</span>
						</li>
					</ul>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { vipCard } from '@/api/http.js'
	export default {
		data() {
			return {
				mainStyle: getApp().globalData.mainStyle,
				currentYear: new Date().getFullYear(),
				currentMonth: new Date().getMonth() + 1,
				date: new Date().getDate(),
				dateList: [],
				emptyArr: [],
				loading: true,
				MyCard:{},
				UserInfo:{},
				SignInList:[],
				IsSign:'0',//是否签到
				isNum:false,
				msg:'立即签到',
				imgUrl:require("@/static/img/defaultPhoto.png"),
			}
		},
		created() {
			this.getCalendarDate();
			this.getSign();
						
		},
		computed: {
		    showSignIn () {
		      return function (val) {
		        for (const i of this.SignInList) {
		          if (i.AddTime == val) {
						// console.log(i.AddTime,val)
		            return 'Istoday'
		          }
		        }
		        return ''
		      }
		    }
		  },
		methods: {
			getCalendarDate(){
				this.dateList = [];
				const startDate = new Date(this.currentYear, this.currentMonth - 1, 1);
				const endDate = new Date(this.currentYear, this.currentMonth, 0);
				this.emptyArr = new Array(startDate.getDay());
				for (let i = 1; i <= endDate.getDate(); i++) {
					this.dateList.push({
					  type: 1,
					  num: i,
					});
				}				
			},
			async getSign(){//签到
				this.loading = true
				try {
					let data = await vipCard({
						Action: 'GetUserSign'
					}, 'UMemberOpera')
					this.IsSign = data.Data.IsSign;
					this.MyCard = data.Data.MyCard||{};
					this.UserInfo = data.Data.UserInfo;
					this.SignInList = data.Data.SignInList||[];
					this.msg = this.IsSign=='1'?'已签到':'立即签到';
					let giveList = data.Data.GiveList||[];
					let str = '';
					let givetick = '';//电子券
					let result = []
					giveList.forEach((item,index)=>{
						givetick = item.GiveInfo.split(';');
						var sum = 0;
						for(var i = 0;i<givetick.length;i++ ){
						    var give = givetick[i].split(",");
							if(give[1]!=undefined){
								 sum += Number(give[1]);
							}
						}
						if(item.GiveScore!='' && sum != 0){
							str += `连续签到${item.MeetCnt}天，赠送${item.GiveScore}积分，赠送${sum}张电子券;`
						}else if(item.GiveScore!='' && sum == 0){
							str += `连续签到${item.MeetCnt}天，赠送${item.GiveScore}积分;`
						}else if(item.GiveScore=='' && sum != 0){
							str += `连续签到${item.MeetCnt}天，赠送${sum}张电子券;`
						}
					})
					sessionStorage.setItem('signRule',str)
					this.loading = false
				} catch (e) {
					this.loading = false
				}
			},
			
			async clickSetUserSign(){
				this.loading = true;
				try {
					let data = await vipCard({
						Action: 'SetUserSign'
					}, 'UMemberOpera')
					this.loading = false
					this.getSign();
				} catch (e) {
					this.loading = false
				}
			},
			clickGo(){//返回
				window.history.back(-1)
			},
			signRule(){
				this.$router.push({
					path:"/pages/vip/signIn/signRule"
				})
			}
		}
	}
</script>

<style scoped lang="less">
	@import '@/assets/css/weiFull';
	.weiFullqiandao{
		height: 100vh;
	}
	.flexInfo{
		height: 130px;
		font-size: 16px;
		.infoSign{
			height: 145px;
			background-color: #fff;
			width: 95%;
			position: absolute;
			top: 20%;
			left: 2%;
			border-radius: 10px;
			.infoSignBox{
				margin: 20px auto 0;text-align: center;
				.signBtn{
					background-color: rgb(173,184,56);
					padding: 8px 10px;
					border-radius: 20px;
					text-align: center;
					width: 50%;
					margin: 20px auto 0;
					color: #fff;
				}
				.Active{
					background-color: #b2d39f;
				}
				.signP{
					font-size: 14px;color: #3C3E49;
				}
				.signN{
					font-size: 20px;margin: 5px 0;
				}
			}
			
		}
		// background-color:#59aaec ;
		background: linear-gradient(to bottom right, #a0dfff, #2291D6);
		.flexLeft{
			text-align: center;
			box-sizing: border-box;
			width: 70px;
			margin-top: 18px;
			image{
				margin: 0 auto;
				// position: absolute;
				// top: 17%;
				width: 50px;
				height: 50px;
				border-radius: 50%;
			}			
		}
		.userName{
			flex: 1;
			margin-top: 8%;
			color: #fff;
			.signGZ{
				float: right;
				background: #b2d39f;
				padding: 2px 10px;
				font-size: 13px;
				border-radius: 10px 0 0 10px;
			}
		}
		.wordRight{
			color: #fff;
			box-sizing: border-box;
			padding-left: 5px;
			flex: 1;
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
				top: 12%;	
				i {
					font-size: 12px;
					padding-left: 5px;
				}
			}
			
			
			// line-height: 42px;
			.text1{
				margin-top: 10%;
				display: block;
				height: 40px;
				line-height: 40px;
			}
			.text2{
				display: block;
				height: 40px;
				line-height: 40px;
				margin-bottom: 15px;
				.msg{
					padding-left: 5px;
					font-size: 15px;
				}
			}
		}
	}
	.imgBox{
		text-align: center;
		margin-bottom: 20px;
	}
	.timeBox{
		clear: both;
		height: 350px;
		margin-top: 30%;
		
		.calendar{
			background: #fff;
			height: 73%;
			margin: 0 10px;
			border-radius: 5px;
			.calendarDay{
				font-size: 14px;
				display: block;
				letter-spacing: 2px;
				font-weight: 600;
				color: #3d3b3b;
				border-bottom: 1px solid #ebebeb;
				padding: 10px 16px;
			}
		}
		ul {
		  display: flex;
		  flex-wrap: wrap;
		  margin-top: 5px;
		  padding-bottom: 5px;
		  font-size: 14px;
		  height: 25px;
		  list-style: none;
		  width: 80%;
		}
		li {
		  height: 40px;
		  user-select: none;
		  width: 14.28%;
		  text-align: center;
		}
		.spn_content {
		  width: 35px;
		  display: block;
		  height: 35px;
		  line-height: 35px;
		  margin: 0 auto;
		  border-radius: 50%;
		  position: relative;
		}
		.spn_content:hover{
		  border: 1px dashed #4489FE;
		}
		.Istoday{
		  background-color: #b5e4f7;
		}
	}
	
	.weiFull {
		margin-bottom: 65px;
		height: 100vh;
		background-color: #f6faff;
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
		// width: 90%;
		width: 95%;
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
		// width: 90%;
		width: 95%;
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
