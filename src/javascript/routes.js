import { createRouter, createWebHistory } from 'vue-router';

import Home from '../components/home.vue';
import Messages from '../components/message-boards.vue';
import Leaderboard from '../components/leaderboard/leaderboard.vue';
import Login from '../components/login.vue';
import Profile from '../components/profile.vue';

import GameMaster from '../components/game-master/';
    import CreateGame from '../components/game-master/create-game.vue';
    import ManageGames from '../components/game-master/manage-games.vue';

const routes = createRouter({
    history:createWebHistory(),
    routes:[
        {path:'/home', component:Home},
        {path:'/message-boards', component:Messages},
        {path:'/leaderboard', component:Leaderboard},
        {path:'/login', component:Login},
        {path:'/profile', component:Profile},
        { path:'/game-master', component:GameMaster, children:
            [
                { path:'/create-game', component:CreateGame },
                { path:'/manage-games', component:ManageGames }
            ] 
        }
    ],
    linkActiveClass: "router-link-active",
});

routes.beforeEach((to)=>{
    if(to.path === '/') return '/home';
    if(to.path === '/game-master') return '/manage-games';
})

export default routes;
