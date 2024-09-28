import React, { useEffect, useState } from "react";
import '../../assets/css/ChatPage.css';
import Icon from '../../assets/images/devgenIcon.png';
import UserIcon from '../../assets/images/UserIcon.png';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ChatPage = () => {
    const nav = useNavigate();
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [islogged, setIslogged] = useState(false);
    const [query, setQuery] = useState('');
    const [chatTitles, setChatTitles] = useState([]); // State for chat titles
    const [currentChat, setCurrentChat] = useState(null); // State for the current chat messages
    const [chatMessages, setChatMessages] = useState([]); // State for the current chat messages

    const getToken = () => {
        const email = sessionStorage.getItem('email');
        setEmail(email);
        if (email !== null) {
            const data = { email: email };
            axios.post("http://localhost:8181/user/logged", data)
                .then(function (response) {
                    if (response.status === 200) {
                        setIslogged(true);
                        setToken(response.data.token);
                    }
                }).catch(function (error) {
                    if (error.response.status === 403) {
                        toast.warn(error.response.data.message, {
                            position: "top-right",
                            autoClose: 5000
                        });
                        setTimeout(() => {
                            nav('/user/auth');
                        }, 5005);
                        setIslogged(false);
                        sessionStorage.removeItem('email');
                    }
                });
        }
    }

    useEffect(() => {
        getToken();
        // Load chat titles from local storage
        const storedChatTitles = JSON.parse(sessionStorage.getItem('chatTitles')) || [];
        setChatTitles(storedChatTitles);
    }, []);

    const handleLogout = () => {
        axios.post("http://localhost:8181/user/logout", {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(function (response) {
            if (response.data.message === 'Logout successful') {
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 5000
                });
                sessionStorage.clear();
                setTimeout(() => {
                    nav('/user/auth');
                }, 5005);
            }
        }).catch(function (error) {
            if (error.response.status === 403) {
                toast.warn(error.response.data.message, {
                    position: "top-right",
                    autoClose: 5000
                });
                setTimeout(() => {
                    nav('/user/auth');
                }, 5005);
                setIslogged(false);
                sessionStorage.removeItem('email');
            }
        });
    };

    const handleNewChat = () => {
        const newChatId = Date.now(); // Unique chatId based on timestamp
        const newChatTitle = `Untitled`;
        
        setChatTitles([...chatTitles, newChatTitle]);
        setCurrentChat(newChatTitle); // Set the new chat as current chat
        setChatMessages([]); // Reset messages for new chat
    
        // Save the updated chat titles to session storage
        sessionStorage.setItem('chatTitles', JSON.stringify([...chatTitles, newChatTitle]));
        
        // Initialize an empty array for new chat messages
    };
    

    const handleQuery = () => {
        if(!islogged){
            toast.info("Create account to use the tool", {
                position: "top-right",
                autoClose: 5000
            });
            setTimeout(()=>{
                nav('/create/account');
            },5005);
           
        }
        if (!currentChat) return; // Don't proceed if there's no current chat
        const data = { query: query };
        axios.post('http://localhost:8181/devgen/chat', data)
            .then(function (response) {
                // Rename the current chat to the query name
                const updatedChatTitles = chatTitles.map(title => 
                    title === currentChat ? query : title
                );
                setChatTitles(updatedChatTitles);
                sessionStorage.setItem('chatTitles', JSON.stringify(updatedChatTitles));
    
                // Update the chat messages immediately
                const newMessages = [
                    { sender: 'user', text: query , chatId: `Chat_${updatedChatTitles.length}`},
                    { sender: 'devgen', text: `Your request "${query}" has been responded, check out the workspace.` }
                ];
                setChatMessages([...chatMessages, ...newMessages]); // Append new messages
                setCurrentChat(query); // Update the current chat title
                setQuery(''); // Clear the input
    
                // Store plans and code for future use
                const fetchedPlans = response.data.plans;
                sessionStorage.setItem('plans', JSON.stringify(fetchedPlans));
                const fetchedCode = response.data.code_editor;
                sessionStorage.setItem('codes', JSON.stringify(fetchedCode));
                sessionStorage.setItem(`Chat_${updatedChatTitles.length}`, JSON.stringify({fetchedPlans, fetchedCode }));
    
                // Update sessionStorage with the new current chat title
                sessionStorage.setItem(query, JSON.stringify([...chatMessages, ...newMessages]));
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    useEffect(()=>{
        try{
            const fetchedChatTitle = JSON.parse(sessionStorage.getItem('chatTitles'))[0];
            setCurrentChat(fetchedChatTitle);
            const storedMessages = JSON.parse(sessionStorage.getItem(fetchedChatTitle)) || [];
            setChatMessages(storedMessages);
        }catch(error){
            console.error(error);
            
        }
    },[]);
    

   
const handleChatSelect = (title) => {
    setCurrentChat(title);
    const storedMessages = JSON.parse(sessionStorage.getItem(title)) || [];
    sessionStorage.setItem('currentChat', storedMessages[0].chatId);
    // Load messages for the selected chat from sessionStorage
    setChatMessages(storedMessages);
};
    

    return (
        <>
            <ToastContainer />
            <body className="code-body">
                <div className="code-sidebar">
                    <div className="code-upperSidebar">
                        <div className="code-upperSideTop">
                            <img src={Icon} alt="" className="code-img code-logo" />
                            <span className="code-brand">DevGen</span>
                        </div>
                        <button className="code-midBtn" onClick={handleNewChat}> <i className="ri-add-line"></i> New Chat</button>
                        <div className="code-upperSideBottom">
                            {chatTitles.map((title, index) => (
                                <button key={index} className="code-query" onClick={() => handleChatSelect(title)}>
                                    <i className="ri-message-3-line"></i>{title}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="code-lowerSidebar">
                        <div className="code-listItems code-upgrade"><i className="ri-vip-crown-fill"></i> Upgrade To Dev</div>
                        <div className="code-listItems"><i className="ri-home-2-line"></i> Home</div>
                        {!islogged ? (
                            <div className="code-listItems" onClick={() => nav('/user/auth')}><i className="ri-login-box-line"></i>  Login</div>
                        ) : (
                            <div className="code-listItems" onClick={handleLogout}><i className="ri-logout-box-line"></i>  Logout</div>
                        )}
                    </div>
                </div>
                <div className="code-mainArea">
                    <div className="code-chats">
                        {currentChat && currentChat != "Untitled" ? (
                            chatMessages.map((msg, index) => (
                                <div key={index} className={`code-chat code-${msg.sender}`}>
                                    <img src={msg.sender === 'user' ? UserIcon : Icon} alt="" className="code-chatImg" />
                                    <p className="code-txt">{msg.text}</p>
                                </div>
                            ))
                        ):(
                            <div className="code-chat code-devgen">
                            <img src={Icon} alt="" className="code-chatImg" />
                            <p className="code-txt">Hi there!, I'm DevGen and I'm an automated software engineer.</p>
                            </div>
                        )}
                        
                    </div>
                    <div className="code-chatFooter">
                        <div className="code-inp">
                            <input type="text" placeholder="Describe your Project" className="code-input" value={query} onChange={(e) => setQuery(e.target.value)} />
                            <button className="code-send" onClick={handleQuery}><i className="ri-send-plane-2-line"></i></button>
                        </div>
                        <p className="code-dis">DevGen can produce inaccurate information about people, places, or facts. DevGen October 2024 Version.</p>
                    </div>
                </div>
            </body>
        </>
    );
}

export default ChatPage;
