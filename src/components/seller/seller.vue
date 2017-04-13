<template>
	<div class="seller" ref="sellerWrapper">
		<div class="seller-content">
			<div class="header">
				<div class="name">{{seller.name}}</div>
				<div class="rating">
					<v-star :size="15" :score="seller.score" class="icon"></v-star>
					<span class="ratingnum">({{seller.ratingCount}})</span>
					<span class="sellnum">月售{{seller.sellCount}}单</span>
				</div>
				<div class="deliver">
					<ul class="item">
						<li class="label">起送价</li>
						<li class="text">
							<span class="num">{{seller.minPrice}}</span>
							<span class="small">元</span>
						</li>
					</ul>
					<ul class="item">
						<li class="label">商家配送</li>
						<li class="text">
							<span class="num">{{seller.deliveryPrice}}</span>
							<span class="small">元</span>
						</li>
					</ul>
					<ul class="item">
						<li class="label">平均配送时间</li>
						<li class="text">
							<span class="num">{{seller.deliveryTime}}</span>
							<span class="small">分</span>
						</li>
					</ul>
				</div>
			</div>
			<v-split></v-split>
			<div class="bulletin-wrapper">
				<div class="title">公告与活动</div>
				<div class="bulletin">
					{{seller.bulletin}}
				</div>
				<ul class="supports">
					<li class="item" v-for="support in seller.supports">
						<v-typeicons :size="16" :index="support.type"></v-typeicons>
						<span class="text">{{support.description}}</span>
					</li>
				</ul>
			</div>
			<v-split></v-split>
			<div class="pics">
				<div class="title">商家实景</div>
				<div class="picwrapper" ref="picWrapper">
					<div class="piclist" ref="picList">
						<img class="img" v-for="pic in seller.pics" :src="pic" />
					</div>
				</div>
			</div>
			<v-split></v-split>
			<div class="sellerinfo">
				<div class="title">商家信息</div>
				<div class="item" v-for="info in seller.infos">{{info}}</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll'
	import vTypeicons from 'components/typeicons/typeicons'
	import vSplit from 'components/split/split'
	import vStar from 'components/star/star'

	export default {
		props: {
			seller: {
				type: Object
			}
		},
		watch: {
			seller: function() {
				this._initScroll();
				this._initPics();
			}
		},
		mounted() {
			this._initScroll();
			this._initPics();
		},
		methods: {
			_initScroll() {
				this.$nextTick(() => {
					if(!this.sellerScroll) {
						this.sellerScroll = new BScroll(this.$refs.sellerWrapper, {
							click: true
						});
					} else {
						this.sellerScroll.refresh();
					}
				})
			},
			_initPics() {
				this.$nextTick(() => {
					if(this.seller.pics) {
						let imgWidth = 120,
							margin = 6,
							wrapWidth = (imgWidth + margin) * this.seller.pics.length-margin;
						this.$refs.picList.style.width = wrapWidth + "px";
						if(!this.picScroll) {
							this.picScroll = new BScroll(this.$refs.picWrapper, {
								scrollX: true,
								eventPassthrough: 'vertical'
							});
						} else {
							this.picScroll.refresh();
						}
					}
				})
			}
		},
		components: {
			vTypeicons,
			vSplit,
			vStar
		}
	}
</script>

<style type="text/css" lang="less" scoped>
	.seller {
		position: absolute;
		top: 175px;
		left: 0;
		bottom: 0;
		width: 100%;
		overflow: hidden;
		.pics {
			padding: 18px;
			.title {
				font-size: 16px;
				color: #333;
				font-weight: 700;
				margin-bottom: 12px;
			}
			.picwrapper {
				width: 100%;
				white-space: nowrap;
				overflow: hidden;
				.piclist {
					font-size: 0;
					.img {
						display: inline-block;
						width: 120px;
						height: 90px;
						&:not(:last-child) {
							margin-right: 6px;
						}
					}
				}
			}
		}
		.sellerinfo {
			padding: 18px 18px 0 18px;
			.title {
				font-size: 16px;
				color: #333;
				font-weight: 700;
				margin-bottom: 12px;
			}
			.item {
				font-size: 12px;
				border-top: 1px solid rgba(7, 17, 27, .1);
				padding: 16px 12px;
				color: rgb(7, 17, 27);
				line-height: 16px;
			}
		}
		.bulletin-wrapper {
			padding: 18px 18px 0 18px;
			.title {
				font-size: 16px;
				color: #333;
				font-weight: 700;
				margin-bottom: 8px;
			}
			.bulletin {
				font-weight: 200;
				font-size: 12px;
				color: rgb(240, 20, 20);
				line-height: 24px;
				padding: 0 12px 12px 12px;
			}
			.supports {
				.item {
					font-size: 0;
					border-top: 1px solid rgba(7, 17, 27, .1);
					padding: 16px 12px;
					.text {
						font-size: 12px;
						color: rgb(7, 17, 27);
						line-height: 16px;
						margin-left: 4px;
					}
				}
			}
		}
		.header {
			padding: 18px;
			.name {
				font-size: 14px;
				color: rgb(7, 17, 27);
				line-height: 1;
				margin-bottom: 8px;
			}
			.rating {
				font-size: 0;
				height: 18px;
				margin-bottom: 18px;
				.ratingnum {
					display: inline-block;
					vertical-align: top;
					font-size: 10px;
					color: rgb(77, 85, 93);
					line-height: 18px;
					margin-right: 6px;
				}
				.sellnum {
					display: inline-block;
					vertical-align: top;
					font-size: 10px;
					color: rgb(77, 85, 93);
					line-height: 18px;
				}
			}
			.deliver {
				display: flex;
				border-top: 1px solid rgba(7, 17, 27, .1);
				padding-top: 18px;
				.item {
					flex: 0 0 33.33%;
					text-align: center;
					&:not(:last-child) {
						border-right: 1px solid rgba(7, 17, 27, .1);
					}
					.label {
						font-size: 10px;
						color: rgb(147, 153, 159);
						margin-bottom: 4px;
					}
					.text {
						font-size: 0;
						color: rgb(7, 17, 27);
						.num {
							font-size: 24px;
						}
						.small {
							font-size: 10px;
						}
					}
				}
			}
		}
	}
</style>