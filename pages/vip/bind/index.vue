<template>
	<div class="bindMicro" :class="mainStyle">
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickLeft" :title="currentRouter?'绑定卡':'申请卡'" :status-bar="true"
		 :shadow="false"></uni-nav-bar>
		<h4 class="bindMicroTitle" v-if="!loading">填写会员信息</h4>
		<div v-if="!loading&&!fail">
			<div class="wu-cell" v-if="!currentRouter&&bindListMe[0].hasOwnProperty('isShow')">
				<div class="wu-cell__label">
					<span>姓名</span>
				</div>
				<div class="wu-cell__value">
					<div class="wu-cell__body">
						<input v-model="fromData.Username" class="wu-field__control" type="text" placeholder="请输入姓名" @blur="usernameTip = fromData.Username ? '' : '请输入名字'">
					</div>
					<div class="wu-field__error-message">{{usernameTip}}</div>
				</div>
			</div>
			<div class="wu-cell" v-if="!currentRouter&&bindListMe[1].hasOwnProperty('isShow')">
				<div class="wu-cell__label">
					<span>生日</span>
				</div>
				<picker @change="confirmDate" mode="date" :end="endData">
					<div class="wu-cell__value">
						<div class="wu-cell__body">
							<input class="wu-field__control" disabled v-model="fromData.Birthday" placeholder="选择生日日期" @blur="dayTip = fromData.Birthday ? '' : '请选择生日'" />
						</div>
						<div class="wu-field__error-message">{{dayTip}}</div>
					</div>
				</picker>
			</div>
			<div class="wu-cell" v-if="!currentRouter&&bindListMe[2].hasOwnProperty('isShow')">
				<div class="wu-cell__label">
					<span>性别</span>
				</div>
				<picker @change="onConfirm" :range="columns" range-key="text">
					<div class="wu-cell__value">
						<div class="wu-cell__body">
							<input class="wu-field__control" disabled v-model="exhibitSex" placeholder="选择性别" @blur="sexTip = fromData.Sex ? '' : '请选择性别'" />
						</div>
						<div class="wu-field__error-message">{{sexTip}}</div>
					</div>
				</picker>
			</div>
			<div class="wu-cell" v-if="!currentRouter&&IsPass==='1'">
				<div class="wu-cell__label">
					<span>密码</span>
				</div>
				<div class="wu-cell__value">
					<div class="wu-cell__body">
						<input class="wu-field__control" v-model="fromData.Password" placeholder="请输入密码" @blur="Password = fromData.Password ? '' : '请填写密码'" />
					</div>
					<div class="wu-field__error-message">{{Password}}</div>
				</div>
			</div>

			<div class="phoneStyle">
				<div class="wu-cell">
					<div class="wu-cell__label">
						<span>手机号</span>
					</div>
					<div class="wu-cell__value">
						<div class="wu-cell__body">
							<input class="wu-field__control" v-model="fromData.Phone" type="text" placeholder="请输入手机号" @blur="clickPhoneQue">
						</div>
						<div class="wu-field__error-message">{{phoneTip}}</div>
					</div>
				</div>				
				<button size="mini" type="main" @click="getCodeFun" :disabled="disabledBtn" v-if="this.$Route.query.id == '2'" style="background-color: #adb838;">{{getCodeNum}}</button>
				<button size="mini" type="main" @click="getCodeFun" :disabled="disabledBtn" v-if="this.$Route.query.id == '1'" :class="{ active: isActive }">{{getCodeNum}}</button>
			</div>
			<div class="wu-cell">
				<div class="wu-cell__label">
					<span>验证码</span>
				</div>
				<div class="wu-cell__value">
					<div class="wu-cell__body">
						<input class="wu-field__control" v-model="fromData.Code" placeholder="请输入验证码" @blur="CodeTip = fromData.Code ? '' : '请填写验证码'" />
					</div>
					<div class="wu-field__error-message">{{CodeTip}}</div>
				</div>
			</div>
			<div class="wu-cell" v-show="showCardNo">
				<div class="wu-cell__label">
					<span>卡号</span>
				</div>
				<div class="wu-cell__value">
					<div class="wu-cell__body">
						<!-- 卡号不能输入 -->
						<text class="wu-field__control" @click="chooes">{{fromData.CardNo}}</text>
						<!-- <input class="wu-field__control"  v-model="fromData.CardNo" @click="chooes" readonly="true"/> -->
					</div>
				</div>
			</div>
		</div>
		<error v-if="fail" style="margin-top: -61px;"></error>
		
		<div class="EntityCardShow">
			<div class="popst" v-show="showCard">
				<!-- <van-radio-group v-model="CardNoId" >
				  <van-radio checked-color="#07c160" v-for="(item,index) in bindCardList" :name="item.CardNo" :key="index">
					  <view class="cardSty" :class="{}" @click="chooseCard(item.CardNo)">
					  	<view class="EntityCardNa">卡号：{{item.CardNo}}</view>							
							<view class="EntityCard" v-if="item.Name != '' ">卡名：{{item.Name}}</view>
							<view class="EntityCard" v-else>卡名：无</view>
							<view class="EntityCard">余额：{{item.Balance}}</view>
							<view class="EntityCard">积分：{{item.Score}}</view>
					  </view>
				  </van-radio>
				</van-radio-group> -->
				<radio-group @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in bindCardList" :key="item.value">						
						<view class="cardSty" style="position: relative;">
							<view style="position: absolute;right: 5px;top: 32%;">
								<radio :value="item.CardNo" :checked="index === current" />
							</view>
							<view class="EntityCardNa">卡号：{{item.CardNo}}</view>							
							<view class="EntityCard" v-if="item.Name != '' ">卡名：{{item.Name}}</view>
							<view class="EntityCard" v-else>卡名：无</view>
							<view class="EntityCard">余额：{{item.Balance}}</view>
							<view class="EntityCard">积分：{{item.Score}}</view>
						</view>
					</label>
				</radio-group>
			</div>
		</div>
		<!-- <uni-calendar ref="calendar" :insert="false" :lunar="true" :start-date="'2019-3-2'" :end-date="'2019-5-20'" @change="change"/> -->

		<!-- <uni-popup v-model="isShow" type="bottom">
			<van-datetime-picker v-model="Birthday" type="date" :min-date="minDate" :max-date="maxDate" @cancel="isShow = false"
			 @confirm="confirmDate" :item-height="35" />
		</uni-popup> -->
		<!-- <uni-popup ref="popup" type="bottom" title="选择要绑定的实体卡" class="EntityCardShow" @confirm="confirmEntityCard" :beforeClose="beforeClose">
			<div class="popst">
				<van-radio-group v-model="CardNoId" >
				  <van-radio v-for="(item,index) in bindCardList" :name="item.CardNo" :key="index">
					  <view class="cardSty" @click="chooseCard(item.CardNo)">
					  	<view class="EntityCardNa">卡名：{{item.Name}}</view>
							<view class="EntityCard">卡号：{{item.CardNo}}</view>
							<view class="EntityCard">余额：{{item.Balance}}</view>
							<view class="EntityCard">积分：{{item.Score}}</view>
					  </view>
				  </van-radio>
				</van-radio-group>
			</div>
		</uni-popup> -->
		<div class="btnfixedBottom" v-if="!loading&&!fail">
			<!-- <button :disabled="btnLoading" class="buttonPage" type="redRaduis" @click="clickSubmit" :loading="btnLoading">提交</button> -->
			<button :disabled="btnLoading" class="buttonPage" type="redRaduis" @click="clickSubmit" >提交</button>
		</div>
	</div>
</template>

<script>
	import {
		getTime
	} from "@/util/publicFunction";
	// import BottomBtn from "@/components/bottomBtn";
	// import error from "@/components/error/LoadError";
	import {
		vipCard
	} from "@/api/http.js";
	import {
		bindList
	} from "@/config/util";
	import Cookie from '@/config/cookie-my/index.js'

	export default {
		name: "bindMicro",
		components: {},
		data() {
			return {
				mainStyle: getApp().globalData.mainStyle,
				radio: "",
				loading: false,
				fromData: {
					Phone: "",
					Type: "",
					Code: ""
				},
				exhibitSex: "",
				Birthday: new Date(),
				usernameTip: "",
				phoneTip: "",
				dayTip: "",
				sexTip: "",
				CodeTip: "",
				Password: "",
				minDate: new Date(1950, 1, 1),
				maxDate: new Date(),
				isShow: false,
				columns: [{
						text: "女",
						id: "1"
					},
					{
						text: "男",
						id: "2"
					}
				],
				getCodeNum: "获取验证码",
				CodeNum: 60,
				disabledBtn: false,
				bindListMe: bindList,
				// 显示实体卡列表
				bindCardList: [
					// {CardNo: 111, Name: '名字', Balance: '40余额', Score: '积分'},
					// {CardNo: 22, Name: '名字', Balance: '40余额', Score: '积分'},
					// {CardNo: 33, Name: '名字', Balance: '40余额', Score: '积分'},
					// {CardNo: 44, Name: '名字', Balance: '40余额', Score: '积分'},
					// {CardNo: 55, Name: '名字', Balance: '40余额', Score: '积分'}
				],
				CardNoId: "",
				showListCard: false,
				// 当页面加载失败的时候/**/
				fail: false,
				// 是否输入密码
				IsPass: false,
				btnLoading: false,
				endData: '',
				Type:'',
				showCard:false,//用来判断卡列表是否展示
				showCardNo:false,//选择卡后展示卡号
				isActive: false,//控制验证码是否置灰
				isMember :Cookie.get("isMember"),
				CardType:sessionStorage.getItem("cardType")
			};
		},
		async created() {
			// 判断是否有卡，有卡并且是会员卡（微卡）的话，就可以绑定卡，否则跳回到个人中心
			if(this.CardType === 'Manage'|| this.CardType==='Shop' ){
				this.$Router.push("/pages/home")
			}
			if(this.isMember === 1 ){
				this.$Router.push("/pages/home")
			}
			this.endData = getTime('', true)
			if (this.currentRouter) {
				// 绑定实体卡
				this.Type = '1'
			} else {
				// 申请
				this.Type = '0'
				this.getInfo();
			}
		},
		computed: {
			currentRouter() {
				// 是否是绑定实体卡 true为是
				return this.$Route.query.id == "1" || false;
			}
		},
		methods: {
			async getInfo() {
				try {
					this.loading = true;
					let data = await vipCard({
						Action: "GetCardBase"
					}, "WeChatCardOpera");
					if (data.Data.CardBaseInfo && data.Data.CardBaseInfo.ApplyMsg) {
						let arr = data.Data.CardBaseInfo.ApplyMsg.split(",");
						arr.forEach(D => {
							this.$set(this.bindListMe[Number(D)], "isShow", true);
						});
					}
					this.IsPass = data.Data.CardBaseInfo.IsPass;
					this.loading = false;
				} catch (e) {
					this.loading = false;
					this.fail = true;
					this.$toast.fail(e || "数据获取失败");
				}
			},
			confirmEntityCard() {
				// 弹框确定按钮
				this.fromData.CardNo = this.CardNoId;
			},
			async beforeClose(action, done) {
				// 点击确定调用接口
				try {
					Object.assign(this.fromData, {
						Action: "SetCard"
					});
					await vipCard(this.fromData, "WeChatCardOpera");
					// Cookie.set("isMember", "1");
					// Cookie.set("CardType", "05");
					this.$toast.success("绑定实体卡成功");
					this.$Router.push("/home/index");
				} catch (e) {
					this.$toast.fail(e);
				}
				done();
			},
			// 提交
			async clickSubmit() {
				
				if (!this.currentRouter) {
					this.usernameTip = this.bindListMe[0].hasOwnProperty("isShow") ?
						this.fromData.Username ?
						"" :
						"请输入名字" :
						"";
					// 是否存在用户名，再判断是否显示
					this.dayTip = this.bindListMe[1].hasOwnProperty("isShow") ?
						this.fromData.Birthday ?
						"" :
						"请选择生日" :
						"";
					this.sexTip = this.bindListMe[2].hasOwnProperty("isShow") ?
						this.fromData.Sex ?
						"" :
						"请选择性别" :
						"";
					this.Password =
						this.IsPass === "1" ?
						this.fromData.Password ?
						"" :
						"请填写密码" :
						"";
				}

				this.CodeTip = this.fromData.Code ? "" : "请填写验证码";
				if (!phoneReg(this)) {
					return;
				}
				if (this.CodeTip) {
					return false;
				} else {
					try {
						// this.$refs.btnDom.btnLoading = true;
						if (this.currentRouter) {
							// 绑定
							this.fromData.Type = 1;
							// 获取接口
							Object.assign(this.fromData, {
								Action: "SetCard"
							});
							let data = await vipCard(this.fromData, "WeChatCardOpera");
							Cookie.set("isMember", "1");
							if(data.Success){
								this.$toast.success("绑定实体卡成功");
								setTimeout(() => {
									this.$Router.push("/pages/home");
								}, 1000)
							}else{
								this.$toast.success(data.Message);
							}
							// 暂时注释
							// if (data.Data.CardList.length === 0 ) {
							// 	this.$toast.success("绑定成功");


							// 	Cookie.set("isMember", "1");
							// 	// Cookie.set("CardType", "05");
							// 	this.$Router.push("/pages/home");
							// } else {
							// 	//如果返回列表 就打开弹框
							// 	// 显示绑定卡弹框
							// 	// 默认选中第一个
							// 	this.bindCardList = data.Data.CardList;
							// 	this.CardNoId = this.bindCardList[0].CardNo;
							// 	// this.showListCard = true;
							// 	this.$refs.popup.open()
							// }
							// this.$refs.btnDom.btnLoading = false;
						} else {
							// 申请卡
							if (
								this.usernameTip ||
								this.dayTip ||
								this.sexTip ||
								this.Password
							) {
								return false;
							} else {
								this.fromData.Type = 0;
								Object.assign(this.fromData, {
									Action: "SetCard"
								});

								await vipCard(this.fromData, "WeChatCardOpera");
								Cookie.set("isMember", "1");
								// Cookie.set("CardType", "04");
								this.CodeNum = 0;
								// this.$refs.btnDom.btnLoading = false;
								this.$toast.success("申请成功");
								setTimeout(() => {
									this.$Router.push("/pages/home");
								}, 1000)
								
							}
						}
					} catch (e) {
						// this.$refs.btnDom.btnLoading = false;
						this.$toast.fail(e);
						this.CodeNum = 0;
					}
				}
			},
			confirmDate(val) {
				this.$set(this.fromData, 'Birthday', val.detail.value)
				// 点击确定选择日期
				this.dayTip = this.fromData.Birthday ? "" : "请选择生日";
			},
			onConfirm(value) {
				this.exhibitSex = this.columns[value.detail.value].text;
				this.fromData.Sex = this.columns[value.detail.value].id;
				this.sexTip = this.fromData.Sex ? "" : "请选择性别";
			},
			async getCodeFun(event) {
				if (phoneReg(this)) {
					// this.Timing(event);	
					// 发送验证码
					try {
						await vipCard({
								Action: "SendCode",
								Phone: this.fromData.Phone,
								Type:this.Type
							},
							"WeChatCardOpera"
						);
						this.Timing(event);
						this.$toast.success("发送至您的手机，注意查收");
					} catch (e) {
						this.CodeNum = 0;
					}
				}
			},
			Timing(event) {
				if (this.CodeNum === 0) {
					// event.target.removeAttribute('disabled')
					this.disabledBtn = false;
					this.getCodeNum = "获取验证码";
					this.CodeNum = 60;
				} else {
					// event.target.setAttribute('disabled')
					this.disabledBtn = true;
					this.getCodeNum = `已发送(${this.CodeNum}s)`;
					this.CodeNum--;
					setTimeout(() => {
						this.Timing(event);
					}, 1000);
				}
			},
			clickPhoneQue() {
				if(this.$Route.query.id == "1"){
					this.phone()
				}
				phoneReg(this);
			},
			// 失去焦点之后调用手机号码匹配
			async phone(){
				try {
					let data = await vipCard({
							Action: "VerifyPhone",
							Phone: this.fromData.Phone
						},
						"WeChatCardOpera"
					);
					if(data.Success){
						this.bindCardList = data.Data.CardList || [];
						this.fromData.CardNo = this.bindCardList[0].CardNo;
						if(this.Type == '1'){
							this.showCard = true;
							this.isActive = true;
						}						
					}else{
						this.$toast.fail(data.Message)
					}
				} catch (e) {
					this.$toast.fail(e);
					// this.CodeNum = 0;
				}
			},
			// 根据状态进行返回
			clickLeft(){
				this.$Router.push('/pages/home')
			},
			// 点击选择卡
			// chooseCard(val){
			// 	this.fromData.CardNo = val;
			// 	this.showCard = false;
			// 	this.showCardNo = true;
			// },value
			radioChange(val){
				this.fromData.CardNo = val.detail.value;
				this.showCard = false;
				this.showCardNo = true;
			},
			// 点击卡号再次选择卡号
			chooes(){
				this.showCard = true;
			}
		}
	};

	function phoneReg(_this) {
		let text = /^1\d{10}$/;
		// console.log(_this.fromData.Phone, '877655')
		if (!_this.fromData.Phone) {
			_this.phoneTip = "请输入手机号码";
			return false;
		} else if (!text.test(_this.fromData.Phone)) {
			_this.phoneTip = "手机号码不正确";
			return false;
		} else {
			_this.phoneTip = "";
			return true;
		}
		
	}
</script>

<style lang="less">
	.bindMicro {
		.wu-cell {
			background-color: #fff;
			position: relative;
			display: flex;
			box-sizing: border-box;
			width: 100%;
			padding: 10px 16px;
			color: #323233;
			font-size: 14px;
			line-height: 24px;
			background-color: #fff;
			position: relative;

			&__label {
				flex: none;
				box-sizing: border-box;
				width: 90px;
				box-flex: 0;
			}

			&__body {
				display: flex;
				align-items: center;
			}

			&__value {
				position: relative;
				overflow: hidden;
				color: #969799;
				vertical-align: middle;
				word-wrap: break-word;
				flex: 1;
			}

			.wu-field__control {
				color: #323233;
				line-height: inherit;
				text-align: left;
				background-color: transparent;
				min-width: 0;
				margin-right: 75px;
				font-size: 12px;
				height: 24px;
			}

			.wu-field__error-message {
				color: #ee0a24;
				font-size: 12px;
				text-align: left;
			}

			uni-input {
				font-size: 14px;
			}
		}

		.bindMicroTitle {
			text-align: center;
			margin: 20px 0;
		}

		.EntityCardShow {
			.van-dialog__header {
				padding-bottom: 10px;
			}
			
			.popst{
				background: #fff;
				max-height: 56vh;
				overflow-y: scroll;
				position: relative;
				.cardSty{
					display: inline-block;
					width: 93%;
					border-radius: 20px;
					border: 1px solid #c0cc48;
					background-color: #fff;
					margin: 10px;
					font-size: 15px;
					.EntityCardNa{
						margin: 14px 0 0 14px;
					}
					.EntityCard{
						display:inline-block;
						margin-right: 10px;
						height: 30px;
						margin: 5px 3% 10px;
						padding-left: 5px;
						box-sizing: border-box;
						position: relative;
						line-height: 30px;
					}
				}
			}
			
			
			// .EntityCard {
			// 	width: 94%;
			// 	height: 90px;
			// 	/*height: 50px;*/
			// 	/*line-height: 50px;*/
			// 	border: 1px solid #eee;
			// 	margin: 5px 3%;
			// 	border-radius: 15px 15px 10px 10px;
			// 	padding-left: 20px;
			// 	box-sizing: border-box;
			// 	position: relative;

			// 	.van-radio__label {
			// 		color: #fff;
			// 		width: 100%;
			// 	}

			// 	.van-radio__icon {
			// 		position: absolute;
			// 		right: 20px;
			// 	}

			// 	.EntityCardName {
			// 		line-height: 40px;
			// 	}

			// 	.EntityCardBalance {
			// 		font-size: 14px;
			// 	}
			// }

			.van-dialog__content {
				max-height: 60vh;
				/*    !*height: 90%;*!*/
				overflow-y: scroll;
			}
		}

		.btnBottom {
			margin: 0 10px;
		}

		.phoneStyle {
			background: #fff;
			position: relative;
			.active{
				background-color: #adb838;
			}
			button {
				position: absolute;
				top: 7px;
				right: 8px;
				background-color: #ccc;
			}
		}
	}
</style>
