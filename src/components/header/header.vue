<template>
	<div class="header">
		<div class="bgimg">
			<img :src="seller.avatar" alt="" style="width: 100%;height: 100%;" />
		</div>
		<div class="content-wrapper">
			<div class="headimg">
				<img :src="seller.avatar" alt="" style="width: 64px;height: 64px;" />
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="desc">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
				<div v-if="seller.supports" class="supports">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
		</div>
		<div class="bulletin-wrapper">
			<span class="title"></span>
			<div class=" text outtexthiddden">{{seller.bulletin}}</div>
			<i class="icon icon-keyboard_arrow_right"></i>
		</div>
		<div v-if="seller.supports" class="supportsbtn" @click="showDetail">
			<span class="count">{{seller.supports.length}}个</span>
			<i class="icon icon-keyboard_arrow_right"></i>
		</div>
		<transition name="fade">
			<div v-show="detailShow" class="detail">
				<div class="content">
					<h1 class="name">{{seller.name}}</h1>
					<star :size="20" :score="seller.score"></star>
					<div class="title">
						<div class="line"></div>
						<div class="text">优惠信息</div>
						<div class="line"></div>
					</div>
					<ul v-if="seller.supports" class="supports">
						<li class="support-item" v-for="item in seller.supports">
							<span class="icon" :class="classMap[item.type]"></span>
							<span class="text">{{item.description}}</span>
						</li>
					</ul>
					<div class="title">
						<div class="line"></div>
						<div class="text">商家公告</div>
						<div class="line"></div>
					</div>
					<div class="bulletin">
						<p>{{seller.bulletin}}</p>
					</div>
				</div>
				<div class="close">
					<span class="icon icon-close" @click="closeDetail"></span>
				</div>
			</div>
		</transition>

		<!--<div v-show="detailShow" class="detail">
			<div class="content">
				<h1 class="name">{{seller.name}}</h1>
				<star :size="20" :score="seller.score"></star>
				<div class="title">
					<div class="line"></div>
					<div class="text">优惠信息</div>
					<div class="line"></div>
				</div>
				<ul v-if="seller.supports" class="supports">
					<li class="support-item" v-for="item in seller.supports">
						<span class="icon" :class="classMap[item.type]"></span>
						<span class="text">{{item.description}}</span>
					</li>
				</ul>
				<div class="title">
					<div class="line"></div>
					<div class="text">商家公告</div>
					<div class="line"></div>
				</div>
				<div class="bulletin">
					<p>{{seller.bulletin}}</p>
				</div>
			</div>
			<div class="close">
				<span class="icon icon-close" @click="closeDetail"></span>
			</div>
		</div>-->
	</div>
</template>

<script type="text/ecmascript-6">
	import star from 'components/star/star'
	export default {
		data() {
				return {
					classMap: [],
					detailShow: false
				}
			},
			props: {
				seller: {
					type: Object
				}
			},
			methods: {
				showDetail() {
					this.detailShow = true
				},
				closeDetail() {
					this.detailShow = false
				}
			},
			created: function() {
				this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
			},
			components: {
				star
			}
	}
</script>

<style type="text/css" lang="less" scoped>
	.header {
		background-color: rgba(7, 17, 27, .5);
		color: #fff;
		position: relative;
		.bgimg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
			filter: blur(10px);
			-webkit-filter: blur(10px);
		}
		.supportsbtn {
			position: absolute;
			right: 12px;
			bottom: 40px;
			background-color: rgba(0, 0, 0, .2);
			height: 24px;
			line-height: 24px;
			font-size: 0;
			border-radius: 12px;
			padding: 0 8px;
			.count {
				font-size: 10px;
				margin-right: 2px;
			}
			.icon {
				font-size: 12px;
				line-height: 24px;
				vertical-align: top;
			}
		}
		.detail {
			position: fixed;
			z-index: 100;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			display: flex;
			background-color: rgba(7, 17, 27, .8);
			flex-direction: column;
			transition: all .5s;
			overflow: auto;
			&.fade-enter-active,
			&.fade-leave {
				opacity: 1;
				background-color: rgba(7, 17, 27, .8);
			}
			&.fade-enter,
			&.fade-leave-active {
				opacity: 0;
				background-color: rgba(7, 17, 27, 0);
			}
			.content {
				flex: 1;
				.name {
					font-size: 16px;
					font-weight: 700;
					color: #fff;
					text-align: center;
					margin: 64px 0 16px 0;
				}
				.title {
					display: flex;
					width: 80%;
					margin: 28px auto 24px auto;
					.line {
						flex: 1;
						margin-bottom: 6px;
						border-bottom: 1px solid rgba(255, 255, 255, .2);
					}
					.text {
						padding: 0 12px;
						font-size: 14px;
						font-weight: 600;
					}
				}
				.supports {
					font-size: 12px;
					font-weight: 200;
					font-size: 0;
					width: 80%;
					margin: 0 auto;
					padding: 0 12px;
					.support-item {
						margin-bottom: 12px;
						padding: 0 12px;
						.icon {
							display: inline-block;
							width: 16px;
							height: 16px;
							background-size: 100% 100%;
							background-repeat: no-repeat;
							vertical-align: top;
							&.decrease {
								background-image: url('decrease_2@2x.png');
							}
							&.discount {
								background-image: url('discount_2@2x.png');
							}
							&.invoice {
								background-image: url('invoice_2@2x.png');
							}
							&.special {
								background-image: url('special_2@2x.png');
							}
							&.guarantee {
								background-image: url('guarantee_2@2x.png');
							}
						}
						.text {
							font-size: 12px;
							margin-left: 6px;
							line-height: 16px;
						}
					}
					&:last-child {
						margin-bottom: 0;
					}
				}
				.bulletin {
					width: 80%;
					margin: 0 auto;
					>p {
						font-size: 12px;
						color: #fff;
						line-height: 2;
						padding: 0 12px;
					}
				}
			}
			.close {
				text-align: center;
				margin: 32px 0;
				.icon {
					font-size: 32px;
					color: rgba(255, 255, 255, .5);
				}
			}
		}
	}
	
	.content-wrapper {
		padding: 24px 0 18px 24px;
		display: flex;
		.headimg {
			display: inline-block;
			width: 64px;
			height: 64px;
			margin-right: 16px;
			img {
				border-radius: 4px;
			}
		}
		.content {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 64px;
			.title {
				height: 18px;
				line-height: 18px;
				font-size: 0;
				font-weight: bold;
				.brand {
					display: inline-block;
					width: 30px;
					height: 18px;
					margin-right: 6px;
					background: url('brand@2x.png') no-repeat;
					background-size: 100% 100%;
					vertical-align: top;
				}
				.name {
					font-size: 16px;
				}
			}
			.desc {
				height: 12px;
				font-size: 12px;
				font-weight: 200;
				line-height: 12px;
			}
			.supports {
				height: 10px;
				font-size: 10px;
				font-weight: 200;
				line-height: 10px;
				font-size: 0;
				.icon {
					display: inline-block;
					width: 12px;
					height: 12px;
					background-size: 100% 100%;
					background-repeat: no-repeat;
					vertical-align: top;
					&.decrease {
						background-image: url('decrease_2@2x.png');
					}
					&.discount {
						background-image: url('discount_2@2x.png');
					}
					&.invoice {
						background-image: url('invoice_2@2x.png');
					}
					&.special {
						background-image: url('special_2@2x.png');
					}
					&.guarantee {
						background-image: url('guarantee_2@2x.png');
					}
				}
				.text {
					font-size: 10px;
					margin-left: 4px;
				}
			}
		}
	}
	
	.bulletin-wrapper {
		height: 28px;
		position: relative;
		background-color: rgba(7, 17, 27, .2);
		.title {
			position: absolute;
			top: 8px;
			left: 12px;
			display: inline-block;
			width: 22px;
			height: 12px;
			background-image: url('bulletin@2x.png');
			background-size: 100% 100%;
			background-repeat: no-repeat;
		}
		.text {
			display: block;
			padding: 0 30px 0 38px;
			line-height: 28px;
			font-size: 10px;
		}
		.icon {
			position: absolute;
			top: 0;
			right: 12px;
			line-height: 28px;
			font-size: 16px;
		}
	}
</style>