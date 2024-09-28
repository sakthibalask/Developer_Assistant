import React from "react";
import '../../assets/css/HomePage.css';
import Workspace from "./WorkspacePage";
import ChatPage from "./ChatPage";

const HomePage = () =>{
    return(
        <>
            <div className="chat-main">
                <div className="chat-leftSide">
                        <ChatPage/>
                </div>
                <div className="chat-rightSide">
                        <Workspace/>
                </div>
            </div>
        </>
    );
}

export default HomePage;


// https://youtu.be/EzkWAviyYgg?si=ki6QQ8p-uI-cN4le