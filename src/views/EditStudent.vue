<template>
  <div>
    <loading v-if="isLoading" />
    <student-form
        v-if="student"
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
import Loading from "@/components/Loading";

export default {
  name: "EditStudent",
  computed: {
    ...mapState({
      isSubmitting: state => state.student.isSubmitting,
      validationErrors: state => state.student.validationErrors,
      isLoading: state => state.student.isLoading,
      student: state => state.student.student,
    }),
    initialValues(){
      if(!this.student){
        return {
          name: '',
          entryYear: '',
          graduationYear: '',
          notesFile: '',
          group: {
            id: 0,
            name: 'Choose student\'s group'
          }
        }
      }
      return {
        name: this.student.name,
        entryYear: this.student.entryYear,
        graduationYear: this.student.graduationYear,
        notesFile: this.student.notesFile,
        group: this.student.group
      }
    }
  },
  mounted() {
    this.$store.dispatch(actionTypes.getStudent, {id: this.$route.params.id})
  },
  methods: {
    onSubmit(data){
      this.$store.dispatch(
          actionTypes.updateStudent,
          {
            id: this.$route.params.id,
            student: data
          }
      ).then(() => {
        this.$router.push({name: 'StudentsFeed'})
      })
    }
  },
  components: {
    Loading,
    StudentForm
  }
}
</script>

<style scoped>

</style>