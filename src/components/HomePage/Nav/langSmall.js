import store from "../../../redux-data/store"
import Globe from "../../SVG/globe"
export default (props)=>{
    
    return(<div onClick={()=>store.dispatch({type:"SWITCH_LANG_BAR"})} className="position-fixed d-flex rounded-bottom p-2 justify-content-center align-items-center" style={{boxShadow:"0px 3px 4px .2px black",cursor:"pointer",width:"auto",minWidth:"100px",zIndex:4000000,height:"35px",top:"92%",right:"15px",backgroundColor:"royalblue"}}>
      
      <div style={{bottom:"100%",right:"0"}} className={"langs-div position-absolute w-100 rounded-top"+(props.showLangsBar ? " show" : "")}>
        <div className={"lang d-flex flex-column justify-content-center align-items-center"}>
          {
            props.LanguagesArray.map((v,i)=>(
                <span key={i} className="d-flex flex-row w-100 p-2 text-center justify-content-around border-bottom langHolder" style={{cursor:"pointer",backgroundColor:v.name == props.currentLanguage.name ? "royalblue": ""}} onClick={()=>store.dispatch({type:"CHANGE_LANG",payload:{name:v.name}})}>
                  <img src={"/img/lang/"+v.logo} style={{height:"30px",width:"30px"}}/>
                  <div className="w-75" style={{fontFamily:"Gruppo",color:v.name == props.currentLanguage.name ? "white": ""}}>{v.name.toUpperCase()} {v.name == props.currentLanguage.name ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg> : ""}</div>
                </span>
            ))
          }
        </div>
      </div>
      <Globe/>
      <span style={{marginLeft:"5px",color:"white"}}>{props.currentLanguage.values.navbar.lang}</span>
    </div>)
}