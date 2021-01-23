import {connect} from "react-redux"
import store from "../../../../redux-data/store"
import MessageReply from "./MessageReply"
import Emoji from "../../../SVG/Messages/emoji"
import Picker from 'emoji-picker-react';
import {useState,useRef} from "react"
import Axios from "axios";
const Compose =  (props)=>{
    const [showPicker, setShowPicker] = useState(false)
    const sendMessage = ()=>{
        const data = {
        content: ref2.current.value,
        isGroup: props.isGroup,
        sender: props.username,
        receiver: props.contact,
        replyToID: props.replyTo.id,
        isHint: false,
        token: props.token
        }
        Axios.post(process.env.REACT_APP_ENDPOINT+"/messages/sendSingleMessage",data)
        .then(v=>{
            const msg = v.data
            store.dispatch({type:"UserSentSingleMessage",payload:{
                msg,
                isGroup: msg.groupID !== -1,
                contact: props.contact
            }})
            ref2.current.value = ""
        })
    }
    let ref1 = useRef(),ref2 = useRef()
    return(
    <>
        <div className="w-100 d-flex align-items-center position-absolute pl-3" style={{height:"auto",minHeight:"70px",bottom:"0",borderTop:"1px solid #293145"}}>
            {
                props.isReplying ?
                <MessageReply content={props.replyTo.content} />
                :
                null
            }
            <input ref={ref2} type="text" placeholder="Write a message" className="py-2 pl-3 bg-transparent col-9 col-md-10 col-lg-8 rounded-lg" style={{outline:"none",color:"white",border:"1px solid #293145"}}/>
            
            <div 
            className="d-flex justify-content-center align-items-center p-1"
            onClick={()=>setShowPicker(!showPicker)} 
            ref={ref1}
            style={{marginLeft:"15px",marginRight:"-25px",cursor:"pointer",zIndex:4,transition:".5s ease all",borderRadius:"50%"}}
            onMouseOver={()=>ref1.current.style.backgroundColor="rgb(0,0,0,.4)"}
            onMouseOut={()=>ref1.current.style.backgroundColor=""}
            >
                <Emoji height="25px" width="25px"/>
            </div>

            <div className="h-100 p-0 d-flex justify-content-center align-items-center col-3 col-md-2 col-lg-1" style={{width:45}}>
                <div 
                className="sendBtn rounded-circle" 
                style={{backgroundImage:"url(/img/messages/send.svg)"}}
                onClick={()=>sendMessage()}
                />
            </div>
        </div>
    </>
)
}
const getStats = state=>({
    isReplying: state.Messaging.currentChat.isReplying,
    replyTo: state.Messaging.currentChat.replyTo,
    username: state.CurrentUserDetails.username,
    isGroup: state.Messaging.currentChat.isGroup,
    contact:state.Messaging.messagesList.contact,
    token: state.AuthenticationStatus.JWT_TOKEN,
})
export default connect(getStats)(Compose)