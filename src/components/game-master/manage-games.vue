<template>
    <div class="manager-wrapper">
        <div class="container">
            <div class="manage">
                <h1>Manage Games</h1>
                <div class="line"></div>
                <ul class="games-list">
                    <li 
                        v-for="(game, index) in $store.getters['games/getGamesbyDate']" 
                        :key="index"
                    >
                        <div class="game-container">
                            <div v-if="game.status === 'On Going'"  @click="cancelGame(game)" class="delete-button">X</div>
                            
                            <ul>
                                <li><span style="font-weight:600">Challenger:</span> {{game.challenger.name}}</li>
                                <li><span style="font-weight:600">Player:</span> {{game.player.name}}</li>
                                <li><span style="font-weight:600">Points Wagered:</span> {{game.points}}</li>
                                <li><span style="font-weight:600">Details:</span> {{game.details}}</li>
                                <li>
                                    <span style="font-weight:600">Status:</span> 
                                    <span style="font-weight:600; color:changeStatusStyle(game.status)" :class="changeStatusStyle(game.status)">
                                        {{game.status}}
                                    </span>
                                </li>
                                <li><p class="creator-li">{{game.creator}}</p></li>

                                <div class="game-completer" v-if="game.status === 'On Going'">
                                    <select name="" id="" v-model="winner">
                                        <option value="" disabled selected>Winner</option>
                                        <option :value=" game.challenger">{{game.challenger.name}}</option>
                                        <option :value=" game.player ">{{game.player.name}}</option>
                                    </select>
                                    <button @click="completeGame(game)" class="complete-button">Complete</button>
                                </div>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    
</template>

<script>
    export default{
        data(){
            return {
                winner:null,
            }
        },

        methods:{
            cancelGame(game){
                alert("Cancelling Game...");

                let store = this.$store;
                fetch("https://inferno-3faf9-default-rtdb.firebaseio.com/games/" + game.gameKey+ ".json", {
                    method:"PATCH",
                    headers:{
                        'Content-type':'application/json',
                    },
                    body:JSON.stringify({
                        status:"Cancelled"
                    })  
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    alert("Game Cancelled...")

                    //-------------------------- Post Message Abount Game Cancellation ----------------------------------\\ 
                    let name = store.getters['users/getAccount'].firstName +' '+ store.getters['users/getAccount'].lastName;
                    store.dispatch('messages/postMessage', {author:name, message:
                        `A game has been cancelled Between Challenger: ${game.challenger.name} and Player: ${game.player.name}`+
                        `For the wagered amount of: ${game.points}.` +
                        `The Challenge was:${game.details}` +
                        `Both players will have their points returned.`
                    },
                    {root:true});

                    
                    //-------------------------- Returning Each's Players Points ----------------------------------\\
                    //-------------------------- Returning Changenger's Points ----------------------------------\\
                    let challengerPoints = 0;
                    fetch("https://inferno-3faf9-default-rtdb.firebaseio.com/players/" + game.challenger.playerKey + ".json")
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);

                        console.log("Here are the points " + data.points)
                        challengerPoints = data.points;
                        //Altering player points from the current poitns they have.
                        fetch("https://inferno-3faf9-default-rtdb.firebaseio.com/players/" + game.challenger.playerKey + ".json",{
                            method:"PATCH",
                            headers:{
                                'Content-type':'application/json',
                            },
                            body:JSON.stringify({
                                points:game.points + challengerPoints
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log('Success:', data);
                            alert("Challenger Points Successfully Returned...")
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });

                    //-------------------------- Returning Player's Points ----------------------------------\\
                    let playerPoints = 0;
                    fetch("https://inferno-3faf9-default-rtdb.firebaseio.com/players/" + game.player.playerKey + ".json")
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);

                        console.log("Here are the points " + data.points)
                        playerPoints = data.points;
                        //Altering player points from the current poitns they have.
                        fetch("https://inferno-3faf9-default-rtdb.firebaseio.com/players/" + game.player.playerKey + ".json",{
                            method:"PATCH",
                            headers:{
                                'Content-type':'application/json',
                            },
                            body:JSON.stringify({
                                points:game.points + playerPoints
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log('Success:', data);
                            alert("Player Points Successfully Returned...")
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });

                    //-------------------------- Updating the Manager Screen After Cancellation ----------------------------------\\

                    store.dispatch('games/getGames');
                })
                    .catch((error) => {
                    console.error('Error:', error);
                });
            },

            changeStatusStyle(status){
                switch(status){
                    case 'On Going':
                        return 'color-tertiary2'
                    case 'Completed':
                        return 'color-tertiary1'
                    case 'Cancelled':
                        return 'color-secondary'
                        default:
                        console.log("Something is wrong with the color")
                }
            },

            //-------------------------- Change Game Status to Completed. ----------------------------------\\

            completeGame(game){
                alert("Completing game...");
                let store = this.$store;

                fetch("https://inferno-3faf9-default-rtdb.firebaseio.com/games/" + game.gameKey+ ".json", {
                    method:"PATCH",
                    headers:{
                        'Content-type':'application/json',
                    },
                    body:JSON.stringify({
                        status:"Completed"
                    })
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    alert("Game Status Successfully Changed...")
                    
                    //-------------------------- Post Message About Game Completion----------------------------------\\
                    let name = store.getters['users/getAccount'].firstName +' '+ store.getters['users/getAccount'].lastName;
                    store.dispatch('messages/postMessage', {author:name, message:
                        `A game has been completed Player: ${game.challenger.name} Challenged Player: ${game.player.name}`+
                        `For the wagered amount of: ${game.points}.` +
                        `The Challenge was:${game.details}` +
                        `${this.$data.winner.name} Won!`
                    },
                    {root:true});

                    //-------------------------- Change Points of Game Winner ----------------------------------\\

                    let winnerCurrentPoints = 0;
                    fetch("https://inferno-3faf9-default-rtdb.firebaseio.com/players/" + this.$data.winner.playerKey + ".json")
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);

                        console.log("Here are the points " + data.points)
                        winnerCurrentPoints = data.points;

                        //Altering player points from the current poitns they have.
                        fetch("https://inferno-3faf9-default-rtdb.firebaseio.com/players/" + this.$data.winner.playerKey + ".json",{
                            method:"PATCH",
                            headers:{
                                'Content-type':'application/json',
                            },
                            body:JSON.stringify({
                                points:(game.points * 2) + winnerCurrentPoints
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log('Success:', data);
                            alert("Winner Points Successfully Added...")
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });

                    //-------------------------- Updating the Manager Screen After Completion ----------------------------------\\

                    store.dispatch('games/getGames');
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            }
        },

        beforeMount(){
            this.$store.dispatch('games/getGames');
        }
    }
</script>

<style>        
    .manage .color-secondary{
        color:var(--secondary-clr);
    }
    .manage .color-tertiary1{
        color:var(--tertiary1-clr);
    }
    .manage .color-tertiary2{
        color:var(--tertiary2-clr);
    }

    .manage .complete-button{
        font-size: var(--fs-400);
        padding: var(--mp-300);
        border: none;
        border-radius: var(--mp-325);
        background-color: var(--tertiary1-clr);
        color: var(--primary-clr);
    }

    .manage .delete-button{
        display: grid;
        place-content: center;
        height: 40px;
        width: 40px;
        font-weight: 600;
        margin: 0 0 0 auto;
        border-radius: 50%;
        background-color: var(--secondary-clr);
        color: var(--primary-clr);
    }

    .manage .game-completer{
        display: grid;
        grid-template-columns: auto;
        gap: 10px;
    }

    .manage .game-container{
        max-width: 510px;
        margin: 0 auto;
        padding: var(--mp-400);
        background: var(--accents);
        box-shadow: 0 6px 6px 0px #11111120;
    }

    .manage .game-container ul{
        display: grid;
        grid-template-columns: auto;
        gap: var(--mp-200);
    }


    .manage .games-list li{
        margin: 0 0 var(--mp-400) 0;
    }

    .manage .line{
        height: 2px;
        width: 100%;
        margin: var(--mp-400) 0;
        background-color:var(--tertiary2-clr)
    }

    .manage .creator-li{
        font-weight: 600;
        width: fit-content;
        margin: 0 0 0 auto;
        color: var(--tertiary1-clr);
    }
</style>