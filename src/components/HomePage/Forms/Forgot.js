import {Col,Button,Form} from 'react-bootstrap'
import ReCAPTCHA from "react-google-recaptcha";
import {useState,useRef} from 'react'
import { useHistory } from 'react-router-dom'
import Axios from 'axios'

function Forgot(props) {
  let history = useHistory()
  const [detail,setdetail] = useState("")
  const [disabled, setDisabled] = useState(true)
  const recap = useRef()
  const grecaptcha = window.grecaptcha

  const formCek = (e)=>{
    e.preventDefault()
    if(detail.length > 2){
      if(grecaptcha.getResponse().length === 0){
        throw new Error("Please fill in the recaptcha")
      }
      props.launchLoading(true)
      recap.current.reset()
      Axios.post("http://localhost:2500/forgotPass",{detail}).then(()=>{
        let loader = document.querySelector(".loadingDone")
        loader.classList.add("deliver")
        loader.querySelector("div").innerHTML = "If the data you provided was correct, you should receive an email containing a reset link"
        setTimeout(()=>{
          history.push("/")
        },1500)
      })

    }
  }
  return (
    <>
    <Form onSubmit={(e)=>formCek(e)} style={{paddingTop: "7%"}}>
      <Form.Row className="mb-2">
        <Col>
          <Form.Control placeholder="Enter username or email address" value={detail} onChange={(e)=>setdetail(e.target.value)} autoComplete="nope"/>
          <div className={(detail.length>2 || detail.length === 0?"d-none" : "d-block")+" btn-danger rounded-bottom px-1"}>Please enter a valid input</div>
        </Col>
      </Form.Row>
      <ReCAPTCHA ref={recap} grecaptcha={grecaptcha} sitekey="6LdHEv0UAAAAAM3715icjBeTbJG8AnZVqQVkfbnu" onChange={()=>setDisabled(false)} onExpired={()=>setDisabled(true)} onErrored={()=>setDisabled(true)}></ReCAPTCHA>

      <Form.Row className="d-flex justify-content-center">
        <Button type="submit" disabled={disabled?true:false} className="btn btn-dark rounded-lg w-50 p-4 d-flex align-items-center justify-content-center mt-4 col-12 col-sm-10 col-md-8 col-lg-6" style={{height:"5px"}}>
          <div>Send me an e-mail</div>
        </Button>
      </Form.Row>
    </Form>
    </>
  );
}

export default Forgot;
