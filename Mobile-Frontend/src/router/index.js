import Vue from 'vue'
import VueRouter from 'vue-router'
import ChildView from "@/views/childView/childView";
import MenuList from "@/views/menuList/MenuList";


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: ChildView,
        children: [
            {
                path: '', component: MenuList,
            },
        ]
    },
    {
        path: "*", redirect: "/",
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
