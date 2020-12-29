<template>
	<div class="spreadList">
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickGo" title="我的分享" :status-bar="true" :shadow="false"></uni-nav-bar>
		<div class="leaderBox" >
			<!-- 推广图片， 推广链接 商品名称 -->
			<div class="good_card_box" style="margin-bottom:10px">
				<div v-for="(item,index) in spreadArr" :key="index" class="shareImg">
					<image :src="item.Img | fmtImgUrl"></image>
					<p>{{item.Name}}</p>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	import {vipCard} from '@/api/http.js'
	import adCell from '@/node_modules/adcell/ADCell2.vue';
	export default {
		name: "spreadList",
		components: {
			adCell
		},
		data() {
			return {
				loading: true,
				spreadArr:[]
			}
		},
		async onLoad(option) {
			await this.getList();
		},
		// filters: {
		// 	imgFilter(val) {
		// 		let localUrl = window.location.href;
		// 		let localToken = localUrl.split("#")[0]
		// 		return `http://dingtalk.bak365.cn/WeixinNew/Dist/../` + val
		// 	}
		// },
		methods: {
			// 列表信息
			async getList() {
				this.loading = true;
				try {
					let data = await vipCard({
						Action: "GetSpreadList"
					}, "UMemberOpera");
					this.spreadArr =data.Data.SpreadList;
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
		}
	}
</script>
haod
<style scoped lang="less">
	.shareImg{
		display: inline-block;
		float: left;
		margin: 10px;
		background-color: #FFFFFF;
		width: 27%;
		height: 30%;
		image{
			width: 100%;
			height: 80px;
		}
		p{
			text-align: center;
			margin: 5px 0px;
		}
	}
</style>
