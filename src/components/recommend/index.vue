<template lang="html">
  <div class="recommend" ref="recommend">
      <scroll class="recommend-content" :data="disclist" ref="scroll">
        <div>
          <div class="slider-wrapper" v-if="recommends.length">
            <slider :recommends = "recommends" @refreshScroll="refreshScroll"></slider>
          </div>
          <div class="recommend-list">
            <h1 class="list-title">热门歌单推荐</h1>
            <ul>
              <li v-for="item in disclist" class="item" @click="selectItem(item)">
                <div class="icon">
                  <img v-lazy="item.imgurl" width="60" height="60">
                </div>
                <div class="text">
                  <h2 class="name" v-html="item.creator.name"></h2>
                  <p class="desc" v-html="item.dissname"></p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="loading-container" v-show="!disclist.length">
          <loading></loading>
        </div>
      </scroll>
      <router-view></router-view>
  </div>
</template>

<script>
  import {getRecommend, getDisclist} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import {playListMixin} from 'common/js/mixin'

  import slider from 'base/slider'
  import scroll from 'base/scroll'
  import loading from 'base/loading'
  import {mapMutations} from 'vuex'

  export default {
    mixins: [playListMixin],
    components: {
      slider,
      scroll,
      loading
    },
    data() {
      return {
        recommends: [],
        disclist: []
      }
    },
    created() {
      this._getRecommend()
      this._getDisclist()
    },
    methods: {
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider
          }
        })
      },
      _getDisclist() {
        getDisclist().then((res) => {
          if (res.code === ERR_OK) {
            this.disclist = res.data.list
          }
        })
      },
      handlePlayList(playList) {
        const bottom = playList.length > 0 ? '60px' : ''
        this.$refs.recommend.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      refreshScroll() {
        this.$refs.scroll.refresh()
      },
      selectItem(item) {
        this.$router.push({
          path: `/recommend/${item.dissid}`
        })
        this.setDisc(item)
      },
      ...mapMutations({
        setDisc: 'SET_DISC'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
