import {Error,Success,Warning} from "../SVG/Notification/notifIcons"
import React from "react"
import store from "../../redux-data/store"
export default (props)=>{
    const icons = {
        Error,
        Success,
        Warning
    },
    Chosen = icons[props.type.charAt(0).toUpperCase()+props.type.slice(1)]

    return (
        <div 
        className="position-relative rounded-xs d-flex align-items-center justify-content-center p-2 btn btn-light my-1 notificationItem"
        style={{
            animation:`1s slideFrom${props.slideFrom.charAt(0).toUpperCase()+props.slideFrom.slice(1)} forwards`,
        }}
        onClick={()=>
            store.dispatch({
                type:"REMOVE_NOTIFICATION",
                payload:{
                    id: props.id
                }
            })
        }
        onAnimationEnd={()=>
            setTimeout(() => {
                store.dispatch({
                    type:"REMOVE_NOTIFICATION",
                    payload:{
                        id: props.id
                    }
                })
            }, 5000)
        }
        >
            <div style={{width:30,height:30}}>
            {
                Chosen ?
                <Chosen/>
                :
                null
            }
            </div>
            <div style={{width:"100%"}} className="mx-1">{props.content}</div>
        </div>
    )
}