<template>
	<view>
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickGo" title="权益详情" :status-bar="true" :shadow="false"></uni-nav-bar>
		<view class="interests">
			<div v-if="NumList.length>0" class="leaderBox" style="background-color: #fff;">
				<h3 style="padding: 5px 10px; ">剩余次数</h3>
				<uni-grid :column="3" :show-border="false"  :square="false">
				    <uni-grid-item v-for="(item,index) in NumList" :key="index">
				        <text class="text" style="text-overflow: ellipsis;
overflow: hidden;
white-space: nowrap;
width: 90%;
padding: 5px 8px;
">
						<span style="">{{item.BeneDesc}}</span>
						<span style="color: #D6A874;padding-left: 4px;">x{{item.ResidueNum}}</span>
						</text>
				    </uni-grid-item>
				</uni-grid>
				<!-- <div v-for="(item,index) in NumList" :key="index" style="width: 28%;display: inline-block;">
					<div style="background-color: #fff;margin: 5px;">
						<span>{{item.BeneDesc}}</span><span style="color: #D6A874;padding-left: 4px;">x{{item.ResidueNum}}</span>
					</div>
				</div> -->
				
			</div>
			<a-nodeData stringVal="暂无数据" v-if="!loading&&list.length===0"></a-nodeData>
		</view>
	</view>
</template>

<script>
	import { vipCard } from "@/api/http.js";
	import modal from '@/components/modal/modal'
	import { GetAppNo } from "@/util/publicFunction";
	export default {
		data() {
			return {
				loading:true,
				NumList:[],//剩余数量
				UseList:[],//使用次数
				SID:this.$route.query.SID,
				BeneNo:this.$route.query.BeneNo,
			}
		},
		created() {
			this.getInfo();
		},
		methods: {
			clickGo(){
				this.$Router.pushTab({
					path: "/pages/home"
				});
			},
			// 获取我的权益信息
			async getInfo(){
				try {
					let { Data } =  await vipCard({Action:'GetCardBeneInfo',BeneNo:this.BeneNo,
						SID:this.SID}, "UBeneOpera");
					this.NumList = Data.NumList||[];
					this.UseList = Data.UseList||[];
				} catch (e) {
					this.$toast(e)
				}
			}
		}
	}
</script>

<style lang="less">
	.interests{
		width: 94%;
		height: 100%;
		margin: 0 auto;		
	}
	.interests {
			margin: 10px;
			.van-cell{
				display: inline-block;
			}
			.van-cell-group {
				background-color: transparent;
			}
			.leaderBox{
				// background-color: #fff;
				// height: 300px;
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
				font-size: 14px;
				line-height: 18px;
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
		}
</style>
