const setLoggedIn = (JWT_TOKEN)=>({type:"SET_LOGGED_IN",payload:{isLoggedIn:true,JWT_TOKEN}})
const setLoggedOut = ()=>({type:"SET_LOGGED_OUT"})
const setUserDetails = (records)=>({type:"SET_USER_DETAILS",payload:{records}})
export default {setLoggedIn,setLoggedOut,setUserDetails}