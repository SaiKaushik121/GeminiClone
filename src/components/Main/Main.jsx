import { assets } from "../../assets/assets";
import "./Main.css";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Main() {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  function handleSentPrompt() {
    onSent(input);
    setInput("")
  }

  function handlekeys(event) {

    if ( input!=="" && event.key === "Enter" && !event.shiftKey) {
       event.preventDefault();
      handleSentPrompt();
    }
  }
  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="User Icon" />
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello Developer...</span>
              </p>
              <p>How can I help you today</p>
              
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest Beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon}></img>
              </div>

              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon}></img>
              </div>

              <div className="card">
                <p>Brainstorm team bonding acitivities for our work retreat</p>
                <img src={assets.message_icon}></img>
              </div>

              <div className="card">
                <p>Improve the readability of the following code </p>
                <img src={assets.code_icon}></img>
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="user icon" />
              <p>{recentPrompt}</p>
            </div>

            <div className="result-data">
              <img src={assets.gemini_icon} alt="gemini icon" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <textarea
              onChange={(event) => setInput(event.target.value)}
              value={input}
              onKeyDown={handlekeys}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon}></img>
              <img src={assets.mic_icon}></img>
              {input?<img onClick={handleSentPrompt} src={assets.send_icon}></img>:null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini might produce inaccurate info, including about people, so
            double-check its responses
          </p>
        </div>
      </div>
    </div>
  );
}
