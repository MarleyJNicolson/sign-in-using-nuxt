<template>
    <header-bar :loggedIn="singedIn" />
    <main :class="['layout-login', { 'layout-login--signed-in': singedIn === 'true' }]">
      <UApp>
          <NuxtPage :key="$route.fullPath" />
      </UApp>
      <div class="layout-login__bg">
        <div class="layout-login__bg-top"></div>
        <div class="layout-login__bg-bottom"></div>
      </div>
    </main>
    
</template>
  
<script setup>
  import { ref } from 'vue'
  import { useRoute, onBeforeRouteUpdate } from 'vue-router'
  import { watch } from 'vue'

const route = useRoute()
  const auth = useAuthStore()
  const singedIn = ref('false')

  watch(() => route.fullPath, () => {
    
    singedIn.value = localStorage.getItem('signedIn')
    // alert(singedIn.value)
  })

  
</script>

<style scoped lang="scss">

  .layout-login{
      min-height: 100vh;
      width: 100vw;
      padding: 0px 40px;
      &--signed-in{
          animation-delay: 8s;
      }
      &__bg{
        width: 100%;
        height: 100%;
        z-index: -1;
        position: absolute;
        left: 0px;
        top: 0px;
        div{
          width: 100%;
          height: 100%;
          position: absolute;
          top:0px;
          left:0px;
          transition: opacity 4s;
        }
      }
      &__bg-top{
        background: linear-gradient(150deg, rgba(63, 204, 251, 0.38) 0%, rgba(70, 213, 252, 0) 40%);
        opacity: 1;
       
      }
      &__bg-bottom{
        background: linear-gradient(343deg, rgba(63, 204, 251, 0.38) 0%, rgba(70, 213, 252, 0) 40%);
        opacity: 0;
      }
      &--signed-in{
        .layout-login__bg-top{
          transition: opacity 4s;
          opacity: 0;
        
        }
        .layout-login__bg-bottom{
          opacity: 1;
          transition: opacity 4s;
        }
      }
      
  }
  @media (max-width: 750px) {
    .layout-login{
        padding: 80px 15px 0px 15px;
    } 
  }

</style>
