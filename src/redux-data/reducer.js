import objects from "./defaultDataStruct/strcuts";
// import initialState from "./defaultDataStruct/initialState";
import {/*getCookie,*/setCookie} from "./cookieStuff"
 
const Reducer = (state/*=initialState*/,action)=>{
    switch(action.type){
        case "SET_LOGGED_IN":
            return {...state,AuthenticationStatus:{isLoggedIn:true,JWT_TOKEN:action.payload.JWT_TOKEN}}

        case "SET_USER_DETAILS":
            return {...state,CurrentUserDetails:action.payload.records}
        
        case "SET_LOGGED_OUT":
            return {
                ...state,
                AuthenticationStatus:{...objects.AuthenticationStatus,isLoggedIn:false},
                CurrentUserDetails:objects.CurrentUserDetails,
                Messaging:{
                    ...state.Messaging,
                    chatList: [],
                    chatSearchList: [],
                    messagesList: {
                        data:[]
                    },
                    currentChat:{
                        id:null,
                        isGroup:null,
                        messagesIndex:0,
                        isLoading:false,
                        isReplying:false
                    },
                    currentChatListState:{
                        chatIndex:0,
                        isLoading: false
                    }
                }
            }

        case "SWITCH_LANG_BAR":
            return {...state,showLangsBar:!state.showLangsBar}

        case "CHANGE_LANG":
            setCookie("hl",action.payload.name,3000)
            return {...state,currentLanguage:state.LanguagesArray.find(v=>v.name===action.payload.name)}
        
        case "SET_CHAT_LIST":
            return {...state,Messaging:{...state.Messaging,chatList:action.payload.chats}}

        case "SET_CHAT_SEARCH":
            return {...state,Messaging:{...state.Messaging,chatSearchList:action.payload.chats}}
        
        case "SET_MESSAGES_LIST":
            if(action.payload.messages.data){
                return !action.payload.add ? 
                {
                    ...state,
                    Messaging:{
                        ...state.Messaging,
                        messagesList:action.payload.messages
                    }
                }
                :
                {
                    ...state,
                    Messaging:
                        {
                            ...state.Messaging,messagesList:
                            {
                                ...state.Messaging.messagesList,
                                data:[...state.Messaging.messagesList.data,...action.payload.messages.data]
                            }
                    
                        }
                }
            }
            else{
                return state
            }
            
        
        case "INCREMENT_MESSAGES_INDEX":
            return {
                ...state,
                Messaging:{
                    ...state.Messaging,
                    currentChat:{
                        ...state.Messaging.currentChat,
                        messagesIndex: !action.payload.zerofy ? state.Messaging.currentChat.messagesIndex+1 : 0
                    }
                }
            }

        case "SET_CURRENT_CHAT":
            return {...state,Messaging:{...state.Messaging,currentChat:{...state.Messaging.currentChat,isGroup: action.payload.isGroup,id:action.payload.id}}}
        
        case "SET_CONVO_READ":
            return {
                ...state,
                Messaging:
                    {...state.Messaging,
                    chatList:
                        state.Messaging.chatList.map(v=>
                            !action.payload.isGroup ? 
                            (v.contact==action.payload.other ? {...v,unreadCount:0} : {...v})
                            : 
                            (parseInt(v.id) == parseInt(action.payload.other) ? {...v,unreadCount:0} : {...v})
                         )
                    }
            }

        case "SET_MESSAGES_LOADING":
            return {
                ...state,
                Messaging:{
                    ...state.Messaging,
                    currentChat:{
                        ...state.Messaging.currentChat,
                        isLoading: action.payload.loading
                    }
                }
            }
        
        case "SET_MESSAGING_REPLY_DATA":
            return {
                ...state,
                Messaging:{
                    ...state.Messaging,
                    currentChat:{
                        ...state.Messaging.currentChat,
                        isReplying: action.payload.isReplying,
                        replyTo:{
                            id: action.payload.isReplying ? action.payload.replyID : null,
                            content: action.payload.isReplying ? action.payload.replyContent : null
                        }
                    }
                }
            }

        case "UserSentSingleMessage":
            return{
                ...state,
                Messaging:{
                    ...state.Messaging,
                    messagesList:{
                        ...state.Messaging.messagesList,
                        data:[
                            action.payload.msg,
                            ...state.Messaging.messagesList.data
                        ]
                    },
                    chatList:
                    [
                        {
                            ...state.Messaging.chatList.find(chat=>{
                                return !action.payload.isGroup ? chat.contact == action.payload.contact : parseInt(chat.id) === parseInt(action.payload.contact)
                            }),
                            lastMessage: action.payload.msg
                        },
                        ...state.Messaging.chatList.filter(chat=>{
                            return !action.payload.isGroup ? chat.contact !== action.payload.contact : parseInt(chat.id) !== parseInt(action.payload.contact)
                        })
                    ]
                }
            }


        default :
            return state
    }
}

export default Reducer