<template>
  <div class="home-page">
    <banner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <feed-toggler />
          <feed :api-url="apiUrl" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Feed from '@/components/Feed'
import Banner from "@/components/Banner";
import FeedToggler from "@/components/FeedToggler";

export default {
  name: "StudentsFeed",
  components: {
    FeedToggler,
    Banner,
    Feed,
  },
  data(){
    return {
      apiUrl: '/students'
    }
  }
}
</script>

<style scoped>

</style>