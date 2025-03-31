const users = [
  { name: 'Marley Nicolson', email: 'marleynicolson2@hotmail.com', password: 'password', role: 'Admin', id: 1 },
  { name: 'James Snell', email: 'james.snell@itccompliance.co.uk', password: 'password', role: 'Admin', id: 2 },
  { name: 'Alice Carter', email: 'alice@example.com', password: 'password', role: 'Viewer' , id: 3},
  { name: 'Liam Jones', email: 'bob@example.com', password: 'hunter2', role: 'Viewer' , id: 4},
]
const validTokens = new Set<string>()
// lazy stop dupes
var userIDcount = 3;
var saveCurrentToken ='';

export default defineEventHandler(async (event) => {
  const body = await readBody(event)


  if (body.query.includes('validateToken')) {
    const token = getCookie(event, 'token') 
    const isValid = validTokens.has(token ?? '')
  
    return {
      data: {
        validateToken: isValid,
        token: saveCurrentToken 
      }
    }
  }

  if (body.query.includes('logout')) {
    const token = getCookie(event, 'token')
  
    if (token) {
      validTokens.delete(token) 
    }
  
    return {
      data: {
        logout: true
      }
    }
  }


  await new Promise(resolve => setTimeout(resolve, 3000))
  

  if (body.query.includes('login')) {
    const { email, password } = body.variables
  
    const user = users.find(u => u.email === email && u.password === password)
  
    if(user) {

      const token = generateRandomToken(64)
      saveCurrentToken = token;
      validTokens.add(token)
      return {
        data: {
          login: {
            token,
            user: user
          }
        }
      }

    }else{

      return {
        data: {
          login: {
            token: null,
            message: 'Invalid email or password'
          }
        }
      }
    }
  }

  if (body.query.includes('users')) {
    return {
      data: {
        users
      }
    }
  }


  if (body.query.includes('addUser')) {
    const { name, email, password, role } = body.variables;
  
    const newUser = {
      id: userIDcount + 1, // does not need to be the count of users but needs to never be a lower number as that will result in a duplicate ids
      name,
      email,
      password,
      role
    };
  
    users.push(newUser);
    userIDcount = userIDcount + 1;
    return {
      data: {
        addUser: newUser
      }
    };
  }


  return {
    errors: [{ message: 'Unknown query' }]
  }
})

function generateRandomToken(length = 32): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length)
    token += charset[randomIndex]
  }
  return token
}
