export default defineNuxtRouteMiddleware(async () => {
  const token = useCookie('token').value

  if (!token) {
    return navigateTo('/')
  }

  const result = await $fetch('/api/graphql', {
    method: 'POST',
    credentials: 'include', 
    body: {
      query: `
        query ValidateToken {
          validateToken
        }
      `
    }
  })

  console.log('res resrre', result);
  if (process.client) {
    if (!result.data.validateToken) {
      return navigateTo('/')
    }
    console.log('res resrre client client', result);
  }
})
