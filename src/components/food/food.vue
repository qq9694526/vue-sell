<template>
	<transition name="move">
		<div class="food" v-show="foodShow" ref="foodWrapper">
			<div class="content">
				<div class="header-image">
					<img class="img" :src="food.image" />
					<div class="back-btn">
						<span class="icon icon-arrow_lift" @click="foodShow=false"></span>
					</div>
				</div>
				<div class="base-info">
					<h3 class="name">{{food.name}}</h3>
					<div class="count-wrapper">
						<span class="left">月售{{food.sellCount}}份</span>
						<span class="right">好评率{{food.rating}}</span>
					</div>
					<div class="price-wrapper">
						<span class="price"><small>￥</small>{{food.price}}</span>
						<span v-show="food.oldPrice" class="oldprice"><small>￥</small>{{food.oldPrice}}</span>
					</div>
					<transition name="fade">
						<div class="add-cart" v-show="!food.count>0" @click="firstAdd">加入购物车</div>
					</transition>
					<div class="control-wrapper" v-show="food.count>0">
						<v-cartcontrol :food="food"></v-cartcontrol>
					</div>
				</div>
				<v-split v-show="food.info"></v-split>
				<div class="desc-wrapper" v-show="food.info">
					<h3 class="title">商品介绍</h3>
					<div class="desc">{{food.info}}</div>
				</div>
				<v-split></v-split>
				<div class="ratings-wrapper">
					<h3 class="title">商品评价</h3>
					<v-ratingselect :ratings="ratings" :selectType="selectType" :onlyContent="onlyContent"></v-ratingselect>
					<ul class="ratings-list" v-show="selectedRatings.length>0">
						<li class="item" v-for="rating in selectedRatings">
							<div class="header">
								<span class="time">{{rating.rateTime|formatDate}}</span>
								<img class="headimg" :src="rating.avatar" width="12px" />
								<span class="uid">{{rating.username}}</span>
							</div>
							<div class="rating-content">
								<span :class="['icon',rating.rateType==1?'icon-thumb_down':'icon-thumb_up']"></span>
								<span class="text">{{rating.text}}</span>
							</div>
						</li>
					</ul>
					<div class="nodata" v-show="selectedRatings.length==0">暂无数据</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">
	import { formatDate } from 'common/js/date'
	import vCartcontrol from 'components/cartcontrol/cartcontrol'
	import vSplit from 'components/split/split'
	import vRatingselect from 'components/ratingselect/ratingselect'
	import BScroll from 'better-scroll'

	export default {
		data() {
			return {
				foodShow: false,
				selectType: 2,
				onlyContent: false
			}
		},
		props: {
			food: {
				type: Object
			}
		},
		created() {
			//通过事件中心监听事件
			this.$root.eventHub.$on("update-selects", this.updateSelects);
		},
		computed: {
			ratings() {
				return this.food.ratings;
			},
			selectedRatings() {
				var selectedRatings = [];
				if(this.ratings && this.ratings.length == 0) {
					return [];
				}
				if(this.selectType == 2) {
					selectedRatings = this.ratings;
				} else {
					selectedRatings = this.ratings.filter((rating) => {
						return rating.rateType === this.selectType;
					})
				}
				if(this.onlyContent) {
					selectedRatings = selectedRatings.filter((rating) => {
						return rating.text.length != 0;
					})
				}
				console.log(selectedRatings);
				return selectedRatings;
			}
		},
		methods: {
			firstAdd(event) {
				this.$set(this.food, "count", 1);
				//通过根组件(app)的事件中心派发事件
				this.$root.eventHub.$emit("cart-add", event.target);
			},
			show() {
				this.foodShow = true;
				this.selectType = 2;
				this.onlyContent = false;
				this.$nextTick(() => {
					if(!this.foodScroll) {
						this.foodScroll = new BScroll(this.$refs.foodWrapper, {
							click: true
						});
					} else {
						this.foodScroll.refresh();
					}
				})
			},
			updateSelects(selects) {
				this.selectType = selects[0];
				this.onlyContent = selects[1];
				this.$nextTick(() => {
					this.foodScroll.refresh();
				})
			}
		},
		filters: {
			formatDate(time) {
				var date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm');
			}
		},
		components: {
			vCartcontrol,
			vSplit,
			vRatingselect
		}
	}
</script>

<style type="text/css" lang="less" scoped>
	.food {
		position: fixed;
		top: 0;
		left: 0;
		background-color: #fff;
		width: 100%;
		height: 100%;
		transform: translate3d(0, 0, 0);
		&.move-enter-active,
		&.move-leave-active {
			transition: all .2s;
		}
		&.move-enter,
		&.move-leave-active {
			transform: translate3d(100%, 0, 0);
		}
		.content {
			padding-bottom: 60px;
			.header-image {
				position: relative;
				width: 100%;
				height: 0;
				padding-top: 100%;
				.img {
					position: absolute;
					top: 0;
					left: 0;
					display: block;
					width: 100%;
					height: 100%;
				}
				.back-btn {
					position: absolute;
					top: 0;
					left: 0;
					font-size: 20px;
					color: #fff;
					padding: 10px;
				}
			}
			.base-info {
				position: relative;
				padding: 18px;
				.name {
					font-size: 14px;
					color: rgb(7, 17, 27);
					font-weight: 700;
					line-height: 1;
					margin-bottom: 8px;
				}
				.count-wrapper {
					font-size: 0;
					color: rgb(147, 153, 159);
					line-height: 1;
					margin-bottom: 18px;
					.left {
						font-size: 10px;
						margin-right: 12px;
					}
					.right {
						font-size: 10px;
					}
				}
				.price-wrapper {
					font-size: 0;
					line-height: 24px;
					height: 24px;
					.price {
						font-size: 14px;
						font-weight: 700;
						color: rgb(240, 20, 20);
						margin-right: 12px;
						small {
							font-size: 10px;
						}
					}
					.oldprice {
						font-size: 10px;
						color: rgb(147, 153, 159);
						font-weight: 700;
						text-decoration: line-through;
					}
				}
				.add-cart {
					position: absolute;
					right: 18px;
					bottom: 18px;
					font-size: 10px;
					color: rgb(255, 255, 255);
					line-height: 24px;
					height: 24px;
					border-radius: 12px;
					width: 74px;
					text-align: center;
					background-color: rgb(0, 160, 220);
					opacity: 1;
					transition: all .2s;
					&.fade-enter,
					&.fade-leave-active {
						opacity: 0;
					}
				}
				.control-wrapper {
					position: absolute;
					right: 18px;
					bottom: 18px;
				}
			}
			.desc-wrapper {
				padding: 18px;
				.title {
					font-size: 14px;
					color: rgb(7, 17, 27);
					line-height: 1;
					margin-bottom: 6px;
					font-weight: 600;
				}
				.desc {
					font-size: 12px;
					line-height: 24px;
					color: rgb(77, 85, 93);
					font-weight: 200;
					padding: 0 8px;
				}
			}
			.ratings-wrapper {
				.title {
					font-size: 14px;
					color: rgb(7, 17, 27);
					line-height: 1;
					padding-top: 18px;
					padding-left: 18px;
					font-weight: 600;
				}
				.ratings-list {
					.item {
						padding: 16px 18px;
						border-bottom: 1px solid rgba(7, 17, 27, .1);
						.header {
							font-size: 0;
							height: 12px;
							line-height: 12px;
							.time {
								float: left;
								font-size: 10px;
								color: rgb(147, 153, 159);
							}
							.uid {
								float: right;
								font-size: 10px;
								color: rgb(147, 153, 159);
							}
							.headimg {
								display: inline-block;
								float: right;
								width: 12px;
								height: 12px;
								margin-left: 6px;
								border-radius: 50%;
							}
						}
						.rating-content {
							margin-top: 6px;
							font-size: 0;
							.icon {
								font-size: 12px;
								&.icon-thumb_down {
									color: rgb(147, 153, 159);
								}
								&.icon-thumb_up {
									color: rgb(0, 160, 220);
								}
							}
							.text {
								font-size: 12px;
								color: rgb(7, 17, 27);
								line-height: 16px;
								margin-left: 6px;
							}
						}
					}
				}
				.nodata{
					padding: 16px 18px;
					font-size: 12px;
					color: rgb(147, 153, 159);
				}
			}
		}
	}
</style>