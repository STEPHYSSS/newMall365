<template>
	<div class="myFans">
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickGo" title="我的粉丝" :status-bar="true" :shadow="false"></uni-nav-bar>
		<div class="leaderBox" v-if="myFansList.length>0">
			<div v-for="(item,index) in myFansList" :key="index">
				<p class="fansBox">
					<image :src="item.Headimgurl"></image>
					<span>{{item.NickName}}</span>
				</p>
			</div>
		</div>
		<!-- <div v-else style="position: absolute;top: 5%;">暂无数据</div> -->
		<a-nodeData stringVal="暂无数据" v-else></a-nodeData>
	</div>
</template>

<script>
	import {vipCard} from '@/api/http.js'
	export default {
		name: "myFans",
		data() {
			return {
				myFansList:[],
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
						Action: "MyFans"
					}, "UMemberOpera");
					this.myFansList = data.Data.Fans || [];
					this.loading = false;
				} catch (e) {
					this.$toast(e)
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

<style scoped lang="less">
	.leaderBox{
		background-color: #f1f3f3;
		height: 93vh;
	}
.fansBox{
	width: 78px;
	text-align: center;
	float: left;
	margin: 10px 5px 0 8px;
	image{
		width: 35px;
		height: 35px;
		border-radius: 50%;
	}
	span{
		display: block;
	}
}
</style>
