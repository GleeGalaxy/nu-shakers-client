<template>
    <header class="header-wrapper">
        <div class="container">
            <div class="header">
                <h1>NU SHAKERS</h1>
                <nav v-if="showNav"  class="nav-links">
                    <ul>
                        <li><router-link class="nav-links-router"  to="/home">HOME</router-link></li>
                        <li><router-link class="nav-links-router"  to="/leaderboard">LEADERBOARDS</router-link></li>
                        <li v-if="isAuth"><button class="nav-links-router" @click="signOut">LOG OUT</button></li>
                        <li  v-else><router-link class="nav-links-router" to="/login">LOG IN</router-link></li>
                    </ul>
                </nav>

                <div @click="showNav=!showNav; alert(something + showNav)" class="toggle-btn">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
            </div>
        </div>
    </header>
    <div style="height:85px; width: 100%;"></div>
</template>

<script>
    export default{
        data(){
            return{
                showNav:false
            }
        },  
        computed:{
            isAuth(){
                return this.$store.getters['users/isAuth'];
            }
        },
        methods:{
            signOut(){
                this.$store.dispatch('users/signOut');
            },
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

<!-- PHONE -->
<style scoped>
    @media only screen and (max-width:480px){
        .nav-links{
            position: absolute;
            top: 80px;
            left: 0;
            display: flex;
            align-items: center;
            flex-direction: column;
            height: fit-content;
            width: 100%;
            background-color: #fafafa;
            box-shadow: 0 6px 6px 0px #11111120;
            z-index: 10;
        }

        .nav-links ul{
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
        }

        .nav-links ul li{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 50px;
            width: 100%;
        }

        .nav-links-router{
            margin: 0;
        }

        .toggle-btn{
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            height: 50%;
            width: 30px;
        }

        .bar{
            height: 3px;
            width: 100%;
            border-radius: 10px;
            background-color: brown;
        }
    }
</style>