import objects from "./defaultDataStruct/strcuts";
import initialState from "./defaultDataStruct/initialState";
import {getCookie,setCookie} from "./cookieStuff"

export default  (state=initialState,action)=>{
    switch(action.type){
        case "SET_LOGGED_IN":
            return {...state,AuthenticationStatus:{isLoggedIn:true,JWT_TOKEN:action.payload.JWT_TOKEN}}
        break;

        case "SET_USER_DETAILS":
            return {...state,CurrentUserDetails:action.payload.records}
        break;
        
        case "SET_LOGGED_OUT":
            return {...state,AuthenticationStatus:objects.AuthenticationStatus,CurrentUserDetails:objects.CurrentUserDetails}
        break;

        case "SWITCH_LANG_BAR":
            return {...state,showLangsBar:!state.showLangsBar}
        break;

        case "CHANGE_LANG":
            setCookie("hl",action.payload.name,3000)
            return {...state,currentLanguage:state.LanguagesArray.find(v=>v.name==action.payload.name)}
        break;
    }
    return state
}