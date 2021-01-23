import Reply from "../../../SVG/Messages/reply"
import Emoji from "../../../SVG/Messages/emoji"
import More from "../../../SVG/Messages/threedots"
import MessageOptions from "./MessageOptions"
import {useRef,useState} from "react"
import store from "../../../../redux-data/store"
export default (props)=>{
    let ref = useRef()
    const 
    [stick, setStick] = useState(false),
    [optionType, setOptionType] = useState(null)
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
                    style={{position:"absolute",left:props.isSender ? 15 : null,right: props.isSender ? null : 15,top:0,backgroundColor:"rgb(0,0,0,.7)",color:"white",width:"auto",height:"auto",maxWidth:"30%",padding:5,whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden"}}>
                       {props.replyDetails.content}
                    </div>
                    :
                    null
                }
                <span className="content p-2 rounded-lg" style={{wordBreak:"break-all",width:"auto",maxWidth:"50%",position:"relative",marginTop: (ref.current !== undefined && ref.current !== null) ? ref.current.offsetHeight-18+"px" : 0}}>
                    
                    <div 
                    style={{position:"absolute",left: props.isSender ?"100%" : null,right: !props.isSender ? "100%" : null,bottom:"0",color:"white",height:"100%",width:"100px"}}
                    className={(props.isSender ? "ml-2 " : "mr-2 ") + (stick ? "stick " : '')+ "justify-content-center align-items-center showOnHover"}
                    >
                        <div className="messages_options"
                        onClick={()=>{
                            setStick(true)
                            setOptionType("emojis")
                        }}
                        >
                            <Emoji />
                        </div>
                        <div className="messages_options"
                        onClick={()=>
                            store.dispatch({
                                type:"SET_MESSAGING_REPLY_DATA",
                                payload:{
                                    isReplying:true,
                                    replyID: props.id,
                                    replyContent: props.content
                                }
                            })
                        }
                        >
                            <Reply />
                        </div>
                        {
                            props.isSender ?
                            <div className="messages_options position-relative"
                            onClick={()=>{
                                setStick(true)
                                setOptionType("threedots")
                                }
                            }
                            >
                                <More />
                            </div>
                            :
                            null
                        }
                        {
                            stick ?
                        <MessageOptions type={optionType} isSender={props.isSender} setStick={setStick}/>
                        :
                        null
                        }
                    </div>
                    {props.content}
                </span>
            </div>
        </>
    )
}