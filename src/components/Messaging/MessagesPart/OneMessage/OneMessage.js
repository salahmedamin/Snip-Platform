import {useRef} from "react"
import MessageOnHover from "./MessageOnHover"
import MessageReply from "./Reply/MessageReply"
import InGroupMesageSender from "./GroupMessage/InGroupMessageSender"
import GroupMessageViewersBadge from "./GroupMessage/GroupMessageViewersBadge"
const Message = (props)=>{
    let ref = useRef()
    return (
        <>
            <div className={(props.isSender ? "sender" : "receiver")+" p-3 d-flex msgContentParent position-relative"}>
                {
                    props.isGroup && !props.isSender ? 
                    <InGroupMesageSender sender={props.sender} />
                    :
                    null
                }
                {
                    props.replyToMsgID !== -1 ? 
                    <MessageReply isSender={props.isSender} content={props.replyDetails.content} />
                    :
                    null
                }
                <span className="content p-2 rounded-lg" style={{wordBreak:"break-all",width:"auto",maxWidth:"50%",position:"relative",marginTop: (ref.current !== undefined && ref.current !== null) ? ref.current.offsetHeight-18+"px" : 0}}>
                    {
                        props.canChat ?
                        <MessageOnHover reacts={props.reacts} totalReacts={props.totalReacts} isSender={props.isSender} id={props.id} token={props.token} content={props.content} groupID={props.groupID} viewers={props.viewers} />
                        :
                        null
                    }
                    {props.content}
                </span>
                {
                    props.viewers ?
                    <GroupMessageViewersBadge viewersCount={props.viewers.length} isSender={props.isSender} />
                    :
                    null
                }
            </div>
        </>
    )
}
export default Message