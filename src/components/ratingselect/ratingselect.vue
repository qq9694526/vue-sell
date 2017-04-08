<template>
	<div class="rantingselect">
		<div class="options">
			<div class="option normal" :class="{'selected':selectType===2}" @click="changeType(2)">
				<span class="text">全部</span>
				<span class="num">{{ratings.length}}</span>
			</div>
			<div class="option normal" :class="{'selected':selectType===0}" @click="changeType(0)">
				<span class="text">推荐</span>
				<span class="num">{{positives.length}}</span>
			</div>
			<div class="option bad" :class="{'selected':selectType===1}" @click="changeType(1)">
				<span class="text">吐槽</span>
				<span class="num">{{negatives.length}}</span>
			</div>
		</div>
		<div class="onlycontent" :class="{'selected':onlyContent}" @click="toogleContent">
			<span class="icon icon-check_circle"></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		data(){
			return {
				selectedType:this.selectType,
				selectedContent:this.onlyContent
			}
		},
		props: {
			ratings: {
				type: Array,
				default() {
					return [];
				}
			},
			selectType: {
				type: Number,
				default: 2
			},
			onlyContent: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			positives() {
				return this.ratings.filter((rating) => {
					return rating.rateType === 0
				})
			},
			negatives() {
				return this.ratings.filter((rating) => {
					return rating.rateType === 1
				})
			}
		},
		methods: {
			toogleContent(){
				this.selectedContent=!this.selectedContent;
				this.updateSelects()
			},
			changeType(type){
				this.selectedType=type;
				this.updateSelects();
			},
			updateSelects() {
				//通过根组件(app)的事件中心派发事件
				this.$root.eventHub.$emit("update-selects", [this.selectedType,this.selectedContent]);
			}
		}
	}
</script>

<style type="text/css" lang="less" scoped>
	.rantingselect {
		padding: 18px 18px 0 18px;
		border-bottom: 1px solid rgba(77, 85, 93, .2);
		.options {
			font-size: 0;
			padding-bottom: 18px;
			.option {
				display: inline-block;
				font-size: 0;
				padding: 8px 12px;
				border-radius: 2px;
				line-height: 1;
				margin-right: 10px;
				.text {
					font-size: 12px;
					margin-right: 5px;
				}
				.num {
					font-size: 8px;
				}
				&.normal {
					background-color: rgba(0, 160, 220, .2);
					color: rgb(77, 85, 93);
					&.selected {
						background-color: rgb(0, 160, 220);
						color: rgb(255, 255, 255);
					}
				}
				&.bad {
					background-color: rgba(77, 85, 93, .2);
					color: rgb(77, 85, 93);
					&.selected {
						background-color: rgb(77, 85, 93);
						color: rgb(255, 255, 255);
					}
				}
			}
		}
		.onlycontent {
			font-size: 0;
			padding: 12px 0;
			border-top: 1px solid rgba(77, 85, 93, .2);
			&.selected {
				.icon {
					color: #00c850;
				}
			}
			.icon {
				display: inline-block;
				font-size: 24px;
				color: rgb(147, 153, 159);
				line-height: 24px;
				vertical-align: top;
				margin-right: 5px;
			}
			.text {
				display: inline-block;
				font-size: 12px;
				color: rgb(147, 153, 159);
				line-height: 24px;
			}
		}
	}
</style>