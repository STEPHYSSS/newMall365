export let Mixin = {
	props: {
		itemData: {
			type: Object,
			default() {
				return {}
			}
		},
		imgHeight: {
			type: String,
			default: '80px'
		},
		isShoppingCard: {
			type: Boolean,
			default: false
		},
		isOrder: {
			type: Boolean,
			default: false
		},
		isIntegral: {
			type: Boolean,
			default: false
		},
		seckill: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			list: []
		}
	},
	methods: {
		goodBoxCoupon(val) {
			this.$emit('goodBox', val)
			// this.$router.push({path: '/shoppingMall/couponPage/' + val.SID})
		},
		addCart() {
			// 加入购物车
		}
	}
}