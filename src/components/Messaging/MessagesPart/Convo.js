import {Row} from "react-bootstrap"
import Compose from "./WriteMessage/Compose"
import Messages from "./Messages"
import GoBack from "./GoBack"
import Loader from "../../_Loader/Loader"
import {connect} from "react-redux"
import store from "../../../redux-data/store"
import {useEffect} from "react"
const Convo = (props)=>{
    useEffect(() => {
        if(!props.canChat)
        store.dispatch({
            type:"ADD_NOTIFICATION",
            payload:{
                notification:{
                    type:"error",
                    content:"Can't send or receive messages from this person for now, maybe blocked ?",
                    //add specific details like person name, group name,...
                    slideFrom:"right",
                    related:"messages",
                    id:Date.now()
                }
            }
        })
    }, [])
    return(
        <>
        <Row className={"h-100 pb-4 pt-0 px-0 mx-0 col-sm-7 col-lg-12 position-relative convoResponsive"}>
            {
                props.isLoading ? <Loader /> : null
            }
            <Messages canChat={props.canChat}/>
            {
                props.canChat ?
                <Compose/>
                :
                null
            }
            <GoBack />
        </Row>
        </>
    );
}
const getLoadState = state=>(
    {
        isLoading:state.Messaging.currentChat.isLoading,
    }
)
export default connect(getLoadState)(Convo)