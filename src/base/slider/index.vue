<template lang="html">
  <swiper :options="swiperOption">
		<swiper-slide v-for="(item, index) in recommends" :key="index">
			<a :href="item.linkUrl">
			  <img class="needsclick" :src="item.picUrl" @load="loadImage">
			</a>
		</swiper-slide>
		<div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
	</swiper>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    components: {
        swiper,
        swiperSlide
    },
    props: {
      recommends: {
        type: Array
      }
    },
    data() {
      return {
        swiperOption: {
					pagination: '.swiper-pagination',
          paginationClickable: true,
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: 5000,
          autoplayDisableOnInteraction: false,
          loop: true
				},
        checkLoaded: false
      }
    },
    methods: {
      loadImage() {
        if (!this.checkLoaded) {
          this.checkLoaded = true
          this.$emit('refreshScroll')
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .swiper-wrapper
    img
      width: 100%
</style>
