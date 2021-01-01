import Signup from './Signup'
import Signin from "./Signin"
import Forgot from './Forgot'
import { Link } from "react-router-dom";
import {useState} from 'react'
import Logo from "../../SVG/Logo";

function FormHandler(props) {

  const [load, setload] = useState(false)

  return (
    <>
      <div className="position-fixed w-100 h-100 d-flex justify-content-center align-items-center" style={{top:0,backgroundColor:"rgb(0,0,0,0.8)",zIndex:"1031",transition:".6s linear"}}>
        
        <div className={(props.form==="signin" ? "h-75 pt-4 ":"h-auto ")+"rounded bg-light p-4 col-11 col-sm-9 col-md-7 col-lg-4 d-flex flex-column"} style={{maxHeight:props.form === "signin"?"":"95%"}}>
          
          <div className={(!load?"d-none":"")+" position-absolute w-100 h-100 p-0 m-0 loadingDone"} style={{top:0,left:0,zIndex:1032,backgroundColor:"rgba(0,0,0,.7)",backgroundImage:"url(/img/form/loading.gif)",backgroundRepeat:"no-repeat",backgroundSize:"40px 60px",backgroundPosition:"center center"}}>
            <div></div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4" style={{height:"20px"}}>
            <Logo height="35px"/>
            <Link to="/"><span className="btn closeForm" style={{backgroundImage:"url(/img/form/close.svg)",backgroundSize:"cover",backgroundRepeat:"no-repeat",height:"25px",width:"25px"}}></span></Link>
          </div>
          {
            props.form === "signup" ? 
              <Signup launchLoading={setload} />
            :
            props.form === "signin" ?
              <Signin launchLoading={setload} />
            :
            props.form === "forgot" ?
              <Forgot launchLoading={setload} />
            :
            ""
          }
        </div>
      </div>
    </>
  );
}

export default FormHandler;
