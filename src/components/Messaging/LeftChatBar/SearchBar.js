export default (props)=>{
    const {searchVal,setSearchVal} = props
    return(
        <div className={"d-flex flex-row w-100 text-left p-1 pl-4 mt-2 mb-4 position-relative"} style={{borderBottom:"1px solid #293145",height:"45px"}}>
            <input type="text" value={searchVal} onChange={(e)=>setSearchVal(e.target.value)} placeholder="Search your messages" style={{paddingLeft: "28px",outline:"none",width:"85%",border:"1px solid #293145",background:"url(/img/messages/searchScope.svg) no-repeat 2% center",backgroundSize:"20px 20px"}} className="bg-transparent rounded text-light pr-3 mr-1"/>
            <div className="addNewChatParent d-flex justify-content-center align-items-center ml-1 mr-1 border border-primary rounded" style={{cursor:"pointer"}}>
                <span>
                    <img id="addNewChat" src="/img/messages/new.svg" alt="new" width="30" height="30"/>
                </span>
            </div>
            <div className="addNewChatParent d-flex justify-content-center align-items-center ml-1 mr-1 border border-primary rounded" style={{cursor:"pointer",textDecoration:"none"}}>
                <span>
                    <img id="addNewChat" src="/img/messages/groupChat.svg" alt="new" width="30" height="30"/>
                </span>
            </div>
        </div>
    )
}