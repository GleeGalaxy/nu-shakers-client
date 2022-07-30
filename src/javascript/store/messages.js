const messagesModule = {
    namespaced:true,
    state(){
        return{
            messages:[]
        }
    },
    getters:{
        getMessages(state){
            return state.messages.sort((a, b) => b.datestamp - a.datestamp)
        }
    },
    mutations:{
        setMessages(state){
            fetch("https://inferno-3faf9-default-rtdb.firebaseio.com/messages.json")
            .then(response => response.json())
            .then(
                data => {
                    state.messages = [];

                    var keys = Object.keys(data)
                    keys.forEach(function(key){
                        var messageObj = {
                            author:data[key].author,
                            message:data[key].message,
                            timestamp:data[key].timestamp,
                            datestamp:data[key].datestamp
                        }
                        
                        state.messages.push(messageObj);
                    })
                }
            );
        }
    },
    actions:{
        postMessage(context, payload){
            
            alert("Attempting post.")
            if(payload.message.trim() === '')
                return false;

            //Sending message only if the post is not empty.
            var d = new Date(),
                h = (d.getHours()<10?'0':'') + d.getHours(),
                m = (d.getMinutes()<10?'0':'') + d.getMinutes();
                let date = d.getTime();
                let time = h + ':' + m;

            fetch("https://inferno-3faf9-default-rtdb.firebaseio.com/messages.json", {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    author:payload.author,
                    message:payload.message,
                    timestamp: time,
                    datestamp:date
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                context.commit('setMessages');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        },

        setMessages(context){
            context.commit('setMessages');  
        }
    }
}

export default messagesModule;