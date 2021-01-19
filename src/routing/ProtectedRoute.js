import {Route,Redirect} from 'react-router-dom'
import LoadingSpinner from "./LoadingSpinner"
import {connect} from "react-redux"
import React from "react"
class ProtectedRoute extends React.PureComponent{
    render(){
        return(
            this.props.isLoggedIn == null ? <LoadingSpinner />
            :
            this.props.isLoggedIn ?
            <Route {...this.props} component={this.props.component} />
            :
            <Redirect to={{pathname:"/signin"}} /> 
        )
    }
}
const map = state => ({...state,isLoggedIn:state.AuthenticationStatus.isLoggedIn})
export default connect(map)(ProtectedRoute)