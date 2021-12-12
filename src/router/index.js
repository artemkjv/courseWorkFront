import {createRouter, createWebHistory} from 'vue-router'
import StudentsFeed from "@/views/StudentsFeed";
import EditStudent from "@/views/EditStudent";
import CreateStudent from "@/views/CreateStudent";
import GroupsFeed from "@/views/GroupsFeed";
import EditGroup from "@/views/EditGroup";
import CreateGroup from "@/views/CreateGroup";

const routes = [
  {
    path: '/',
    name: 'StudentsFeed',
    component: StudentsFeed
  },
  {
    path: '/students/:id',
    name: 'EditStudent',
    component: EditStudent
  },
  {
    path: '/students/create',
    name: 'CreateStudent',
    component: CreateStudent
  },
  {
    path: '/groups',
    name: 'GroupsFeed',
    component: GroupsFeed
  },
  {
    path: '/groups/:id',
    name: 'EditGroup',
    component: EditGroup
  },
  {
    path: '/groups/create',
    name: 'CreateGroup',
    component: CreateGroup
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
