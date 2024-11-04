import { Link } from "react-router-dom"
import EditorLogo from "../../assets/ideaeditor-logo.svg"
import { useCode } from "../../context/code-context"

const Nav = () => {
    const { memberId, roomId, memberTyping } = useCode();

    return (
        <div className="nav">
            <Link to="/">
                <img src={EditorLogo} className="logo" alt="editor logo" />
            </Link >
            {roomId &&
                <p className="nav-room">ROOM ID: {roomId}</p>}
            <div className="nav-right">
                {roomId && (
                    <div className="nav-members">
                        <p className="nav-user">Welcome {memberId} !</p>
                        <small className="nav-typing">{memberTyping ? `${memberTyping} is typing...` : "editor is idle"}</small>
                    </div>)
                }
            </div>
        </div >
    )
}

export default Nav