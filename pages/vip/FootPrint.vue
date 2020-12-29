<template>
	<div class="footPrint">
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickGo" title="我的足迹" :status-bar="true" :shadow="false"></uni-nav-bar>
		<!-- <div class="leaderBox" v-if="footPrintList.length>0" >
			<div v-for="(item,index) in footPrintList" :key="index">
				<p class="fansBox">
					<image :src="item.Img | imgFilter"></image>
					<span>{{item.Name}}</span>
				</p>
			</div>
		</div> -->
		<div class="leaderBox" v-if="footPrintList.length>0">
			<uni-grid :column="3">
			    <uni-grid-item class="Imglist" v-for="(item,index) in footPrintList" :key="index" style="height: 145px;">
			        <image :src="item.Img | fmtImgUrl" style="margin: 0 auto;"></image>
			        <span>{{item.Name}}</span>
			    </uni-grid-item>
			</uni-grid>

		</div>
		<a-nodeData stringVal="暂无数据" v-else></a-nodeData>		
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
					this.footPrintList =data.Data.FootPrintList;
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
			}
		},
		filters: {
			// imgFilter(val) {
			// 	let localUrl = window.location.href;
			// 	let localToken = localUrl.split("#")[0]
			// 	return `http://dingtalk.bak365.cn/WeixinNew/Dist/../` + val
			// }
		},
	}
</script>

<style scoped lang="less">
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
.footPrint{
	height: 100%;
	text-align: center;	
}
.leaderBox{
	width: 100vw;
	height: 100vh;
	overflow-y: scroll;
	background-color: #fff;	
	.Imglist{
		margin: 10px 0;
		box-sizing: border-box;
		image{
			width: 110px;
			height: 110px;
			
		}
		span{
			padding: 5px 0;
			display: block;
		}
	}
}
</style>
<!--  -->