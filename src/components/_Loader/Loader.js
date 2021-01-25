import Loader from 'react-loader-spinner'
import React, { Component } from 'react'
export default class CustomLoader extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
                <>
                    <div style={{position:'absolute',zIndex:'1',backgroundColor:'rgb(0,0,0,.2)',width:'100%',height:'100%'}}></div>
                    <Loader 
                    style={{position:'absolute',left:this.props.left == null ? "38%" : this.props.left,top:this.props.top == null ? "35%" : this.props.top,zIndex:"3"}}
                    type="TailSpin"
                    color="lightgrey"/>
                </>
            )
    }
}