<template>
	<div>
		<!-- 商品分组 -->
		<div :class="[currentObj.followBoard === '2'?'cap-tag-list':'cap-goods-layout']" v-if="true">
			<div v-if="currentObj.followBoard === '1'" :class="['cap-tags','van-tabs','van-tabs--line','cap-tags-style-'+currentObj.menuStyle]">
				<div class="van-tabs__wrap van-tabs__wrap--scrollable van-hairline--top-bottom">
					<div class="van-tabs__nav van-tabs__nav--line">
						<div class="van-tabs__line" :style="{'width': lineWidth+'px','transform':'translateX('+translateXline+'px)'}"
						 style="transition-duration: 0.3s;"></div>
						<div @click="clickMenu('0')" :class="['van-tab',currentMenuIndex === '0'?'van-tab--active':'']" :style="{'flex-basis': basisWidth}"
						 v-if="currentObj.showAll === '1'">
							<span class="van-ellipsis">全部</span>
						</div>
						<div @click="clickMenu(index + 1,item)" class="van-tab" :class="['van-tab',currentMenuIndex === index?'van-tab--active':'']"
						 :style="{'flex-basis': basisWidth}" v-for="(item,index) in groupList" :key="index">
							<span class="van-ellipsis">{{item.Name}}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="van-badge-group van-hairline--top-bottom cap-tag-list-nav cap-tag-list-nav--list" style="max-height: 969px;"
			 v-if="currentObj.followBoard === '2'">
				<a @click="clickMenu(index,item)" :class="['van-badge','van-hairline',
          currentMenuIndex === index?'van-badge--select':'']"
				 v-for="(item,index) in groupList?groupList:currentObj.groupList" :key="index">
					<div class="van-badge__text">{{item.Name}}</div>
				</a>
			</div>
			<div :class="[currentObj.followBoard === '2'?'cap-tag-list__group':'']">
				<!-- <div class="cap-tag-list__group-title" v-if="currentObj.followBoard === '2'" style="margin: 0px 15px;">商品组一</div> -->
				<!-- <ul>
					<li v-for="(item, index) in Prod_InfoList" :key="index" >
						{{item.Name}}
					</li>
				</ul> -->
				<ul :class="['cap-goods-layout__container',currentObj.listStyle,currentObj.goodStyle,
				    currentObj.followBoard === '2'?'list tag-left':'']"
					 :style="{'padding-left':currentObj.pageSpace +'px','padding-right':currentObj.pageSpace +'px',
				'margin-left':-(currentObj.goodSpace/2)+'px','margin-right':-(currentObj.goodSpace/2)+'px'}">
						<li class="cap-goods-layout__wrapper cap-goods-layout__wrapper--0" v-for="(item, index) in Prod_InfoList" :key="index">
							<a @click="urlGoodClick(item)" log-params="null" class="cap-goods-layout__item" style="margin: 5px;" :class="[currentObj.listStyle,currentObj.goodStyle,currentObj.chamfer,
				        currentObj.followBoard === '2'?'tag-left':'']"
							 :style="{'margin':(currentObj.goodSpace/2)+'px'}">
								<div class="cap-goods__photo">
									<div class="cap-goods__image-wrap" :style="{'padding-top':currentObj.imgScale+ '%'}">
										<div data-lazy-log="1" :class="['cap-goods__img--'+currentObj.contain]" class="cap-goods__img" lazy="loaded"
										 :style="{'background-image':`url(${setImgPrex(item.Img)})`}"></div>
										 <image src="@/static/img/shouqin.png" style="width: 100%;height: 100%;position: absolute;top:0" v-if="item.StockType != '0'&& item.StoreQty <= '0'"></image>
									</div>
									
									<div v-if="currentObj.showContent.indexOf('5')>-1">
										<i v-if="currentObj.typeSign!=='4'" class="van-icon cap-goods-layout__corner-mark" :class="['type-'+currentObj.typeSign,currentObj.typeSign==='0'?'van-icon-new-arrival ':
				      currentObj.typeSign==='1'?'van-icon-hot-sale':currentObj.typeSign==='2'?'van-icon-new':
				      currentObj.typeSign==='3'?'van-icon-hot':'']"
										 style="color: rgb(255, 68, 68);"></i>
				
										<div v-if="currentObj.typeSign==='4'&&!currentObj.typeSignImg" style="display: inline-table;" class="cap-goods-layout__corner-mark cap-goods-layout__corner-mark--default">
											<span>角标</span>
											<br />
											<span>区域</span>
										</div>
										<img v-if="currentObj.typeSign==='4'&&currentObj.typeSignImg" :src="currentObj.typeSignImg |setImgPrex"
										 class="cap-goods-layout__corner-mark cap-goods-layout__corner-mark--custom" />
									</div>
								</div>
								
								<div class="cap-goods-layout__info" v-if="currentObj.showContent&&currentObj.showContent.length!==0">
									<div class="cap-goods-layout__info-title has-title-1 has-subtitle-1" :class="[currentObj.listStyle]"
									 goods-index="0" :style="{'text-align': currentObj.textCenter,'margin-top':'0'}">
										<h3 class="title" :style="{'font-weight': currentObj.fontWeight,
				              'margin-top':currentObj.followBoard === '2'?'':'10px'}"
										 v-if="currentObj.showContent.indexOf('1')>-1">{{item.Name}}</h3>
										<p v-if="currentObj.showContent.indexOf('2')>-1&&item.Describe" class="sub-title" :style="{'margin-top':currentObj.followBoard === '2'?'':'10px'}">{{item.Describe}}</p>
									</div>
									<div v-if="currentObj.showContent&&currentObj.showContent.length!==0
				     &&(currentObj.showContent.indexOf('4')>-1||currentObj.showContent.indexOf('3')>-1)"
									 class="cap-goods-layout__info-price has-price-1 has-btn-1" :class="[currentObj.listStyle,currentObj.listStyle==='big'||currentObj.listStyle==='list'?'size--big':'size--small',
				    currentObj.textCenter]">
										<div v-if="!(currentObj.textCenter==='center'&&currentObj.showContent.indexOf('3')===-1)" class="price-info"
										 :style="{'padding-right':
				      currentObj.textCenter==='center'?'0':
				      currentObj.listStyle==='big'||currentObj.listStyle==='list'||currentObj.listStyle==='hybrid'?'39px'
				      :currentObj.buyButton === '9'?'65px':'29px',
				       'font-weight': currentObj.fontWeight}">
											<span class="sale-price" v-if="currentObj.showContent.indexOf('3')>-1">
												<div class="cap-theme-view" style="color: rgb(255, 68, 68);">
													<!-- <span class="price-tag">¥</span>{{item.SalePrice}} -->
													<span v-if="item.MemberPrice">
														<span class="price-tag">¥{{item.MemberPrice}}</span>
														<span style="text-decoration:line-through;color: #969799;font-size:8pt;padding-left: 6px;">¥{{item.SalePrice}}</span>
													</span>
													<span class="price-tag" v-else>¥{{item.SalePrice}}</span>
												</div>
											</span>
										</div>
										<div v-if="currentObj.showContent.indexOf('4')>-1||currentObj.buyButton==='9'" class="cap-goods-layout__buy-btn-wrapper"
										 :class="[currentObj.listStyle==='big'||currentObj.listStyle==='list'||currentObj.listStyle==='hybrid'?'big':'small',
				      'type-'+currentObj.buyButton]">
											<i v-if="currentObj.buyButton!=='3'&& currentObj.buyButton!=='4'&& currentObj.buyButton!=='7'&& currentObj.buyButton!=='8'
				        &&currentObj.buyButton!=='9'"
											 class="van-icon" :class="['cap-goods-layout__buy-btn-'+currentObj.buyButton,
				        currentObj.buyButton==='2'?'van-icon-add-o':currentObj.buyButton==='5'?'van-icon-add ':currentObj.buyButton==='6'?'van-icon-shopping-cart-o'
				        :'van-icon-cart-circle-o',
				        ]"
											 style="color: rgb(255, 68, 68);"></i>
				
											<button v-else class="van-button van-button--danger van-button--small" :class="['cap-goods-layout__buy-btn-'+ currentObj.buyButton]"
											 :style="{'background-color': currentObj.buyButton==='3'?'rgb(255, 68, 68)':'',
				         'border-color': currentObj.buyButton==='3'?'rgb(255, 68, 68)':''}">
												<span class="van-button__text">{{currentObj.buyButtonText}}</span>
											</button>
										</div>
									</div>
								</div>
							</a>
						</li>
					</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import Mixins from "../public";
	import {GetBaseImgUrl} from "@/util/publicFunction";
	import {
		vipCard
	} from '@/api/http.js';
	export default {
		mixins: [Mixins],
		name: "",
		props: {
			propsObj: {
				type: Object,
				default () {
					return {
						groupList: [],
						menuStyle: "1",
						followBoard: "1",
						//small  big   three list hybrid swipe
						listStyle: "small",
						// 商品间距
						goodSpace: 9,
						// 页面边距
						pageSpace: 10,
						// 图片比例  3:2 -->66.6667  1:1 3:4-->133.333  16:9-->56.25
						imgScale: "100",
						// 商品样式 无边白底 --> card  卡片投影--> card-shadow 描边白底--> card2 无边透明底 --> simple 促销-->promotion
						goodStyle: "promotion",
						// 圆角 circle 直角rect
						chamfer: "circle",
						// 图片填充 周边留白-->contain  填充 -->cover
						contain: "contain",
						// 文本样式 normal  bold
						fontWeight: "normal",
						// left center
						textCenter: "left",
						// 显示内容 1商品名称 2商品描述 3商品价格 4购买按钮
						showContent: ["1", "2", "3", "4"],
						// 购买按钮样式 1 到 9
						buyButton: "9",
						// 购买按钮样式 === 3 或者4 时，有个按钮文字
						buyButtonText: "马上抢",
						// 商品角标 0 到 4
						typeSign: "4",
						// 商品角标 === 4时，自定义的图片
						typeSignImg: ""
					};
				}
			}
		},
		data() {
			return {
				basisWidth: "22%",
				translateXline: 0,
				menuWidth: 0,
				lineWidth: 0,
				groupList: null,
				screenWidth: 0,
				currentMenuIndex: "0",
				goodList: [],
				allGoodList: [],
				Prod_InfoList:[],
				fristIndex:''
			};
		},
		components: {},
		updated() {},
		created() {},
		mounted() {
			this.screenWidth = uni.getSystemInfoSync().screenWidth

			this.currentObj.showContent = this.currentObj.showContent ?
				this.currentObj.showContent : [];

			this.setMenuWidth();

			// if (this.currentObj._data.length > 0) {
				
			// 	this.groupList = this.currentObj._data
			// }
			// if (this.currentObj._Prod_Data.length > 0) {
			// 	if (this.currentObj.showAll === '2') {
			// 		let currentCate = this.currentObj._Cate_Data[0] //当前分类id
			// 		filterGood(currentCate, this)
			// 	} else {
			// 		this.goodList = this.currentObj._Prod_Data
			// 	}
			// 	this.allGoodList = this.currentObj._Prod_Data
			// }
			if (this.currentObj.groupList.length > 0) {
			  this.fristIndex = this.currentObj.groupList[0].groupId;
			  this.getList(this.fristIndex);
			}
			this.currentMenuIndex = this.currentObj.followBoard === "2" ? 0 : "0";
		},
		methods: {
			setMenuWidth() {
				//设置菜单的width
				if (
					this.currentObj.groupList &&
					this.currentObj.groupList.length < 4 &&
					!this.groupList
				) {
					//有全部 需要数组加一个
					let len =
						this.currentObj.showAll === "1" ?
						this.currentObj.groupList.length + 1 :
						this.currentObj.groupList.length;

					this.basisWidth = 100 / len + "%";
					this.menuWidth = this.screenWidth / len;
					this.lineWidth = Number((this.menuWidth / 2).toFixed(2));
					this.translateXline = (this.menuWidth - this.lineWidth) / 2;
					this.translateXline = Number(this.translateXline.toFixed(2));
				} else {
					this.menuWidth = Number(this.screenWidth * 0.22);
					this.basisWidth = "22%";
					this.lineWidth = Number((this.menuWidth / 2).toFixed(2));
					this.translateXline = Number(
						((this.menuWidth - this.lineWidth) / 2).toFixed(2)
					);
				}
			},
			clickMenu(index,item) {
				this.currentMenuIndex = index;
				// let Cate_Data = this.currentObj._Cate_Data[index]
				if (index === "0") {
					//全部
					this.translateXline = ((this.menuWidth - this.lineWidth) / 2).toFixed(
						2
					);
					// this.goodList = this.allGoodList
					if (this.currentObj.groupList.length > 0) {
					  this.fristIndex = this.currentObj.groupList[0].groupId;
					  this.getList(this.fristIndex);
					}
				} else {
					// 其他
					this.translateXline = (
						Number(index) * Number(this.menuWidth) +
						this.lineWidth / 2
					).toFixed(2);
					if (item.groupId) {
					  this.getList(item.groupId);
					}
					// filterGood(Cate_Data, this)
				}
			},
			setImgPrex(val) {
				return GetBaseImgUrl() + val;
				// if (
				// 	val &&
				// 	this.currentObj._Prod_Data &&
				// 	this.currentObj._Prod_Data.length > 0
				// ) {
				// 	return this.$VUE_APP_PREFIX2 + val;
				// } else {
				// 	return val;
				// }
			},
			//根据系列SID查询商品并展示商品
			// "GetProdInfoList"
			async getList(val) {
			
			  this.loading = true;
			  try {
			    let data = await vipCard(
			      {
			        Action: "GetTreeProdList",
			        CateSID: val,
							Name:'',
							SID:this.$store.state.currentStoreInfo.SID
			      },
			      "UProdOpera"
			    );
			    this.loading = false;
			    let cate=[]
					 cate= data.Data.CateList;
					 cate.forEach(item=>{
						 this.Prod_InfoList = item.children
					 })
			  } catch (e) {
			    console.log(e)
			    this.loading = false;
			  }
			},
			urlGoodClick(item) {
				this.$Router.push({
					path: '/pages/shoppingMall/list/infoGood',
					query: {
						SID: item.SID,
						admin: true
					}
				})
			}
		},
		watch: {
			"currentObj.showContent"() {
				this.currentObj.showContent = this.currentObj.showContent ?
					this.currentObj.showContent : [];
			},
			"currentObj.showAll"() {
				this.setMenuWidth();
				if (this.groupList) {
					//假数据时
					if (this.currentObj.showAll === "2") {
						//不显示全部
						this.basisWidth = "25%";
					} else {
						this.basisWidth = "22%";
					}
				}
			},
			"currentObj.groupList"() {
				if (
					!this.currentObj.groupList ||
					this.currentObj.groupList.length === 0
				) {
					this.groupList = [{
							Name: "商品组一"
						},
						{
							Name: "商品组二"
						},
						{
							Name: "商品组三"
						},
						{
							Name: "商品组四"
						}
					];
				} else {
					// 监听并选择第一个系列的商品sid，去调用系列商品接口并展示在'全部'一栏中
					if (this.currentMenuIndex === "0") {
					  if (this.currentObj.groupList.length > 0) {
					    this.fristIndex = this.currentObj.groupList[0].groupId;
					    this.getList(this.fristIndex);
					  }
					}
					this.groupList = this.currentObj.groupList;
				}
				this.setMenuWidth();
			},
			"currentObj.followBoard"() {
				this.currentMenuIndex = this.currentObj.followBoard === "2" ? 0 : "0";
			}
		}
	};
	//按商品分类过滤商品
	function filterGood(cateObj, _this) {
		let groupListArr = _this.currentObj.groupList.filter(D => D.groupId === cateObj.SID)
		let groupListObj = groupListArr[0]
		let currentCate = cateObj.SID //当前分类id
		let arr = []
		_this.currentObj._Prod_Data.forEach((D, index) => {
			if (D.CateSID.indexOf(currentCate) > -1) {
				arr.push(D)
			}
		})
		if (groupListObj.radio === '1') {
			//只显示部分
			arr = arr.splice(0, Number(groupListObj.showNum))
		}
		_this.goodList = arr
	}
</script>

<style lang="less" scoped>
	@import "../../../assets/css/autoComponents/goods.css";

	.cap-goods-layout {
		.cap-tags-style-1 .van-tab--active span {
			height: initial;
			// margin-top: 0px;
			width: 100%;
		}

		.el-form-item__content {
			line-height: 0;
		}

		.cap-goods-layout__buy-btn-wrapper {
			display: flex;
		}

		.tag-left .cap-goods-layout__buy-btn-wrapper.big .cap-goods-layout__buy-btn-1 {
			font-size: 19px;
		}

		.cap-goods__photo {
			border: 1px solid #eee;
		}
	}
</style>
