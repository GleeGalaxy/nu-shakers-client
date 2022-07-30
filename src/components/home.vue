<template>
    <div class="home-wrapper wrapper">
        <div class="container">
            <div class="home">
                <h1> <span class="fc-secondary">Dormitory</span> <span class="fc-tertiary1">Playground.</span></h1>
                <p>
                    Play games, Find Friends, Make Memories. <br> Join the fun today.
                </p>
                <div class="center-btn">
                    <router-link class="signup-link"  to="/leaderboard">SIGN UP</router-link>
                </div>
                <div class="background-div"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>    
    .home{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
    }

    .home p{
        text-align: center;
        font-size: var(--fs-400);
        margin: 0 0 var(--mp-500) 0;
    }

    .home .signup-link{
        font-size: var(--fs-400);
        font-weight: 600;
        padding: var(--mp-400);
        border-radius: 27px;
        background-color: var(--secondary-clr);
        color: var(--primary-clr);
    }

@media(min-width: 960px){
    .home h1{
        font-size: var(--fs-700);
    }

    .home p{
        font-size: var(--fs-450);
    }

    
    .home .signup-link{
        font-size: var(--fs-420);
    }
}
</style>