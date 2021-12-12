<template>
<div class="feed-toggle">
  <ul class="nav nav-pills outline-active">
    <li class="nav-item">
      <router-link
          :to="{name: 'StudentsFeed'}"
          class="nav-link"
          :class="{active: routeName === 'StudentsFeed'}"
      >
        Students Feed
      </router-link>
    </li>
    <li class="nav-item">
      <router-link
          :to="{name: 'GroupsFeed'}"
          class="nav-link"
          :class="{active: routeName === 'GroupsFeed'}"
      >
        Groups Feed
      </router-link>
    </li>
  </ul>
</div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "FeedToggler",
  props: {
    tagName: {
      type: String,
      required: false,
    }
  },
  computed: {
    ...mapGetters({
    }),
    routeName(){
      return this.$route.name
    }
  }
}
</script>

<style scoped>

</style>