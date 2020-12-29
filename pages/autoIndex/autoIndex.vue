<template>
	<view>
		<p>单独的调用门店列表</p>
	</view>
</template>

<script>
	import {
		vipCard
	} from '@/api/http.js';
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			this.getCouponInfo()
		},
		methods: {
			async getCouponInfo(){
				try {
					let { Data } = await vipCard({
						Action: "GetShopList"
					}, "UShopOpera");
					console.log(Data)
				} catch (e) {
					console.log(e);
				}
			},
		}
	}
</script>

<style>

</style>
