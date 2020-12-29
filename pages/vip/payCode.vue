<template>
	<view>
		<!-- <uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickLeft" :noG0="true" title="二维码支付" :status-bar="true" :shadow="false"></uni-nav-bar> -->
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickLeft"  title="二维码支付" :status-bar="true" :shadow="false"></uni-nav-bar>
		<view class="vipQR-code-page" v-if="loadding">
			<view class="vipQR-code">
				<view class="vipQR-backg">
					<view class="topRound">
						<image src="@/static/img/vipIcon.png"></image>
					</view>
					<view class="vip-strip-line">
						<view class="vip-title">请向收银员出示二维码完成支付</view>

						<view class="barcode-style">
							<canvas id="barcode" canvas-id="barcode" :style="{width:windowWidth,height:'70px'}"></canvas>
						</view>
						<view>
							<canvas class="qrcode-style" id="qrcode" canvas-id="qrcode" :style="{width:windowWidth,height:'240px'}"></canvas>
						</view>

						<!-- <view style="margin-top: 4%;">
							<text style="color:#777">卡余额：</text>
							<text style="color:rgb(0,100,0)">{{cardBalance}}</text>
						</view> -->
						<!-- 	<view class="vip-code-tap">
							请在十分钟内扫码完成支付
						</view> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		vipCard
	} from '@/api/http.js'
	let app = getApp()
	const {
		barcode,
		qrcode
	} = require('@/util/codeChange/index.js')
	export default {
		data() {
			return {
				windowWidth: '',
				cardBalance: 0,
				loadding: false
			}
		},
		onLoad: function(options) {
			this.windowWidth = (uni.getSystemInfoSync().windowWidth - 40 - 10 - 30) + 'px'
			this.isPasswordGet()
		},
		methods: {
			async isPasswordGet() {
				this.loadding = false
				uni.showLoading()
				try {
					let data = await vipCard({
						Action: 'PaymentCode'
					}, 'UCardTransOpera')
					setTimeout(() => {
						barcode('barcode', data.Data.CardCode, this.windowWidth, 60);
						qrcode('qrcode', data.Data.CardCode, 250, 250);
					}, 100)
					this.loadding = true
					uni.hideLoading()
				} catch (e) {
					this.loadding = true
				}
			},
			onShow: function() {},
			
			clickLeft(){
				if(this.$Route.query.flag){
					this.$Router.push({path: "/pages/shoppingMall/login"});
				}else{
					this.$Router.push({path: "/pages/home"});
				}
				
			}
		}
	}
</script>

<style scoped>
	.card {
		padding: 10px 15px;
	}

	.code-input-all-style {
		font-size: 11pt;
	}

	.code-input-style {
		display: inline-block;
		background: transparent;
		vertical-align: middle;
		margin-left: 25px;
	}

	.vipQR-code-page {
		width: 100%;
		min-height: 100vh;
		background: #242424;
		padding: 50px 20px 20px;
		box-sizing: border-box;
	}

	.vipQR-code {
		width: 100%;
		min-height: 100%;
		padding: 10px;
		background: #dad3d0;
		box-sizing: border-box;
		position: relative;
	}

	.vipQR-backg {
		width: 100%;
		min-height: 100%;
		border: 1px solid #bdb5a5;
		text-align: center;
	}

	.topRound {
		width: 60px;
		height: 60px;
		border: 1px solid #df9e13;
		background: #efefe7;
		border-radius: 50%;
		position: absolute;
		top: -35px;
		margin-left: 50%;
		left: -30px;
		text-align: center;
	}

	.topRound image {
		width: 60%;
		height: 60%;
		line-height: 60px;
		margin-top: 10px;
	}

	.vip-title {
		color: #df9e13;
		font-size: 16px;
	}

	.vip-strip-line {
		font-size: 11pt;
		margin-top: 10%;
		margin-bottom: 10%;
		padding: 10px;
	}

	.barcode-style {
		margin-top: 15px;
	}

	.code-str {
		color: #df9e13;
		font-size: 10pt;
	}

	.qrcode-style {
		margin-left: 50%;
		transform: translateX(-125px);
	}

	.vip-code-tap {
		color: rgb(163, 162, 157);
		margin-top: 5px;
	}

	.vip-code-refresh {
		display: inline-block;
		/* vertical-align: middle; */
		color: #df9e13;
		margin-left: 5px;
	}
</style>
