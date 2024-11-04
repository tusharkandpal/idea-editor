import { useNavigate } from "react-router-dom";
import './App.css'
import Nav from './components/nav/Nav'
import { v4 as uuidv4 } from 'uuid';
import { useCode } from "./context/code-context";
import { useEffect, useState } from "react";

function App() {
  const navigate = useNavigate();
  const [tempRoomId, setTempRoomId] = useState("");
  const { memberId, setMemberId, setRoomId } = useCode();

  const onClickHandler = () => {
    let newRoomId = ""
    if (tempRoomId) {
      newRoomId = tempRoomId;
    } else {
      newRoomId = uuidv4();
    }

    setRoomId(tempRoomId);
    localStorage.setItem("memberId", memberId);
    localStorage.setItem("roomId", newRoomId);

    navigate(`/code/${newRoomId}`, {
      state: {
        roomId: newRoomId
      }
    })
  }

  useEffect(() => {

    setMemberId("");
    setRoomId("");
    localStorage.clear();
  }, [])

  return (
    <div className='app'>
      <Nav />
      <div className='home'>
        <h1 className='home-header'>Share Code in Real-time with Developers</h1>
        <p className='home-brief'>
          An online code editor for interviews, troubleshooting, teaching & more…
        </p>
        <input
          type="text"
          title="name"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          placeholder="name..."
          className="home-input home-member"
        />
        <input
          type="text"
          title="roomId"
          value={tempRoomId}
          onChange={(e) => setTempRoomId(e.target.value)}
          placeholder="enter a custom room id..."
          className="home-input home-room"
        />
        <small style={{ marginBottom: "1rem" }}>or start a new room clicking below 👇</small>
        <button className="home-btn" onClick={() => memberId && onClickHandler()}>
          Start Coding...
        </button>
      </div>
    </div>
  )
}

export default App
