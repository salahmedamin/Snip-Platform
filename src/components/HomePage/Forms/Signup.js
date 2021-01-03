import {Col,Button,Form} from 'react-bootstrap'
import ReCAPTCHA from "react-google-recaptcha";
import validator from 'validator';
import {useState,useEffect,useRef} from 'react'
import {useHistory} from 'react-router-dom';
import Axios from 'axios'
import zxcvbn from 'zxcvbn';
import {connect} from "react-redux"

function Signup(props) {
  const history = useHistory();
  const [pwd, setPwd] = useState("")
  const [pwdStrgth, setPwdStrgth] = useState(0)
  const [emailValid,setEmailValid] = useState(undefined)
  const [fNameValid, setFnameValid] = useState(undefined)
  const [lNameValid, setLnameValid] = useState(undefined)
  const [usernameValid, setUsernameValid] = useState(undefined)
  const [eqPs, seteqPs] = useState(undefined)
  const [disabled, setDisabled] = useState(true)
  const [visibState, setVisibState] = useState(false)
  const [recapResponse, setRecapResponse] = useState('')
  const [errorMessage, seterrorMessage] = useState('')

  const recap = useRef()
  const grecaptcha = window.grecaptcha
  const passStrength = (e)=>{
    let pass = e.target.value
    setPwd(pass)
    setPwdStrgth(zxcvbn(pass).score)
  }

  const equalsPasses = (e)=>{
    validator.equals(pwd,e.target.value) ?seteqPs(true):seteqPs(false)
  }


  const checkUsername = async(e)=>{
    if(e.target.value.trim().length <= 2){
      setUsernameValid("empty")
      return;
    }
    setUsernameValid("loading")
    let username = e.target.value
    let xhttp = await Axios.post("http://localhost:2500/checkUsername",{username})
    !xhttp.data ? setUsernameValid(true) : setUsernameValid(false)
  }
  const isName = (e,n)=>{
    n==="f" ?
    setFnameValid(validator.matches(e.target.value,/^[a-zA-Z ]+$/))
    :
    setLnameValid(validator.matches(e.target.value,/^[a-zA-Z ]+$/))
    
  }
  const isEmail = (e)=>{
    setEmailValid(validator.isEmail(e.target.value))
  }
  const doRecapStuff = (bool,val='')=>{
    if(bool){
      setRecapResponse(val)
      setDisabled(false)
    }
    else{
      setRecapResponse('')
      setDisabled(true)
    }
  }
  const getDataObject = (form)=>{
    let holder = {}
    form.querySelectorAll("input").forEach((v,i)=>{
      let name = v.name
      if(name.length === 0) return;
      holder[name] = v.value
    })
    return holder
  }
  const formCek = async(e)=>{
    e.preventDefault()
    try{
      if(grecaptcha.getResponse().length === 0){
        throw new Error("Please fill in the recaptcha")
      }
      if(fNameValid && lNameValid && emailValid && pwd.length > 0 && pwdStrgth >=2 && eqPs && !disabled){
        props.launchLoading(true)
        let form = document.querySelector("form")
        let data = {...getDataObject(form),recapResponse}
        let axResp = await Axios.post("http://localhost:2500/signup",data)
        if(axResp.data.success){
          let loader = document.querySelector(".loadingDone")
          loader.classList.add("deliver")
          loader.querySelector("div").innerHTML = "Check "+data.email+" for the activation link"
          new Promise((res)=>{
            setTimeout(() => {
              res(history.push("/"))
            }, 2000);
          })
        }
        else{
          recap.current.reset()
          props.launchLoading(false)
          throw new Error(axResp.data.message)
        }
      }
    }
    catch(err){
      props.launchLoading(false)
      seterrorMessage(err.message)
    }

  }
  useEffect(() => {
    document.querySelector(`.indicator`).style.marginLeft = ((25-0.5)*pwdStrgth)+"%"
  }, [pwd])
  return (
    <>
        <Form onSubmit={(e)=>formCek(e)}>
          <div className={"col-12 btn btn-outline-danger mb-3"+(errorMessage.length===0?" d-none":'')}>{errorMessage}</div>
          <Form.Row className="mb-2 d-flex">
            <Col className="d-block col-6">
              <Form.Control placeholder={props.curr.fName} name="fName" required className={(fNameValid?"border-success" : fNameValid === undefined ? "" : "border-danger rounded-0")} id="fName" onBlur={(e)=>isName(e,"f")} autoComplete="nope"/>
              <div className={(fNameValid || fNameValid === undefined?"d-none":"d-block")+" btn-danger rounded-bottom px-1"}>{props.curr.formatError}</div>
            </Col>
            <Col className="d-block col-6">
              <Form.Control placeholder={props.curr.lName} name="lName" required className={(lNameValid?"border-success" : lNameValid === undefined ? "" : "border-danger rounded-0")} id="lName" onBlur={(e)=>isName(e,"l")} autoComplete="nope"/>
              <div className={(lNameValid || lNameValid === undefined?"d-none":"d-block")+" btn-danger rounded-bottom px-1"}>{props.curr.formatError}</div>
            </Col>
          </Form.Row>
          <Form.Row className="mb-2">
            <Col>
              <Form.Control placeholder={props.curr.email} name="email" required onBlur={(e)=>isEmail(e)} className={emailValid?" border-success" : emailValid === undefined ? "" : "border-danger rounded-0"} autoComplete="neww"/>  
              <div className={(emailValid || emailValid === undefined?"d-none":"d-block")+" btn-danger rounded-bottom px-1"}>{props.curr.emailError}</div>
            </Col> 
          </Form.Row>
          <Form.Row className="mb-2">
            <Col>
              <Form.Control name="username" placeholder={props.curr.username} required className={usernameValid === "empty" ? "" :  usernameValid && usernameValid!=="loading" ? "border-success" : usernameValid == "loading" ? "loading" : usernameValid === undefined ? "" : "border-danger rounded-0"} id="username" onBlur={(e)=>checkUsername(e)} autoComplete="neww"/>
              <div className={(usernameValid || usernameValid === undefined ?"d-none":"d-block")+" btn-danger rounded-bottom px-1"}>{props.curr.usernameError}</div>
            </Col>
          </Form.Row>
          <Form.Row className="mt-2 mb-2 border-bottom"/>
          <Form.Row className="mb-2">
            <Col>
              <div className={"mb-3 mt-3 w-100 border rounded strengthBar align-items-center d-flex"} style={{height:"13px"}}>
                <div className="indicator bg-dark"></div>
              </div>
              <div className="position-relative">
                <div className={(pwd.length>0?"d-flex":"d-none")+" position-absolute h-100 justify-content-center align-items-center"} style={{right:"3%"}}>
                  <div style={{cursor:"pointer",fontSize:"13px"}} className="text-dark font-weight-bold" onClick={()=>setVisibState(!visibState)}>{visibState ? "Hide" : "Show"}</div>
                </div>
                <Form.Control type={visibState ? "text" : "password"} name="password" required placeholder={props.curr.createP} className={pwdStrgth<3 && pwd.length<7 && pwd.length>0?"border-danger":pwd.length<7 ? "" : "border-success"} id="pass1" value={pwd} onChange={(e)=>passStrength(e)}/>
              </div>
            </Col>
          </Form.Row>
          <Form.Row className="mb-2">
            <Col>
              <Form.Control type="password" required placeholder={props.curr.confP} className={eqPs && pwd.length > 0?"border-success":eqPs===undefined || pwd.length == 0?"":"border-danger"} onBlur={(e)=>equalsPasses(e)}/>
            </Col>
          </Form.Row>

          <ReCAPTCHA ref={recap} grecaptcha={grecaptcha} sitekey="6LdHEv0UAAAAAM3715icjBeTbJG8AnZVqQVkfbnu" onChange={(v)=>doRecapStuff(true,v)} onExpired={()=>doRecapStuff(false)} onErrored={()=>doRecapStuff(false)}></ReCAPTCHA>

          <Form.Row className="d-flex justify-content-center">
          <Button type="submit" disabled={disabled?true:false} className="btn btn-dark rounded-lg w-50 p-4 d-flex align-items-center justify-content-center mt-4 col-12 col-sm-10 col-md-8 col-lg-6" style={{height:"5px"}}>
          <div>{props.curr.finButton}</div>
          </Button>
          </Form.Row>
        </Form>
    </>
  );
}

const getCurrentLang = state=>({curr:state.currentLanguage.values.signup})

export default connect(getCurrentLang)(Signup);
