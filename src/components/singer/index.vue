<template lang="html">
  <div class="singer" ref="singer">
    <listview @select="selectSinger" :data="singerList" ref="list"></listview>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getSingerList} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import Singer from 'common/js/singer'
  import {mapMutations} from 'vuex'
  import listview from 'base/listview'
  import {playListMixin} from 'common/js/mixin'

  const HOT_NAME = '热门'
  const HOT_SINGER_LEN = 10

  export default {
    mixins: [playListMixin],
    components: {
      listview
    },
    data() {
      return {
        singerList: []
      }
    },
    created() {
      this._getSingerList()
    },
    methods: {
      _getSingerList() {
        var list = []
        for (let i = 1; i < 5; i++) {
          getSingerList(i).then((res) => {
            if (res.code === ERR_OK) {
              list = list.concat(res.data.list)
            }
          })
        }
        setTimeout(() => {
          this.singerList = this._normalizeSinger(list)
        }, 1000)
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          }
          let key = ''
          if (item.Findex.match(/[a-zA-Z]/)) {
            key = item.Findex
          } else {
            key = '#'
          }
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        })

        let hot = []
        let ret = []
        let sharp = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          } else {
            sharp.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret, sharp)
      },
      selectSinger(singer) {
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        this.setSinger(singer)
      },
      handlePlayList(playList) {
        const bottom = playList.length > 0 ? '60px' : ''
        this.$refs.singer.style.bottom = bottom
        this.$refs.list.refresh()
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
