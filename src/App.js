import MainContainer from './components/HomePage/Body/Container'
import NavBar from './components/HomePage/Nav/Nav'
import Form from './components/HomePage/Forms/FormHandler'


import NotFound from './routing/RoutingErrors/NotFound'
/////
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route,Switch } from "react-router-dom";
import React from 'react'
import {connect} from "react-redux"
import store from "./redux-data/store"

import {getCookie, setCookie} from "./redux-data/cookieStuff"

import Axios from "axios"

function App(props) {

  // getting last selected language
  let hl = getCookie("hl")
  let possible = ["ar","fr","en"]
  if(!hl){
    store.dispatch({type:"CHANGE_LANG",payload:{name:"en"}})
  }
  else if(hl && possible.includes(hl) && window.cnt === 0){
    window.cnt++
    store.dispatch({type:"CHANGE_LANG",payload:{name:hl}})
  }


  //checking if already authenticated
  if(!props.GLOBAL_CURRENT_STATS.isLoggedIn){
    const authCookie = getCookie("Access-Token")
    if(authCookie.length > 0){
      Axios.post("http://localhost:2500/tokenVerif",{token:authCookie}).then(ax =>{
        if(ax.data.good){
          store.dispatch({type:"SET_LOGGED_IN",payload:{JWT_TOKEN:authCookie}})
          store.dispatch({type:"SET_USER_DETAILS",payload:{records:ax.data.records}})
        }
        else{
          setCookie("Access-Token","",3000)
        }
      })
    }
  }

  return(
    <>
    <BrowserRouter>

      <NavBar />

      <Switch>
          <Route exact path="/">
            <MainContainer/>
          </Route>
          <Route path="/signin">
            <MainContainer />
            <Form form="signin"></Form>
          </Route>
          <Route path="/signup">
            <MainContainer />
            <Form form="signup"></Form>
          </Route>
          <Route path="/forgotPassword">
            <MainContainer />
            <Form form="forgot"></Form>
          </Route>
          <Route>
            <NotFound/>
          </Route>
      </Switch>

    </BrowserRouter>
    </>
  );
}

const mapSt = state=>({GLOBAL_CURRENT_STATS: {...state.AuthenticationStatus,...state.CurrentUserDetails} })

export default connect(mapSt)(App);
