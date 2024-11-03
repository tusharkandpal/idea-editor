import { useNavigate } from "react-router-dom";
import './App.css'
import Nav from './components/nav/Nav'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const navigate = useNavigate();

  const onClickHandler = () => {
    const roomId = uuidv4();
    navigate(`/code/${roomId}`)
  }

  return (
    <div className='app'>
      <Nav />
      <div className='home'>
        <h1 className='home-header'>Share Code in Real-time with Developers</h1>
        <p className='home-brief'>
          An online code editor for interviews, troubleshooting, teaching & more…
        </p>
        <button className="home-btn" onClick={onClickHandler}>
          Start Coding...
        </button>
      </div>
    </div>
  )
}

export default App
