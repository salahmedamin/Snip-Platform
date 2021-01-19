import React from "react"
import {Link} from "react-router-dom"


class BA extends React.PureComponent{
    render = ()=>{
        return(
        <>
            <Link to="/signin" className="btn btn-outline-primary rounded-0 px-3 mr-2 font-weight-bold">{this.props.currentLanguage.values.navbar.beforeAuth[0]}</Link>
            <Link to="/signup" className="btn btn-light text-primary rounded-0 px-3 font-weight-bold">{this.props.currentLanguage.values.navbar.beforeAuth[1]}</Link>
        </>
    )}
}

class BAM extends React.PureComponent {
    state = {links:[]}
    componentDidMount(){
        this.state.links.map(v =>
            v.addEventListener("click", () => {
                document.querySelector(".navbar-toggler").click()
            })
        )
    }
    render = ()=>(
        <>
            <Link ref={(link) => !this.state.links.includes(link)?this.setState(prevState=>({...prevState,links:[...prevState.links,link]})):null} to="/signin" className="d-flex btn rounded-0 text-light py-3 w-100 text-center" style={{paddingRight:"30%",paddingLeft:"30%",width: "45%",fontFamily:"Alegreya Sans SC" }}>
                <img src="/img/navbar/beforeAuth/login.svg" width="30%" height="30" className="mr-2"/> {this.props.currentLanguage.values.navbar.beforeAuth[0]}
            </Link>
            <Link ref={(link) => !this.state.links.includes(link)?this.setState(prevState=>({...prevState,links:[...prevState.links,link]})):null} to="/signup" className="d-flex btn rounded-0 text-light py-3 w-100 text-center" style={{paddingRight:"30%",paddingLeft:"30%",width: "45%",fontFamily:"Alegreya Sans SC" }}>
                <img src="/img/navbar/beforeAuth/signup.svg" width="30%" height="30" className="mr-2"/> {this.props.currentLanguage.values.navbar.beforeAuth[1]}
            </Link>
        </>
    )
}

export const BeforeAuth=(props)=>(<BA {...props} />),BeforeAuthMini=(props)=>(<BAM {...props} />)