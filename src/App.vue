<template>
  <div id="app">
    <bp-header></bp-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
  import BpHeader from './components/bp-header'
  import tab from './components/tab'
  import player from './components/player'
  export default {
    components: {
      BpHeader,
      tab,
      player
    }
  }
</script>
