import { createStore } from 'vuex';
import AdminsModule from './admins'
import PlayersModule from './players';
import UsersModule from './users';

const store = createStore({
    modules:{
        admins:AdminsModule,
        players:PlayersModule,
        users:UsersModule
    }
})

export default store;