<template>
  <div>
    <group-form
        :initial-values="initialValues"
        :errors="validationErrors"
        :is-submitting="isSubmitting"
        @formSubmit="onSubmit"
    />
  </div>
</template>

<script>
import GroupForm from "@/components/GroupForm";
import {mapState} from 'vuex'
import {actionTypes} from "@/store/modules/group";

export default {
  name: "CreateStudent",
  data(){
    return {
      initialValues: {
        name: '',
      },
    }
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.group.isSubmitting,
      validationErrors: state => state.group.validationErrors,
    })
  },
  methods: {
    onSubmit(data){
      this.$store.dispatch(
          actionTypes.createGroup,
          {
            group: data
          }
      ).then(() => {
        this.$router.push({name: 'GroupsFeed'})
      })
    }
  },
  components: {
    GroupForm,
  }
}
</script>

<style scoped>

</style>