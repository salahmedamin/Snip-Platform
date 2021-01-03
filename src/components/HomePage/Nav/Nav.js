import { Navbar, Nav } from 'react-bootstrap'
import { Link } from "react-router-dom";
import Logo from '../../SVG/Logo'
import WidthOnScroll from './WidthOnScroll'
import SmallLang from "./langSmall"
import { connect } from "react-redux"
import { useEffect } from "react"

function Naver(props) {
  const whenLoggedIn = { 
    Home: {
      link:"/home",
      icon:""
    }, 
    Me: {
      link:"/me",
      icon:""
    }, 
    Settings: {
      link:"/settings",
      icon:""
    }, 
    Messages: {
      link:"/messages",
      icon:""
    }, 
    Notifications: {
      link:"/notifications",
      icon:""
    },
    "Saved Posts":{
      link:"/saved",
      icon:""
    },
    Logout:{
      link:"/logout",
      icon:""
    }
  }
  const links = []
  useEffect(() => {
    links.map(v =>
      v.addEventListener("click", () => {
        document.querySelector(".navbar-toggler").click()
      })
    )
  }, [])
  return (
    <>
      <Navbar expand="sm" collapseOnSelect fixed="top" className="p-0 pr-0 pr-md-3 d-flex" style={{ backdropFilter: "blur(5px)", backgroundColor: "rgb(0,0,0,.4)" }}>
        <Navbar.Brand className="px-2 pb-2 h-100" href="/"><Logo /></Navbar.Brand>
        <Nav className="flex-row justify-content-center d-none d-sm-flex align-items-center text-center position-absolute py-3" style={{ right: "30px" }}>
          {
            !props.Details.isLoggedIn ?
              <>
                <Link to="/signin" className="btn btn-outline-primary rounded-0 px-3 mr-2 font-weight-bold">{props.currentLanguage.values.navbar.beforeAuth[0]}</Link>
                <Link to="/signup" className="btn btn-light text-primary rounded-0 px-3 font-weight-bold">{props.currentLanguage.values.navbar.beforeAuth[1]}</Link>
              </>
              :
              <>
                LOGGED IN MAMACITA
          </>
          }
        </Nav>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{ marginRight: "10px" }} />
        <Navbar.Collapse id="responsive-navbar-na">
          <Nav className="ml-auto d-flex flex-row flex-wrap justify-content-center d-sm-none align-items-center">
            {
              !props.Details.isLoggedIn ?
                <>
                  <Link ref={(link) => links.push(link)} to="/signin" className="btn btn-primary rounded-0 text-light py-3 w-100" style={{ width: "45%" }}>{props.currentLanguage.values.navbar.beforeAuth[0]}</Link>
                  <Link ref={(link) => links.push(link)} to="/signup" className="btn btn-light rounded-0 text-primary py-3 w-100" style={{ width: "45%" }}>{props.currentLanguage.values.navbar.beforeAuth[1]}</Link>
                </>
                :
                Object.keys(whenLoggedIn).map((k,i)=>{
                  return <Link ref={(link)=>links.push(link)} key={i} to={whenLoggedIn[k].link} className={"btn whenIn rounded-0 py-3"} style={{width:whenLoggedIn[k].link === "/logout" ? "100%" : "50%",fontFamily:"Alegreya Sans SC"}}>{k}</Link>
                })
            }
          </Nav>
        </Navbar.Collapse>
        <WidthOnScroll />
      </Navbar>
      <SmallLang LanguagesArray={props.LanguagesArray} showLangsBar={props.showLangsBar} currentLanguage={props.currentLanguage} />
    </>
  );
}

const mapStateToProps = state => ({ Details: { ...state.AuthenticationStatus, ...state.CurrentUserDetails }, LanguagesArray: state.LanguagesArray, currentLanguage: state.currentLanguage, showLangsBar: state.showLangsBar })

export default connect(mapStateToProps)(Naver);