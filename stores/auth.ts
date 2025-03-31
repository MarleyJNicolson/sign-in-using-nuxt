import { defineStore } from 'pinia' 
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const username = ref('')
  const userId = ref('')
  const role = ref();
  const userToken = ref('')

  function login(userData: { username: string; userId: string; role: string }) {
    isLoggedIn.value = true
    username.value = userData.username
    userId.value = userData.userId
    role.value = userData.role;
  }

  function logout() {
    isLoggedIn.value = false
    username.value = ''
    userId.value = ''
    userToken.value = ''
    localStorage.removeItem('token')
  }


  return {
    isLoggedIn,
    username,
    userId,
    userToken,
    login,
    logout,
  }
})
