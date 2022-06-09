import axios from "../../authAxios"

export var loggedUser = null

export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {}

const setUser = user => {
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))
  loggedUser=JSON.stringify(user)
}

const setAccessTokenOnRequestHeader = (rcmsApiAccessToken) => {
            axios.defaults.headers.common = {
                'X-RCMS-API-ACCESS-TOKEN': rcmsApiAccessToken.value
            }    
}

export const handleLogin = async ({ email, password }) => {
    const {data:{grant_token}} = await axios.post("/6/login",{email,password})
    const {data:{access_token}} = await axios.post("/6/token",{grant_token})
    setUser({username:email})
    setAccessTokenOnRequestHeader(access_token)
}

export const handleLogout = async () => {
  console.log("got in here")
  try{
    await axios.post("/6/logout")
  }
  catch{}
  setUser(null)
  setAccessTokenOnRequestHeader({rcmsApiAccessToken:null})
}

export const isLoggedIn = async () => {
  try{
      const {data} = await axios.get('/6/profile')
      setUser({
        email : data.email, 
        name1 : data.name1, 
        name2: data.name2,
      })
      const user = getUser()
      return user
  }
  catch(e){
    console.log("error detected")
    return null
  }
}
