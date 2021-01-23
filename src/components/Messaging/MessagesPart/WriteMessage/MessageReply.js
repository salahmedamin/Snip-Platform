import store from '../../../../redux-data/store'
import Reply from "../../../SVG/Messages/reply"
export default (props)=>{

    return(
        <div className="w-100 p-3 position-absolute d-flex justify-content-start align-items-center" style={{backgroundColor:"rgb(255,255,255,.2)",color:"white",bottom:"100%",left:0}}>
                    
        <Reply /> 

        <div style={{width:"auto",maxWidth:"50%",display:"inline-block",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis",marginLeft:15}}>
            {props.content}
        </div>

        <div style={{display:"inline-block",marginLeft:15,marginBottom:4,borderRadius:"50%",width:4,height:4,backgroundColor:"white"}}/>

        <div className="px-2 py-1 rounded-sm btn btn-outline-danger" style={{display:"inline-block",marginLeft:15}}
        onClick={()=>store.dispatch({type:"SET_MESSAGING_REPLY_DATA",payload:{isReplying:false}})}
        >
            Cancel
        </div>
    </div>
    )
}