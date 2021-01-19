import {Col,Button,Form} from 'react-bootstrap'
import ReCAPTCHA from "react-google-recaptcha";
import validator from 'validator';
import {useState,useRef} from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import {connect} from "react-redux"
import store from "../.././../redux-data/store"

function Signin(props) {
  const {email,emailError,pass,passError,signin,forgot} = props.l
  const [emailValid, setEmailValid] = useState(undefined)
  const [goodPW, setGoodPW] = useState(undefined)
  const [disabled, setDisabled] = useState(true)
  const [errorMessage, seterrorMessage] = useState('')
  const [recaptchaResponse, setRecaptchaResponse] = useState('')
  const recap = useRef()
  const grecaptcha=window.grecaptcha

  const doRecapStuff = (bool,val='')=>{
    if(bool){
      setRecaptchaResponse(val)
      setDisabled(false)
    }
    else{
      setRecaptchaResponse('')
      setDisabled(true)
    }
  }

  const isEmail = (e)=>{
    setEmailValid(validator.isEmail(e.target.value))
  }
  const isGoodPW = (e)=>{
    setGoodPW(e.target.value.length>7)
  }
  const formCek = async(e)=>{
    e.preventDefault()
    seterrorMessage('')
    try{
      if(grecaptcha.getResponse().length === 0){
        throw new Error("Please fill in the recaptcha")
      }
      if(emailValid && goodPW && !disabled){
        props.launchLoading(true)
        recap.current.reset()
        let response = await Axios.post(process.env.REACT_APP_ENDPOINT+"/signin",
            {
              email:document.querySelector("input[type=email]").value,
              password:document.querySelector("input[type=password]").value,
              recapResponse: recaptchaResponse
            },
            {
              withCredentials:true,
              baseURL:"http://localhost:3000",
              headers:{
                "Content-Type":"application/json"
              }
            }
        )
        if(!response.data.success){
          throw new Error(response.data.message)
        }
        else{
          const AT = response.headers["access-token"],userRecords = response.data.userRecords
          let date = new Date();
          let days = 30
          date.setTime(date.getTime() + (days * 24 * 60 * 60 *1000));
          let expires = "; expires=" + date.toGMTString();
          document.cookie = "Access-Token="+AT+expires+";path=/"
          store.dispatch({type:"SET_LOGGED_IN",payload:{JWT_TOKEN:AT}})
          store.dispatch({type:"SET_USER_DETAILS",payload:{records:userRecords}})
          props.launchLoading(false)
          window.location.href = "/home"
          throw new Error('')
        }
      }
      else{
        throw new Error("All fields are mandatory")
      }
    }
    catch(err){
      props.launchLoading(false)
      seterrorMessage(err.message)
    }
  }
  return (
    <>
    <Form onSubmit={(e)=>formCek(e)} style={{paddingTop: "4%"}}>
      <div className={"col-12 btn btn-outline-danger mb-3"+(errorMessage.length===0?" d-none":'')}>{errorMessage}</div>
      <Form.Row className="mb-2">
        <Col>
          <Form.Control placeholder={email} className={emailValid?" border-success" : emailValid === undefined ? "" : "border-danger"} id="email" onBlur={(e)=>isEmail(e)} autoComplete="nope" type="email"/>
          <div className={(emailValid || emailValid === undefined?"d-none":"d-block")+" btn-danger rounded-bottom px-1"}>{emailError}</div>
        </Col>
      </Form.Row>
      <Form.Row className="mb-3">
        <Col>
          <Form.Control type="password" placeholder={pass} id="password" onBlur={(e)=>isGoodPW(e)} className={goodPW?" border-success" : goodPW === undefined ? "" : "border-danger rounded-0 rounded-top"} autoComplete="neww"/>  
          <div className={(goodPW || goodPW === undefined?"d-none":"d-block")+" btn-danger rounded-bottom px-1"}>{passError}</div>
        </Col> 
      </Form.Row>
      <ReCAPTCHA ref={recap} grecaptcha={grecaptcha} sitekey="6LdHEv0UAAAAAM3715icjBeTbJG8AnZVqQVkfbnu" onChange={(v)=>doRecapStuff(true,v)} onExpired={()=>doRecapStuff(false)} onErrored={()=>setDisabled(true)}></ReCAPTCHA>

      <Form.Row className="d-flex justify-content-center">
      <Button type="submit" disabled={disabled?true:false} className="btn btn-dark rounded-lg w-50 p-4 d-flex align-items-center justify-content-center mt-4 col-12 col-sm-10 col-md-8 col-lg-6" style={{height:"5px"}}>
        <div>{signin}</div>
      </Button>
      </Form.Row>
    </Form>
    <div className="d-flex mt-4">
      <Link to="/forgotPassword">{forgot}</Link>
    </div>
    </>
  );
}
const mapStateToPros = state=>({...state,l:state.currentLanguage.values.signin})
export default connect(mapStateToPros)(Signin);
