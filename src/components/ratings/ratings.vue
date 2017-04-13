<template>
	<div class="ratings" ref="ratings">
		<div class="ratings-content">
			<div class="score-wrapper">
				<div class="left">
					<div class="score">{{seller.score}}</div>
					<div class="text">综合评分</div>
					<div class="lighttext">高于周边商家{{seller.rankRate}}%</div>
				</div>
				<ul class="right">
					<li class="line">
						<span class="label">服务态度</span>
						<v-star :size="12" :score="seller.serviceScore"></v-star>
						<span class="score">{{seller.serviceScore}}</span>
					</li>
					<li class="line">
						<span class="label">菜品满意</span>
						<v-star :size="12" :score="seller.foodScore"></v-star>
						<span class="score">{{seller.foodScore}}</span>
					</li>
					<li class="line">
						<span class="label">送达时间</span>
						<span class="text">{{seller.deliveryTime}}分钟</span>
					</li>
				</ul>
			</div>
			<v-split></v-split>
			<div class="rating-wrapper">
				<v-ratingselect :ratings="ratings" :selectType="selectType" :onlyContent="onlyContent"></v-ratingselect>
				<ul class="rating-list">
					<li class="item" v-for="rating in selectedRatings">
						<div class="headimg">
							<img :src="rating.avatar" />
						</div>
						<ul class="content">
							<li class="time">{{rating.rateTime|formatDate}}</li>
							<li class="name">{{rating.username}}</li>
							<li>
								<v-star :score="rating.score" :size="12"></v-star>
								<span class="lighttext">{{rating.deliveryTime}}分钟送达</span>
							</li>
							<li class="text">{{rating.text}}</li>
							<li class="line4">
								<span :class="['icon',rating.rateType==1?'icon-thumb_down':'icon-thumb_up']"></span>
								<span class="food" v-for="name in rating.recommend">{{name}}</span>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll'
	import { formatDate } from 'common/js/date'
	import { DATA } from '../../common/js/data.js'
	import vSplit from 'components/split/split'
	import vStar from 'components/star/star'
	import vRatingselect from 'components/ratingselect/ratingselect'

	const ERR_OK = 0;
	export default {
		data() {
			return {
				ratings: [],
				selectType: 2,
				onlyContent: false
			}
		},
		props: {
			seller: {
				type: Object
			}
		},
		created() {
			this.ratings = DATA.ratings;
			this.$nextTick(() => {
				if(!this.ratingsScroll) {
					this.ratingsScroll = new BScroll(this.$refs.ratings, {
						click: true
					});
				} else {
					this.ratingsScroll.refresh();
				}
			})
			//通过事件中心监听事件
			this.$root.eventHub.$on("update-selects", this.updateSelects);
		},
		computed: {
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
				return selectedRatings;
			}
		},
		methods: {
			updateSelects(selects) {
				this.selectType = selects[0];
				this.onlyContent = selects[1];
				this.$nextTick(() => {
					this.ratingsScroll.refresh();
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
			vSplit,
			vStar,
			vRatingselect
		}
	}
</script>

<style type="text/css" lang="less" scoped>
	.ratings {
		position: absolute;
		top: 175px;
		left: 0;
		bottom: 0;
		width: 100%;
		overflow: hidden;
		.ratings-content {
			.rating-wrapper {
				.rating-list {
					padding: 18px;
					.item {
						position: relative;
						border-bottom: 1px solid rgba(7, 17, 27, .2);
						padding-bottom: 18px;
						.headimg {
							position: absolute;
							width: 28px;
							height: 28px;
							img {
								display: block;
								width: 100%;
								height: 100%;
								border-radius: 50%;
							}
						}
						.content {
							padding-left: 40px;
							.time {
								position: absolute;
								top: 1px;
								right: 0;
								font-size: 10px;
								color: rgb(147, 153, 159);
								line-height: 12px;
								font-weight: 200;
							}
							.name {
								font-size: 10px;
								line-height: 12px;
								color: rgb(7, 17, 27);
								margin-bottom: 4px;
							}
							.lighttext {
								font-size: 10px;
								color: rgba(7, 17, 27, .4);
								padding-bottom: 6px;
							}
							.text {
								font-size: 12px;
								color: rgb(7, 17, 27);
								line-height: 18px;
							}
							.line4 {
								font-size: 0;
								.icon {
									font-size: 12px;
									line-height: 16px;
									margin-right: 8px;
									&.icon-thumb_up {
										color: rgb(0, 160, 220);
									}
									&.icon-thumb_down {
										color: rgb(183, 187, 191);
									}
								}
								.food {
									display: inline-block;
									color: rgb(147, 153, 159);
									font-size: 9px;
									line-height: 16px;
									border: 1px solid rgba(7, 17, 27, .1);
									border-radius: 2px;
									margin-right: 8px;
									padding: 0 6px;
									margin-bottom: 4px;
								}
							}
						}
					}
				}
			}
			.score-wrapper {
				display: flex;
				padding: 18px 0;
				.left {
					flex: 0 0 120px;
					width: 120px;
					text-align: center;
					line-height: 1;
					border-right: 1px solid rgba(7, 17, 27, .2);
					.score {
						font-size: 24px;
						color: rgb(255, 153, 0);
						line-height: 28px;
						margin-bottom: 6px;
					}
					.text {
						font-size: 12px;
						color: rgb(7, 17, 27);
						padding-bottom: 8px;
					}
					.lighttext {
						font-size: 10px;
						color: rgba(7, 17, 27, .4);
						padding-bottom: 6px;
					}
				}
				.right {
					flex: 1;
					text-align: center;
					.line {
						line-height: 1;
						font-size: 0;
						padding: 6px 0;
						.label {
							display: inline-block;
							font-size: 12px;
							color: rgb(7, 17, 27);
							margin-right: 6px;
							vertical-align: top;
						}
						.text {
							display: inline-block;
							min-width: 100px;
							text-align: left;
							font-size: 12px;
							color: rgba(7, 17, 27, .4);
							vertical-align: top;
						}
						.score {
							display: inline-block;
							margin-left: 6px;
							font-size: 12px;
							color: rgb(255, 153, 0);
							vertical-align: top;
						}
					}
				}
			}
		}
	}
</style>