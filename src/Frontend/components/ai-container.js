import { useState, useRef, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { CiLocationArrow1 } from "react-icons/ci";
import "../style/ai-container.css";

const AiButton = () => {
    const [clicked, setClicked] = useState(false);
    const [currentInput, setCurrentInput] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const chatBoxScreenRef = useRef(null);

    const handleCurrentInput = (e) => {
        setCurrentInput(e.target.value);
    };

    const run = () => {
        return "Hi, how are you?";
    };

    const arrowButtonClick = async () => {
        if (currentInput.trim() !== "") {
            setChatMessages(prevMessages => [
                ...prevMessages,
                {
                    text: currentInput,
                    userinput: true
                }
            ]);
            setCurrentInput('');
        }
        const resp = run();
        setChatMessages(prevMessages => [
            ...prevMessages,
            {
                text: resp,
                userinput: false
            }
        ]);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            arrowButtonClick();
        }
    };

    useEffect(() => {
        if (chatBoxScreenRef.current) {
            chatBoxScreenRef.current.scrollTop = chatBoxScreenRef.current.scrollHeight;
        }
    }, [chatMessages]);

    return (
        <div className={`ai-container ${clicked ? 'clicked' : ''}`}>
            {
                !clicked ? (
                    <div className="ai-button" onClick={() => setClicked(!clicked)}>
                        Get a Free Consultation
                    </div>
                ) : (
                    <div className="ai-chat-box">
                        <div className="ai-chat-box-header">
                            <IoCloseSharp color="black" size={20} onClick={() => setClicked(!clicked)} />
                        </div>
                        <div className="ai-chat-box-screen" ref={chatBoxScreenRef}>
                            {chatMessages.map((message, index) => (
                                <div key={index} className={`${message.userinput ? 'user-message' : 'bot-message'}`}>
                                    {message.text}
                                </div>
                            ))}
                        </div>
                        <div className="ai-chat-box-inputs">
                            <input
                                type="text"
                                placeholder="Ask a Question.."
                                value={currentInput}
                                onChange={handleCurrentInput}
                                onKeyDown={handleKeyDown}
                            />
                            <CiLocationArrow1
                                color="black"
                                size={30}
                                onClick={arrowButtonClick}
                            />
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default AiButton;
