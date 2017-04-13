<template>
	<div class="app">
		<v-header :seller="seller"></v-header>
		<div class="nav">
			<div class="item">
				<router-link to="/goods" tag="div">商品</router-link>
			</div>
			<div class="item">
				<router-link to="/ratings" tag="div">评论</router-link>
			</div>
			<div class="item">
				<router-link to="/seller" tag="div">商家</router-link>
			</div>
		</div>
		<keep-alive>
			<router-view :seller="seller"></router-view>
		</keep-alive>
	</div>
</template>

<script type="text/ecmascript-6">
	import vHeader from 'components/header/header'
	const ERR_OK = 0;

	export default {
		data() {
			return {
				seller: {}
			}
		},
		created() {
			this.$http.get('./api/seller').then((res) => {
				let json = res.body;
				console.log(json.data);
				if(json.errno == ERR_OK) {
					this.seller = json.data;
				}
			})
		},
		components: {
			vHeader
		}
	}
</script>

<style type="text/css" lang="less">
	.nav {
		display: flex;
		font-size: 16px;
		color: #333;
		border-bottom: 1px solid rgba(7, 17, 27, .1);
		.item {
			flex: 1;
			text-align: center;
			line-height: 40px;
			font-size: 14px;
			color: rgb(77, 85, 93);
			.active {
				color: red;
			}
		}
	}
</style>