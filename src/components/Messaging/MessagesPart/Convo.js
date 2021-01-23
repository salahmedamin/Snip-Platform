import {Row} from "react-bootstrap"
import Compose from "./WriteMessage/Compose"
import Messages from "./Messages"
import GoBack from "./GoBack"
import Loader from "../../_Loader/Loader"
import {connect} from "react-redux"
const Convo = (props)=>{

    return(
        <>
        <Row className={"h-100 pb-4 pt-0 px-0 mx-0 col-sm-7 col-lg-12 position-relative convoResponsive"}>
            {
                props.isLoading ? <Loader /> : null
            }
            <Messages />
            <Compose />
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