<template>
    <div class="message-wrapper wrapper">
        <div class="container">
            <h1>POSTS</h1>
            <div class="message">
                <!-- POSTING ELEMENT -->
                <div  v-if="accountType" class="posting-section">
                    <textarea placeholder="post..." v-model="message"></textarea>
                    <button @click="postMessage('TestAuthor', message)">POST</button>
                </div>  
                
                <div class="line"></div>

                <!-- MESSAGE ELEMENT -->
                <ul class='msg-list'>
                    <li v-for="(msg, index) in $store.getters['messages/getMessages']" :key="index">
                        <div class="msg">
                            <h3 style='color:var(--tertiary1-clr)'>{{msg.author}}</h3>
                            <p>{{msg.message}}</p>
                            <p class="timestamp">{{msg.timestamp}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                message:''
            }
        },  

        computed:{
            accountType(){
                return this.$store.getters['users/getAccountType'];
            }
        },

        methods:{
            postMessage(auth, msg){ 
                let name = this.$store.getters['users/getAccount'].firstName +' '+ this.$store.getters['users/getAccount'].lastName;
                this.$store.dispatch('messages/postMessage', {author:name, message:msg});
            }
        },
        mounted(){
            this.$store.dispatch('messages/setMessages');
        }
    }
</script>

<style scoped>
    .message{
        height: 100%;
        width: 100%;
        padding: var(--mp-200) auto;
    }

    .message .line{
        height: 2px;
        width:100%;
        margin: 0 0 18px;
        background-color:var(--tertiary2-clr);
    }

    .message .msg-list{
        display: grid;
        grid-template-columns: auto;
        gap: var(--mp-100);
        place-content: center;
    }

    .message .msg{
        max-width: 500px;
        padding: var(--mp-200);
        border-radius: var(--mp-100);
        background: var(--tertiary2-clr);
        color: var(--primary-clr);
    }

    .message .posting-section{
        max-width: 510px;
        width: 100%;
        margin: 0 auto var(--mp-400) auto;
        padding: var(--mp-200) 0;
    }

    .message .posting-section button{
        font-size: var(--fs-400);
        padding: var(--mp-400);
        border: none;
        border-radius: var(--mp-100);
        background-color: var(--secondary-clr);
        color: var(--primary-clr);
    }

    .message textarea{
        font-size: var(--fs-400);
        width: 100%;
        height: 100px;
        padding: var(--mp-100);
        border: 2px solid var(--tertiary2-clr);
        border-radius: 10px;
        box-sizing: border-box;
    }


    .message .timestamp{
        width: fit-content;
        margin: 0 0 0 auto;
    }
</style>