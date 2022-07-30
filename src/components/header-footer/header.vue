<template>
    <header class="header-wrapper">
        <div class="container">
            <div class="header">
                <div class="logo">
                    <a href="#">
                        <img src="../../assets/NU-logo.jpg" alt="NU-SHAKERS"><p>SHAKERS</p> 
                    </a>
                </div>
                <nav class="nav-links" id="nav-links">
                    <ul>
                        <li><router-link class="nav-links-router"  to="/home">Home</router-link></li>
                        <li><router-link class="nav-links-router"  to="/message-boards">Message Boards</router-link></li>
                        <li><router-link class="nav-links-router"  to="/leaderboard">Leaderboards</router-link></li>
                        <li><router-link class="nav-links-router"  to="/manage-games">Game Master</router-link></li>
                        <li><router-link class="nav-links-router"  to="/profile">Profile</router-link></li>
                        <li v-if="isAuth"><button class="nav-links-router" @click="signOut">Log Out</button></li>
                        <li  v-else><router-link class="nav-links-router" to="/login">Log In</router-link></li>
                    </ul>
                </nav>

                <div @click="showNav" class="toggle-btn">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
            </div>
        </div>
    </header>
    <div style="height:80px; width: 100%; margin: 0 0 10px 0;"></div>
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
            },

            showNav(){
                let elem = document.getElementById('nav-links');

                // alert(elem.classList.contains('nav-links-active'))
                if(elem.classList.contains('nav-links-active')){
                    elem.className = 'nav-links'
                }else{
                    elem.className = 'nav-links nav-links-active'
                }
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

    .header button{
        border:none;
        background-color: transparent;
    }

    .header .logo{
        height: 50%;
        aspect-ratio: 1.7;
    }

    .header .logo a{
        display: flex;
        align-items: center;
    }

    .header .logo p{
        display: none;
    }

    .header .logo img{
        height: 100%;
        width: 100%;
        opacity: 70%;
    }

    .header-nav-links-active{
        display: flex;
    }

    .header .nav-links{
        position: fixed;
        top: 80px;
        left: 0;
        display: none;
        flex-direction: column;
        align-content: center;
        width: 100%;
        padding:var(--mp-400) 0;
        background-color: var(--accents);
        box-shadow: 0 6px 6px #11111160;
        z-index:20;
    }

    .header .nav-links-active{
        display: flex;
    }

    .header .nav-links li{
        height: 40px;
        width: 100%;
        text-align: center;
    }

    .header .nav-links-router{
        font-size: var(--fs-400);
        font-weight: 600;
        color: var(--secondary-clr);
    }

    .header .nav-links-router:hover{
        color: var(--tertiary1-clr);
    }

    .header .toggle-btn{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 40%;
        width: 40px;
        cursor: pointer;
    }

    .header .toggle-btn .bar{
        height: 3px;
        width: 100%;
        background-color: var(--secondary-clr);
    }

    .header-wrapper{
        position: fixed;
        height: 80px;
        width: 100%;
        background-color: var(--accents);
    }

    @media (min-width: 568px){
        .header .logo p{
            display: contents;
            font-size: 44px;
            font-weight: 600;
            color: var(--tertiary1-clr);
        }
    }

    @media (min-width: 960px){
        .header .toggle-btn{
            display: none;
        }

        .header .nav-links{
            position: static;
            display:flex;
            height: 99%;
            width: fit-content;
            padding: 0;
            background-color: transparent;
            box-shadow: none;
        }

        .header .nav-links ul{
            display: flex;
            flex-direction: row;
            align-items: center;
            height: 100%;
            width: fit-content;
        }

        .header .nav-links ul li{
            display: flex;
            height: 100%;
            width: fit-content;
            margin: 0 0 0 var(--mp-400);
            align-items: center;
        }
    
    }
</style>