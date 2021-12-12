<template>
  <div>
    <loading v-if="isLoading" />
    <group-form
        v-if="group"
        :initial-values="initialValues"
        :errors="validationErrors"
        :is-submitting="isSubmitting"
        @formSubmit="onSubmit"
    />
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import GroupForm from "@/components/GroupForm";
import {mapState} from "vuex";
import {actionTypes} from "@/store/modules/group";

export default {
  name: "EditGroup",
  components: {
    Loading,
    GroupForm
  },
  methods: {
    onSubmit(data){
      this.$store.dispatch(
          actionTypes.updateGroup,
          {
            id: this.$route.params.id,
            group: data
          }
      ).then(() => {
        this.$router.push({name: 'GroupsFeed'})
      })
    }
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.group.isSubmitting,
      validationErrors: state => state.group.validationErrors,
      isLoading: state => state.group.isLoading,
      group: state => state.group.group,
    }),
    initialValues(){
      if(!this.group){
        return {
          name: '',
        }
      }
      return {
        name: this.group.name,
      }
    }
  },
  mounted() {
    this.$store.dispatch(actionTypes.getGroup, {id: this.$route.params.id})
  },
}
</script>

<style scoped>

</style>