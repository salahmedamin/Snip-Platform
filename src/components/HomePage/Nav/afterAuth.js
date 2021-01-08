import {Link} from "react-router-dom"
import "../../../index.css"
export default (props)=>{
    const {showNavOptions,setShowNavOptions} = props
    return(
    <>
        <Link to="/messages" className="position-relative mr-3 btn btn-outline-dark d-flex align-items-center justify-content-center rounded-circle border-0 hasNew" style={{width:45,height:45}}>
            <span></span>
            <img src="/img/navbar/afterAuth/messages.svg" width="27" height="27" alt=""/>
        </Link>
        <Link to="/notifications" className="mr-3 btn btn-outline-dark d-flex align-items-center justify-content-center rounded-circle border-0" style={{width:45,height:45}}>
            <img src="/img/navbar/afterAuth/notification.svg" width="27" height="27" alt=""/>
        </Link>
        <span className="position-relative mr-3 btn btn-outline-dark d-flex align-items-center justify-content-center rounded-circle border-0" style={{width:30,height:30}} onClick={()=>setShowNavOptions(!showNavOptions)}>
            <img src="/img/navbar/afterAuth/arrow_down.svg" style={{transition:".5s ease all",transform:showNavOptions?"rotate(180deg)":"rotate(0deg)"}} width="10" height="10" alt=""/>
        </span>
        <div class="position-absolute p-1 border border-dark bg-dark" style={{top:"85%",right:-15,width:170,display:showNavOptions?"block":"none"}}>
            <Link to="/me" className="btn d-flex text-left align-items-center text-light border-0 w-100" style={{width:45,height:45}} onMouseOut={(e)=>e.target.tagName === "A" ? e.target.style.backgroundColor="" : null} onMouseOver={(e)=>e.target.tagName === "A" ? e.target.style.backgroundColor = "grey" : null}>
                <img src="/img/navbar/afterAuth/myProfile.svg" width="30" height="30" alt=""/> <span className="ml-3">My Profile</span>
            </Link>
            <Link to="/saved" className="btn d-flex text-left align-items-center text-light border-0 w-100" style={{width:45,height:45}} onMouseOut={(e)=>e.target.tagName === "A" ? e.target.style.backgroundColor="" : null} onMouseOver={(e)=>e.target.tagName === "A" ? e.target.style.backgroundColor = "grey" : null}>
                <img src="/img/navbar/afterAuth/saved.svg" width="30" height="30" alt=""/> <span className="ml-3">Saved</span>
            </Link>
            <Link to="/settings" className="btn d-flex text-left align-items-center text-light border-0 w-100" style={{width:45,height:45}} onMouseOut={(e)=>e.target.tagName === "A" ? e.target.style.backgroundColor="" : null} onMouseOver={(e)=>e.target.tagName === "A" ? e.target.style.backgroundColor = "grey" : null}>
                <img src="/img/navbar/afterAuth/settings.svg" width="30" height="30" alt=""/> <span className="ml-3">Settings</span>
            </Link>
            <Link to="/logout" className="btn d-flex text-left align-items-center text-light border-0 w-100" style={{width:45,height:45}} onMouseOut={(e)=>e.target.tagName === "A" ? e.target.style.backgroundColor="" : null} onMouseOver={(e)=>e.target.tagName === "A" ? e.target.style.backgroundColor = "grey" : null}>
                <img src="/img/navbar/afterAuth/logout.svg" width="30" height="30" alt=""/> <span className="ml-3">Logout</span>
            </Link>
        </div>
    </>)
}