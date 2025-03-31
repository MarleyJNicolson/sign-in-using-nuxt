<!-- pages/login.vue -->
<template>
    <cards-slots class="modules-login-card" :class="'modules-login-card--' + formState ">
        <h1 class="modules-login-card__form-title">{{ title }}</h1>
        <h3 class="modules-login-card__form-sub-title">Login</h3>
        <form class="modules-login-card__form" @submit.prevent="handleLogin">
            <UI-input errorMessage="Missing email" ref="emailInput" class="modules-login-card__form-input" type="email" placeholder="Email" v-model="email" required/>
            <UI-input errorMessage="Missing password" ref="passwordInput" class="modules-login-card__form-input" type="password" placeholder="Password" v-model="password" required/>
            <p class="modules-login-card__error">{{ errorMessage }}</p>
            <UI-button :state="formState " type="submit" text="Sign In" class="modules-login-card__form-button">Login</UI-button>
        </form>
        
        <!-- <p>Or sign Up</p> -->
    </cards-slots>
</template>
<script setup lang="ts">
  import { ref } from 'vue'

  const email = ref<string>('')
  const password = ref<string>('')
  const emailInput = ref(null)
  const passwordInput = ref(null)
  const formState = ref< 'loading' | 'failed' | 'success' | 'idle'>('idle');
  
  defineProps({
    errorMessage: {
        type: String,
        default: '' 
    },
    title: {
        type: String,
        default: '' 
    }
  });


  const emit = defineEmits(['module-login-emit'])


  
  const handleLogin = () => {

    emailInput.value?.handleErrors()
    passwordInput.value?.handleErrors()
    
    if(email.value === '' || password.value === '') {
      return false;
    }

    emit('module-login-emit', [ email.value, password.value]);


  }

  const successListener = (value: any) => {
    formState.value = value;
  }

  defineExpose({
    successListener
  })


</script>
  

<style scoped lang="scss">
    .modules-login-card{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 470px;
        width: 100%;
        h1{
            color: var(--color-primary);
            font-size: var(--font-size-h1);
            max-width: 300px;
            line-height: var(--line-height-h1);
            text-align: center;
            margin-bottom: 20px;
        }
        h3{
            color: var(--color-secondary);
            font-size: 20px;
            margin-bottom: 20px;
        }
        &__form{
            width: 100%;
        } 
        &__card{
            max-width: 500px;
            width: 100%;
        }
        &__form-input{
            margin-bottom: 30px;
            width: 100%;
            &:nth-of-type(2){
                margin-bottom: 0;
            }
        }
        &__error{
            color: var(--color-error);
            font-size: 14px;
            margin-top: 10px;
            height: 30px;
            position: relative;
            text-align: center;
        }
        &__form-button{
            margin: 0 auto;
            max-width: 230px;
            width: 100%;
        }
        &--success{
            border: solid 1px var(--color-success);
            transition: all 0.3s ease-in-out;
        }
    }
    @media (max-width: 750px) {
        .modules-login-card{
            max-width: 100%;
            border: none;
            background-color: #ffffff00;
            box-shadow: none;
        } 
    }
</style>
