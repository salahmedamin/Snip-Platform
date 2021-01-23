import {Route,Redirect} from 'react-router-dom'
import LoadingSpinner from "./LoadingSpinner"
import {connect} from "react-redux"
import React from "react"
import {getCookie} from "../redux-data/cookieStuff"
class ProtectedRoute extends React.PureComponent{
    render(){
        return(
            this.props.isLoggedIn == null && getCookie("Access-Token").trim().length == 0 ?
            <Redirect to="/signin" push={true} />
            :
            this.props.isLoggedIn == null ? <LoadingSpinner />
            :
            this.props.isLoggedIn ?
            <Route {...this.props} component={this.props.component} />
            :
            <Redirect to="/signin" push={true}/> 
        )
    }
}
const map = state => ({...state,isLoggedIn:state.AuthenticationStatus.isLoggedIn})
export default connect(map)(ProtectedRoute)