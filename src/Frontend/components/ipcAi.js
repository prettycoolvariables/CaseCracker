import { useState, useRef, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { CiLocationArrow1 } from "react-icons/ci";
import "../style/ipcai.css";

const IpcAi = () => {
    const [clicked, setClicked] = useState(false);
    const [currentInput, setCurrentInput] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const chatBoxScreenRef = useRef(null);
    const [loading, setLoading] = useState(false); // State to manage loading

    const handleCurrentInput = (e) => {
        setCurrentInput(e.target.value);
    };

    const run = async () => {
        console.log("inside fetch");
        setLoading(true); // Set loading state to true before fetching
        try {
            const response = await fetch('http://localhost:8080/ask_pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query: currentInput })
            });
            const data = await response.json();
            console.log("returning data");
            setLoading(false); // Set loading state to false after fetching
            return data;
        } catch (err) {
            console.error('Error sending query:', err);
            setLoading(false); // Set loading state to false in case of error
            return { answer: "Error occurred while fetching response", sources: [] };
        }
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
            const data = await run();
            setChatMessages(prevMessages => [
                ...prevMessages,
                {
                    text: data.answer,
                    userinput: false,
                    sources: data.sources // Assuming sources are returned in data
                }
            ]);
        }
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
        <div className={`ipc-ai-container ${clicked ? 'clicked' : ''}`}>
            {
                !clicked ? (
                    <div className="ipc-ai-button" onClick={() => setClicked(!clicked)}>
                        chat with a professional lawyer AI
                    </div>
                ) : (
                    <div className="ipc-ai-chat-box">
                        <div className="ipc-ai-chat-box-header">
                            <IoCloseSharp color="black" size={20} onClick={() => setClicked(!clicked)} />
                        </div>
                        <div className="ipc-ai-chat-box-screen" ref={chatBoxScreenRef}>
                            {chatMessages.map((message, index) => (
                                <div key={index} className={`${message.userinput ? 'user-message' : 'bot-message'}`}>
                                    <p>{message.text}</p>
                                    {!message.userinput && message.sources && message.sources.length > 0 && (
                                        <div className="sources">
                                            <p><strong>Sources:</strong></p>
                                            <ul>
                                                {message.sources.map((source, idx) => (
                                                      <li key={idx}>{source.source}: {source.page_content}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {loading && <p>Loading...</p>} {/* Display loading message if loading state is true */}
                        </div>
                        <div className="ipc-ai-chat-box-inputs">
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

export default IpcAi;
