<template>    
    <div class="login">
        <div class="login-form-container"> 
            <div class="form-hr">
                <!-- Line for demacating form -->
            </div>
            <form class="login-form">
                <h1>Login</h1>
                <input type="text" placeholder="Username" v-model="loginFormData.username">
                <input type="text" placeholder="Passcode" v-model="loginFormData.passcode">
                <button @click.prevent="signup">Login</button>
                <p>
                    Want to sign up? Click Here!
                </p>
            </form>    
        </div>
    </div>
    <div class="background-div"></div>
</template>

<script>
    export default{
        data(){
            return{
                loginFormData:{
                    username:'1905173',
                    passcode:'LutakaT16'
                }
            }
        },
        methods:{
            signup(){
                this.$store.dispatch('users/signinUser', this.loginFormData);
            }
        }
    }
</script>

<style scoped>
    p{
        font-size: 18px;
        font-weight: 600;
        color: #71ce7e;
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

    .login{
        display: flex;
        align-items: center;
        height: calc(100vh - 189px);
    }
    .login-form{
        display: flex;
        flex-direction: column;
        width: 80%;
        margin: 0 auto;
        padding: 18px;
    }

    .login-form button{
        height: 36px;
        width: 100px;
        font-size: 18px;
        margin: 0 0 0 auto;
        border: none;
        border-radius: 10px;
        background-color: #8d191c;
        color: #fff;
        cursor: pointer;
    }


    .login-form h1{
        margin-bottom: 36px;
        color:#e98724;
    }

    .login-form input{
        font-size: 18px;
        margin: 0 0 18px 0;
        padding: 9px 18px;
        border: 1px solid #e98724;
        border-radius:10px;
    }

    .login-form-container{
        width: 500px;
        margin: 0 auto;
        border: 1px solid #e98724;
        border-radius: 18px;
    }
    
    .form-hr{    
        position: relative;
        top: 64px;
        height: 2px;
        width: 90%;
        margin: 0 auto;
        border-radius: 20px;
        background-color: #e98724;
    }
</style>