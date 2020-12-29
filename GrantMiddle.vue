<template>
	<div class>
	</div>
</template>

<script>
	// import Cookie from "js-cookie";
	import Cookie from '@/config/cookie-my/index.js'
	import {
		GetQueryString
	} from "@/util/publicFunction";

	export default {
		name: "",
		data() {
			return {
				myCode: "",
				url: "",
				text: '',
				text1: ''
			};
		},
		created() {},
		components: {},
		async mounted() {
			let url = Cookie.get("currentUrl");
			let UserMACPhone = Cookie.get("UserMACPhone");
			if (UserMACPhone) {
				// 有UserMACPhone的时候,不让进来
				if (url) {
					window.location.href = url;
				}
				return
			}
			//   获取code
			let newAppNo = sessionStorage.getItem("AppNo");
			let code = this.setCode("code");
			if (code && code !== "undefined") {
				Cookie.remove("UserMACPhone");
				try {
					await this.$store.dispatch("get_user", {
						AppNo: newAppNo,
						Code: code						
					});
					let getPath = url.split('#')
					
					this.url = url;
					
					this.$Router.push({
						path: getPath[1],
					});
					
		
				} catch (e) {
					// // 	//获取mac失败
					this.$Router.push({
						path: "/pages/error/index",
						query: {
							redirect_uri: url + "&code=" + code,
							title: "UserMAC获取失败"
						}
					});
				}
			} else {
				this.$Router.push({
					path: "/pages/error/index",
					title: "code获取失败"
				});
			}
		},
		methods: {
			setCode(name) {
				let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				let r
				// if (window.location.search) {
				// r = window.location.search.substr(1).match(reg);
				// }
				let a = window.location.href
				if (a.indexOf('query') > -1) {
					a = decodeA(a)
					if (JSON.stringify(a) != '{}') return a[name]
				} else {
					let b = a.substr(a.indexOf(name), a.length - 1)
					r = b.match(reg)
					if (r != null) return unescape(r[2]);
				}
				return null;
			}
		}
	};

	function decodeA(a) {
		if (a.indexOf('query') > -1) {
			let queryObj = a.substr(a.indexOf('query') + 6, a.length - 1)
			try {
				let queryObjP = JSON.parse(queryObj)
				if (typeof queryObjP == 'object') {
					return queryObjP
				}
			} catch (e) {
				a = decodeURIComponent(a)
				return decodeA(a)
			}

		} else {
			return a
		}
	}
</script>

<style lang="less" scoped>
</style>
