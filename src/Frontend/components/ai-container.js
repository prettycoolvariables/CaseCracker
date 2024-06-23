import { useState, useRef, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { CiLocationArrow1 } from "react-icons/ci";
import "../style/ai-container.css";

const AiButton = () => {
    const [clicked, setClicked] = useState(false);
    const [currentInput, setCurrentInput] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const chatBoxScreenRef = useRef(null);
    const [resp,setResp] = useState('')
    const handleCurrentInput = (e) => {
        setCurrentInput(e.target.value);
    };

    const run = async () => {
        console.log("inside fetch");
        try {
            const response = await fetch('http://localhost:8080/ask_pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query: currentInput })
            });
            const data = await response.json();
            // console.log(data);
            // setResp(data.answer)
            // console.log(resp);
            console.log("returning data");
            return data;
        } catch (err) {
            console.error('Error sending query:', err);
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
            const data = await run()
            // console.log(data.answer);
            // const response = await run();
            setChatMessages(prevMessages => [
                ...prevMessages,
                {
                    text: data.answer,
                    userinput: false,
                    // sources: response.sources
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
