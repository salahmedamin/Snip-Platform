import Viewers from "../../../../SVG/Messages/MessageOptions/viewers"
const MessageGroupViewersSmallBadge = props=>(
    <div style={{
        right:!props.isSender ? "22px" : null,
        left:props.isSender ? "22px" : null,
        bottom:2,
        fontSize: "9px",
        }}
        className="position-absolute d-flex justify-content-center align-items-center text-light"
        >
            <span className="mr-1">{props.viewersCount}</span> <Viewers width="13px" height="13px" />
    </div>
)
export default MessageGroupViewersSmallBadge