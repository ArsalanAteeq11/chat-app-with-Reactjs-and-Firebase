import Chat from "./components/Chat/Chat"
import List from "./components/list/List"
import Detail from "./components/Detail/Detail"
import './index.css'
import Login from "./components/login/Login"
import Notification from "./components/notification/Notification"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./lib/firebase"
import { useUserStore } from "./lib/userStore"
import { useChatStore } from "./lib/useChatStore"
import { BrowserRouter } from "react-router-dom"



const App = () => {

  const {currentUser,isLoading,fetchUserInfo}= useUserStore()
  const {chatId}= useChatStore()

  console.log(chatId)

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (User) => {
      fetchUserInfo(User?.uid)
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  // console.log(currentUser)

  if(isLoading) return <div className="loading">Loading.....</div>
  return (
    <div className='container'>

      <BrowserRouter>
      {currentUser? (
        <>
        <List/>
        {chatId && <Chat/>}
       {chatId && <Detail/>}
      </>
        
      )
       :
       (
        <Login/>
       )
      }
      <Notification/>
</BrowserRouter>
    </div>
  )
}

export default App