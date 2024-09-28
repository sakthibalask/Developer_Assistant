import React, { useState } from "react";
import '../../assets/css/WorkspacePage.css';
import Planner from "./PlannerArea";
import CodeEditor from "./CodeEditor";
import Browser from "./Browser";

const Workspace = () =>{
    const [working, setWorking] = useState('toggle');
    const [curr, setCurr] = useState('planning');
    return(
        <body className={working === 'toggle' ? "workspace-body" : "workspace-body"}>
            <div className="workspace-header">
                <h1>DevGen's Workspace</h1>
                <div className="workspace-icons" onClick={()=>setWorking("off")}>
                    <i class="ri-apps-2-line"></i>
                </div>
            </div>
            <div className="workspace-container">
                <div className="workspace-tabBox">
                    <button className={curr === 'planning' ? "workspace-tabBtn work-active" : "workspace-tabBtn"} onClick={()=>setCurr('planning')}>Planner</button>
                    <button className={curr === 'editor' ? "workspace-tabBtn work-active" : "workspace-tabBtn"} onClick={()=>setCurr('editor')}>Editor</button>
                    <button className={curr === 'browser' ? "workspace-tabBtn work-active" : "workspace-tabBtn"} onClick={()=>setCurr('browser')}>Browser</button>
                    <button className={curr === 'testing' ? "workspace-tabBtn work-active" : "workspace-tabBtn"} onClick={()=>setCurr('testing')}>Test Code</button>
                </div>
                <div className="workspace-contentBox">
                    <div className="workspace-content">
                        {/* <h2>Home</h2> */}
                        {curr === 'planning' && <Planner/>}
                        {curr === 'editor' && <CodeEditor/>}
                        {curr === 'browser' && <Browser/>}
                    </div>
                </div>
            </div>
        </body>
    );
}

export default Workspace;