import React from "react"
import Threedots from "../../SVG/Messages/threedots"
import {Link} from "react-router-dom"
import store from "../../../redux-data/store"

class ChatOption extends React.PureComponent{
    constructor(props){
        super()
    }
    render(){
        return(<div
        style={{
            left:"65%",
            animation:".5s opacThenShow forwards",
            transform:"rotate(90deg)",
            boxShadow:"0px 0px 10px 1px black",
            height:25,
            width:25,
            zIndex:2,
        }}
        className="bg-dark rounded-circle position-absolute d-flex justify-content-center align-items-center chatOption"   
            >
            <Threedots />
        </div>)
    }
}
export default ChatOption