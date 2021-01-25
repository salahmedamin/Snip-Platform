import {Link} from "react-router-dom"
export default ()=>{
    return(
        <Link to={"/messages"}>
            <div id="draggableExit" className="position-absolute d-block d-sm-none"
            style={{
                height:45,
                width:45,
                borderRadius:"50%",
                cursor:"pointer",
                backgroundImage:"url(/img/form/close.svg)",
                backgroundRepeat:"no-repeat",
                backgroundPosition:"center center",
                backgroundSize:"17px 17px",
                border:"1px solid firebrick",
                top:"2%",
                right:"44%",
                boxShadow:"0px 0px 15px 1px firebrick"
                }}></div>
        </Link>
        )
    }