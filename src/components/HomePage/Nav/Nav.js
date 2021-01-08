import { Navbar, Nav } from 'react-bootstrap'
import { Link } from "react-router-dom";
import Logo from '../../SVG/Logo'
import WidthOnScroll from './WidthOnScroll'
import SmallLang from "./langSmall"
import { connect } from "react-redux"
import { useEffect,useState } from "react"
import AfterAuthNav from "./afterAuth"

function Naver(props) {
  const [showNavOptions, setShowNavOptions] = useState(false) 
  const whenLoggedIn = { 
    Home: {
      link:"/home",
      icon:"home.svg"
    }, 
    "My Profile": {
      link:"/me",
      icon:"myProfile.svg"
    }, 
    Settings: {
      link:"/settings",
      icon:"settings.svg"
    }, 
    Messages: {
      link:"/messages",
      icon:"messages.svg"
    }, 
    Notifications: {
      link:"/notifications",
      icon:"notification.svg"
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

  const links = []
  useEffect(() => {
    links.map(v =>
      v.addEventListener("click", () => {
        document.querySelector(".navbar-toggler").click()
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Navbar expand="sm" collapseOnSelect fixed="top" className="p-0 pr-0 pr-md-3 d-flex" style={{ backdropFilter: "blur(5px)", backgroundColor: "rgb(0,0,0,.4)" }}>
        <Navbar.Brand className="px-2 pb-2 h-100"><Link to="/"><Logo /></Link></Navbar.Brand>
        <Nav className="flex-row justify-content-center d-none d-sm-flex align-items-center text-center position-absolute py-3" style={{ right: "30px" }}>
          {
            !props.Details.isLoggedIn ?
              <>
                <Link to="/signin" className="btn btn-outline-primary rounded-0 px-3 mr-2 font-weight-bold">{props.currentLanguage.values.navbar.beforeAuth[0]}</Link>
                <Link to="/signup" className="btn btn-light text-primary rounded-0 px-3 font-weight-bold">{props.currentLanguage.values.navbar.beforeAuth[1]}</Link>
              </>
              :
              <AfterAuthNav showNavOptions={showNavOptions} setShowNavOptions={setShowNavOptions} />
          }
        </Nav>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{ marginRight: "10px" }} />
        <Navbar.Collapse id="responsive-navbar-na">
          <Nav className="ml-auto d-flex flex-column flex-wrap justify-content-center d-sm-none align-items-center">
            {
              !props.Details.isLoggedIn ?
                <>
                  <Link ref={(link) => links.push(link)} to="/signin" className="d-flex btn rounded-0 text-light py-3 w-100 text-center" style={{paddingRight:"30%",paddingLeft:"30%",width: "45%",fontFamily:"Alegreya Sans SC" }}>
                    <img src="/img/navbar/beforeAuth/login.svg" width="30%" height="30" className="mr-2"/> {props.currentLanguage.values.navbar.beforeAuth[0]}
                  </Link>
                  <Link ref={(link) => links.push(link)} to="/signup" className="d-flex btn rounded-0 text-light py-3 w-100 text-center" style={{paddingRight:"30%",paddingLeft:"30%",width: "45%",fontFamily:"Alegreya Sans SC" }}>
                    <img src="/img/navbar/beforeAuth/signup.svg" width="30%" height="30" className="mr-2"/> {props.currentLanguage.values.navbar.beforeAuth[1]}
                  </Link>
                </>
                :
                Object.keys(whenLoggedIn).map((k,i)=>{
                  return <Link title={k} ref={(link)=>links.push(link)} key={i} to={whenLoggedIn[k].link} className={"btn whenIn d-flex rounded-0 py-3 "} style={{paddingLeft:"30%",paddingRight:"30%",width:"100%",fontFamily:"Alegreya Sans SC"}}><img src={"/img/navbar/afterAuth/"+whenLoggedIn[k].icon} width="30%" height="30px" alt=""/> <span style={{width:"85%"}}>{k}</span></Link>
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

const mapStateToProps = state => ({ Details: { ...state.AuthenticationStatus, ...state.CurrentUserDetails }, LanguagesArray: state.LanguagesArray, currentLanguage: state.currentLanguage })

export default connect(mapStateToProps)(Naver);