<template>
    <div :class="type" >
        <ul>
            <img v-if="!checkRow(data.firstName)" src="../../assets/default_profile_pic.jpg" alt="">
            <li>{{position}}</li>
            <li style="flex: 2;">{{data.firstName + " " + data.lastName}}</li>
            <li>{{data.nickname}}</li>
            <li>{{data.gamesPlayed}}</li>
            <li style="border:none;">{{data.points}}</li>
        </ul>
    </div>
</template>

<script>
    export default{
        props:{
            position:String,
            data:Object,
            type:String
        },
        methods:{
            checkRow(data){
                if(data === 'PLAYER'){
                    return true;
                }
                return false;
            }
        }
    }
</script>

<style scoped>
    img{
        position: relative;
        left: 210px;
        width: 40px;
        height: 40px;
        border-radius: 148px;
    }

    li{
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        height: 100%;
        text-align: center;  
        border-right: 2px solid #fff;      
    }

    .leaderboard-table-header{
        border-radius: 10px;
        background-color: #e98824;
        color: #fff;
    }

    .leaderboard-table-row{
        /* background-color: #71ce7e; */
        border-bottom: 2px solid#71ce7e;
        color: #222;
    }

    .leaderboard-table-row, .leaderboard-table-header{
        height: 40px;
        width: 100%;
        margin: 9px 0;
    }
    
    .leaderboard-table-row ul, .leaderboard-table-header ul{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 18px;
        font-weight: 600;
        height: 100%;
        width: 95%;
        margin: 0 auto;
    }
</style>