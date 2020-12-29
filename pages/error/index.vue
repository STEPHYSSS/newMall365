<template>
	<div>
		<error :title="title" :redirect_uri="redirect_uri"></error>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				redirect_uri: '',
				title: '加载失败，重新刷新页面'
			}
		},
		onLoad(option) {
			if (option.query) {
				let options = JSON.parse(option.query)
				this.redirect_uri = options.redirect_uri
				this.title = options.title ? options.title : '加载失败，重新刷新页面'
			}

		},
		methods: {}
	}
</script>

<style scoped>

</style>
