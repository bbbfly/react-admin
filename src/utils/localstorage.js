const USER_KEY = 'user_key'

export const getUser = () =>{
    return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
}

export const setUser = (user) => {
    return localStorage.setItem(USER_KEY,JSON.stringify(user))
}

export const removeUser = () => {
    localStorage.removeItem(USER_KEY)
}