import { createWebHistory, createRouter } from "vue-router"
import Home from "@/views/Home.vue"
import Profile from "@/views/Profile.vue"
import ProfileIndex from "@/views/Profile/Index.vue"
import ProfileView from "@/views/Profile/View.vue"
import ProfileCreate from "@/views/Profile/Create.vue"
import ProfileEdit from "@/views/Profile/Edit.vue"
import ProfileDelete from "@/views/Profile/Delete.vue"

//define a routes
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        children: [
            {
                path: ':id',
                name: 'profileView',
                component: ProfileView
            },
            {
                path: 'create',
                name: 'profileCreate',
                component: ProfileCreate
            },
            {
                path: '',
                name: 'profileIndex',
                component: ProfileIndex
            },
            {
                path: 'edit/:id',
                name: 'profileEdit',
                component: ProfileEdit
            },
            {
                path: 'delete/:id',
                name: 'profileDelete',
                component: ProfileDelete
            },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router