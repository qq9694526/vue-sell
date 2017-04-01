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
				<v-split ></v-split>
			</div>
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">
	import vCartcontrol from 'components/cartcontrol/cartcontrol'
	import vSplit from 'components/split/split'
	import BScroll from 'better-scroll'

	export default {
		data() {
			return {
				foodShow: false
			}
		},
		props: {
			food: {
				type: Object
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
				this.$nextTick(() => {
					if(!this.foodScroll) {
						this.foodScroll = new BScroll(this.$refs.foodWrapper, {
							click: true
						});
					} else {
						this.foodScroll.refresh();
					}
				})
			}
		},
		components: {
			vCartcontrol,
			vSplit
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
				}
				.desc {
					font-size: 12px;
					line-height: 24px;
					color: rgb(77, 85, 93);
					font-weight: 200;
					padding: 0 8px;
				}
			}
		}
	}
</style>