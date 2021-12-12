<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" :to="{name: 'StudentsFeed'}" active-class="active">
        Our Group
      </router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'StudentsFeed'}" active-class="active">
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'CreateStudent'}" active-class="active">
            Create Student
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'CreateGroup'}" active-class="active">
            Create Group
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import {mapGetters} from "vuex"

export default {
  name: 'TopBar',
  computed: {
    ...mapGetters({

    }),
  }
}
</script>