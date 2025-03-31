<!-- pages/login.vue -->
<template>
  <div class="login-page" :class="{ 'login-page--transition' : logThemIn }">
    <modules-login ref="moduleLogin" title="Welcome to ITC Complice" :errorMessage="serverResponse" @module-login-emit="handleLoginEmit" />
  </div>
</template>

<script setup lang="ts">
import gql from 'graphql-tag'
import { useRouter } from 'vue-router'
import { useNuxtApp } from '#app'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
const auth = useAuthStore();
// Add page meta
definePageMeta({
  layout: 'login'
})

const toast = useToast()

const router = useRouter()
const { $apollo } = useNuxtApp()
const serverResponse = ref('');
const moduleLogin = ref(null);
const logThemIn = ref(false);


const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      message
      user
    }
  }
`


const handleLoginEmit = async ([email, password]: [string, string]) => {
  moduleLogin.value.successListener('loading');
  try {
    const result = await $apollo.mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        email,
        password
      }
    })

    const login = result.data.login
    console.log('login', login);
    
    if (login?.token) {
      localStorage.setItem('token', login.token)
      localStorage.setItem('role', login.user.role)
      localStorage.setItem('signedIn', 'true' )

      document.cookie = `token=${login.token}; path=/; max-age=3600`

      moduleLogin.value.successListener('success');
      toast.add({
          description: 'Sign in successful',
      });
      logThemIn.value = true;

      setTimeout(() => {
        router.push('/dashboard');
      }, 2000) 

      // router.push('/dashboard');


    } else {
  
      serverResponse.value = login.message 
      moduleLogin.value.successListener('failed');
    }
  } catch (error: any) {
    moduleLogin.value.successListener('failed');
    serverResponse.value = error.message;
  }
}
</script>

<style scoped lang="scss">
  .login-page{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      top:0px;
      opacity: 1.0;
      &--transition{
          transition: all 0.3s 1s ease-in-out;
          opacity: 0.0;
      }
  }


  @media (max-width: 750px) {
      .login-page{
          display: block;
          height: auto;
      } 
  }
</style>
