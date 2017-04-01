<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li class="menu-item border-1px" v-for="(item,index) in goods" :class="{active:currentIndex===index}" @click="selectMenu(index,$event)">
					<span class="title">
						<v-typeicons v-show="item.type>0" :size="12" :index="item.type"></v-typeicons>
						<span class="name">{{item.name}}</span>
					</span>
				</li>
			</ul>
		</div>
		<div class="goods-wrapper" ref="goodsWrapper">
			<ul>
				<li class="section" v-for="section in goods" ref="goodsList">
					<h1 class="title">{{section.name}}</h1>
					<ul>
						<li class="food" v-for="food in section.foods" @click="showFood(food)">
							<div class="img">
								<img :src="food.image" alt="food.name" />
							</div>
							<div class="content">
								<h1 class="name">{{food.name}}</h1>
								<div class="desc">{{food.description}}</div>
								<div class="count-wrapper">
									<span>月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}</span>
								</div>
								<div class="price-wrapper">
									<span class="price"><small>￥</small>{{food.price}}</span>
									<span v-show="food.oldPrice" class="oldprice"><small>￥</small>{{food.oldPrice}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<v-cartcontrol :food="food"></v-cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<vShopcart :select-foods="selectFoods" :min-price="seller.minPrice" :delivery-price="seller.deliveryPrice"></vShopcart>
		<vFood :food="selectedFood" ref="food"></vFood>
	</div>
</template>

<script type="text/ecmascript-6">
	import vTypeicons from 'components/typeicons/typeicons'
	import BScroll from 'better-scroll'
	import vShopcart from 'components/shopcart/shopcart'
	import vCartcontrol from 'components/cartcontrol/cartcontrol'
	import vFood from 'components/food/food'

	export default {
		data() {
			return {
				goods: [],
				listHeight: [],
				scrollY: 0,
				selectedFood:{}
			}
		},
		props: {
			seller: {
				type: Object,
				default: function() {}
			}
		},
		computed: {
			currentIndex() {
				for(var i = 0; i < this.listHeight.length; i++) {
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i + 1];
					//i到最大值时i+1为undefined,所以要多加个判断
					if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
						return i;
					}
				}
				return 0;
			},
			selectFoods() {
				let foods = [];
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if(food.count) {
							foods.push(food);
						}
					})
				})
				return foods;
			}
		},
		created() {
			this.$http.get('./api/goods').then((res) => {
				let json = res.body;
				console.log(json.data);
				if(json.errno == 0) {
					this.goods = json.data;
					this.$nextTick(() => { //DOM更新后执行
						this._initScroll();
						let goodsList = this.$refs.goodsList;
						let height = 0;
						this.listHeight.push(height);
						for(var i = 0; i < goodsList.length; i++) {
							height += goodsList[i].clientHeight;
							this.listHeight.push(height);
						}
						console.log(this.listHeight);
					});
				}
			})
		},
		methods: {
			selectMenu(index, event) { //scroll插件派发了点击事件,需要把系统默认的点击事件阻止
				if(!event._constructed) {
					return;
				}
				let goodsList = this.$refs.goodsList;
				let el = goodsList[index];
				//scroll插件提供的滚动到指定DOM方法
				this.goodsScroll.scrollToElement(el, 300);
				console.log(index);
			},
			_initScroll() { //初始化better-scroll滚动组件
				this.menuScroll = new BScroll(this.$refs.menuWrapper, {
					click: true
				});
				this.goodsScroll = new BScroll(this.$refs.goodsWrapper, {
					click: true,
					probeType: 3
				});
				this.goodsScroll.on("scroll", (pos) => {
					this.scrollY = Math.abs(Math.round(pos.y));
				})
			},
			showFood(food){
				this.selectedFood=food;
				console.log(food);
				this.$refs.food.show();
			}
		},
		components: {
			vTypeicons,
			vShopcart,
			vCartcontrol,
			vFood
		}
	}
</script>

<style type="text/css" lang="less" scoped>
	.goods {
		display: flex;
		position: absolute;
		top: 175px;
		left: 0;
		bottom: 46px;
		width: 100%;
		overflow-y: hidden;
		.menu-wrapper {
			flex: 0 0 80px;
			background-color: #f3f5f7;
			.menu-item {
				display: flex;
				align-items: center;
				font-size: 12px;
				/*color: rgb(240,20,20);*/
				font-weight: 200;
				line-height: 14px;
				height: 54px;
				padding: 0 12px;
				.title {
					font-size: 0;
					.name {
						font-size: 12px;
					}
				}
				&.active {
					position: relative;
					margin-top: -1px;
					z-index: 10;
					font-weight: 700;
					background-color: #fff;
				}
			}
		}
		.goods-wrapper {
			flex: 1;
			.section {
				.title {
					font-size: 12px;
					color: rgb(147, 153, 159);
					line-height: 26px;
					background-color: #f3f5f7;
					border-left: 2px solid #d9dde1;
					text-indent: 14px;
				}
				.food {
					display: flex;
					padding: 18px 0;
					margin: 0 18px;
					position: relative;
					&:not(:last-child):after {
						content: "";
						position: absolute;
						left: 0;
						bottom: 0;
						width: 100%;
						height: 1px;
						background-color: rgba(7, 17, 27, .1);
					}
					.img {
						flex: 0 0 50px;
						img {
							width: 100%;
						}
					}
					.content {
						flex: 1;
						margin-left: 10px;
						.name {
							font-size: 14px;
							color: rgb(7, 17, 27);
							line-height: 1;
							margin-top: 2px;
						}
						.desc {
							font-size: 10px;
							color: rgb(147, 153, 159);
							line-height: 1;
							margin-top: 8px;
						}
						.count-wrapper {
							font-size: 10px;
							color: rgb(147, 153, 159);
							line-height: 1;
							margin-top: 8px;
						}
						.price-wrapper {
							margin-top: 8px;
							.price {
								font-size: 14px;
								font-weight: 700;
								line-height: 1;
								color: rgb(240, 20, 20);
								small {
									font-size: 10px;
								}
							}
							.oldprice {
								font-size: 10px;
								color: rgb(147, 153, 159);
								line-height: 1;
								font-weight: 700;
								text-decoration: line-through;
							}
						}
						.cartcontrol-wrapper {
							position: absolute;
							bottom: 0;
							right: 0;
						}
					}
				}
			}
		}
	}
</style>