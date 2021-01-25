import {connect} from "react-redux"
import store from "../../redux-data/store"
import Loader from "../_Loader/Loader"
import {useRef,useEffect} from "react"
import moment from "moment"
import emoji from "react-easy-emoji"
const PopUp = (props)=>{
    const dis = useRef(),
    {xs,sm,md,lg} = props.screen.width,
    listen = (e)=>{
        if(!dis.current.contains(e.target)){
            store.dispatch({
                type:"RESET_SCREEN_POP_UP"
            })
        }
    },
    emojis = ["❤","😂","👍","🥺","😢","🤢"]
    useEffect(() => {
        setTimeout(() => {
            window.addEventListener("click",listen)
        }, 50)
        return () => {
            window.removeEventListener("click",listen)
        }
    }, [])
    return(
        <div
        className="position-fixed w-100 h-100 d-flex justify-content-center align-items-center"
        style={{
            left:0,
            right:0,
            top:0,
            bottom: 0,
            background: "rgb(0,0,0,.4)",
            animation:".5s opacThenShow forwards",
            zIndex: 100,
            overflowX:"hidden"
        }}
        >
            <div
            className={`bg-dark d-flex flex-column py-4 px-0 rounded-sm shadow-lg col-${xs} col-sm-${sm} col-md-${md} col-lg-${lg} text-light`}
            ref={dis}
            >
                <div className="d-flex flex-row w-100 pb-2 justify-content-around align-items-center">
                    {
                        props.screen.title && props.screen.title.length > 0 ?
                            <div className="justify-self-start btn btn-outline-light px-3 py-1">
                                <b>{ props.screen.title}</b>
                            </div>
                        :
                        null
                    }
                    <div
                    className="px-3 py-1 btn btn-danger justify-self-end"
                    onClick={()=>store.dispatch({
                        type:"RESET_SCREEN_POP_UP",
                    })}
                    >
                        &times;
                    </div>
                </div> 
                <div style={{width:"100%",height:"auto",minHeight:"130px",maxHeight:"300px",overflowX:"hidden",position:"relative"}}>
                        {
                        props.screen.iterableData.data.length > 0 && !props.screen.isLoading ?
                            <div className="d-flex flex-column w-100 mt-2" style={{overflow:"hidden"}}>
                                {
                                    props.screen.iterableData.data.map((singleData,x)=>(
                                        <div key={x} className="one_row w-100 p-2 d-flex justify-content-around align-items-center">
                                            {
                                                props.screen.iterableData.rows.map((row,i)=>{
                                                    return(
                                                        row.isImage ?
                                                        <img key={i}
                                                        style={props.screen.iterableData.colStyling[i]}
                                                        src={(singleData[row.name] === null || singleData[row.name].length === 0) && row.onNullValue ? row.onNullValue : singleData[row.name]}
                                                        alt=""/>
                                                        :
                                                        <span key={i} style={{...props.screen.iterableData.colStyling[i],textAlign:"center"}}>
                                                            {
                                                                row.isTimestamp ? 
                                                                moment(singleData[row.name]).fromNow()
                                                                :
                                                                row.isEmoji ?
                                                                emoji(emojis[singleData[row.name]])
                                                                :
                                                                singleData[row.name]
                                                            }
                                                        </span>
                                                        )
                                                })
                                            }
                                        </div>
                                    ))
                                }
                                
                            </div>
                            :
                            props.screen.isLoading ?
                            <Loader left={"38%"} top={"30px"}/>
                            :
                            null
                    }
                </div>
            </div>
        </div>
        )
    }
const getScreenPopUpDetails = state=>({
    screen: state.GeneralUse.ScreenPopUp
})
export default connect(getScreenPopUpDetails)(PopUp)