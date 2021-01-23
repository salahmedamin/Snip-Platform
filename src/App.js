//HOME
import MainContainer from './components/HomePage/Body/Container'
import NavBar from './components/HomePage/Nav/Nav'
import Form from './components/HomePage/Forms/FormHandler'

//MESSAGING
import Messaging from "./components/Messaging/Main"


//404
import NotFound from './routing/RoutingErrors/NotFound'


//BOOTSTRAP
import 'bootstrap/dist/css/bootstrap.min.css';

//REACT-ROUTER
import {BrowserRouter, Redirect, Route,Switch } from "react-router-dom";
import ProtectedRoute from "./routing/ProtectedRoute"

//REACT
import React from 'react'

//REDUX
import {connect} from "react-redux"
import store from "./redux-data/store"


//COOKIES
import {getCookie, setCookie} from "./redux-data/cookieStuff"


//socketio
import io from "socket.io-client"


import jsonwebtoken from "jsonwebtoken"
import JWT_SECRET from "./jwt_secret"

let socket = null


class App extends React.PureComponent{
  // getting last selected language
  state = {
    hl:getCookie("hl"),
    possible: ["ar","fr","en"],
    socket: null,
  }

  logOut = ()=>{
    setCookie("Access-Token","",3000)
    store.dispatch({type:"SET_LOGGED_OUT",payload:{}})
    //socket.emit("getOut",{username:this.props.GLOBAL_CURRENT_STATS.username})
    return <Redirect to={"/"} push={true} />
  }
  
  componentDidMount(){
    if(!this.state.hl){
      store.dispatch({type:"CHANGE_LANG",payload:{name:"en"}})
    }
    else if(this.state.hl && this.state.possible.includes(this.state.hl) && window.cnt === 0){
      window.cnt++
      store.dispatch({type:"CHANGE_LANG",payload:{name:this.state.hl}})
    }

    if(this.props.GLOBAL_CURRENT_STATS.isLoggedIn==null){
      //login
      const authCookie = getCookie("Access-Token")
      if(authCookie.length > 0){
        try{
          let unzipped = jsonwebtoken.verify(authCookie,JWT_SECRET)
          store.dispatch({type:"SET_LOGGED_IN",payload:{JWT_TOKEN:authCookie}})
          store.dispatch({type:"SET_USER_DETAILS",payload:{records:unzipped}})
          socket = io("http://localhost:3000",{
            query: `username=${this.props.GLOBAL_CURRENT_STATS.username}`
          })
          socket.connect()
        }
        catch(err){
          //logout
          setCookie("Access-Token","",3000)
          socket = null
          store.dispatch({type:"SET_LOGGED_OUT"})
        }
      }
    }
  }

  render(){
    return(
      <>
      <BrowserRouter>
  
        <NavBar />
  
        <Switch>
            <Route exact path="/" component={MainContainer}/>
            <Route path="/signin">
              {
                this.props.GLOBAL_CURRENT_STATS.isLoggedIn ? <Redirect to="/messages" push={false}/> :
                ()=>(
                  <>
                    <MainContainer />
                    <Form form="signin"></Form>
                  </>
                )
              }
            </Route>
            <Route path="/signup">
            {
                this.props.GLOBAL_CURRENT_STATS.isLoggedIn ? <Redirect to="/messages" push={false}/> :
                ()=>(
                  <>
                    <MainContainer />
                    <Form form="signup"></Form>
                  </>
                )
              }
            </Route>
            <Route path="/forgotPassword">
            {
                this.props.GLOBAL_CURRENT_STATS.isLoggedIn ? <Redirect to="/messages" push={false}/> :
                ()=>(
                  <>
                    <MainContainer />
                    <Form form="forgot"></Form>
                  </>
                )
              }
            </Route>
  
            
            <Route path="/logOut" render={this.logOut}/>
  
  
            <ProtectedRoute exact path={
              ["/messages/",
              "/messages/groups/",
              "/messages/groups/:groupID",
              "/messages/:user"]
              }
              component={Messaging}
            />
            <Route>
              <NotFound/>
            </Route>
        </Switch>
  
      </BrowserRouter>
      </>
    );
  }
  
}

const mapSt = state=>({GLOBAL_CURRENT_STATS: {...state.AuthenticationStatus,...state.CurrentUserDetails} })

export default connect(mapSt)(App);
