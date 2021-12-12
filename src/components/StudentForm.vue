<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <validation-errors v-if="errors" :validation-errors="errors" />
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                    placeholder="Name"
                    type="text"
                    class="form-control form-control-lg"
                    v-model="name"
                />
              </fieldset>

              <fieldset class="form-group">
                <input
                    placeholder="Entry Year"
                    type="number"
                    class="form-control form-control-lg"
                    v-model="entryYear"
                />
              </fieldset>

              <fieldset class="form-group">
                <input
                    placeholder="Graduation Year"
                    type="number"
                    class="form-control form-control-lg"
                    v-model="graduationYear"
                />
              </fieldset>

              <fieldset class="form-group">
                <input
                    placeholder="Notes File"
                    type="text"
                    class="form-control form-control-lg"
                    v-model="notesFile"
                />
              </fieldset>

              <fieldset class="form-group" v-if="groupsFeed">
                <select class="form-control" @change="currentGroup = $event.target.value">
                  <option v-for="(group, index) in groupsFeed.groups" :selected="currentGroup === group.id" :key="index" :value="group.id">{{ group.name }}</option>
                </select>
              </fieldset>

              <fieldset class="form-group">
                <button type="submit" :disabled="isSubmitting" class="btn btn-lg pull-xs-right btn-primary">
                  Save Student
                </button>
              </fieldset>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ValidationErrors from "@/components/ValidationErrors";
import {actionTypes} from "@/store/modules/groups";
import {mapState} from 'vuex'

export default {
  name: "StudentForm",
  components: {
    ValidationErrors
  },
  computed: {
    ...mapState({
      groupsFeed: state => state.groups.data,
    })
  },
  props:{
    initialValues: {
      type: Object,
      required: true,
    },
    errors: {
      type: Object,
      required: false
    },
    isSubmitting: {
      type: Boolean,
      required: true
    }
  },
  data(){
    return {
      name: this.initialValues.name,
      entryYear: this.initialValues.entryYear,
      graduationYear: this.initialValues.graduationYear,
      notesFile: this.initialValues.notesFile,
      currentGroup: this.initialValues.group.id
    }
  },
  methods: {
    onSubmit(){
      const form = {
        name: this.name,
        entryYear: this.entryYear,
        graduationYear: this.graduationYear,
        notesFile: this.notesFile,
        groupId: this.currentGroup
      }
      this.$emit('formSubmit', form)
    }
  },
  mounted() {
    this.$store.dispatch(actionTypes.getGroups, {apiUrl: '/groups'})
  }
}
</script>

<style scoped>

</style>