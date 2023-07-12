<template>
    <article class="login">        
        <h1 class="title">Login to account</h1>        
        <h2 class="subtitle">Enter your credentials to access your account</h2>

        <form class="login-form"
              style="display: flex;
                     flex-direction: column;">
            <input 
                type="email" 
                placeholder="Enter email" 
                v-model="email" 
                required
                style="border: 1px solid rgb(185, 185, 185);
                          border-radius: 5px;
                          height: 20px;
                          width: 300px;
                          margin: 10px auto;
                          height: 30px;">                
            <button @click="(e) => submitForm(e)"
                style="border: 1px solid rgb(185, 185, 185);
                          border-radius: 5px;
                          height: 30px;
                          width: 305px;
                          margin: 10px auto;
                          padding: 0;
                          background-color: #1751D0;
                          color: white;">login</button>

        </form>  
    </article>

</template>

<script>

import router from '../router/index';

export default {
    data() {
        return {
        email: ""
        }
    },

    methods: {
        submitForm
    },
}

import axios from 'axios'

async function submitForm(e) {
    e.preventDefault();
    if (this.email) {
        try {
            const response = await axios.post(`http://localhost:3000/login`, {
                "email": this.email
            },{
                
            })
            const data = await response.data;
            localStorage.setItem('token', data.token)
            router.push('/')
            console.log(data);
        } catch (error) {
            console.log(error.message)
        }
    }
    
}

</script>

<style scoped>
.login {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .title {
        text-align: center;
        font-family: Inter;
        font-size: 32px;
        font-weight: 600;
        margin: 20px auto 10px;
    }
    
    .subtitle {
        text-align: center;
        font-family: Inter;
        font-size: 16px;
        font-weight: 400;
        max-width: 300px;
        margin: 10px auto 30px;
    }

}

</style>