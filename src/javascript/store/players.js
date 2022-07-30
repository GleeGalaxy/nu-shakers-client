const playersModule = {
    namespaced:true,
    state(){
        return{
            players:[]
        }
    },
    getters:{
        getPlayersByName(state){
            //Sorts players by name and returns the array.
            const sortedPlayersPoints = state.players.sort((a, b)=>b.points - a.points || b.gamesPlayed - a.gamesPlayed)

            return sortedPlayersPoints;
        },

        getPlayersByPoints(state){
            const sortedPlayersPoints = state.players.sort((a, b)=>b.points - a.points || b.gamesPlayed - a.gamesPlayed)

            return sortedPlayersPoints;
        }
    },
    mutations:{
        setPlayers(state){
            fetch("https://inferno-3faf9-default-rtdb.firebaseio.com/players.json")
            .then(response => response.json())
            .then(
                data => {
                    state.players = [];

                    var keys = Object.keys(data)
                    keys.forEach(function(key){
                        var playerObj = {
                            playerKey:key,
                            position:data[key].position, 
                            firstName:data[key].firstName, 
                            lastName:data[key].lastName, 
                            nickname:data[key].nickname, 
                            gamesPlayed:data[key].gamesPlayed, 
                            points:data[key].points
                        }
                        
                        state.players.push(playerObj);
                    })
                }
            );
        }
    },

    actions:{
        getPlayers(context){
            context.commit('setPlayers');
        }
    }
}

export default playersModule;