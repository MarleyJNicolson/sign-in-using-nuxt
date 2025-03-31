<template>
    <div class="dashboard">
      <modules-users  title="The Team" :users="delayedUsers" :status="listStatus" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { useNuxtApp } from '#app'
  import gql from 'graphql-tag'
  import { useAsyncData } from 'nuxt/app'
  import { computed } from 'vue'
  
  definePageMeta({
    layout: 'login',
    middleware: 'auth-client',
    ssr: false
  })
  
    const rawResult = ref(null)       
    const loadError = ref(null)        
    const isLoading = ref(true)   
    const delayedUsers = ref([])
    const listStatus = ref('loading') 

  const { $apollo } = useNuxtApp()
  
  const GET_USERS_QUERY = gql`
    query {
      users {
        name
        email
        role
        id
      }
    }
  `
  
  try {
    const result = await $apollo.query({
        query: GET_USERS_QUERY
    })

    rawResult.value = result
    isLoading.value = false

      delayedUsers.value = rawResult.value?.data?.users 
      listStatus.value = 'success'
  
   
    console.log('result', rawResult.value);

  } catch (err: any) {
        loadError.value = err.message || 'Something went wrong.'
        isLoading.value = false
  }
  

  </script>
  
  <style scoped lang="scss">
    .dashboard {
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    @media (max-width: 750px) {
      .dashboard{
        height: auto;
        display: block;
      }
    }
  </style>
  