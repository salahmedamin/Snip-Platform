import {Row,Container} from "react-bootstrap"
import SearchBar from "./LeftChatBar/SearchBar";
import Convo from "./MessagesPart/Convo"
import ChatContainer from "./LeftChatBar/ChatContainer"
import {useState,useEffect} from "react"
import Axios from "axios"
import {connect} from "react-redux"
import store from "../../redux-data/store"
import {useLocation} from "react-router-dom"

const Main = (props)=>{
    const history = useLocation(),
    [searchVal, setSearchVal] = useState('')



    //when scrolling chats
    useEffect(() => {
        if(props.username !== null){
            Axios.post("http://localhost:2500/messages/loadChats",
            {
                user:props.username,
                index:props.currentChatListState.chatsIndex,
                token: props.token
            }
            ).then(v=>{
                store.dispatch({type:"SET_CHAT_LIST",payload:{chats:v.data}})
            })
        }
    }, [props.currentChatListState.chatIndex])




    //when changing chat tab
    useEffect(() => {
        store.dispatch(
            {type:"SET_CURRENT_CHAT",
            payload:{
                isGroup: props.match.params.groupID !== undefined,
                id:(props.match.params.groupID||props.match.params.user)
            }
        })

        if(props.match.params.user||props.match.params.groupID){
            store.dispatch({type:"INCREMENT_MESSAGES_INDEX",payload:{zerofy:true}})
            //get all messages in index 0, WOULDNT RUN ANY OTHER PROCESS ^^
            Axios.post("http://localhost:2500/messages/paginate",
            {
                username:props.username,
                other:props.match.params.user||props.match.params.groupID,
                index:0,
                isGroup: history.pathname.startsWith("/messages/groups/"),
                token:props.token
            }).then(v=>{
                store.dispatch({type:"SET_MESSAGES_LIST",payload:{messages:v.data,add:false}})
                store.dispatch({type:"SET_MESSAGES_LOADING",payload:{loading:false}})
            })
        }



        // check if this chat has unread count > 0
        
        const isGroupOfUnread = history.pathname.startsWith("/messages/groups/")
        let currentChat = props.chatList.find(v=> !isGroupOfUnread ? Object.keys(props.match.params).length>0 && v.contact == props.match.params.user : parseInt(v.id) == parseInt(props.match.params.groupID))
        if(currentChat && currentChat.unreadCount >0 && (isGroupOfUnread ? currentChat.lastMessage.sender !== props.username : true)){

            Axios.post("http://localhost:2500/messages/readFullConvo",{
                user: props.username,
                other:props.match.params.groupID || props.match.params.user,
                isGroup: isGroupOfUnread,
                token: props.token
            })
            .then(v=>{
                if(v.data && v.data.length !== 0){
                    store.dispatch({
                        type:"SET_CONVO_READ",
                        payload:{
                            other:props.match.params.user || props.match.params.groupID,
                            isGroup: isGroupOfUnread,
                        }
                    })
                }
            })


        }


        return () => {
            store.dispatch(
                {type:"SET_CURRENT_CHAT",
                payload:{
                    isGroup: null,
                    id:null
                }
            })
            store.dispatch({type:"SET_MESSAGES_LIST",payload:{messages:{data:[]},add:false}})
        }
    }, [props.match.params.user,props.match.params.groupID,props.username])



    //on scroll for new messages in messagesList
    useEffect(() => {
        if(props.currentMessagesListStats.messagesIndex == 0) return;
        //activate our loader spinner
        store.dispatch({type:"SET_MESSAGES_LOADING",payload:{loading:true}})
        Axios.post("http://localhost:2500/messages/paginate",
            {
                username:props.username,
                other:props.currentMessagesListStats.id,
                index:props.currentMessagesListStats.messagesIndex,
                isGroup: history.pathname.startsWith("/messages/groups/"),
                token:props.token
            }).then(v=>{
                if(v.data.length == 0) return;
                store.dispatch({type:"SET_MESSAGES_LIST",payload:{messages:v.data,add:true}})
                //desactivate our loader
                store.dispatch({type:"SET_MESSAGES_LOADING",payload:{loading:false}})
            })
    }, [props.currentMessagesListStats.messagesIndex])



    //searching in chat search
    useEffect(() => {
        if(searchVal.length > 0){
            Axios.post("http://localhost:2500/messages/searchChats",
            {
                user:props.username,
                keyword:searchVal,
                token:props.token
            }).then(v=>v.data.length> 0 ? 
                store.dispatch({type:"SET_CHAT_SEARCH",payload:{chats:v.data}})
                :
                null
                )
        }
        else{
            store.dispatch({type:"SET_CHAT_SEARCH",payload:{chats:[]}})
        }
    }, [searchVal])


    return(
    <Container fluid className="d-block d-sm-flex h-100 px-0 mx-0" style={{paddingTop:57,background:"#1a2236"}}>
        <Row className="position-relative h-100 col-12 col-sm-5 col-lg-3 p-0 mx-0" style={{borderRight:"1px solid #293145",overflow:"hidden"}}>
            <SearchBar searchVal={searchVal} setSearchVal={setSearchVal} style={{height:"5%"}} />

            <ChatContainer
            chatSearchList={props.chatSearchList}
            chatList={props.chatList}
            searchVal={searchVal}
            setSearchVal={setSearchVal}
            username={props.username}
            />

        </Row>
        {
            props.messagesLength > 0 ?
            <Convo show={props.match.params.user && window.innerWidth <= 576}/>
            :
            null
        }
    </Container>
    )
}

const getUserSessionDetails = state =>
(
    {
        username:state.CurrentUserDetails.username,
        chatList: state.Messaging.chatList,
        chatSearchList: state.Messaging.chatSearchList,
        messagesLength: state.Messaging.messagesList.data ? state.Messaging.messagesList.data.length : 0,
        currentChatListState: state.Messaging.currentChatListState,
        currentMessagesListStats: state.Messaging.currentChat,
        token:state.AuthenticationStatus.JWT_TOKEN,
        contact: state.Messaging.messagesList.contact,
    }
)
export default connect(getUserSessionDetails)(Main)