<template>
    <p class="text_1">FAST MONEY</p>

    <h1 class="title">Currency converter</h1>
    
    <h1 class="subtitle">Convert popular currencies from around the world with updated exchange rates using our calculator.</h1>

    <article class="cont">
        
        <div class="lateral_cont">

            <label
                for="destiny"
                style="font-family: inter;
                       font-size: 12px;
                       font-weight: 400;
                       margin: 20px;
                       color: #88939D;">From</label>

            <select id="destiny" 
                    v-model="initialCurrency"
                    style="margin: 10px;"><option v-for="currency in currencyOptions" :key="currency">{{ currency }}</option>
            </select>

            <input type="number"
                   v-model="amount"
                   style="border: 1px solid rgb(185, 185, 185);
                          border-radius: 5px;
                          height: 20px;
                          width: 100px;">
        </div>

        <div class="middle_cont">

            <button class="logo_1" @click="() => getResult(initialCurrency, finalCurrency, amount)"></button>

        </div>
        
        <div class="lateral_cont">

            <label for="destiny"
                   style="font-family: inter;
                          font-size: 12px;
                          font-weight: 400;
                          margin: 20px;
                          color: #88939D;">To</label>
            
            <select id="destiny" 
                    v-model="finalCurrency"
                    style="margin: 10px;"><option v-for="currency in currencyOptions" :key="currency">{{ currency }}</option>
            </select>

            <p style="border: 1px solid rgb(185, 185, 185);
                          border-radius: 5px;
                          height: 20px;
                          width: 100px;">{{ result.toFixed(2) }}</p>
        </div>
        
    </article>
        
    <button class="btn" @click="logout">Logout</button>        

    <p class="text_2">Currency calculation tools use reference exchange rates obtained from major market data sources</p>

</template>

<script>

import axios from 'axios';
import router from '../router';

export default {
    data() {
        return {
            currencyOptions: [],
            amount: 1,
            finalCurrency: "EUR",
            initialCurrency: "EUR",
            result: 0,
            currencyRates: {}
        }
    },

    methods: {
        logout,
        getResult
    },
    
    async mounted() {
        // This piece of code fetches all the available  currencies
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`http://localhost:3000/currency/symbols`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.data;
            this.currencyOptions = Object.keys(data.symbols)

        } catch (error) {
            console.log(error.message)
        }
        
        const response = await axios.get('http://localhost:3000/currency/currency-rates', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        this.currencyRates = await response.data.currencyRates;

    }
}

function getResult(initialRate, finalRate, amount) {
    this.result = this.currencyRates[finalRate] / this.currencyRates[initialRate] * amount;
}

async function logout() {
    const token = localStorage.getItem('token');
    const response = await axios.delete('http://localhost:3000/logout', {
        headers: {
            Authorization: `bearer ${token}`
        }
    })
    localStorage.removeItem('token');
    router.push('/login');
}

</script>

<style>

.title {
    text-align: center;
    font-family: Inter;
    font-size: 72px;
    font-weight: 475;
    margin: 20px auto;
}

.subtitle {
    max-width: 500px;
    text-align: center;
    font-family: Inter;
    font-size: 16px;
    font-weight: 400;
    margin: 30px auto;
}

.text_1 {
    text-align: center;
    font-family: Inter;
    font-size: 10px;
    font-weight: 600;
    margin: 60px auto 40px;
}

.text_2 {
    text-align: center;
    font-family: Inter;
    font-size: 14px;
    font-weight: 400;
    margin: 40px auto 20px;
}

.btn {
    position: absolute;
    top: 30px;
    right: 30px;
}

.cont {
    width: 90vw;
    max-width: 600px;
    height: 30vh;
    margin: 20px auto;
    border: 1px solid rgb(185, 185, 185);
    border-radius: 5px;
    -webkit-box-shadow: 0px 0px 15px 1px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 15px 1px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 15px 1px rgba(0,0,0,0.75);

    display: flex;
    align-items: center;
    justify-content: center;

    .lateral_cont {
        height: 100px;
        width: 300px;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .middle_cont {
        height: 100px;
        width: 50px;

        display: flex;
        justify-content: center;
        align-items: center;

        .logo_1 {
            width: 40px;
            height: 40px;
            border: none;

            background: url(../assets/change.png) no-repeat;
            background-size: cover;
        }
    }

    @media (max-width: 900px) {
        flex-direction: column;

        .cont_5 {
        height: 100px;
        width: 90vw;
        background-color: red;
    }

    .cont_6 {
        height: 100px;
        width: 90vw;
        background-color: rgb(72, 24, 204);
    }

    }
}

</style>