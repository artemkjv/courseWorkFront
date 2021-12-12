<template>
  <div>
    <loading v-if="isLoading" />
    <error-message v-if="error" />
    <div v-if="feed">
      <div class="article-preview" v-for="(student, index) in feed.students" :key="index">
        <router-link :to="{name: 'EditStudent', params: {id: student.id}}" class="preview-link">
          <h1>{{ student.name }}</h1>
          <span>Read more...</span>
        </router-link>
      </div>
      <pagination :total="feed.total" :limit="limit" :currentPage="currentPage" :url="baseUrl" />
    </div>

  </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from "@/store/modules/feed";
import Pagination from '@/components/Pagination';
import {PAGE_LIMIT} from "@/helpers/vars";
import {stringify, parseUrl} from 'query-string'
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";

export default {
  name: "Feed",
  props: {
    apiUrl: {
      type: String,
      required: true
    }
  },
  data(){
    return{
      limit: PAGE_LIMIT,
    }
  },
  components: {
    ErrorMessage,
    Pagination,
    Loading
  },
  computed: {
    ...mapState({
      isLoading: state => state.feed.isLoading,
      feed: state => state.feed.data,
      error: state => state.feed.error
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
      this.$store.dispatch(actionTypes.getFeed, {apiUrl: assembledUrl})
    }
  }
}
</script>

<style scoped>

</style>