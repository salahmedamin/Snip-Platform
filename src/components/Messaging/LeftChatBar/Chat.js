import React from "react"
import {Link} from "react-router-dom"
import store from "../../../redux-data/store"
import ChatOption from "./ChatOption"

class Chat extends React.PureComponent{
    state = {
        showOption: false
    }
    chatRef = React.createRef()
    zerofyChats = ()=>{
        this.props.setSearchVal("")
        store.dispatch({type:"SET_CHAT_SEARCH",payload:{chats:[]}})
    }
    render = ()=>(
            <Link 
            to={
                !this.props.isSelected ? 
                ("/messages/"+(this.props.isGroup ? "groups/"+this.props.id:this.props.contact))
                :
                "/messages"
            } 
            className={(this.props.isSelected ? "selectedChat " : this.props.unreadCount > 0 && (this.props.isGroup ? this.props.lastMessage.sender !== this.props.username : true) ? "unreadChat " : "regularChat ")+"position-relative py-2 px-2 d-flex justify-content-center align-items-center rounded mb-1 chat"}
            style={{cursor:"pointer",position:"relative",textDecoration:"none",fontSize:"12px",fontFamily:"Inter,sans-serif",width:"95%"}}
            ref={this.chatRef}
            onClick={(e)=>
                e.target.classList.contains("chatContainer") || e.target.tagName == "svg" || e.target.tagName == "circle" ?
                    e.preventDefault()
                :
                    (this.props.isSearch ? this.zerofyChats() : null)
            }
            onMouseMove={(e)=>
                this.setState(prevState=>({
                    ...prevState,
                    showOption: this.chatRef.current.contains(e.target)
                    })
                )
            }
            onMouseLeave={
                (e)=>
                this.setState(prevState=>({
                    ...prevState,
                    showOption: false
                    })
                )
            }
            >
                {
                    this.state.showOption ?
                    <ChatOption />
                    :
                    null
                }
                {this.props.isGroup ? <div className="position-absolute" style={{top:5,right:12,fontSize:"8.75px"}}>Group created by {this.props.creator}</div> : ''}
                <div className={"userPicture rounded-circle"+(!this.props.profilePic ? " border":"")} style={{width:50,height:50,minHeight:50,minWidth:50,overflow:"hidden"}}>
                    <img src={!this.props.profilePic ? "/img/messages/default_pic.svg":this.props.profilePic} alt="" className="w-100 h-100"/>
                </div>
                <div className={"message w-75 p-2 d-flex flex-column"}>
                    <div className={"sender w-100"}>
                        {this.props.isGroup ? this.props.groupName : this.props.contact}
                    </div>
                    <div className={"content w-100"}>
                        {this.props.isSender ? "You: ": !this.props.isSender && this.props.isGroup ? this.props.lastMessage.sender+":" : ''} {this.props.lastMessage.content.length > 15 ? this.props.lastMessage.content.substr(0,15)+"..." : this.props.lastMessage.content}
                    </div>
                </div>
                <div className={"timeandoptions d-flex flex-column w-25"}>
                    <div style={{fontSize:"9px",textAlign:"center"}}>
                        {this.props.lastMessage.sent_at}
                    </div>
                </div>
            </Link>
    )
}
export default Chat