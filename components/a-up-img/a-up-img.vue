<template>
	<div>
		<!-- #ifndef H5-->
		<cover-image :src="dataIMg" class="eeeeeee" :style="{width: width,height: height}">
		</cover-image>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<img :src="dataIMg" :style="{width: width,height: height}" />
		<!-- #endif -->
	</div>
</template>

<script>
	export default {
		props: {
			url: [String],
			width: {
				type: String,
				default: () => {
					return '80px'
				}
			},
			height: {
				type: String,
				default: () => {
					return '80px'
				}
			}
		},
		created() {
		},
		data() {
			return {
				dataIMg: this.url
			}
		},
		// filters:{
		// 	imgFilter(val){
		// 		return `http://dingtalk.bak365.cn/WeixinNew/Dist/` + val
		// 	}
		// },
		methods: {
			errorIMg() {
				this.dataIMg = '/static/assets/img/defaultGood.png'
			},
			loadIMg() {
				// this.dataIMg = setImg(this.img) || ''
			}
		}
	}
</script>

<style>
</style>
