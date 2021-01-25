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
        blocked: [],
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
    },
    GeneralUse:{
        ScreenPopUp: {
            show: false,
            isLoading: false,
            title:'',
            width: {
                xs:12,
                sm: 7,
                md: 5,
                lg:3
            },
            iterableData:{
                rows: [], //rows name => data object attributes
                data:[],
                colStyling: [
                    //each styling object will match the nth column
                ],
            }
        },
        Loader:{
            show: false
        },
        Notifications:[
            //object format should have content,type,href?
        ]
    }
}
export default initial