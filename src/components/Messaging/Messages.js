import {connect} from "react-redux"
import store from "../../redux-data/store"
import OneMessage from "./OneMessage"
const Messages = (props)=>{


    const checkScrollForNew = ()=>{
        const container = document.querySelector("#messagesParent")
        if(container.scrollHeight == container.offsetHeight - container.scrollTop){
            if(props.messages.messagesCount >= (props._messages.messagesIndex * 20)+20){
                store.dispatch({type:"INCREMENT_MESSAGES_INDEX",payload:{zerofy:false}})
            }
        } 
    }


    return (
        <>
            <div
            className="d-flex flex-column-reverse w-100 "
            style={{height:"calc( 100% - 45px )",overflowY:"scroll"}}
            onScroll={()=>checkScrollForNew()}
            id="messagesParent"
            >
                {
                    props.messages.data.map((msg,idx)=><OneMessage key={idx} {...msg} isSender={props.username == msg.sender} isGroup={props._messages.isGroup}/>)
                }
            </div>
        </>
    );
}
const getMessagesDetails = state=>(
    {
        messages:state.Messaging.messagesList,
        username:state.CurrentUserDetails.username,
        _messages: state.Messaging.currentChat
    }
)
export default connect(getMessagesDetails)(Messages)