import en from "../../langs/en"
import fr from "../../langs/fr"
import ar from "../../langs/ar"
const objects = {
    Languages:[
        {
            name:"en",
            logo:"english.png",
            sample:"Hello !",
            values: en
        },
        {
            name:"fr",
            logo:"french.png",
            sample:"Salut !",
            values: fr
        },
        {
            name:"ar",
            logo:"arabic.png",
            sample: "مرحبا",
            values: ar
        }
    ],
    AuthenticationStatus:{
        isLoggedIn: null,
        JWT_TOKEN: null
    },
    CurrentUserDetails:{
        id:null,
        fName:null,
        lName:null,
        email: null,
        username:null,
        picture:null
    },
    Messaging:{
        ChatItem:{
            lastMessageId:null,
            contact:null,
            contact_fName: null,
            contact_lName: null,
            isSender: null,
            hasUnread: null,
            unreadCount: null,
            picture: null,
            isMuted: null,
            isBlocked: null,
            timeAgo: null
        },
        MessageItem:{
            id: null,
            contact:null,
            isSender: null,
            timeAgo: null,
            content: null,
            totalReacts: null,
            reacts:[{
                reactor:null,
                react_type:null,
                time: null
                }
            ]
        }
    }
}
export default objects