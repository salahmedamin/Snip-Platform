import { Navbar, Nav } from 'react-bootstrap'
import { Link } from "react-router-dom";
import Logo from '../../SVG/Logo'
import WidthOnScroll from './WidthOnScroll'
import SmallLang from "./langSmall"
import { connect } from "react-redux"
import React from "react"
import {AfterAuthNav,AfterAuthNavMini} from "./afterAuth"
import {BeforeAuth,BeforeAuthMini} from "./beforeAuth"

class Naver extends React.PureComponent{
  state = {
    newStuff:["Messages"]
  }
  render(){
    return (
      <>
        <Navbar expand="sm" collapseOnSelect fixed="top" className="p-0 pr-0 pr-md-3 d-flex" style={{ backdropFilter: "blur(5px)", backgroundColor: "rgb(0,0,0,.4)" }}>
          <Navbar.Brand className="px-2 pb-2 h-100">
            <Link to="/">
              <Logo />
            </Link>
          </Navbar.Brand>
          <Nav className="flex-row justify-content-center d-none d-sm-flex align-items-center text-center position-absolute py-3" style={{ right: "30px" }}>
            {
              !this.props.Details.isLoggedIn ?
                <BeforeAuth currentLanguage={this.props.currentLanguage}/>
                :
                <AfterAuthNav currentLanguage={this.props.currentLanguage} hasNewMessages={this.props.hasNewMessages}/>
            }
          </Nav>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{ marginRight: "10px" }} />
          <Navbar.Collapse id="responsive-navbar-na">
            <Nav className="ml-auto d-flex flex-column flex-wrap justify-content-center d-sm-none align-items-center">
              {
                !this.props.Details.isLoggedIn ?
                  <BeforeAuthMini currentLanguage={this.props.currentLanguage}/>
                  :
                  <AfterAuthNavMini currentLanguage={this.props.currentLanguage} />
              }
            </Nav>
          </Navbar.Collapse>
          <WidthOnScroll />
        </Navbar>
        {
          !this.props.Details.isLoggedIn ?
          <SmallLang LanguagesArray={this.props.LanguagesArray} showLangsBar={this.props.showLangsBar} currentLanguage={this.props.currentLanguage} />
          :
          null
        }
      </>
    ) //end of return
  }
}

const mapStateToProps = state => ({ 
  Details: { ...state.AuthenticationStatus, ...state.CurrentUserDetails }, 
  LanguagesArray: state.LanguagesArray, currentLanguage: state.currentLanguage,
  hasNewMessages: state.Messaging.chatList.filter(v=>v.unreadCount>0 && (v.isGroup ? v.lastMessage.sender !== state.CurrentUserDetails.username:true)).length>0
})

export default connect(mapStateToProps)(Naver);