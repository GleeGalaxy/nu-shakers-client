<template>
    <div class="home">
        <div class="introduction"> 
            <h1> <span style="color:#8d191c">Dormitory</span> Playground.</h1>
            <p>
                Play games, Find Friends, Make Memories. <br> Join the fun today.
            </p>
            <div class="center-btn">
                <router-link class="signup-link"  to="/leaderboard">SIGN UP</router-link>
            </div>
        </div>
    </div>
    <div class="background-div"></div>
</template>

<style scoped>
    h1{
        font-size: 63px;
        color:#71ce7e
    }

    p{
        text-align: center;
        font-size: 27px;
        margin: 0 0 36px;
    }

    .background-div{
        position: fixed;
        right: -300px;
        bottom: -250px;
        transform: rotate(45deg);
        z-index: -1;
        height: 600px;
        width: 600px;
        background-color: #e98724;
    }

    .center-btn{
        width:fit-content;
        margin:0 auto;
    }
    
    .home{
        display: flex;
        align-items: center;
        height: calc(100vh - 189px);
    }
    .introduction{
        width: fit-content;
        margin: 0 auto;
    }

    .signup-link{
        font-size: 18px;
        font-weight: 600;
        margin: 18px;
        padding: 18px;
        border-radius: 27px;
        background-color: #8d191c;
        color: #fff;
    }
</style>