export default {
	get(val) {
		return uni.getStorageSync(val);
	},
	set(val, params) {
		return uni.setStorageSync(val, params);
	},
	remove(val){
		return uni.removeStorageSync(val);
	}
}
