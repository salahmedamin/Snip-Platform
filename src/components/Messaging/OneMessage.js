import Reply from "../../components/SVG/Messages/reply"
import Emoji from "../../components/SVG/Messages/emoji"
import More from "../../components/SVG/Messages/threedots"
import {useRef} from "react"
export default (props)=>{
    let ref = useRef()
    return (
        <>
            <div className={(props.isSender ? "sender" : "receiver")+" p-3 d-flex msgContentParent position-relative"}>
                {
                    props.isGroup && !props.isSender ? <div style={{position:"absolute",top:0,right:16,zIndex:2,color:"white",fontSize:"10px"}}>{props.sender}</div> : null
                }
                {
                    props.replyToMsgID !== -1 ? 
                    <div
                    ref={ref}
                    onMouseOver={()=>ref.current.style.zIndex=4}
                    onMouseOut={()=>ref.current.style.zIndex=-1}
                    style={{position:"absolute",left:15,top:0,backgroundColor:"rgb(0,0,0,.7)",color:"white",width:"auto",height:"auto",maxWidth:"40%",padding:5}}>
                       {props.replyDetails.content}
                    </div>
                    :
                    null
                }
                <span className="content p-2 rounded-lg" style={{wordBreak:"break-all",width:"auto",maxWidth:"50%",position:"relative",marginTop: ref.current !== undefined ? ref.current.offsetHeight-18+"px" : 0}}>
                    
                    <div 
                    style={{position:"absolute",left: props.isSender ?"100%" : null,right: !props.isSender ? "100%" : null,bottom:"0",color:"white",height:"100%",width:"100px"}}
                    className={(props.isSender ? "ml-2" : "mr-2") + " justify-content-center align-items-center showOnHover"}
                    >
                        <div className="messages_options">
                            <Emoji />
                        </div>
                        <div className="messages_options">
                            <Reply />
                        </div>
                        <div className="messages_options">
                            <More />
                        </div>
                    </div>
                    {props.content}
                </span>
            </div>
        </>
    )
}