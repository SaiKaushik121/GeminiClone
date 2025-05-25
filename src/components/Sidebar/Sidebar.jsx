import "./Sidebar.css";

import { assets } from "../../assets/assets.js";
import { useState, useContext } from "react";
import { Context } from "../../context/Context.jsx";

export default function Sidebar() {
  const [extended, setExtended] = useState(false);
  const { prevoiusPrompt, setRecentPrompt,setResultData,setShowResult,newChat } = useContext(Context);

   async function loadPrompt(item){
  setRecentPrompt(item.prompt);
  setResultData(item.result);
  setShowResult(true);
}

  function handleMenu() {
    setExtended((prev) => !prev);
  }

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={handleMenu}
          className="menu"
          src={assets.menu_icon}
          alt="menu icon"
        />
        <div onClick={newChat} className="new-chat">
          <img src={assets.plus_icon} alt="plus icon" />
          {extended ? <p>New Chat</p> : null}
        </div>

        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent Chats</p>
            {prevoiusPrompt.map((item, index) => {
              return (
                <div key={index} onClick={()=>loadPrompt(item)} className="recent-entry">
                  <img src={assets.message_icon} alt="" />
                  <p>{item.prompt.slice(0,18)}...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="question mark" />
          {extended ? <p>Help</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="Activity icon" />
          {extended ? <p>Activity</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="settings icon" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
}
