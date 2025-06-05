import Main from "./components/Main/Main";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./components/Login/Login";
import { useContext } from "react";
import { Context } from "./context/Context";


export default function App(){
  const { user } = useContext(Context);
  if (!user) {
    return <Login />;
  }
  return (
   <>
   <Sidebar></Sidebar>
   <Main></Main>
   </>
  )

}