<template>
	<div>
		<!-- 公告 -->
		<div class="van-notice-bar" content bg_color="#fff8e9" color="#666" type="notice" __zent-design-uuid__="f427e633-6a4f-4825-b68f-01edded1e829"
		 :style="{'color': currentObj.textColor, 'background': currentObj.backGColor}">
			<i class="van-icon van-icon--image van-notice-bar__left-icon">
				<image src="https://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png" />
			</i>
			<div class="van-notice-bar__wrap" ref="vanNoticeBarW">
				<uni-notice-bar :speed="50" :background-color="currentObj.backGColor" :color="currentObj.textColor"
				 scrollable="true" single="true" :text="currentObj.noticeText"></uni-notice-bar>
			</div>
		</div>
	</div>
</template>

<script>
	import Mixins from "../public";
	export default {
		mixins: [Mixins],
		props: {
			propsObj: {
				type: Object,
				default () {
					return {
						noticeText: "请填写内容，如果过长，将会自手机上滚动显示",
						textColor: "rgb(102, 102, 102)",
						backGColor: "rgb(255, 248, 233)",
						scrollable: true
					};
				}
			}
		},
		data() {
			return {
				// currentObj: {
				//   noticeText: this.propsObj.noticeText,
				//   textColor: this.propsObj.textColor,
				//   backGColor: this.propsObj.backGColor
				// }
				//在手机端组件时，记得把scrollable设置成true
				scrollable: true
			};
		},
		mounted() {
		},
		methods: {
			changeStyle() {
				// bus.$on("noticeFun", obj => {
				//   this.currentObj.noticeText = obj.noticeText
				//     ? obj.noticeText
				//     : "请填写内容，如果过长，将会自手机上滚动显示";
				//   this.currentObj.textColor = obj.textColor;
				//   this.currentObj.backGColor = obj.backGColor;
				// });
			}
		}
	};
</script>

<style lang="less" scoped>
	/* @import "../../../assets/css/autoComponents/showcase.css"; */
	.van-notice-bar {
		align-items: center;
		display: flex;
		height: 40px;
		padding: 0 15px;
		font-size: 14px;
		line-height: 24px;
		position: relative;
		overflow: hidden;

		.uni-noticebar {
			padding: 11px 12px;
		}
	}

	.van-icon--image {
		width: 1em;
		height: 1em;
		margin-right: 5px;

		img,
		image {
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			max-width: 100%;
			max-height: 100%;
			position: absolute;
		}
	}

	.van-icon {
		position: relative;
	}

	.van-notice-bar__left-icon {
		font-size: 16px;
		min-width: 20px;

		img,
		image {
			height: auto;
			vertical-align: baseline;
		}
	}

	.van-ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.van-notice-bar__wrap {
		flex: 1;
		height: 40px;
		line-height: 40px;
		overflow: hidden;
		position: relative;
	}

	.van-notice-bar__content {
		position: absolute;
		white-space: nowrap;
	}

	.van-notice-bar__content.van-ellipsis {
		max-width: 100%;
	}
</style>
