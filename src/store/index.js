import {createStore} from 'vuex'
import feed from '@/store/modules/feed'
import student from "@/store/modules/student";
import groups from "@/store/modules/groups";
import group from "@/store/modules/group";

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    feed,
    student,
    groups,
    group
  }
})
