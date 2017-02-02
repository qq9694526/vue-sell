<template>
	<div class="starwrapper" :class="starType">
		<span class="item" v-for="itemClass in itemClasses" :class="itemClass"></span>
	</div>
</template>

<script type="text/ecmascript-6">
	const LENGTH = 5;
	export default {
		props: {
			size: {
				type: Number
			},
			score: {
				type: Number
			}
		},
		computed: {
			starType() {
				return "star-" + this.size;
			},
			itemClasses() {
				let result = [];
				let score = Math.floor(this.score * 2) / 2; //向下取0.5的倍数
				let hasDecimal = score % 1 !== 0; //是否有半星
				let integer = Math.floor(score); //有几个全星
				for(let i = 0; i < integer; i++) {
					result.push("on");
				}
				if(hasDecimal) {
					result.push("half");
				}
				while(result.length < LENGTH) {
					result.push("off");
				}
				return result;
			}
		}
	}
</script>

<style type="text/css" lang="less" scoped>
	.starwrapper {
		text-align: center;
	}
	
	.star-20 {
		.item {
			display: inline-block;
			width: 20px;
			height: 20px;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			margin-right: 12px;
		}
		.on {
			background-image: url(star48_on@3x.png);
		}
		.half {
			background-image: url(star48_half@3x.png);
		}
		.off {
			background-image: url(star48_off@3x.png);
		}
	}
	
	.star-15 {
		.item {
			display: inline-block;
			width: 15px;
			height: 15px;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			margin-right: 6px;
		}
		.on {
			background-image: url(star48_on@3x.png);
		}
		.half {
			background-image: url(star48_half@3x.png);
		}
		.off {
			background-image: url(star48_off@3x.png);
		}
	}
</style>