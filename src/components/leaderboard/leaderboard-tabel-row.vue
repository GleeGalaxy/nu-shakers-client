<template>
    <div :class="type" >
        <ul>
            <img v-if="!checkRow(data.firstName)" src="../../assets/default_profile_pic.jpg" alt="">
            <li>{{position}}</li>
            <li style="flex: 2;">{{data.firstName + " " + data.lastName}}</li>
            <li class="toggle-column1">{{data.nickname}}</li>
            <li class="toggle-column2">{{data.gamesPlayed}}</li>
            <li>{{data.points}}</li>
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
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        place-items: center;
        font-size: var(--fs-340);
        font-weight: 600;
        height: 100%;
        width: 95%;
        margin: 0 auto;
        justify-content: space-around;
    }

    .toggle-column1, .toggle-column2, img{
        display: none;
    }

    @media (min-width:568px){
        .leaderboard-table-row ul, .leaderboard-table-header ul{
            grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        .toggle-column1{
            display: contents;
        }
    }
    
    @media (min-width:960px){
        .leaderboard-table-row ul, .leaderboard-table-header ul{
            grid-template-columns: repeat(5, minmax(0, 1fr));
        }
        
        .toggle-column2{
            display: block;
        }
    }
</style>