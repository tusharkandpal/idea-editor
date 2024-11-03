import { Link } from "react-router-dom"
import EditorLogo from "../../assets/ideaeditor-logo.svg"

const Nav = () => {
    return (
        <div className="nav">
            <Link to="/">
                <img src={EditorLogo} className="logo" alt="editor logo" />
            </Link>
        </div>
    )
}

export default Nav