import objects from "./strcuts";
import en from "../../langs/en"

const initial = {
    currentLanguage:{
        name:"en",
        logo: "english.png",
        sample:"Hello !",
        values: en
    },
    LanguagesArray : objects.Languages,
    AuthenticationStatus:objects.AuthenticationStatus,
    CurrentUserDetails:objects.CurrentUserDetails,
    Messaging:{
        chatList:[],
        chatSearchList:[],
        messagesList:{
            contact: null,
            messagesCount:null,
            profilePic:"",
            data: []
        },
        currentChat: {
            id: null,
            isGroup: null,
            messagesIndex: 0,
            isLoading: false,
            isReplying: false,
            replyTo:{
                id: null,
                content:null
            }
        },
        currentChatListState: {
            chatsIndex: 0,
            isLoading: false
        }
    }
}
export default initial