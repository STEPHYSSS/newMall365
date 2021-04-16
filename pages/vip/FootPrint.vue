<template>
	<div class="footPrint">
		<!-- <uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickGo" title="我的足迹" :status-bar="true" :shadow="false"></uni-nav-bar> -->
		<view class="myFanIcon">
			<image :src="imgUrl" style="width: 24px;height: 24px;"></image>
			<text>足迹详细</text>
		</view>
		<div class="leaderBox" v-if="footPrintList.length>0">
			<view class="boxFlex" v-for="(item,index) in result" :key="index">
				<view>
					<view class="Time">
						{{item.UpTime}}
					</view>
					<view class="outer-box">
						<view v-for="(item2,index) in item.arr" :key="index" class="boxSty inner-item" @click="toGoodInfo(item2)">
							<view>
								<image :src="item2.Img | fmtImgUrl" style="margin: 0 auto;"></image>								
								<view style="color: #F95E51;">
									<span>{{item2.Name}}</span>
									<text>￥</text><text style="font-size: 15px;">{{item2.SalePrice}}</text>
								</view>
							</view>
						</view>
					</view>
					
				</view>
			</view>
		</div>
		<a-nodeData stringVal="暂无数据" v-if="!loading&&footPrintList.length===0"></a-nodeData>		
	</div>
</template>

<script>
	import {vipCard} from '@/api/http.js'
	export default {
		name: "FootPrint",
		data() {
			return {
				footPrintList:[],
				loading: true,
				imgUrl:require("@/static/img/zujiIcon.png"),
				result:[]
			}
		},
		async onLoad(option) {
			await this.getList();
		},
		methods: {
			// 列表信息
			async getList() {
				this.loading = true;
				try {
					let data = await vipCard({
						Action: "GetFootPrint"
					}, "UMemberOpera");
					this.footPrintList = data.Data.FootPrintList||[];
					let result = []
					for (let i = 0; i < this.footPrintList.length; i++) {
					  let element = this.footPrintList[i]
					//   if (i === 0) {
					//     result.push({
					//       UpTime: element.UpTime,
					//       arr: new Array(element)
					//     })
					//   }
					  const findRes = result.find(item => item.UpTime === element.UpTime)
					  if (findRes) {
					    findRes.arr.push(element)
					  } else {
					    result.push({
					      UpTime: element.UpTime,
					      arr: new Array(element)
					    })
					  }
					}
					this.result = result;
					this.loading = false;
				} catch (e) {
					this.loading = false;
				}
			},
			// 返回
			clickGo() {
				this.$Router.pushTab({
					path: "/pages/home"
				});
			},
			toGoodInfo(item){
				this.$Router.push({path:"/pages/shoppingMall/list/infoGood",query:{
					SID:item.ProdSID
				}})
			}
		},
		filters: {
		},
	}
</script>

<style scoped lang="less">
.footPrint{
	height: 100%;
	text-align: center;	
	background-color: #fff;
	.myFanIcon{
		height: 55px;
		display: flex;
		image{
			display: inline-block;
			margin: 15px 10px 15px 10px;
		}
		text{
			display:inline-block;
			font-size: 16px;
			letter-spacing: 1px;
			margin: 16px 0;
		}
	}
}
.leaderBox{
	width: 100vw;
	height: 100vh;
	overflow-y: scroll;
	.boxFlex{
		width: 95%;
		margin: 0 auto;
		display: flex;
		flex-flow: wrap;
		justify-content: space-between;
		.Time{
			text-align: left;
			height: 30px;
			padding-left: 4px;
			font-size: 14px;
		}
		.outer-box{			
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			.inner-item{
				width: 102px;
				box-sizing: border-box;
				border: 1px solid #CCCCCC;
				border-radius: 5px;
				margin-right: 12px;
				margin-bottom: 14px;
				image{
					width: 100px;
					height: 100px;
					border-radius: 5px 5px 0 0;
				}
			}
		}
		span{
				color: #333;
				padding: 5px 0;
				display: block;
			}
		&::after{
			content: '';
			width: 100px;
		}
	}
}
</style>
<!--  -->