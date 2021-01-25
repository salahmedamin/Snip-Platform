import {useRef} from "react"
export default props=>{
    const ref = useRef()
    return(
        <div
        ref={ref}
        onMouseOver={()=>ref.current.style.zIndex=4}
        onMouseOut={()=>ref.current.style.zIndex=-1}
        style={{position:"absolute",left:props.isSender ? 15 : null,right: props.isSender ? null : 15,top:0,backgroundColor:"rgb(0,0,0,.7)",color:"white",width:"auto",height:"auto",maxWidth:"30%",padding:5,whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden"}}>
            {props.content}
        </div>
    )
}