import emoji from 'react-easy-emoji'
import {useEffect} from "react"
const MessageOnHoverPopUp =  (props)=>{
    const emojis = ["❤","😂","👍","🥺","😢","🤢"]
    useEffect(() => {
        const closeIt = ()=>{
            props.setStick(false)
        }
        window.addEventListener("click",closeIt)
        return () => {
            window.removeEventListener("click",closeIt)
        }
    }, [])
    return(
        <>
            <div 
            className="d-flex flex-row justify-content-center align-items-center position-absolute bg-dark rounded-lg" 
            style={{overflow:"hidden",bottom:"83%",left:props.isSender ? (props.type == "emojis" ?  "-20%" : "79%"): null,right:!props.isSender ? ( props.type == "emojis" ? "10%":"calc( 100% + 8px )"):null,height:"auto",width:"auto",minWidth:"100px",maxWidth:"200px",whiteSpace:"nowrap",cursor:"pointer",animation:".5s opacThenShow forwards",zIndex:10}}
            >
                {
                    props.type == "threedots" ?
                    <>
                        <div style={{fontSize:"11px",textAlign:"center",padding:5,width:"60%",borderRight:"1px solid white"}}>Edit</div>
                        <div style={{fontSize:"11px",textAlign:"center",padding:5,width:"60%"}}>Delete</div>
                    </>
                :
                props.type == "emojis" ? 
                <>
                    {emojis.map((emo,i)=>{
                        return <div 
                        key={i}
                        className={"_emoji_"+(props.currentUserReaction && props.currentUserReaction == i ? " selected" : '')}
                        //onClick={()=>{}}
                        >
                            {emoji(emo)}
                        </div>
                    })}
                </>
                :
                null
                }
            </div>
        </>
    )
}
export default MessageOnHoverPopUp