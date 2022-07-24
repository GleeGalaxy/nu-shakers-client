import router from '../routes.js';

const APIKEY = "AIzaSyDAmjMQVyV8WuF4AsFOz4GZjcDdspjIX50";
// const SIGN_UP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKEY}`;
const SIGN_IN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKEY}`;
const REFRESH_TOKEN = `https://securetoken.googleapis.com/v1/token?key=${APIKEY}`;
const GET_USER_DATA = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${APIKEY}`;

const AdminsModule = {
    namespaced:true,
    state(){
        return{
            email:null,
            isAuth:false,
            loading:true, 
            admins:[],
        }
    },
    getters:{
        getName(state){
            console.log(state.firstName)
            return `${localStorage.firstName}  ${localStorage.lastName}`;
        },

        isAuth(state){
            if(state.email) return true;
            return false;
        }
    },
    mutations:{
        pushAdmins(state, payload){
            state.admins.push(payload);
        },

        resetAdmins(state){
            state.admins = [];
        },

        authAdmin(state, payload){
            state.email = payload.email;
        },

        resetAdminEmail(state){
            state.email = null;
        }
    },
    actions:{
        async autoLoginAdmin(context){
            try{
                if(context.state.loading){
                    //Getting refresh token from localstorage.
                    const refreshToken = localStorage.getItem('refresh');
                    console.log(refreshToken);
    
                    //Checking if refresh token exists
                    if(refreshToken){
                        //Getting a token using the refresh token.
                        const token = await fetch(REFRESH_TOKEN, {
                            method:'POST',
                            headers:{
                                'Content-Type':'application/json'
                            },
                            body:JSON.stringify({
                                grant_type:'refresh_token',
                                refresh_token:refreshToken
                            })
                        })
                        .then(response => response.json());
                        console.log(token);
        
                        //Using token to get use->password.
                        const user = await fetch(GET_USER_DATA, {
                            method:'POST',
                            headers:{
                                'Content-Type':'application/json'
                            },
                            body:JSON.stringify({
                                idToken:token.id_token
                            })
                        })
                        .then(response => response.json());
                        console.log(user);
                        
                        //Creating new details from refresh.
                        const newTokens = {
                            email:user.users[0].email,
                            token:token.id_token,
                            refreshToken:token.refresh_token
                        }
                        console.log(newTokens);
        
                        //Setting the new details.
                        context.commit('authAdmin', newTokens);
                        context.dispatch('setToken', newTokens);
                        context.state.loading = false;
        
                    }
                }
            }
            catch(error){
                console.log(error);
            }
            finally{
                context.state.loading = false;
            }
        },

        signInAdmin(context, payload){
            //Making email out of username
            let adminEmail = payload.username + '@northrise.net';
            
            //Retrieving all the Emails from admins.
            fetch("https://inferno-3faf9-default-rtdb.firebaseio.com/admins.json")
            .then(response => response.json())
            .then(
            data => {
                context.commit('resetAdmins');

                //Looping through the returned object
                var keys = Object.keys(data)
                keys.forEach(function(key){
                    var AdminObj = {
                        email:data[key].email,
                        firstName:data[key].firstName,
                        lastName:data[key].lastName,
                    }
                    
                    context.commit('pushAdmins', AdminObj);
                })

                //Test entered payload against all emails to see if it exits.
                let found = false;
                context.state.admins.forEach(function(admin){
                    console.log(context.state.admins)
                    if(adminEmail  === admin.email){
                        
                        //Setting the name of the logged in admin to the local storage.
                        localStorage.setItem('firstName', admin.firstName);
                        localStorage.setItem('lastName', admin.lastName);
                        found = true;
                    }
                })
                
                if(found){
                    //Sign in.
                    console.log(found + '\n' + context.state.admins)
                    context.dispatch('signIn', payload)
                }
            })            
        },

        async signIn(context, payload){
            try{
                const response = fetch(SIGN_IN_URL, {
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        email:payload.username+'@northrise.net',
                        password:payload.passcode,
                        returnSecureToken:true
                    })
                })
                .then(response => response.json())

                //Waiting for response from fetch request.
                let data = await response;

                context.commit('authAdmin', data);
                context.dispatch('setToken', data);
                if(context.state.email !== null && context.state.email !== undefined){
                    router.push('/dashboard');
                }
            }
            catch(error){
                console.log(error);
            }
        },

        signOutAdmin(context){
            alert("Signing Out Admin...");
            context.commit('resetAdminEmail');
            context.dispatch('removeToken');
            console.log(context.state.email);
            router.push('/admin-login');
        },

        removeToken(){
            localStorage.removeItem("token");
            localStorage.removeItem("refresh");
            localStorage.removeItem("firstName");
            localStorage.removeItem("lastName");
        },
        
        setToken(context, payload){
            localStorage.setItem("token", payload.idToken);
            localStorage.setItem("refresh", payload.refreshToken);
        },
    }
}

export default AdminsModule;