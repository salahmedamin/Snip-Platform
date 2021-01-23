import emoji from 'react-easy-emoji'
import {useEffect} from "react"
export default (props)=>{
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
            style={{bottom:props.type == "threedots" ? "6px" : 0,left:props.isSender ? "100%" : null,right:!props.isSender ? "100%" : null,height:"auto",width:"auto",minWidth:"100px",maxWidth:"200px",whiteSpace:"nowrap",cursor:"pointer",animation:".5s opacThenShow forwards"}}
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
                        className="_emoji_"
                        style={{transition:".5s ease all",fontSize:"17px",textAlign:"center",padding:5,width:"20%"}}
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