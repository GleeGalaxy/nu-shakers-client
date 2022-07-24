<template>
    <header class="header-wrapper">
        <div class="container">
            <div class="header">
                <h1>NU SHAKERS</h1>
                <nav class="nav-links">
                    <ul>
                        <li><router-link class="nav-links-router"  to="/home">HOME</router-link></li>
                        <li><router-link class="nav-links-router"  to="/leaderboard">LEADERBOARDS</router-link></li>
                        <li v-if="isAuth"><button class="nav-links-router" @click="signOut">LOG OUT</button></li>
                        <li  v-else><router-link class="nav-links-router" to="/login">LOG IN</router-link></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
    <div style="height:85px; width: 100%;"></div>
</template>

<script>
    export default{
        computed:{
            isAuth(){
                return this.$store.getters['users/isAuth'];
            }
        },
        methods:{
            signOut(){
                this.$store.dispatch('users/signOut');
            }
        }
    }
</script>

<style>
    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        width: 100%;
    }
    
    .header-wrapper{
        position: fixed;
        height: 80px;
        width: 100%;
        background-color: #fafafa;
        color: #8d191c;
    }

    .nav-links ul{
        display: flex;
    }

    .nav-links-buttons{
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 0 18px;
        color: #8d191c;
    }

    .nav-links-router{
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 0 18px;
        border: none;
        background-color: #fafafa;
        color: #8d191c;
    }

    .nav-links-router:hover{
        color: #eb4349;
    }
</style>