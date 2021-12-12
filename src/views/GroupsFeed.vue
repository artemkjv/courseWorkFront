<template>
  <div class="home-page">
    <banner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <feed-toggler />
          <div>
            <loading v-if="isLoading" />
            <error-message v-if="error" />
            <div v-if="feed">
              <div class="article-preview" v-for="(group, index) in feed.groups" :key="index">
                <router-link :to="{name: 'EditGroup', params: {id: group.id}}" class="preview-link">
                  <h1>{{ group.name }}</h1>
                  <span>Read more...</span>
                </router-link>
              </div>
              <pagination :total="feed.total" :limit="limit" :currentPage="currentPage" :url="baseUrl" />
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "@/components/Banner";
import FeedToggler from "@/components/FeedToggler";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";
import Pagination from "@/components/Pagination";
import {mapState} from "vuex";
import {parseUrl, stringify} from "query-string";
import {actionTypes} from "@/store/modules/groups";
import {PAGE_LIMIT} from "@/helpers/vars";

export default {
  name: "StudentsFeed",
  components: {
    FeedToggler,
    Banner,
    Loading,
    ErrorMessage,
    Pagination
  },
  data(){
    return {
      apiUrl: '/groups',
      limit: PAGE_LIMIT,
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.groups.isLoading,
      feed: state => state.groups.data,
      error: state => state.groups.error
    }),
    currentPage(){
      return Number(this.$route.query.page || '1')
    },
    baseUrl(){
      return this.$route.path
    },
    offset(){
      return this.currentPage * this.limit - this.limit;
    }
  },
  watch: {
    currentPage(){
      this.fetchFeed()
    }
  },
  mounted() {
    this.fetchFeed()
  },
  methods: {
    fetchFeed(){
      const parsedUrl =  parseUrl(this.apiUrl)
      const stringifiedParams = stringify({
        limit: this.limit,
        offset: this.offset,
        ...parsedUrl.query
      })
      const assembledUrl = `${parsedUrl.url}?${stringifiedParams}`
      this.$store.dispatch(actionTypes.getGroups, {apiUrl: assembledUrl})
    }
  }
}
</script>

<style scoped>

</style>