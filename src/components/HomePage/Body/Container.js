import {Container,Row,Col,Image} from 'react-bootstrap'
import { Link } from "react-router-dom";
import Or from '../OrStyle'
import {connect} from "react-redux"

function MainContainer(props) {
  return (
    <>
    <Container fluid className="w-100 h-auto p-0 d-flex justify-content-center position-relative" style={{fontFamily:"Alegreya Sans SC"}}>
      <Row className="d-block h-100 w-100 px-0">


        <Col style={{backgroundImage:"url(/img/main/readsunset.jpg)",backgroundAttachment:"fixed",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center center",paddingBottom:"200px",paddingTop:"200px"}} className="m-0 h-100 mh-100 d-flex flex-column justify-content-center align-items-center w-100 font-weight-bold">
          <div className="h3 text-white p-2" style={{backdropFilter:"blur(15px)"}}>
            {props.currentLanguage.block1[0]}
          </div>
          <div className="btn btn-light py-4 w-75 w-sm-50 w-md-50 w-lg-50">
            <span className="h5 font-weight-bold">{props.currentLanguage.block1[1][0]}<span style={{color:"royalblue",letterSpacing:"2px"}}>{props.currentLanguage.block1[1][1]}</span>{props.currentLanguage.block1[1][2]}</span>
          </div>

          <div className="d-block d-md-flex w-75 mt-4 justify-content-center align-items-center">


            <div className="card w-auto text-light bsCard m-3 border-0" style={{fontFamily:"Alegreya Sans SC"}}>
              <div className="card-body p-0">
                <div class="card-img-top homeCard rounded-0" style={{backgroundImage:"url(/img/main/supportWriters.jpg)"}}></div>
                <div className="card-title w-100 bg-light text-primary text-center p-3 m-0">
                  {props.currentLanguage.block1[2][0]}
                </div>
              </div>
            </div>
           <div className="card w-auto text-light bsCard m-3 border-0" style={{fontFamily:"Alegreya Sans SC"}}>
              <div className="card-body p-0">
                <div class="card-img-top homeCard rounded-0" style={{backgroundImage:"url(/img/main/joyOfReading.jpg)"}}></div>
                <div className="card-title w-100 bg-light text-primary text-center p-3 m-0">
                {props.currentLanguage.block1[2][1]}
                </div>
              </div>
            </div>
           <div className="card w-auto text-light bsCard m-3 border-0" style={{fontFamily:"Alegreya Sans SC"}}>
              <div className="card-body p-0">
                <div class="card-img-top homeCard rounded-0" style={{backgroundImage:"url(/img/main/allAges.png)"}}></div>
                <div className="card-title w-100 bg-light text-primary text-center p-3 m-0">
                {props.currentLanguage.block1[2][2]}
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Col className="col-4 d-flex justify-content-around align-items-center mw-100 p-2 " style={{backgroundColor:"rgb(23, 162, 184,.2)"}}>
          <dl className="col-sm-7 d-flex flex-column justify-content-center text-center text-wrap" style={{zIndex:"2"}}>
            <span className="shadow-lg p-3 rounded mb-3 btn btn-outline-dark border-0 enlargeFont">{props.currentLanguage.block2[0]}</span>
            <div className="text-wrap mt-3 h3">{props.currentLanguage.block2[1]}</div>
            <Row className="d-flex flex-wrap justify-content-center align-items-center mt-4">
              <Col className="d-flex flex-column justify-content-center align-items-center p-4">
                <div className="h5 mb-2">{props.currentLanguage.block2[2][0]}</div>
                <Image style={{maxHeight:"100px",maxWidth:"100px"}} className="rounded-circle shadow" src="/Loomis/Chat.svg"/>
              </Col>
              <Col className="d-flex flex-column justify-content-center align-items-center p-4">
                <div className="h5 mb-2">{props.currentLanguage.block2[2][1]}</div>
                <Image style={{maxHeight:"100px",maxWidth:"100px"}} className="rounded-circle shadow" src="/Loomis/newPeople.svg"/>
              </Col>
              <Col className="d-flex flex-column justify-content-center align-items-center p-4">
                <div className="h5 mb-2">{props.currentLanguage.block2[2][2]}</div>
                <Image style={{maxHeight:"100px",maxWidth:"100px"}} className="rounded-circle shadow" src="/Loomis/Updates.png"/>
              </Col>
              <Col className="d-flex flex-column justify-content-center align-items-center p-4">
                <div className="h5 mb-2">{props.currentLanguage.block2[2][3]}</div>
                <div className="rounded-circle shadow" style={{backgroundImage:"url(/img/main/book.png",backgroundSize:"80% 80%",backgroundRepeat:"no-repeat",backgroundPosition:"center center",height:"100px",width:"100px"}}></div>
              </Col>
            </Row>
          </dl>
          <Image className="col-sm-5 d-none d-md-block" src="/Loomis/convo.svg"/>
        </Col>



        <Col className="col-4 d-xs-block d-sm-flex flex-row-reverse justify-content-around align-items-center mw-100 p-5" style={{backgroundColor:"#A4A8D1"}}>
          
        <dl className="col-sm-7 d-flex flex-column justify-content-center text-center" style={{zIndex:"2"}}>
            <span className="shadow-lg p-3 rounded mb-3 btn btn-outline-light border-0 enlargeFont text-wrap">{props.currentLanguage.block3[0]}</span>
            <div className="text-wrap mt-3 text-light h4 text-wrap">{props.currentLanguage.block3[1]}</div>
            <Row className="d-flex flex-wrap justify-content-center align-items-center mt-4">
              <Col className="d-flex flex-column justify-content-center align-items-center p-4">
                <div className="h5 mb-2 text-light">{props.currentLanguage.block3[2][0]}</div>
                <div style={{height:"100px",width:"100px",backgroundImage:"url(/img/main/switchModes.png)",backgroundRepeat:"no-repeat",backgroundPosition:"center center",backgroundSize:"contain"}} className="rounded-circle"/>
              </Col>
              <Col className="d-flex flex-column justify-content-center align-items-center p-4">
                <div className="h5 mb-2 text-light">{props.currentLanguage.block3[2][1]}</div>
                <Image style={{maxHeight:"100px",maxWidth:"100px"}} src="/img/main/colorPalette.svg"/>
              </Col>
              <Col className="d-flex flex-column justify-content-center align-items-center p-4">
                <div className="h5 mb-2 text-light">{props.currentLanguage.block3[2][2]}</div>
                <Image style={{maxHeight:"100px",maxWidth:"100px"}} src="/img/main/profileCustom.svg"/>
              </Col>
            </Row>
        </dl>
        <Image className="col-sm-5 d-none d-md-block" src="/Loomis/easy.svg"/>

        </Col>






        <Col className="col-4 d-xs-block d-sm-flex flex-row justify-content-around align-items-center mw-100 p-5 border-bottom">
          
        <dl className="col-sm-7 d-flex flex-column justify-content-center text-center" style={{zIndex:"2"}}>
            <span className="shadow-lg p-3 rounded mb-3 btn btn-outline-dark border-0 enlargeFont text-wrap">{props.currentLanguage.block4[0]}</span>
            <div className="text-wrap mt-3 text-dark h3">
              <center><span className="display-4">{props.currentLanguage.block4[1][0]} <span className="d-inline" style={{color:"royalblue"}}>{props.currentLanguage.block4[1][1]}</span></span>
              <div className="mb-4 pb-4"/>
              </center>
            </div>
            <Row className="d-flex flex-wrap justify-content-center align-items-center mt-4">
              <Col className="d-flex flex-column justify-content-center align-items-center p-4">
                <div className="h5 mb-2">{props.currentLanguage.block4[2][0]}</div>
                <div style={{height:"100px",width:"100px",backgroundImage:"url(/img/main/gradingStars.png)",backgroundRepeat:"no-repeat",backgroundPosition:"center center",backgroundSize:"100% 25%"}} className="rounded-circle"/>
              </Col>
              <Col className="d-flex flex-column justify-content-center align-items-center p-4">
                <div className="h5 mb-2">{props.currentLanguage.block4[2][1]}</div>
                <Image style={{maxHeight:"100px",maxWidth:"100px"}} src="/img/main/suggestions.svg"/>
              </Col>
            </Row>
          </dl>
        <Image className="col-sm-5 freeFun d-none d-md-block" src="/Loomis/fun.svg"/>

        </Col>






        <Col className="col-4 position-relative d-flex flex-column justify-content-center align-items-center mw-100 p-5 border-0 overflow-hidden" style={{backgroundImage:"url(/img/main/joinBG.jpg)",backgroundAttachment:"fixed",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center center"}}>
          <Image className="position-absolute" style={{top:0,right:"-20%",width:"65%",height:"150%"}} src="/img/main/stillHere.svg"></Image>
          <Link to="/signup" className="btn btn-outline-light mt-4 p-3 text-center rounded col-10 col-md-4" style={{boxShadow:"0px 0px 25px 0px black"}}>{props.currentLanguage.block5[0]}</Link>
          <Or text="light" border="light" width="25" or={props.currentLanguage.block5[1]}/>
          <Link to="/signin" className="btn btn-outline-primary p-3 text-center rounded col-10 col-md-4" style={{boxShadow:"0px 0px 25px 0px black"}}>{props.currentLanguage.block5[2]}</Link>
        </Col>
      </Row>
    </Container>
    </>
  );
}

const mapStateToProps = state=>({currentLanguage:state.currentLanguage.values.container})

export default connect(mapStateToProps)(MainContainer);
