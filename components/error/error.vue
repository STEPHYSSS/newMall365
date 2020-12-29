<template>
	<div class="errorRefresh">
		<text class="iconW iconfont icon-abnor"></text>
		<br>
		<div>{{title}}</div>
		<button v-if="showBtn" class="btn" size="mini" @click="refreshFun">刷新</button>
		<button v-if="showBtn" class="btn" size="mini" @click="clickciioke">清除缓存</button>
	</div>
</template>

<script>
	export default {
		props: {
			errorNum: Number,
			title: {
				type: String,
				default: '加载失败，请稍后刷新～'
			},
			showBtn: {
				type: Boolean,
				default: true
			},
			redirect_uri: [String]
		},
		name: "LoadError",
		data() {
			return {}
		},
		onLoad(option) {},
		methods: {
			refreshFun() {
				// console.log(this.redirect_uri, '-------option.redirect_uri')
				window.location.href = this.redirect_uri
				
			},
			clickciioke() {
				uni.clearStorageSync();
			}
		}
	}
</script>

<style scoped lang="less">
	.errorRefresh {
		text-align: center;
		position: absolute;
		left: 50%;
		top: 44%;
		transform: translate(-50%, -50%);

		.iconW {
			display: block;
			/*width: 50vw;*/
			/*height: 50vw;*/
			/*margin-bottom: 20px;*/
			font-size: 40vw;
			color: #909090;
		}

		.btn {
			margin-top: 20px;
			padding: 0 40px;
		}
	}
</style>
