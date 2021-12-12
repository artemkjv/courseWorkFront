<template>
  <div id="app">
    <mcv-top-bar />
    <router-view/>
  </div>
</template>
<script>
import McvTopBar from '@/components/Topbar'

export default {
  name: 'App',
  components: {
    McvTopBar
  },
}
</script>
<style>
@import './assets/css/main.css';
</style>