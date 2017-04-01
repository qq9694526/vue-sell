<template>
	<div>
		<div class="shopcart">
			<div class="content">
				<div class="left" @click="toggleList">
					<div class="logo-wrapper" :class="{active:totalCount>0}">
						<div class="logo">
							<span class="icon icon-shopping_cart"></span>
						</div>
						<div class="num">{{totalCount}}</div>
					</div>
					<div class="price" :class="{active:totalPrice>0}">
						￥{{totalPrice}}
					</div>
					<div class="desc">
						另需配送费￥{{deliveryPrice}}元
					</div>
					<div class="ball-wrapper">
						<transition-group name="drop" v-on:before-enter="beforeDrop" v-on:enter="dropping" v-on:after-enter="afterDrop">
							<div v-for="(ball,index) in balls" v-if="ball.show" class="ball" :key="index">
								<div class="inner"></div>
							</div>
						</transition-group>
					</div>
				</div>
				<div class="right" :class="{enough:totalPrice>=minPrice}" @click="pay">{{payDesc}}</div>
			</div>
			<transition name="fold">
				<div class="shopcart-list" v-show="listShow">
					<div class="title">
						<h1>购物车</h1>
						<span @click="clearCart">清空</span>
					</div>
					<ul class="list">
						<li class="item" v-for="food in selectFoods">
							<div class="name">{{food.name}}</div>
							<div class="price-wrapper"><span class="small">￥</span><span class="price">{{food.price*food.count}}</span></div>
							<div class="cartcontrol-wrapper">
								<v-cartcontrol :food="food"></v-cartcontrol>
							</div>
						</li>
					</ul>
				</div>
			</transition>

		</div>
		<transition name="fade">
			<div class="list-mask" v-show="!fold" @click="fold=!fold"></div>
		</transition>
	</div>
</template>

<script type="text/ecmascript-6">
	import vCartcontrol from 'components/cartcontrol/cartcontrol'

	export default {
		data() {
			return {
				balls: [
					{ show: false },
					{ show: false },
					{ show: false },
					{ show: false },
					{ show: false }
				],
				dropBalls: [], //用于重置下落完毕小球的状态
				fold: true //是否为折叠状态
			}
		},
		props: {
			selectFoods: {
				type: Array,
				default() {
					return [];
				}
			},
			minPrice: {
				type: Number,
				default: 0
			},
			deliveryPrice: {
				type: Number,
				default: 0
			}
		},
		created() {
			//通过事件中心监听事件
			this.$root.eventHub.$on("cart-add", this.drop);
		},
		methods: {
			drop(el) {
				//选一个小球把show改为true,触发transition里的过渡效果
				for(let i = 0, len = this.balls.length; i < len; i++) {
					let ball = this.balls[i];
					if(!ball.show) {
						ball.show = true;
						ball.el = el;
						this.dropBalls.push(ball);
						return;
					}
				}
			},
			beforeDrop: function(el) {
				//遍历小球，给小球设置起始位置
				for(let i = 0, len = this.balls.length; i < len; i++) {
					var ball = this.balls[i];
					if(ball.show) {
						let rect = ball.el.getBoundingClientRect(),
							x = rect.left - 32,
							y = rect.top + 22 - window.innerHeight;
						console.log(`${x}+${y}`)
						el.style.display = "";
						el.style.transform = `translate3d(0,${y}px,0)`;
						el.style.webkitTransform = `translate3d(0,${y}px,0)`;
						el.getElementsByClassName("inner")[0].style.webkitTransform = `translate3d(${x}px,0,0)`;
						el.getElementsByClassName("inner")[0].style.webkitTransform = `translate3d(${x}px,0,0)`;
					}
				}
			},
			dropping: function(el, done) {
				//主动触发一次浏览器重绘
				let rf = el.offsetHeight;
				//等待DOM更新完毕
				this.$nextTick(() => {
					el.style.transform = `translate3d(0,0,0)`;
					el.style.webkitTransform = `translate3d(0,0,0)`;
					el.getElementsByClassName("inner")[0].style.webkitTransform = `translate3d(0,0,0)`;
					el.getElementsByClassName("inner")[0].style.webkitTransform = `translate3d(0,0,0)`;
					el.addEventListener('transitionend', done);
				})
			},
			afterDrop: function(el) {
				let ball = this.dropBalls.shift();
				if(ball) {
					ball.show = false;
					el.style.display = "none";
				}
			},
			toggleList: function() {
				if(!this.totalCount) {
					return;
				}
				this.fold = !this.fold;
			},
			clearCart: function() {
				this.selectFoods.forEach((food) => {
					food.count = 0;
				})
			},
			pay() {
				if(this.totalPrice > this.minPrice) {
					alert(`支付${this.totalPrice}元`);
				}
			}
		},
		computed: {
			totalPrice() {
				let total = 0;
				this.selectFoods.forEach((food) => {
					total += food.price * food.count
				})
				return total;
			},
			totalCount() {
				let count = 0;
				this.selectFoods.forEach((food) => {
					count += food.count
				})
				return count;
			},
			payDesc() {
				if(this.totalPrice === 0) {
					return `￥${this.minPrice}元起送`;
				} else if(this.totalPrice < this.minPrice) {
					let diff = this.minPrice - this.totalPrice;
					return `还差￥${diff}元起送`;
				} else {
					return '去结算'
				}
			},
			listShow() {
				if(!this.totalCount) {
					this.fold = true;
					return false;
				}
				return !this.fold;
			}
		},
		components: {
			vCartcontrol
		}
	}
</script>

<style type="text/css" lang="less" scoped>
	.shopcart {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 48px;
		z-index: 50;
		.content {
			display: flex;
			.left {
				flex: 1;
				background-color: #141d27;
				font-size: 0;
				white-space: nowrap;
				.logo-wrapper {
					position: relative;
					display: inline-block;
					padding: 6px;
					top: -10px;
					width: 56px;
					height: 56px;
					box-sizing: border-box;
					border-radius: 50%;
					background-color: #141d27;
					margin-left: 12px;
					.logo {
						width: 100%;
						height: 100%;
						padding: 12px;
						box-sizing: border-box;
						border-radius: 50%;
						border-radius: 50%;
						background-color: #2b343c;
						.icon {
							font-size: 24px;
							color: rgba(255, 255, 255, .4);
						}
					}
					.num {
						display: none;
						position: absolute;
						top: 0;
						right: 0;
						width: 24px;
						height: 16px;
						font-size: 12px;
						font-weight: 700;
						color: #fff;
						line-height: 16px;
						text-align: center;
						background-color: rgb(240, 20, 20);
						box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, .4);
						border-radius: 6px;
					}
					&.active {
						.logo {
							background-color: rgb(0, 160, 220);
							.icon {
								color: #fff;
							}
						}
						.num {
							display: block;
						}
					}
				}
				.price {
					display: inline-block;
					margin-top: 12px;
					font-size: 16px;
					color: rgba(255, 255, 255, .4);
					font-weight: 700;
					line-height: 24px;
					border-right: 1px solid rgba(255, 255, 255, .1);
					vertical-align: top;
					padding-right: 6px;
					&.active {
						color: #fff;
					}
				}
				.desc {
					display: inline-block;
					padding-left: 6px;
					margin-top: 12px;
					font-size: 12px;
					color: rgba(255, 255, 255, .4);
					font-weight: 700;
					line-height: 24px;
					vertical-align: top;
				}
				.ball-wrapper {
					position: absolute;
					left: 32px;
					bottom: 20px;
					width: 16px;
					height: 16px;
					.ball {
						position: fixed;
						left: 32px;
						bottom: 22px;
						z-index: 200;
						transition: all .5s cubic-bezier(.37, -0.39, .63, -0.05);
						.inner {
							transition: all .5s linear;
							width: 16px;
							height: 16px;
							border-radius: 50%;
							background-color: rgb(0, 160, 220);
						}
					}
				}
			}
			&.higelight {}
			.right {
				flex: 0 0 105px;
				background-color: #282E35;
				color: rgba(255, 255, 255, .4);
				font-weight: 700;
				line-height: 48px;
				text-align: center;
				font-size: 12px;
				&.enough {
					background-color: #00b43c;
					color: #fff;
					font-size: 14px;
				}
			}
		}
		.shopcart-list {
			position: fixed;
			bottom: 44px;
			left: 0;
			width: 100%;
			z-index: -1;
			transform: translate3d(0, 0, 0);
			&.fold-enter-active,
			&.fold-leave-active {
				transition: all .4s;
			}
			&.fold-enter,
			&.fold-leave-active {
				transform: translate3d(0, 100%, 0);
			}
			.title {
				position: relative;
				height: 40px;
				padding: 0 20px;
				background-color: #f3f5f7;
				border-bottom: 1px solid rgba(7, 17, 27, .1);
				>h1 {
					font-size: 14px;
					font-weight: 200;
					color: rgb(7, 17, 27);
					line-height: 40px;
					height: 40px;
				}
				>span {
					position: absolute;
					top: 0;
					right: 20px;
					display: inline-block;
					font-size: 12px;
					height: 40px;
					line-height: 40px;
					color: rgb(0, 160, 220);
				}
			}
			.list {
				background-color: #fff;
				padding: 0 20px 20px 20px;
				overflow: hidden;
				.item {
					position: relative;
					border-bottom: 1px solid rgba(7, 17, 27, .1);
					.name {
						font-size: 14px;
						color: rgb(7, 17, 27);
						line-height: 48px;
					}
					.price-wrapper {
						position: absolute;
						top: 0;
						right: 90px;
						font-size: 0;
						color: rgb(240, 20, 20);
						line-height: 48px;
						.small {
							font-size: 10px;
							font-weight: normal;
						}
						.price {
							font-size: 14px;
							font-weight: 700;
						}
					}
					.cartcontrol-wrapper {
						position: absolute;
						right: 0;
						top: 6px;
					}
				}
			}
		}
	}
	.list-mask{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		backdrop-filter:blur(10px);
		opacity: 1;
		background-color: rgba(7,17,27,.6);
		z-index: 40;
		&.fade-enter-active,&.fade-leave-active{
			transition: all .4s; 
		}
		&.fade-enter,&.fade-leave-active{
			opacity: 0;
		}
	}
</style>