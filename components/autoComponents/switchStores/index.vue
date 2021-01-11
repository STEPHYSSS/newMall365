<template>
	<div class="switchStores">
		<!-- 切换门店 -->
		<div class="topStyle">
			<i class="icon iconfont icon-dianpu"></i>
			<span class="title">{{info.Name}}</span>
			<span @click="switchStores">[切换]</span>
		</div>
	</div>
</template>

<script>
	import Cookie from '@/config/cookie-my/index.js';
	export default {
		name: "",
		data() {
			return {
				info: {}
			};
		},
		created() {
			this.info = this.$store.state.currentStoreInfo || {}
		},
		components: {},
		mounted() {},
		methods: {
			switchStores(){
				this.$Router.push({
					path: '/pages/myAddress/myAddress',
					query: {
						flag: 'shopAuto'
					}
				})
			}
		}
	};
</script>

<style lang="less" scoped>
	.switchStores {
		padding: 0 15px;
		background: #fff;
		line-height: 30px;

		.topStyle {
			display: flex;
		}

		.title {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			flex: 1;
			margin-left: 8px;
		}
	}
</style>
