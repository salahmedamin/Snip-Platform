import {connect} from "react-redux"
import store from "../../../redux-data/store"
import OneMessage from "./OneMessage/OneMessage"
const Messages = (props)=>{


    const checkScrollForNew = ()=>{
        const container = document.querySelector("#messagesParent")
        if(container.scrollHeight == container.offsetHeight - container.scrollTop){
            if(props.messages.messagesCount >= (props._messages.messagesIndex * 20)+20 && props._messages.messagesIndex !== -1){
                store.dispatch({type:"INCREMENT_MESSAGES_INDEX",payload:{zerofy:false}})
            }
        } 
    }


    return (
        <>
            <div
            className="d-flex flex-column-reverse w-100 position-relative"
            style={{height:props.canChat ? "calc( 100% - 45px )" : "100%",overflowY:"scroll"}}
            onScroll={()=>checkScrollForNew()}
            id="messagesParent"
            >
                {
                    props.isReplying ? 
                    <div style={{marginTop:55}}/>
                    :
                    null
                }
                {
                    props.messages.data.map((msg,idx)=><OneMessage key={idx} canChat={props.canChat} isSender={props.username == msg.sender} isGroup={props._messages.isGroup} token={msg.viewers ? props.token : null} {...msg}/>)
                }
            </div>
        </>
    );
}
const getMessagesDetails = state=>(
    {
        messages:state.Messaging.messagesList,
        username:state.CurrentUserDetails.username,
        _messages: state.Messaging.currentChat,
        isReplying: state.Messaging.currentChat.isReplying,
        token:state.AuthenticationStatus.JWT_TOKEN
    }
)
export default connect(getMessagesDetails)(Messages)