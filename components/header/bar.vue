<template>
    <header class="header-bar">
        <div class="header-bar__container">
            <UI-button v-if="isDashboard" text="Log out" @click="logout" />
        </div>
    </header>
</template>

<script setup lang="ts">
import gql from 'graphql-tag'
import { useRouter } from 'vue-router'
import { useNuxtApp } from '#app'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
const route = useRoute()
const router = useRouter()
const { $apollo } = useNuxtApp()
    const props = defineProps({
        loggedIn: {
            type: String,
            default: '' 
        },
    })
    const isDashboard = computed(() => route.path === '/dashboard')

    // watch(() => route.fullPath, (newPath) => {
    //     if (newPath === '/dashboard') {
    //         console.log('User is on the dashboard')
    //     }
    // })

    const LOGOUT_MUTATION = gql`
    mutation Logout {
        logout
    }
    `

    const logout = async () => {
    try {
        await $apollo.mutate({
        mutation: LOGOUT_MUTATION
        })
        useCookie('token').value = null
        localStorage.setItem('signedIn', 'false' )
        router.push('/')
    } catch (err) {
        console.error('Logout error:', err)
    }
    }
</script>

<style scoped lang="scss">
    .header-bar{
        width: 100%;
        height: 70px;
        background-color: var(--color-tertiary);
        border-bottom: solid 3px var(--color-primary);
        position: fixed;
        padding: 0px 20px;
     
        &__container{
            max-width: 1350px;
            width: 100%;
            margin: 0 auto;
            height: 100%;
        }
        button{
            cursor: pointer;
  
            margin-top: 18px;
            text-transform: uppercase;
            float: right; // i would not normaly use float as there would be other items in the layout
        }
    }
</style>
