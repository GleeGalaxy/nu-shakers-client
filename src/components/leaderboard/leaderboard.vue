<template>
    <div class="leaderboard-wrapper">
        <div class="container">
            <div class="leaderboard">
                <h1>LEADERBOARDS</h1>
                <div class="leaderboard-players">
                    <comp-table-row
                        position='Position'
                        :data="tableHeader" 
                        type="leaderboard-table-header">
                    </comp-table-row>
                    <comp-table-row 
                        v-for="(player, index) in $store.getters['players/getPlayers']" 
                        :key="index" 
                        :position="`${index + 1}`"
                        :data="player"
                        type="leaderboard-table-row">>
                    </comp-table-row>
                    <div class="leaderboard-bottom">
                        <!-- Red Color -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TableRow from './leaderboard-tabel-row.vue'
    
    export default{
        components:{
            'comp-table-row':TableRow
        },
        data(){
            return{
                tableHeader:
                {
                    position:"POSITION",
                    firstName:"PLAYER", 
                    lastName:"", 
                    nickname:"NICKNAME", 
                    gamesPlayed:"GAMES PLAYED", 
                    points:"POINTS"
                },
            }
        },
        mounted(){
            this.$store.commit('players/setPlayers');
        }
    }
</script>

<style scoped>
    .leaderboard{
        width: 100%;
    }

    .leaderboard h1{
        width: 100%;
        text-align: center;
        border-bottom: 2px solid black;
    }

    .leaderboard-bottom{
        height: 36px;
        border-radius: 10px;
        background-color: #8d191c;
    }

    .leaderboard-table{
        width: 100%;
        margin: 18px 0;
        padding: 36px;
        border-radius: 15px;
        background-color: #bab6b6;
    }

    .leaderboard-table th{
        text-align: left;
    }

    .leaderboard-wrapper{
        margin: 18px 0;
    }
</style>