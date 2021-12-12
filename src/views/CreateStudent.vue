<template>
  <div>
    <student-form
        :initial-values="initialValues"
        :errors="validationErrors"
        :is-submitting="isSubmitting"
        @formSubmit="onSubmit"
    />
  </div>
</template>

<script>
import StudentForm from "@/components/StudentForm";
import {mapState} from 'vuex'
import {actionTypes} from "@/store/modules/student";

export default {
  name: "CreateStudent",
  data(){
    return {
      initialValues: {
        name: '',
        entryYear: '',
        graduationYear: '',
        notesFile: '',
        group: {
          id: 0,
          name: 'Choose student\'s group'
        }
      },
    }
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.student.isSubmitting,
      validationErrors: state => state.student.validationErrors,
    })
  },
  methods: {
    onSubmit(data){
      this.$store.dispatch(
          actionTypes.createStudent,
          {
            student: data
          }
      ).then(() => {
        this.$router.push({name: 'StudentsFeed'})
      })
    }
  },
  components: {
    StudentForm
  }
}
</script>

<style scoped>

</style>