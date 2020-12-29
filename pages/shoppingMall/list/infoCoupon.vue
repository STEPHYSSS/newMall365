<template>
    <div>
		<!-- 优惠券详情 -->
        <!-- <couponPage :goods="goodList" v-if="this.goodList.Name"></couponPage> -->
    </div>
</template>

<script>
import {vipCard} from '@/api/http.js'

export default {
	components: {},
	data() {
		return {
			goodList: {}
		}
	},
	created() {
		// 当前购买商品的id 根据id获取商品信息
		// console.log(this.$route.params.id, 5555)
		this.getInfo()
	},
	methods: {
		async getInfo() {
			try {
				let data = await vipCard({Action: 'GetTicket', SID: this.$Route.params.id}, 'UTicketOpera')
				// console.log(data, 444555)
				this.goodList = data.Data.Ticket || []
			} catch (e) {
			}
		}
	}
}
</script>

<style scoped lang="less">
</style>