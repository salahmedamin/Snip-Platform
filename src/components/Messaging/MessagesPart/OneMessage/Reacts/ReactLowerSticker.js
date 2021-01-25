import Dots from "../../../../SVG/Messages/MessageOptions/threedots"
import emoji from "react-easy-emoji"
import store from "../../../../../redux-data/store"
import Axios from "axios"
const ReactLowerSticker = (props)=>{
    const emojis = ["❤","😂","👍","🥺","😢","🤢"],
    screenPopUpReacts = async()=>{
        store.dispatch({
            type:"SHOW_SCREEN_POP_UP",
        })

        store.dispatch({
            type:"SET_SCREEN_POP_UP_LOADING",
            payload:{
                title:"Reactions on this message",
                width:{
                    xs: 11,
                    sm: 8,
                    md:6,
                    lg: 4
                },
            }
        })

        //
        Axios.post(process.env.REACT_APP_ENDPOINT+"/getUsersDetails",{
            users:props.reacts.map(z=>z.reactor),
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
                                name:"react_type",
                                isEmoji:true
                            }
                        ],
                    colStyling: [
                        {
                        width:"35px",
                        height:"35px",
                        borderRadius: "50%",
                        },
                        {
                            width:"auto",
                            fontSize:"15px"
                        },
                        {
                            width: "auto",
                            fontSize:"16px"
                        }
                    ],
                    data: resp.data.map(
                        d=>(
                            {
                                ...d,
                                react_type: props.reacts.find(react=>react.reactor===d.username).react_type
                            }
                        )
                    ),
                }
            })
        })

    }
    return(
        <div
        className="position-absolute d-flex rounded-sm border border-dark px-1"
        style={{
            right:!props.isSender ? "105%" : null,
            left: props.isSender ? "105%" : null,
            bottom:0,
            height:"100%",
            cursor:"pointer",
            transition:".5s ease all",
            zIndex:"5"
        }}

        >
            <span
            className="d-flex justify-content-center align-items-center"
            onClick={()=>screenPopUpReacts()}
            >
                {
                    props.isGroup?
                    <>
                        {
                            props.total > 1 ?
                            <span style={{width:20,height:20,transform:"rotate(90deg)"}}>
                                <Dots />
                            </span>
                            :
                            null
                        }
                        <span>{emoji(emojis[props.reacts[0].react_type])}</span>
                    </>
                    :
                    props.reacts.map((react,i)=>(
                        <span key={i}>
                            {emoji(emojis[react.react_type])}
                        </span>
                    ))
                }
            </span>
        </div>
    )
}
export default ReactLowerSticker