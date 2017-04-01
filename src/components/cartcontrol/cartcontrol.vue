<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="cart-decrease icon icon-remove_circle_outline" v-show="food.count" @click.stop="decreaseCart"></div>
		</transition>
		<div class="cart-count" v-show="food.count">{{food.count}}</div>
		<div class="cart-add icon icon-add_circle" @click.stop="addCart"></div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		props: {
			food: {
				type: Object
			}
		},
		methods: {
			addCart(event) {
				if(!this.food.count) {
					this.$set(this.food, "count", 1);
				} else {
					this.$set(this.food, "count", this.food.count + 1);
				}
				//通过根组件(app)的事件中心派发事件
				this.$root.eventHub.$emit("cart-add",event.target);
			},
			decreaseCart() {
				if(this.food.count) {
					this.$set(this.food, "count", this.food.count - 1);
				}
			}
		}
	}
</script>

<style type="text/css" lang="less" scoped>
	.cartcontrol {
		font-size: 0;
		.cart-decrease {
			display: inline-block;
			font-size: 24px;
			line-height: 1;
			padding: 6px;
			color: rgb(0, 160, 220);
		}
		.cart-count {
			display: inline-block;
			width: 12px;
			text-align: center;
			font-size: 10px;
			color: rgb(147, 153, 159);
			vertical-align: top;
			margin-top: 12px;
		}
		.cart-add {
			display: inline-block;
			font-size: 24px;
			line-height: 1;
			padding: 6px;
			color: rgb(0, 160, 220);
		}
	}
	/*动画*/
	.move-enter-active,
	.move-leave-active {
		transition: all .4s linear;
	}
	
	.move-enter,
	.move-leave-active {
		opacity: 0;
		transform: translate3d(24px, 0, 0) rotate(180deg);
	}
</style>