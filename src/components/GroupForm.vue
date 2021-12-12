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
                <button type="submit" :disabled="isSubmitting" class="btn btn-lg pull-xs-right btn-primary">
                  Save Group
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
import {mapState} from 'vuex'

export default {
  name: "GroupForm",
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
    }
  },
  methods: {
    onSubmit(){
      const form = {
        name: this.name,
      }
      this.$emit('formSubmit', form)
    }
  },
}
</script>

<style scoped>

</style>