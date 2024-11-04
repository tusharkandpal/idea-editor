import { useEffect, useMemo } from 'react';
import { javascript } from '@codemirror/lang-javascript';
import { io } from 'socket.io-client';
import CodeMirror from '@uiw/react-codemirror';
import Nav from '../../components/nav/Nav';
import { useLocation } from 'react-router-dom';
import useThrottle from '../../hooks/useThrottle';
import { useCode } from '../../context/code-context';

const socket = io("https://idea-editor-server.glitch.me",
    { path: "/socket.io", transports: ["websocket", "polling"], secure: true }
);
// const socket = io(`http://localhost:8000`);
let timerId: number;
const THROTTLE_TIME_MS = 1000;

const Code = () => {
    const { setMemberTyping, code, setCode, memberId, roomId, setRoomId, loading, setLoading } = useCode();
    const location = useLocation();

    const handleChange = (newCode: string) => {
        setCode(newCode);
        socket.emit('code-change', { roomId, code: newCode, memberTyping: memberId });
    }
    const throttle = useThrottle(handleChange, THROTTLE_TIME_MS);
    const onChange = useMemo(() => throttle, []);

    useEffect(() => {
        console.log(`useEffect for socket :: ${socket.id} ::: roomId :: ${roomId}`)
        if (roomId && memberId) {
            socket.emit('create-room', ({ roomId, memberId }));
            socket.on('code-change',
                ({ code, memberTyping }) => {
                    setCode(code);
                    setMemberTyping(memberTyping);

                    if (timerId) clearTimeout(timerId);

                    timerId = setTimeout(() => {
                        setMemberTyping("")
                    }, 1000);
                });
        }
    }, [roomId]);

    useEffect(() => {
        if (location.state.roomId) {
            setRoomId(location.state.roomId);
        }
        setLoading(false);
    }, []);


    return useMemo(() => {
        return (
            <div className='code'>
                <Nav />
                {loading ?
                    <div className='code-loader'>
                        <p className='code-loading-state'>loading code...</p>
                    </div>
                    : <CodeMirror
                        value={code}
                        extensions={[javascript({ jsx: true })]}
                        onChange={onChange}
                        theme={'dark'}
                    />
                }
            </div>
        )
    }, [code])
}

export default Code