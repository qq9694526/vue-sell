<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li class="menu-item border-1px" v-for="item in goods">
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
						<li class="food" v-for="food in section.foods">
							<div class="img">
								<img :src="food.image" alt="food.name" />
							</div>
							<div class="content">
								<h1>{{food.name}}</h1>
								<div>{{food.description}}</div>
								<div class="count-wrapper">
									<span>月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}</span>
								</div>
								<div class="price-wrapper">
									<span class="price">￥{{food.price}}</span>
									<span v-show="food.oldprice" class="oldprice">￥{{food.oldprice}}</span>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import vTypeicons from 'components/typeicons/typeicons'
	import BScroll from 'better-scroll'
	export default {
		data() {
				return {
					goods: {},
					listHeight:[]
				}
			},
			created() {
				this.$http.get('./api/goods').then((res) => {
					let json = res.body;
					console.log(json.data);
					if(json.errno == 0) {
						this.goods = json.data;
						this.$nextTick(()=>{
							this._initScroll();
							let goodsList=this.$refs.goodsList;
							let height=0;
							this.listHeight.push(height);
							for(var i=0;i<goodsList.length;i++){
								this.listHeight.push(goodsList[i].clientHeight);
							}
							console.log(this.listHeight)
						})
					}
				})
			},
			methods:{
				_initScroll(){
					this.menuScroll=new BScroll(this.$refs.menuWrapper,{});
					this.goodsScroll=new BScroll(this.$refs.goodsWrapper,{});
				}
			},
			components: {
				vTypeicons
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
				margin: 0 12px;
				.title{
					font-size: 0;
					.name{
						font-size: 12px;
					}
				}
			}
		}
		.goods-wrapper {
			flex: 1;
			.section{
				.title{
					font-size: 12px;
					color: rgb(147,153,159);
					line-height: 26px;
					background-color: #f3f5f7;
					border-left: 2px solid #d9dde1;
					text-indent: 14px;
				}
				.food{
					display: flex;
					padding: 18px;
					.img{
						flex:0 0 50px;
						img{
							width: 100%;
						}						
					}
					.content{
						flex: 1;
					}
				}
			}
		}
	}
</style>