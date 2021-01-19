import {Link} from "react-router-dom"
import React from "react"
const whenLoggedIn = {
    Home: {
      link:"/home",
      icon:"home.svg"
    }, 
    Messages: {
      link:"/messages",
      icon:"messages.svg"
    }, 
    Notifications: {
      link:"/notifications",
      icon:"notification.svg"
    },
    "My Profile": {
      link:"/me",
      icon:"myProfile.svg"
    }, 
    Settings: {
      link:"/settings",
      icon:"settings.svg"
    }, 
    "Saved Posts":{
      link:"/saved",
      icon:"saved.svg"
    },
    Logout:{
      link:"/logout",
      icon:"logout.svg"
    }
  }
class AfterAuthExtended extends React.PureComponent{
    state={
        showNavOptions:false,
        currentPath:window.location.pathname,
    }
    setShowNavOptions = ()=>this.setState(prevState=>({...prevState,showNavOptions:!prevState.showNavOptions}))  
    render(){
        return(
            <>
                <Link to="/messages" className="position-relative mr-3 btn btn-outline-dark d-flex align-items-center justify-content-center rounded-circle border-0 hasNew" style={{width:45,height:45}}>
                    {this.props.hasNewMessages ? <span></span> : null }
                    <img src="/img/navbar/afterAuth/messages.svg" width="24" height="24" alt=""/>
                </Link>
                <Link to="/notifications" className="mr-3 btn btn-outline-dark d-flex align-items-center justify-content-center rounded-circle border-0" style={{width:45,height:45}}>
                    <img src="/img/navbar/afterAuth/notification.svg" width="24" height="24" alt=""/>
                </Link>
                <span className="position-relative mr-3 btn btn-outline-dark d-flex align-items-center justify-content-center rounded-circle border-0" style={{width:30,height:30}} onClick={()=>this.setShowNavOptions()}>
                    <img src="/img/navbar/afterAuth/arrow_down.svg" style={{transition:".5s ease all",transform:this.state.showNavOptions?"rotate(180deg)":"rotate(0deg)"}} width="10" height="10" alt=""/>
                </span>
                <div className="navArrow position-absolute p-1 border border-dark bg-dark" style={{top:"85%",right:-15,width:170,display:this.state.showNavOptions?"block":"none"}}>
                    <Link to="/me" className="btn d-flex text-left align-items-center text-light border-0 w-100" style={{width:45,height:45}}>
                        <img src="/img/navbar/afterAuth/myProfile.svg" width="30" height="30" alt=""/> <span className="ml-3">My Profile</span>
                    </Link>
                    <Link to="/saved" className="btn d-flex text-left align-items-center text-light border-0 w-100" style={{width:45,height:45}}>
                        <img src="/img/navbar/afterAuth/saved.svg" width="30" height="30" alt=""/> <span className="ml-3">Saved</span>
                    </Link>
                    <Link to="/settings" className="btn d-flex text-left align-items-center text-light border-0 w-100" style={{width:45,height:45}}>
                        <img src="/img/navbar/afterAuth/settings.svg" width="30" height="30" alt=""/> <span className="ml-3">Settings</span>
                    </Link>
                    <Link to="/logout" className="btn d-flex text-left align-items-center text-light border-0 w-100" style={{width:45,height:45}}>
                        <img src="/img/navbar/afterAuth/logout.svg" width="30" height="30" alt=""/> <span className="ml-3">Logout</span>
                    </Link>
                </div>
            </>
        )
    }
}



class AfterAuthMini extends React.PureComponent {
    ref = React.createRef()
    state = {
        links:[]
    }
    componentDidMount(){
        this.state.links.map(v =>
            v.addEventListener("click", () => {
                document.querySelector(".navbar-toggler").click()
            })
        )
    }
    render = ()=>(Object.keys(whenLoggedIn).map((k,i)=>{
            return <Link title={k} ref={(link)=>this.state.links.push(link)} key={i} to={whenLoggedIn[k].link} className={"btn whenIn d-flex rounded-0 py-3 "} style={{paddingLeft:"30%",paddingRight:"30%",width:"100%",fontFamily:"Alegreya Sans SC"}}><img src={"/img/navbar/afterAuth/"+whenLoggedIn[k].icon} width="30%" height="30px" alt=""/> <span style={{width:"85%"}}>{k}</span></Link>
        }))
}


export const AfterAuthNav = (props)=>(<AfterAuthExtended {...props}/>),AfterAuthNavMini=(props)=>(<AfterAuthMini {...props}/>)