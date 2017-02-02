<template>
	<span class="icon" :class="iconStyle"></span>
</template>

<script type="text/ecmascript-6">
	export default {
		data() {
				return {
					classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
				}
			},
			props: {
				size: {
					type: Number
				},
				index: {
					type: Number
				}
			},
			computed:{
				iconStyle(){
					return this.classMap[this.index]+" icon-"+this.size;
				}
			}
	}
</script>

<style type="text/css" lang="less" scoped>
	.icon {
		display: inline-block;
		width: 12px;
		height: 12px;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		vertical-align: top;
		&.icon-12{
			width: 12px;
			height: 12px;
		}
		&.icon-16{
			width: 16px;
			height: 16px;
		}
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
</style>