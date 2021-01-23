import Chat from "./Chat"
import {connect} from "react-redux"
const Container = (props)=>
            <div style={{overflowY:"scroll",height:"95%",top:55,paddingBottom:60,right:"-17px"}} className="d-flex flex-column w-100 mt-4 align-items-center position-absolute">
                {
                    props.chatList.length > 0 && props.searchVal.length == 0 && props.chatList.map((chat,idx)=>
                    <Chat 
                        key={idx} 
                        isGroup={chat.groupID !== -1} 
                        isSender={chat.lastMessage.sender == props.username}
                        username={props.username}
                        isSelected={props.currentID !== undefined ? (props.isGroup ? props.currentID == chat.id : props.currentID == chat.contact) : false} 
                        {...chat} 
                    />
                    )
                }
                {
                    props.chatSearchList.length>0 && props.searchVal.length>0 && props.chatSearchList.map((chat,index)=> 
                        <Chat key={index} isSender={chat.lastMessage.sender == props.username} username={props.username} isSearch={true} {...chat} setSearchVal={props.setSearchVal}/>
                    )
                }
                {
                    props.searchVal.length > 0 && props.chatSearchList.length == 0 ?
                        <span style={{color:"white"}}>No results match your search</span>
                    :
                    ''
                }
            </div>

const getSelected = state=>({
    isGroup: state.Messaging.currentChat.isGroup,
    currentID: state.Messaging.currentChat.id
})
export default connect(getSelected)(Container)