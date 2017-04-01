<template>
	<transition name="move">
		<div class="food" v-show="foodShow">
			<div class="header-image">
				<img class="img" :src="food.image" />
				<div class="back-btn">
					<span class="icon icon-arrow_lift" @click="foodShow=false"></span>
				</div>
			</div>
			<div class="base-info">
				<h3 class="name">{{food.name}}</h3>
				<div class="count-wrapper">
					<span>月售{{food.sellCount}}份</span>
					<span>好评率{{food.rating}}</span>
				</div>
				<div class="price-wrapper">
					<span class="price"><small>￥</small>{{food.price}}</span>
					<span v-show="food.oldPrice" class="oldprice"><small>￥</small>{{food.oldPrice}}</span>
				</div>
			</div>
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">
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
	}
</style>