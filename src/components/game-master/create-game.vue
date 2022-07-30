<template>
    <section class="create-wrapper">
        <div class="container">
            <div class="create">
                <h1>Create Game</h1>
                <div class="line"></div>
                
                <div class="description-area">
                    <table>
                        <tr>
                            <td><label for="" class="player-one">Challenger: </label></td>
                            <td>
                                <select name="challenger" v-model="challenger" required>
                                    <option value="" disabled selected>Choose a Challenger</option>
                                    <option 
                                        v-for="(player, index) in $store.getters['players/getPlayersByName']" 
                                        :key="index"
                                        :value=" {
                                            name:`${player.firstName} ${player.lastName}`, 
                                            playerKey:`${player.playerKey}`, 
                                            currentPoints:player.points
                                        }"
                                    >
                                        {{ `${player.points}. ${player.firstName} ${player.lastName}  (${player.nickname})`}}
                                    </option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label for="" class="player-one">Player: </label></td>
                            <select name="player" v-model="player" required>
                                <option value="" disabled selected>Choose a Player</option>
                                <option 
                                    v-for="(player, index) in $store.getters['players/getPlayersByName']" 
                                    :key="index"
                                    :value=" {
                                        name:`${player.firstName} ${player.lastName}`, 
                                        playerKey:`${player.playerKey}`, 
                                        currentPoints:player.points
                                    }"
                                >
                                    {{ `${player.points}. ${player.firstName} ${player.lastName}  (${player.nickname})`}}
                                </option>
                            </select>
                        </tr>
                        <tr>
                            <td><label for="" class="player-one">Points: </label></td>
                            <td><input type="number" placeholder="Points Wagered..." v-model="points"></td>
                        </tr>
                    </table>
                    
                    <textarea name="game-discription" placeholder="Details about game." v-model="details"></textarea>
                    <button @click="createGame" >Create</button>
                </div>

            </div>
        </div>            
    </section>
</template>

<script>

    export default{
        data(){
            return{
                challenger:'',
                player:'',
                points:0,
                details:''
            }
        },
        
        methods:{
            createGame(){
                //Getting time of game creation
                var d = new Date(),
                h = (d.getHours()<10?'0':'') + d.getHours(),
                m = (d.getMinutes()<10?'0':'') + d.getMinutes();
                let time = h + ':' + m;

                let gameObj = {
                    challenger:this.$data.challenger,
                    creator:"Game Master Account Name",
                    creatorID:"Game Master ID",
                    datestamp: new Date().getTime(),
                    details:this.$data.details,
                    player:this.$data.player,
                    points:this.$data.points,
                    timestamp:time
                }

                // alert(this.$data.challenger + ' || ' + this.$data.challenger.name + ' ' + gameObj);
                this.$store.dispatch('games/createGame', gameObj);   
            }
        },

        beforeMount(){
            this.$store.dispatch('players/getPlayers');
        }
    }
</script>

<style>
    .create{
        display: grid;
        grid-template-columns: auto;
        gap: var(--fs-400);
    }

    .create button{
        font-size: var(--fs-400);
        padding: var(--mp-300);
        border:none;
        border-radius: var(--mp-325);
        background-color: var(--tertiary1-clr);
        color: var(--primary-clr);
    }

    .create .description-area{
        display: grid;
        grid-template-rows: auto auto;
        gap:var(--mp-325) ;
        max-width:510px;
        width: 100%;
        margin: 0 auto;
    }

    .create .description-area textarea{
        font-size: var(--fs-400);
        height: 80px;
        padding: var(--mp-300);
        border: 2px solid var(--tertiary2-clr);
    }

    .create .line{
        height: 2px;
        width: 100%;
        margin: var(--mp-400) 0;
        background-color:var(--tertiary2-clr)
    }

    .create select, .create input{
        width: min(100%, 200px);
        box-sizing: border-box;
    }
</style>