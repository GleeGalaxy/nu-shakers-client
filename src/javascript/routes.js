import { createRouter, createWebHistory } from 'vue-router';

// IMPORTING STORE
// import store from '../javascript/store/store'; 

// //GLOBAL ROUTES TO CLIENT AND ADMIN APPS
// //Admin Routes
// import Admin from '../components/admin/';
// import AdminLogin from '../components/admin/comps/login.vue';
// import Dashboard from '../components/admin/comps/dashboard.vue';
// import PlayersList from '../components/admin/comps/players-list.vue';
// import AddForm from '../components/admin/comps/add-form.vue';
// import Modify from '../components/admin/comps/modify.vue';;

// //ROUTE GAURD FUNCTION
// // function checkToPath(toPath, pathString){
// //     if(toPath === pathString) return true;
// //     else return false
// // }

// const routes = createRouter({
//     history:createWebHistory(),
//     routes:[
//         {path:'/admin', component:Admin, children:
//             [
//                 {path:'/admin-login', component:AdminLogin, meta:{ app:'admin' }},
//                 {path:'/dashboard', component:Dashboard, children:
//                     [
//                         {path:'/players-list', component:PlayersList, meta:{app:'admin'}},
//                         {path:'/add-form', component:AddForm, meta:{app:'admin'}},
//                         {path:'/Modify/:playerKey', component:Modify, meta:{app:'admin'}},
//                     ], meta:{app:'admin'}
//                 },
//             ], meta:{app:'admin'}
//         },
//         {path:'/client', component:Client, children:
//             [
//             ]
//         }
//     ]
// // });

// routes.beforeEach((to)=>{
    
//     //Admin Gaurding 
//     if(to.meta.app === 'admin'){
//         return store.dispatch('admins/autoLoginAdmin').then(()=>{
//             //Checking for admin Route
//             if(to.path === '/admin') return '/admin-login';
//             //Checking for admin-login and Authentication
//             if(to.path === '/admin-login' && store.getters['admins/isAuth']){
//                 return '/dashboard';
//             }
//             //Checking for any other route under admin app and Authentication.
//             if(to.path !== '/admin-login' && !store.getters['admins/isAuth']){
//                 return '/admin-login';
//             }
//         })
//     }
    
// })

import Home from '../components/home.vue';
import Leaderboard from '../components/leaderboard/leaderboard.vue';
import Login from '../components/login.vue'

const routes = createRouter({
    history:createWebHistory(),
    routes:[
        {path:'/home', component:Home},
        {path:'/leaderboard', component:Leaderboard},
        {path:'/login', component:Login}
    ]
});

routes.beforeEach((to)=>{
    alert(to.path)
    if(to.path === '/') return '/home';
})

export default routes;
