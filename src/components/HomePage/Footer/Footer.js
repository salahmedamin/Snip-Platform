import Logo from "../../SVG/Logo"
const Footer = ()=>{
    return (
    <div className="w-100 d-flex" style={{height:"80px"}}>
        <div className="bg-dark position-relative d-flex justify-content-start align-items-center" style={{clipPath:"polygon(0 0,80px 0, 30px 80px,0 80px)",width:"80px",height:"80px"}}>
            <Logo />
        </div>
        <div className="h-100 d-flex flex-column justify-content-center align-items-center" style={{width:"calc( 100% - 80px )",fontFamily:"Alegreya Sans SC"}}>
            <div><strong>THIS WEBSITE HAS BEEN DESIGNED BY AMIN SALAH</strong></div>
            <div className="d-flex justify-content-center">
                <a href="https://github.com/salahmedamin" style={{marginRight:"5px"}}><img src="https://cdn.onlinewebfonts.com/svg/img_326384.png" alt="" width="30" height="30"/></a>
                <a href="https://www.linkedin.com/in/aminsalah/" style={{marginRight:"5px"}}><img src="https://icon-library.com/images/linkedin-icon-no-background/linkedin-icon-no-background-8.jpg" alt="" width="30" height="30"/></a>
                <a href="https://www.instagram.com/amin._.salah/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png" alt="" width="30" height="30"/></a>
            </div>
        </div>
    </div>)
}
export default Footer