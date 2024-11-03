import { useCallback, useEffect, useState } from 'react';
import { javascript } from '@codemirror/lang-javascript';
import { io } from 'socket.io-client';
import CodeMirror from '@uiw/react-codemirror';
import Nav from '../../components/nav/Nav';
import { useLocation } from 'react-router-dom';

const socket = io(`https://idea-editor-server.vercel.app`);
// const socket = io(`http://localhost:8000`);

const Code = () => {
    const [code, setCode] = useState("");
    const location = useLocation();
    const roomId = location.pathname.split("code/")[1]

    const onChange = useCallback((newCode: string) => {
        setCode(newCode);
        socket.emit('code-change', { roomId, code: newCode });
    }, []);

    useEffect(() => {
        console.log(`useEffect for socket :: ${socket.id} ::: roomId :: ${roomId}`)
        socket.emit('create-room', (roomId));
        socket.on('code-change', (newCode) => setCode(newCode));
    }, [roomId]);

    return (
        <div className='code'>
            <Nav />
            <CodeMirror
                value={code}
                extensions={[javascript({ jsx: true })]}
                onChange={onChange}
                theme={'dark'}
            />
        </div>
    )
}

export default Code