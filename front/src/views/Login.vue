<template>

    <article class="cont_1">

        
        <div class="cont_2">
            <div class="logo_1"></div>
            <Login/>            
        </div>
        
        <div class="cont_3">           
        </div>

    </article>

</template>

<script setup>

import Login from '../components/LoginComp.vue'


</script>


<style>

.cont_1 {
    width: 100vw;
    max-width: 1800px;
    min-height: 100vh;
    margin: auto;
    position: relative;
    
    display: flex;

    .cont_2 {
        width: 50%;        
        min-height: 100vh;

        display: flex;
        align-items: center;
        justify-content: center;

        .logo_1 {
            width: 200px;
            height: 100px;
            /* background-color: blue; */

            position: absolute;
            top: 10px;
            left: 10px;

            background: url(../assets/fast.png) no-repeat;
            background-size: cover;
        }
    }

    .cont_3 {
        width: 50%;       
        min-height: 100vh;
        background: url(../assets/Image1.png) no-repeat;
        background-size: cover;
        background-position: center;
    }

    @media (max-width: 900px) {

        .cont_2 {
            width: 100vw;
        }

        .cont_3 {
            display: none;
        }

    }
}

</style>