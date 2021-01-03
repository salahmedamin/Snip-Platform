import {useState,useEffect} from 'react'
import {useLocation} from 'react-router-dom'
const WidthOnScroll = ()=>{
    const [width, setwidth] = useState("0%")
    const getVerticalScrollPercentage = ( elm )=>{
        var p = elm.parentNode
        return (elm.scrollTop || p.scrollTop) / (p.scrollHeight - p.clientHeight ) * 100
      }

    useEffect(() => {
        let scrollEv = ()=>{
            setwidth( getVerticalScrollPercentage(document.body) +"%")
        }
        document.addEventListener("scroll",scrollEv)
        return ()=>{
            document.removeEventListener("scroll",scrollEv)
        }
    }, [])
    return(
    <>
        <div className="bg-primary position-absolute pt-1" style={{width:width,bottom:0,left:0}}></div>
    </>
    )
}
export default WidthOnScroll