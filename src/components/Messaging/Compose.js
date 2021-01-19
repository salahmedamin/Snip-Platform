import {store} from "../../redux-data/store"
export default ()=>{
    
    return(
    <>
        <div className="w-100 d-flex align-items-center position-absolute pl-3" style={{height:"70px",bottom:"0",borderTop:"1px solid #293145"}}>
            <input type="text" placeholder="Write a message" className="py-2 pl-3 bg-transparent col-9 col-md-10 col-lg-8 rounded-lg" style={{outline:"none",color:"white",border:"1px solid #293145"}}/>
            <div className="h-100 p-0 d-flex justify-content-center align-items-center col-3 col-md-2 col-lg-1">
                <div className="sendBtn rounded-circle" style={{backgroundImage:"url(/img/messages/send.svg)"}}></div>
            </div>
        </div>
    </>
)
}
