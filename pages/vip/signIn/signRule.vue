<template>
	<view :class="mainStyle" class="bgcRule">
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickGo" title="签到规则" :status-bar="true" :shadow="false"></uni-nav-bar>
		<view class="rule">
			<view v-for="(item,index) in rule" :key="index" class="ruleSty">
				{{item}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mainStyle: getApp().globalData.mainStyle,
				rule:[]
			}
		},
		created() {
			let str = sessionStorage.getItem('signRule');
			this.rule = str.split(';');
			// console.log(this.rule)
		},
		methods: {
			clickGo(){
				window.history.back(-1)
			}
		}
	}
</script>

<style lang="less" scoped>
	.bgcRule{
		background-color: #fff;
		height: 100vh;
		.ruleSty{
			font-size: 15px;
			width: 90%;
			margin: 10px auto;
			color: #666;
		}
	}
</style>
