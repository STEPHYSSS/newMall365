<template>
	<!-- 语音 -->
	<div class="cap-showcase-audio" @touchend="touchendAudio">
		<!-- <audio @ended="endedAudio" @play="loadAuido" @pause="pauseAuido" :loop="currentObj.loopPlay" ref="audio">
			<source :src="currentMp3" type="audio/mp3" />
			<source :src="currentMp3" type="audio/ogg" />
			<source :src="currentMp3" type="audio/mp4" />
		</audio> -->
		<!-- 仅支持 amr、 mp3、 mpeg 3种格式, 大小不超过40.0 MB -->
		<div class="cap-audio-controller">
			<div class="cap-audio">
				<div v-if="currentObj.capAudioStyle==='weixin'" :class="['cap-audio-weixin',currentObj.bubble==='right'?'cap-audio-weixin--right':'']"
				 @click="clickPlay('weixin')">
					<image class="cap-audio-logo" alt="音频播放logo" src="https://img.yzcdn.cn/public_files/2016/05/13/8f9c442de8666f82abaf7dd71574e997.png!small.png" />
					<span class="cap-audio-bar">
						<!-- 点击动态的播放图片 -->
						<image id="ref_play" style="display:none" :class="['cap-audio-animation','ref_play']" :src="require(currentObj.bubble==='right'?'static/phoneImg/green_player.gif':'static/phoneImg/player.gif')"
						 alt="播放器动画" />
						<i class="cap-audio-animation-static"></i>
						<!-- 点击播放加载时候的loading -->
						<image v-if="playLoading" src="static/phoneImg/loading.gif" alt="loading" class="cap-audio-loading" />
					</span>
				</div>
				<div v-if="currentObj.capAudioStyle==='music'" class="cap-audio--music">
					<i class="iconfont icon-yinpinbofang cap-audio-btn" id="audio-btn-play" style="display:block" @click="clickPlay('music')"></i>
					<i id="audio-btn-close" style="display:none" @click="clickPlay('music')" class="iconfont cap-audio-btn icon-zanting"></i>

					<div class="cap-audio-info">
						<h4 class="cap-audio-title" v-if="currentObj.audioTitle">{{currentObj.audioTitle}}</h4>
						<image v-if="playLoading" src="static/phoneImg/loading.gif" alt="loading" class="cap-audio-loading" />
						<div class="cap-slider">
							<div class="cap-slider__bar" id="lineDiv" ref="lineDiv">
								<span class="cap-slider__finished-portion" :style="{'background-color': 'rgb(68, 187, 0)','width': minDiv_left+'px'}"></span>
								<span @touchstart="touchstartFun" @touchmove="touchmoveFun" @touchend="touchendFun" class="cap-slider__pivot"
								 :style="{'background-color': 'rgb(255, 255, 255)','left': minDiv_left+'px','margin-left': '-2px'}"></span>
							</div>
						</div>
					</div>
				</div>

				<div v-if="currentObj.capAudioStyle==='audio'" class="cap-showcase-audio">
					<div class="cap-audio-controller">
						<div class="cap-audio" style="padding:0">
							<div class="cap-audio--simple">
								<div class="cap-audio--simple-box">
									<div :class="['cap-audio--simple-btn','imgPaly3']"></div>
								</div>
								<div class="cap-audio--simple-title-wrapper">
									<div class="cap-audio--simple-title">{{currentObj.audioTitle}}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
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
						// weixin,music,audio
						capAudioStyle: "music",
						audioTitle: "",
						//right
						bubble: "left",
						//暂停后再恢复播放时，从头开始 1从头开始;2不从头开始
						anewAudio: "2",
						//是否重复播放
						loopPlay: false
					};
				}
			}
		},
		data() {
			return {
				play: false,
				playLoading: false,
				// currentObj: {
				//   capAudioStyle: this.propsObj.capAudioStyle,
				//   bubble: this.propsObj.bubble,
				//   audioTitle: this.propsObj.audioTitle,
				//   anewAudio: this.propsObj.anewAudio,
				//   loopPlay:
				//     this.propsObj.capAudioStyle === "weixin"
				//       ? false
				//       : this.propsObj.loopPlay
				// },
				//方块移动的距离
				minDiv_left: 0,
				ifBool: false, //判断鼠标是否按下
				currentMp3: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3",
				allTime: 0,
				// 步长
				pauseTime: 0,
				timeId: null,
				currentTime: 0,
				innerAudioList: null,
				// 当前的播放器
				innerAudio: null
			};
		},
		mounted() {
			// <voice @voicePlay="voicePlay" v-if="item.viewComponets === 'voice'" :propsObj="item.props"></voice>
			// audio 播放器
			this.innerAudioList = uni.getStorageSync('arrVoice');
			// this.innerAudio = uni.createInnerAudioContext()

			this.changeStyle();
			// window.addEventListener("touchend", function(e) {
			// 	this.ifBool = false;
			// });
		},
		methods: {
			touchendAudio() {
				this.ifBool = false;
			},
			changeStyle() {},
			clickPlay(style) {
				// 接口获取当前要播放的语音,然后播放
				// this.playLoading = true;
				// var audioTemplate = document.getElementsByClassName("cap-showcase-audio");
				// var audios = document.getElementsByTagName("audio");
				let _this = this;

				// function pauseAll() {
				// 	var self = this;
				// 	window.clearInterval(_this.timeId);
				// 	[].forEach.call(audioTemplate, function(Node, index) {
				// 		if (Node.querySelector("audio") === self) {
				// 			if (Node.querySelector(".cap-audio-bar>img")) {
				// 				Node.querySelector(".cap-audio-bar>img").style.display = "none";
				// 			}
				// 			if (Node.querySelector(".cap-audio--music")) {
				// 				Node.querySelector("#audio-btn-close").style.display = "none";
				// 				Node.querySelector("#audio-btn-play").style.display = "block";
				// 			}
				// 		}
				// 	});
				// }
				// [].forEach.call(audios, function(i) {
				// 	//暂停
				// 	i.addEventListener("pause", pauseAll.bind(i));
				// });

				this.voicePlay(style);
			},
			voicePlay(style) {
				this.$emit('voicePlay',this.currentObj)
				// this.currentAudio = this.innerAudioList.filter(D => D.index === this.currentObj.indexMy)[0].innerAudio
				// let currentAudioOther = this.innerAudioList.filter(D => D.index !== this.currentObj.indexMy)
				// let currentAudioIndex = this.innerAudioList.findIndex(D => D.index === this.currentObj.indexMy)

				// if (this.innerAudio.src !== this.currentObj.url) {
				// 	this.innerAudio.src = this.currentObj.url
				// }
				// this.innerAudio.loop = this.currentObj.loopPlay === 'True' ? true : false

				// if (this.innerAudio.paused) {
				// 	//暂停中
				// 	this.innerAudio.play()
				// } else {
				// 	// 播放中
				// 	if (this.innerAudio.loopPlay === 'True') {
				// 		//true  循环
				// 		this.innerAudio.pause()
				// 		// 当前音频的长度（单位：s
				// 	} else {
				// 		this.innerAudio.stop()
				// 	}
				// }
			},
			countdownFun() {
				let pageWidth;
				let lineW = document.getElementById("lineDiv").offsetWidth; //长线条
				this.allTime = this.$refs.audio.duration; //少1秒

				pageWidth = Number(this.allTime / lineW);
				if (parseInt(this.minDiv_left * pageWidth) >= parseInt(this.allTime)) {
					this.minDiv_left = 0;
				}
				this.currentTime = Number((pageWidth * this.minDiv_left).toFixed(2));
				let allCurrentime = Number((this.allTime - this.currentTime).toFixed(2));
				let _this = this;
				this.timeId = setInterval(() => {
					_this.minDiv_left = Number(_this.minDiv_left) + Number(pageWidth);
					allCurrentime--;
					if (allCurrentime <= 0 || lineW <= _this.minDiv_left) {
						window.clearInterval(_this.timeId);
					}
				}, 1000);
			},
			pauseAuido(e) {
				let style = this.currentObj.capAudioStyle;
				// 暂停
				if (this.currentObj.anewAudio === "1") {
					this.$refs.audio.currentTime = 0;
				} else {
					if (style === "music") {
						this.$refs.audio.currentTime = this.currentTime;
					}
				}
				window.clearInterval(this.timeId);
			},
			loadAuido(e) {
				// 播放
				playAll(e.target);

				function playAll(e) {
					var audioTemplate = document.getElementsByClassName(
						"cap-showcase-audio"
					);
					var self = e;
					[].forEach.call(audioTemplate, function(Node, index) {
						Node.querySelector("audio") !== self &&
							Node.querySelector("audio").pause();
						if (Node.querySelector("audio") !== self) {
							if (Node.querySelector(".cap-audio-bar>img")) {
								Node.querySelector(".cap-audio-bar>img").style.display = "none";
							}
							if (Node.querySelector(".cap-audio--music")) {
								Node.querySelector("#audio-btn-close").style.display = "none";
								Node.querySelector("#audio-btn-play").style.display = "block";
							}
						} else {
							if (Node.querySelector(".cap-audio--music")) {
								Node.querySelector("#audio-btn-close").style.display = "block";
								Node.querySelector("#audio-btn-play").style.display = "none";
							}
							if (Node.querySelector(".cap-audio-bar>img")) {
								Node.querySelector(".cap-audio-bar>img").style.display = "block";
							}
						}
					});
				}
				let style = this.currentObj.capAudioStyle;
				if (style === "music") {
					// 获取语音的长度,获取line的长度
					// this.pauseTime = pageWidth;
					this.countdownFun();
				}
				if (this.currentObj.anewAudio === "1") {
					//暂停从头播放s
					this.$refs.audio.currentTime = 0;
					this.minDiv_left = 0;
				} else {
					if (style === "music") {
						this.$refs.audio.currentTime = this.currentTime;
					}
				}
			},
			endedAudio() {
				// 播放完毕
			},
			touchstartFun(e) {
				e.stopPropagation();
				this.ifBool = true;
				// console.log("鼠标按下");
			},
			touchendFun(e) {
				this.ifBool = false;
				this.$refs.audio.play();
				// console.log("鼠标弹起");
			},
			dragenterFun(evt) {
				evt.preventDefault();
			},
			touchmoveFun(e) {
				if (this.ifBool) {
					this.$refs.audio.pause();

					var lineDiv = document.getElementById("lineDiv"); //长线条
					var lineDivW = document.getElementById("lineDiv").offsetWidth; //长线条
					var x = e.touches[0].pageX || e.touches[0].clientX; //鼠标横坐标var x
					var lineDiv_left = getPosition(lineDiv).left; //长线条的横坐标
					var minDiv_left = x - lineDiv_left; //小方块相对于父元素（长线条）的left值
					if (minDiv_left >= lineDiv.offsetWidth) {
						minDiv_left = lineDiv.offsetWidth;
					}
					if (minDiv_left < 0) {
						minDiv_left = 0;
					}
					this.minDiv_left = minDiv_left;
					// this.countdownFun();
				} else {
					this.$refs.audio.play();
				}
			}
		},
		watch: {
			$route(to, from) {
				var audioTemplate = document.getElementsByClassName("cap-showcase-audio");
				var audios = document.getElementsByTagName("audio");
				[].forEach.call(audioTemplate, function(Node, index) {
					if (Node.querySelector("audio") === self) {
						if (Node.querySelector(".cap-audio-bar>img")) {
							Node.querySelector(".cap-audio-bar>img").style.display = "none";
						}
						if (style === "music") {
							Node.querySelector("#audio-btn-close").style.display = "none";
							Node.querySelector("#audio-btn-play").style.display = "block";
						}
					}
				});
			}
		}
	};

	function getPosition(node) {
		var left = node.offsetLeft; //获取元素相对于其父元素的left值var left
		var top = node.offsetTop;
		let current = node.offsetParent; // 取得元素的offsetParent // 一直循环直到根元素
		while (current != null) {
			left += current.offsetLeft;
			top += current.offsetTop;
			current = current.offsetParent;
		}
		return {
			left: left,
			top: top
		};
	}
</script>

<style>
	@import "../../../assets/css/autoComponents/basePhone.css";

	.cap-showcase-audio {
		overflow: hidden;
	}

	.cap-audio-animation-static,
	.cap-audio-bar {
		background: url(/static/phoneImg/sprite_v5.png) no-repeat scroll 0 0;
		background-size: 400px 175px;
	}

	.cap-slider__finished-portion,
	.cap-slider__loaded-portion {
		border-radius: 4.5px;
		height: 100%;
		position: absolute;
		left: 0;
	}

	.cap-audio-info {
		transform: translateY(50%);
		height: 100%;
	}

	.cap-audio {
		padding: 15px;
	}

	.cap-audio-weixin {
		position: relative;
		min-height: 40px;
	}

	.cap-audio-logo {
		width: 40px;
		height: 40px;
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
	}

	.cap-audio-bar {
		width: 185px;
		height: 42px;
		display: inline-block;
		position: absolute;
		left: 50px;
		cursor: pointer;
	}

	.cap-audio-animation {
		position: absolute;
		left: 21px;
		top: 12px;
		width: 13px;
		height: 17px;
		z-index: 2;
	}

	.cap-audio-animation-static {
		background-position: -180px -105px;
		width: 13px;
		height: 17px;
		display: block;
		position: absolute;
		left: 21px;
		top: 12px;
		z-index: 1;
	}

	.cap-audio-loading {
		position: absolute;
		right: 10px;
		top: 12px;
	}

	.cap-slider__bar {
		position: relative;
		background: #cacaca;
	}

	.cap-audio--music {
		position: relative;
		padding: 0 15px 0 70px;
		width: 100%;
		height: 74px;
		background-color: #fff;
		box-sizing: border-box;
	}

	.cap-audio--music .cap-audio-btn {
		position: absolute;
		left: 15px;
		top: 17px;
		font-size: 40px;
		color: #4b0;
	}

	.cap-audio--music .cap-audio-title {
		padding-right: 15px;
		height: 38px;
		line-height: 38px;
		font-size: 14px;
		color: #333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.cap-audio--music .cap-audio-loading {
		top: 10px;
		right: 20px;
	}

	.cap-audio--music .cap-slider {
		background-color: #f2f2f2;
	}

	.cap-audio--music .cap-slider__bar {
		margin: 0 8px 0 0;
		height: 2px;
		border-radius: 0;
		background-color: #f2f2f2;
	}

	.cap-audio--music .cap-slider__finished-portion {
		border-radius: 0;
	}

	.cap-slider__pivot {
		/* 进度条的圆坨坨 */
		position: absolute;
		top: 50%;
		width: 16px;
		height: 16px;
		border: 3px solid #fff;
		-webkit-box-shadow: 0 1px 4px;
		box-shadow: 0 1px 4px;
		border-radius: 50%;
		background-color: #cacaca;
		transform: translate3d(0, -50%, 0);
	}

	.cap-audio--music .cap-slider__pivot:after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		width: 4px;
		height: 4px;
		border-radius: 4px;
		background: #4b0;
	}

	.cap-audio--music .cap-slider__pivot {
		width: 14px;
		height: 14px;
		border: 1px solid #e5e5e5;
		box-shadow: none;
	}

	/* audio */
	.cap-audio {
		padding: 15px;
	}

	.cap-audio--simple {
		position: relative;
		padding: 0 15px 0 50px;
		height: 46px;
		background-color: #fff;
	}

	.cap-audio--simple-box {
		position: absolute;
		width: 50px;
		height: 46px;
		left: 0;
	}

	.cap-audio--simple-circle {
		position: absolute;
		width: 25px;
		height: 25px;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 1;
	}

	.cap-audio--simple-btn {
		width: 25px;
		height: 25px;
		background-size: contain;
		background-position: 100%;
		background-repeat: no-repeat;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.imgPaly3 {
		background-image: url('/static/phoneImg/paly3.png');
	}

	.cap-audio--simple-title-wrapper {
		height: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.cap-audio--simple-title {
		vertical-align: middle;
		display: inline-block;
		font-size: 14px;
		color: #111;
		line-height: 46px;
	}

	/* //1样式气泡位置 */
	.cap-audio-weixin--right .cap-audio-logo {
		float: right;
	}

	.cap-audio-weixin--right .cap-audio-bar {
		background-position: -187px 0;
		left: auto;
		right: 50px;
	}

	.cap-audio-weixin--right .cap-audio-bar .cap-audio-animation {
		right: 21px;
		left: auto;
	}

	.cap-audio-weixin--right .cap-audio-animation-static {
		background-position: -180px -83px;
		right: 21px;
		left: auto;
	}

	.cap-audio-weixin--right .cap-audio-bar .cap-audio-loading {
		position: absolute;
		left: 20px;
		right: auto;
	}
</style>
