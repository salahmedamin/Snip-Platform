import {Link} from "react-router-dom"
export default ()=>{
    return(
        <Link to={"/messages"}>
            <div id="draggableExit" className="position-absolute d-block d-sm-none" style={{height:40,width:60,borderRadius:60,cursor:"pointer",backgroundImage:"url(/img/form/close.svg)",backgroundRepeat:"no-repeat",backgroundPosition:"center center",backgroundSize:"18px 18px",border:"2px solid steelblue",top:"2%",right:"44%"}}></div>
        </Link>
        )
    }