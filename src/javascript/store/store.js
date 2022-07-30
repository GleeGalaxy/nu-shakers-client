import { createStore } from 'vuex';
import AdminsModule from './admins'
import PlayersModule from './players';
import UsersModule from './users';
import MessagesModule from './messages';
import GamesModule from './games';

const store = createStore({
    modules:{
        admins:AdminsModule,
        players:PlayersModule,
        users:UsersModule,
        messages:MessagesModule,
        games:GamesModule 
    }
})

export default store;