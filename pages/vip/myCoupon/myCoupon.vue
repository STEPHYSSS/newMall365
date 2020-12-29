<template>
	<view class="coupon-list-style">
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickGo" title="优惠券" :status-bar="true" :shadow="false"></uni-nav-bar>
		<view>
			<wuc-tab textFlex :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange" tab-class="'text-center','text-black','bg-white'"
			 :select-class="'btnMy'+colorIndex"></wuc-tab>
			<view>
				<coupon-box v-if="dataList.length>0" :dataList="fromData" :activeUser="TabCur" @viewMore="viewMore"></coupon-box>
				<a-nodeData v-if="(dataList.length===0)"></a-nodeData>
			</view>
		</view>

		<!-- <uni-popup :show="showInfo" @change="onCloseInfo">
			<view class="showInfo-style">
				<view class="show-head-style">详细信息</view>
				<view class="show-center-style">
					<text>{{currentShowStr}}</text>
				</view>
				<view :class="'btnMy'+colorIndex">
					<button @click="onCloseInfo({show:false})">
						我知道了
					</button>
				</view>

			</view>
		</uni-popup> -->
	</view>
</template>

<script>
	import { vipCard } from "@/api/http.js";
	import couponBox from '@/components/couponBox/index.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import WucTab from '@/components/wuc-tab/wuc-tab.vue';
	import noData from '@/components/nodeData/index.vue';
	export default {
		components: {
			WucTab,
			uniPopup,
			couponBox,
			noData
		},
		data() {
			return {
				TabCur: 0,
				tabList: [{
					name: '未使用'
				}, {
					name: '已使用'
				}, {
					name: '已过期'
				}],
				radioCoupon: "1",
				// 查看详情
				showInfo: false,
				activeUser: 0,
				dataList: [
					// {
					// BackDate: "",
					// CodeNo: "BC273786384",
					// KindName: "5元优惠券",
					// Discount: "",					
					// KindNo: "ZQ1",
					// MinUseAmt: "20.00",//满多少可使用
					// PreValue: "50",//金额
					// SaleDate: "2020-09-21 22:30:12",//购买时间
					// StartDate: "2020-09-19 22:30:12",//开始时间
					// Type: "1",
					// ValidDate: "2020-10-08 22:30:12"},
					],//结束时间
				fromData: [],
				isOrder: false,
				// 当前显示的详情弹框内容
				currentShowStr: '',
				disabledBtn: false,
				colorIndex: getApp().globalData.colorIndex,
				state:'2'
			}
		},
		created() {
			this.getGetTicketList();
		},
		methods: {
			async getGetTicketList(){
				// uni.showLoading({
				// 	title: '加载中'
				// })
				let Data = await vipCard({
						Action: "GetTicketList",
						State:this.state
					},
					"UMemberOpera"
				);
				this.dataList = Data.Data.TicketList;
				this.fromData = Data.Data.TicketList;
				// uni.hideLoading();
				// GetTicketList
			},
			tabChange(index) {
				if(index=='1'){
					this.state = '3'
					this.getGetTicketList()
				}else if(index==2){
					this.state = '1'
					this.getGetTicketList()
				}else{
					this.state = '2'
					this.getGetTicketList()
				}
				this.TabCur = index
			},
			onCloseInfo(e) {
				if (!e.show) {
					this.showInfo = false
				}
			},
			viewMore(val) {
				this.showInfo = true
				this.currentShowStr = val
			},
			changeCouponActive(e) {
				pageIndex = 1
				this.dataList = []
				this.activeUser = e.detail.index
			},
			clickGo(){
				this.$Router.push('/pages/home')
			}
		},
		onReachBottom: function() {
			if (this.dataList.length > 0) {
				//获取订单列表
			}
		},
		// watch: {
		// 	TabCur(val){
		// 		setFilter(val);
		// 	}
		// }
	}
	// function setFilter(num) {//过滤状态
	// console.log(num)
	// 	let arr = [];
	// 	if(!this.dataList || this.dataList.length === 0){
	// 		this.fromData = []
	// 		return
	// 	}
	// 	if(num == '0'){
	// 		arr = this.dataList.filter(item => item.State == "2");
	// 		// arr = this.dataList;
	// 	}else if(num == '1'){
	// 		arr = this.dataList.filter(item => item.State == "3");
	// 	}else{
	// 		arr = this.dataList.filter(item => item.State == "1");
	// 	}
	// 	this.fromData = arr
	// }
</script>

<style lang="scss">
	.coupon-list-style {
		min-height: 100vh;
		background: rgb(244, 244, 244);
		/* padding: 10px; */
		box-sizing: border-box;

		.show-head-style {
			text-align: center;
			line-height: 25px;
			border-bottom: 1px solid rgb(177, 176, 176);
			padding-bottom: 10px;
		}

		.text-center {
			text-align: center;
			font-size: 10pt;
		}

		.text-black {
			color: #333333;
		}

		.bg-white {
			background-color: #ffffff;
		}

		.showInfo-style {
			font-size: 11pt;
		}

		.show-head-style {
			text-align: center;
			line-height: 25px;
			border-bottom: 1px solid rgb(177, 176, 176);
			padding-bottom: 10px;
		}

		.show-center-style {
			padding: 15px 0;
			margin-bottom: 5px;
			height: 180px;
			overflow-y: scroll;
		}

		.uni-popup__wrapper-box {
			background: #fff;
		}

	}
</style>
