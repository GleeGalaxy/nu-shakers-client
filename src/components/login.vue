<template>    
    <div class="login-wrapper wrapper">
        <div class="container">
            <div class="login">
                <div class="login-form">
                    <div class="form-hr">
                        <!-- Line for demacating form -->
                    </div>
                    <h1>Login</h1>
                    <input type="text" placeholder="Username" v-model="loginFormData.username">
                    <input type="text" placeholder="Passcode" v-model="loginFormData.passcode">
                    <button @click.prevent="signin">Login</button>
                    <p>
                        Want to sign up? Click Here!
                    </p>
                </div>    
            </div>
        </div>
    </div>
    <div class="background-div"></div>
</template>

<script>
    export default{
        data(){
            return{
                loginFormData:{
                    username:'',
                    passcode:''
                }
            }
        },
        methods:{
            signin(){
                this.$store.dispatch('users/signinUser', this.loginFormData);
            }
        }
    }
</script>

<style scoped>
    .login{
        display: flex;
        align-items: center;
        height: calc(100vh - 189px);
    }

    .login .button{
        cursor: pointer;
    }

    .login .form-hr{    
        position: relative;
        top:var(--mp-600);
        height: 2px;
        width: 100%;
        margin: 0 auto;
        border-radius: 20px;
        background-color: #e98724;
        z-index: -5;
    }
    
    .login .login-form{
        display: flex;
        flex-direction: column;
        max-width: 510px;
        width: 80%;
        margin: 0 auto;
        padding: 18px;
        border: 2px solid var(--tertiary2-clr);
        border-radius: var(--mp-325);
        background-color: var(--primary-clr);
        z-index: 10;
    }

    .login .login-form button{
        height: 36px;
        width: 100px;
        font-size: 18px;
        margin: 0 0 var(--mp-400) auto;
        border: none;
        border-radius: 10px;
        background-color: #8d191c;
        color: #fff;
        cursor: pointer;
        z-index:990;
    }


    .login .login-form h1{
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
    
    .login p{
        font-size: 18px;
        font-weight: 600;
        color: #71ce7e;
    }
</style>