<template>
	<view>
		<view class="surplusBottom">
			<wuc-tab textFlex :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange" tab-class="'text-center','text-black','bg-white'"
			 :select-class="'btnMy'+colorIndex" style="background-color: #ADB838;color: #fff;"></wuc-tab>
			<view v-if="RebateList.length>0">			
				<view v-for="(item,index) in RebateList" :key="index" class="van-cell">
					<view class="van-cell__title">
						<!-- <view class="titleHear" style="flex: 1;height: 55px;">
							<view class="" style="display: inline-block;">
								<image :src="imgUrl" style="width: 20px;height: 20px;display: inline-block;margin: 2px;"></image>
							</view>
							<span>返佣明细</span>
							<div style="float: right;color: #cfcfcf;">{{item.AddTime}}</div>
						</view> -->
						<view class="myFanIcon titleHear">
							<image :src="imgUrl" style="width: 18px;height: 18px;"></image>
							<text>返佣明细</text>
							<text style="text-align: right;color: #cfcfcf;width: calc(100% - 100px);">{{item.AddTime}}</text>
						</view>
						<view style="display: flex;text-align: center;">
							<view style="flex: 1;">								
								<view class="custom-time custom-Color">{{item.Money}}</view>
								<span class="custom-time3">返佣金额（元）</span>
							</view>
							<view style="flex: 1;">
								<view class="custom-time custom-Color1">{{item.SumPayAmt}}</view>
								<span class="custom-time3">订单金额（元）</span>
							</view>	
							<view style="flex: 1;">
								<view class="custom-time custom-Color2">{{item.State|StateTips}}</view>
								<span class="custom-time3">返佣状态</span>
							</view>	
						</view>					
						
					</view> 
				</view>				
			</view>
			<a-nodeData stringVal="暂无数据" v-if="!loading&&RebateList.length===0"></a-nodeData>
		</view>
	</view>
</template>

<script>
	import {vipCard} from '@/api/http.js';
	import WucTab from '@/components/wuc-tab/wuc-tab.vue';
	export default {
		data() {
			return {
				state:'',
				RebateList:[],
				TabCur: 0,
				loading:true,
				tabList: [{
					name: '全部'
				}, {
					name: '已返佣'
				}, {
					name: '未返佣'
				}],
				colorIndex: '1',
				imgUrl:require("@/static/img/yongjinIcon.png"),
			}
		},
		components:{WucTab},
		created() {
			this.GetRebateLog();
		},
		
		filters:{
			StateTips(val){
				if(val == '1'){
					return '审核中'
				}else{
					return '已返佣'
				}
			}
		},
		methods: {
			async GetRebateLog(){
				this.loading = true;
				try {
					let data = await vipCard({
						Action: "GetRebateLog",
						State:this.state,
					}, "UMemberOpera");
					this.RebateList = data.Data.RebateList||[]
					this.loading = false;
				} catch (e) {
					this.loading = false;
				}
			},
			tabChange(index) {
				if(index=='0'){
					this.state = '';
					this.GetRebateLog();
				}else if(index=='1'){
					this.state = '2';
					this.GetRebateLog();
				}else if(index=='2'){
					this.state = '1';
					this.GetRebateLog();
				}
				this.TabCur = index
			},
		}
	}
</script>

<style lang="less" scoped>
.surplusBottom {
		width: 100%;
		.van-cell-group {
			background-color: transparent;
		}

		.titleHear {
			padding-bottom: 16px;
			position: relative;

			&:after {
				position: absolute;
				box-sizing: border-box;
				content: " ";
				pointer-events: none;
				right: -15px;
				left: 0;
				bottom: 6px;
				border-bottom: 1px solid #ebedf0;
				transform: scaleY(0.5);
			}
		}

		.custom-time {
			margin-top: 3px;
			color: #969799;
			font-size: 18px;
			line-height: 18px;
			letter-spacing: 1px;	
			margin-bottom: 5px;
		}
		.custom-Color{
			font-weight: 600;
		}
		.custom-Color1{
			color: #333333;
		}
		.custom-Color2,.custom-Color{
			color: #FF7D91;
		}
		.custom-Color2{
			font-size: 15px;
		}
		.custom-time3{
			color: #3A3A3A;
			font-size: 12px;
		}
		.custom-label {
			margin-top: 3px;
			color: #969799;
			font-size: 12px;
			line-height: 18px;
		}

		.noneData {
			text-align: center;
			position: relative;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			margin: 40px 0;
			padding-bottom: 20px;
		}
	}

	.van-cell {
		margin-bottom: 10px;
		position: relative;
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 16px;
		overflow: hidden;
		color: #323233;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
	}

	.van-cell__title {
		flex: 1;
		.myFanIcon{
			height: 44px;
			display: flex;
			image{
				display: inline-block;
				margin: 20px 4px;
			}
			text{
				display:inline-block;
				letter-spacing: 1px;
				margin: 16px 0;
				font-size: 15px;
			}
		}
	}
	/deep/.cur{
		border-radius: 25px;
		background-image: linear-gradient(to right, #909C12, #D3DF55);		
		border-radius: 25px;
		font-size: 16px;
		color: #fff;
		height: 35px;
		line-height: 35px;
		margin-top: 2%;
		// border: 1px solid;
	}
</style>
