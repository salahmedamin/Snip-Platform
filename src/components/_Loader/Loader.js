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
                    style={{position:'absolute',marginLeft:"38%",top:"35%"}}
                    type="TailSpin"
                    color="lightgrey">
                    </Loader>
                </>
            )
    }
}