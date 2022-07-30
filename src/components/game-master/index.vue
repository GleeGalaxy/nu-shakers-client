<template>
    <header class="game-manager-nav">
        <div class="container">
            <nav>
                <ul>
                    <li>
                        <router-link class="router-link" to="/create-game">Create Game</router-link>
                    </li>
                    <li>
                        <router-link class="router-link" to="/manage-games">Manage Games</router-link>
                    </li>
                </ul>
            </nav>
        </div>        
    </header>
    <router-view></router-view>
</template>

<style scoped>
    .game-manager-nav{
        height: 40px;
        width: 100%;
        margin: 0 0 var(--mp-400) 0;
        background: var(--tertiary2-clr);
    }
    
    .game-manager-nav nav{
        height: 100%;
    }

    .game-manager-nav ul{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        height: 100%;
    }

    .router-link{
        font-size: var(--fs-400);
        font-weight: 600;
        color: var(--primary-clr);
    }
    
    .router-link-active{
        color: var(--tertiary1-clr);
    }
</style>