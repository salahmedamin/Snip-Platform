const succ = (props)=>(
    <>
    <svg space="preserve" viewBox="0 0 100 100" y="0" x="0" xmlns="http://www.w3.org/2000/svg" version="1.1" width="47px" height="47px" xlink="http://www.w3.org/1999/xlink"
    style={{width:"100%",height:"100%",backgroundSize:"initial",backgroundRepeatY:"initial",backgroundRepeatX:"initial",backgroundPositionY:"initial",backgroundPositionX:"initial",backgroundOrigin:"initial",backgroundImage:"initial",backgroundColor:"transparent",backgroundClip:"initial",backgroundAttachment:"initial",animationPlayState:"paused"}} >
        <g class="ldl-scale" style={{transformOrigin:"50% 50%",transform:"rotate(0deg) scale(0.8, 0.8)",animationPlayState:"paused"}} >
            <circle strokeMiterlimit="10" strokeWidth="8" stroke="#333" fill="none" r="40" cy="50" cx="50" style={{stroke:"rgb(171, 189, 129)",animationPlayState:"paused"}} ></circle>
        </g>
        <g style={{animationPlayState:"paused"}}>
            <path fill="#abbd81" d="M47.3 66.4L73.7 40c1.8-1.8 1.8-4.6 0-6.4-1.8-1.8-4.6-1.8-6.4 0L44.1 56.8 32.7 45.4c-1.8-1.8-4.6-1.8-6.4 0-1.8 1.8-1.8 4.6 0 6.4l14.6 14.6c.9.9 2 1.3 3.2 1.3s2.3-.5 3.2-1.3z" style={{fill:"rgb(171, 189, 129)",animationPlayState:"paused"}} ></path>
        </g>
    </svg>
    </>
),
warn = (props)=>(
    <svg version="1.1" x="0" y="0" viewBox="0 0 100 100" space="preserve">
        <path d="M41.6 18.9L11.3 71.4c-3.7 6.5.9 14.6 8.4 14.6h60.6c7.5 0 12.1-8.1 8.4-14.6L58.4 18.9c-3.7-6.4-13.1-6.4-16.8 0z" fill="#fff" stroke="#e15b64" strokeWidth="9" strokeMiterlimit="10"/>
        <circle cx="50" cy="69.4" r="5.4" fill="#333"/>
        <path d="M55.4 43.8c0 6-1.6 11.3-3.1 14.9-.8 2.1-3.8 2.1-4.7 0-1.5-3.6-3.1-9-3.1-14.9 0-8.9 2.4-11.9 5.4-11.9s5.5 3 5.5 11.9z" fill="#333"/>
    </svg>
),
err = (props)=>(
    <svg version="1.1" x="0" y="0" viewBox="0 0 100 100" space="preserve"><path d="M50.5 25.1c-.2-.4-.8-.4-1 0L18.2 74.3c-.1.2-.1.5.1.7l.1.2h62.8c.1 0 .4 0 .5-.3.2-.3 0-.6 0-.6L50.5 25.1z" fill="#f4e6c8"/>
        <path d="M57.2 20.6c-1.6-2.4-4.3-3.9-7.2-3.9-2.9 0-5.6 1.4-7.3 3.9L11.5 69.7c-1.8 2.7-2 6.1-.5 9 1.5 2.9 4.5 4.6 7.7 4.6h62.5c3.2 0 6.2-1.8 7.7-4.6 1.5-2.9 1.4-6.3-.4-9L57.2 20.6zm24.6 54.2c-.2.3-.4.3-.5.3H18.5l-.2-.1c-.2-.2-.2-.4-.1-.7l31.3-49.2c.3-.4.8-.4 1 0l31.3 49.1c0 .1.2.3 0 .6z" fill="#c33837"/>
        <path fill="#e15c64" d="M61.9 52L57 47.1l-7 7-7-7-4.9 4.9 7 7-7 7 4.9 4.9 7-7 7 7 4.9-4.9-7-7z"/>
    </svg>
)
export const Success=succ,Warning=warn,Error=err