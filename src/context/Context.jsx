import { createContext, useState, useEffect } from "react";
import main from "../config/gemini";
import { auth, provider, db } from "../firebase";
import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevoiusPrompt, setPrevoiusPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [user, setUser] = useState(null);

  function delayPara(index, nextWord) {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  }

  function newChat(){
    setLoading(false)
    setShowResult(false)
  }

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await firebaseSignOut(auth);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const querySnap = await getDocs(
          collection(db, "users", currentUser.uid, "chats")
        );
        const chats = querySnap.docs.map((d) => d.data());
        setPrevoiusPrompt(chats);
      } else {
        setPrevoiusPrompt([]);
      }
    });
    return unsub;
  }, []);

 const onSent = async (prompt) => {
  let response;
  let responseArray;
  let newResponse = "";
  let newResponse2;
  let newResponseArray;

  setResultData("");
  setLoading(true);
  setShowResult(true);

  try {
    const usedPrompt = prompt !== undefined ? prompt : input;

    setRecentPrompt(usedPrompt);
    // Call API
    response = await main(usedPrompt);

    // Format response
    responseArray = response.split("**");
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    newResponse2 = newResponse.split("*").join("</br>");
    newResponseArray = newResponse2.split(" ");

    // Save the prompt and its result
    setPrevoiusPrompt((prev) => [...prev, { prompt: usedPrompt, result: newResponse2 }]);
    if (user) {
      try {
        await addDoc(collection(db, "users", user.uid, "chats"), {
          prompt: usedPrompt,
          result: newResponse2,
        });
      } catch (e) {
        console.log(e);
      }
    }

    // Animate result
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
  } catch (Error) {
    console.log(Error);
  }

  setLoading(false);
};


  const contextValue = {
    prevoiusPrompt,
    setPrevoiusPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    setShowResult,
    setResultData,
    setLoading,
    newChat,
    user,
    signInWithGoogle,
    logout
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
