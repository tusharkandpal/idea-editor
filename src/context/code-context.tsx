import { createContext, useContext, useState } from "react";
import { CodeContextType } from "./code-context.types";

const CodeContext = createContext<CodeContextType>({} as CodeContextType);

const CodeProvider = ({ children }: { children: React.ReactNode }) => {
    const [code, setCode] = useState("");
    const [memberId, setMemberId] = useState(localStorage.getItem("memberId") || "");
    const [memberTyping, setMemberTyping] = useState("");
    const [roomId, setRoomId] = useState(localStorage.getItem("roomId") || "");
    const [loading, setLoading] = useState(true);

    return (
        <CodeContext.Provider value={{ code, setCode, memberId, setMemberId, loading, setLoading, roomId, setRoomId, memberTyping, setMemberTyping }}>
            {children}
        </CodeContext.Provider>
    );
}

const useCode = () => useContext(CodeContext);

export { CodeProvider, useCode };