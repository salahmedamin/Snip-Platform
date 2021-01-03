import objects from "./strcuts";
import en from "../../langs/en"

const initial = {
    showLangsBar:false,
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
        chatList:[objects.Messaging.ChatItem],
        messagesList:[objects.Messaging.MessageItem]
    }
}
export default initial