const gamesModule = {
    namespaced:true,
    state(){
        return{
            games:[]
        }
    },
    getters:{
        getGamesbyDate(state){
            return state.games.sort((a, b) => b.datestamp - a.datestamp)
        }
    },

    mutations:{
        setGames(state){
            fetch("https://inferno-3faf9-default-rtdb.firebaseio.com/games.json")
            .then(response => response.json())
            .then(
                data => {
                    state.games = [];

                    var keys = Object.keys(data)
                    keys.forEach(function(key){
                        var gameObj = {
                            gameKey:key,
                            challenger:data[key].challenger,
                            creator:data[key].creator,
                            creatorID:data[key].creatorID,
                            datestamp:data[key].datestamp,
                            details:data[key].details,
                            player:data[key].player,
                            points:data[key].points,
                            status:data[key].status,
                            timestamp:data[key].timestamp
                        }
                        
                        state.games.push(gameObj);
                    })
                }
            );
        }
    },

    actions:{
        createGame({dispatch, rootGetters}, payload){
            alert("Creating game.")            

            if(payload.challenger.name === undefined){
                alert("Choose Challenger")
                return false
            }


            if(payload.player.name === undefined){
                alert("Choose Player")
                return false
            }

            if(payload.points < 1){
                alert("Minimum amount of points is: 1")
                return false
            }

            if(payload.challenger.currentPoints < payload.points){
                alert("Challenger has Insufficient Points")
                return false
            }

            if(payload.player.currentPoints < payload.points){
                alert("Player has Insufficient Points")
                return false
            }

            if(payload.details.trim() === ''){
                alert("Details required")
                return false
            }

            //Creating new Game if all condition passed.
            fetch("https://inferno-3faf9-default-rtdb.firebaseio.com/games.json", {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    challenger:payload.challenger,
                    creator:payload.creator,
                    creatorID:payload.creatorID,
                    datestamp:payload.datestamp,
                    details:payload.details,
                    player:payload.player,
                    points:payload.points,
                    status:"On Going",
                    timestamp:payload.timestamp
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);

                //Subtract points from the respective players. 
                // Change points of Challenger.
                fetch("https://inferno-3faf9-default-rtdb.firebaseio.com/players/" + payload.challenger.playerKey + ".json", {
                    method:"PATCH",
                    headers:{
                        'Content-type':'application/json',
                    },
                    body:JSON.stringify({
                        points:payload.challenger.currentPoints - payload.points
                    })
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    alert("Challenger Points Subtracted...")
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

                // Change points of Player.
                fetch("https://inferno-3faf9-default-rtdb.firebaseio.com/players/" + payload.player.playerKey + ".json", {
                    method:"PATCH",
                    headers:{
                        'Content-type':'application/json',
                    },
                    body:JSON.stringify({
                        points:payload.player.currentPoints - payload.points
                    })
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    alert("Player Points Subtracted...")
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

                //Post Message to Message Boards about new game. 
                let name = rootGetters['users/getAccount'].firstName +' '+ rootGetters['users/getAccount'].lastName;
                dispatch('messages/postMessage', {author:name, message:
                    `
                        A new game has been started by Challenger: ${payload.challenger.name} and Player: ${payload.player.name}<br>
                        For the wagered amount of: ${payload.points}.\n
                        The Challenge:${payload.details}\n
                        Good Luck to All Shakers.
                    `,
                },
                {root:true});
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        },
        
        getGames(context){
            context.commit('setGames');  
        }
    }
}

export default gamesModule;