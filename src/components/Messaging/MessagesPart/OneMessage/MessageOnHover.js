import More from "../../../SVG/Messages/MessageOptions/threedots"
import Emoji from "../../../SVG/Messages/MessageOptions/emoji"
import Reply from "../../../SVG/Messages/MessageOptions/reply"
import Viewers from "../../../SVG/Messages/MessageOptions/viewers"
import MessageOnHoverPopUp from "./MessagePopUp"
import ReactLowerSticker from "./Reacts/ReactLowerSticker"

import store from "../../../../redux-data/store"
import {useState} from "react"
import Axios from "axios"
import {connect} from "react-redux"
const MessageOnHover = (props)=>{
    const 
    isGroup = props.groupID !==-1,
    [stick, setStick] = useState(false),
    [optionType, setOptionType] = useState(null),
    retrieveViewers = async ()=>{
        store.dispatch({
            type:"SHOW_SCREEN_POP_UP",
        })

        store.dispatch({
            type:"SET_SCREEN_POP_UP_LOADING",
            payload:{
                title:"People who saw this",
                width:{
                    xs: 8,
                    sm: 6,
                    md:5,
                    lg: 3
                },
            }
        })

        Axios.post(process.env.REACT_APP_ENDPOINT+"/getUsersDetails",{
            users:props.viewers.map(z=>z.viewer),
            token:props.token
        })
        .then(resp=>{
            //show screen popup
            store.dispatch({
                type:"SET_SCREEN_POP_UP_DONE_LOADING"
            })

            //add data to screen popup
            store.dispatch({
                type:"SET_SCREEN_POP_UP_DATA",
                payload:{
                    rows: [
                            {
                            name:"picture",
                            isImage:true,
                            onNullValue: "/img/messages/default_pic.svg"
                            },
                            {
                                name:"fullName"
                            },
                            {
                                name: "time",
                                isTimestamp: true
                            }
                        ],
                    colStyling: [
                        {
                        width:"30px",
                        height:"30px",
                        borderRadius: "50%",
                        },
                        {
                            width:"auto",
                            fontSize:"13px"
                        },
                        {
                            width: "auto",
                            fontSize:"13px"
                        }
                    ],
                    data: resp.data.map(
                        d=>(
                            {
                                ...d,
                                time: props.viewers.find(user=>user.viewer===d.username)
                            }
                        )
                    ),
                }
            })
        })
    }
    return(
        <>
        {
            props.reacts && props.reacts.length > 0 ?
                <ReactLowerSticker token={props.token} reacts={props.reacts} total={props.totalReacts} isGroup={isGroup} isSender={props.isSender}/>
            :
            null
        }
        <div 
            style={{
                position:"absolute",
                left: 
                props.isSender ?
                    (
                        isGroup ? (
                            props.viewers && props.reacts ? "185%" //is in group, has both
                            :
                            props.viewers && !props.reacts ? "100%"//is in group has only viewers
                            :
                            !props.viewers && props.reacts ? "120%" //is in group, has only reacts
                            : //doesnt have any
                            "100%"
                        )
                        : 
                        !isGroup ? (
                            props.reacts ? "150%"
                            :
                            "100%"
                        )
                        :
                        null
                    )
                    :
                    null,
                right: 
                    !props.isSender ?
                    (
                        isGroup ? (
                            props.viewers && props.reacts ? "185%" //is in group, has both
                            :
                            props.viewers && !props.reacts ? "100%"//is in group has only viewers
                            :
                            !props.viewers && props.reacts ? "120%" //is in group, has only reacts
                            : //doesnt have any
                            "100%"
                        )
                        : 
                        !isGroup ? (
                            props.reacts ? "150%"
                            :
                            "100%"
                        )
                        :
                        null
                    )
                    :
                    null,
                bottom:"0",color:"white",
                height:"100%",
                width:"100px",
            }}
            className={(props.isSender ? "ml-2 " : isGroup && props.viewers ? "mr-2 " : "minus-mr-2 ") + (stick ? "stick " : '')+ "justify-content-center align-items-center showOnHover"}
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
                    isGroup && props.viewers ?
                        <div 
                        className="messages_options"
                        onClick={()=>
                            retrieveViewers()
                        }
                        >
                            <Viewers
                            width="18"
                            height="18"
                            />
                        </div>
                    :
                        null
                }
                {
                    props.isSender ?
                    <div className="messages_options"
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
                <MessageOnHoverPopUp
                type={optionType}
                isSender={props.isSender}
                setStick={setStick}
                currentUserReaction={
                    props.reacts && props.reacts.find(react=>react.reactor == props.username).react_type
                }
                />
                :
                null
                }
        </div>
    </>
)}
const getCurrentUsername = state=>({username:state.CurrentUserDetails.username})
export default connect(getCurrentUsername)(MessageOnHover)