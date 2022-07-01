import axios from "../../authAxios"

export var loggedUser = null
export const isBrowser = () => typeof window !== "undefined"


export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {}

const setUser = user => {
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))
}

export const getAccessToken = () =>
isBrowser() && window.localStorage.getItem("accessToken")
  ? JSON.parse(window.localStorage.getItem("accessToken"))
  : {}

const saveAccessToken = token => {
  window.localStorage.setItem("accessToken", JSON.stringify(token))
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
    saveAccessToken(access_token)
    setAccessTokenOnRequestHeader(access_token)
}

export const handleLogout = async () => {
  try{
    await axios.post("/6/logout")
  }
  catch{}
  setUser(null)
  saveAccessToken(null)

  setAccessTokenOnRequestHeader({rcmsApiAccessToken:null})
}

export const regenerateHttpClient = () => {
  let token = getAccessToken()
  setAccessTokenOnRequestHeader(token)
}

export const isLoggedIn = async (props) => {
  try{
      const token = getAccessToken()
      setAccessTokenOnRequestHeader(token)
      const {data} = await axios.get('/6/profile')
      setUser({
        email : data.email, 
        name1 : data.name1, 
        name2: data.name2,
        language: data.tags[0].tag_nm
      })
      const user = getUser()
      return user
  }
  catch(e){
    return null
  }
}
