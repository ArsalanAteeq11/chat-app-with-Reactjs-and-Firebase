import React, { useState } from 'react'
import './login.css'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, } from 'firebase/auth'
import { auth, db } from '../../lib/firebase'
import { doc, setDoc } from 'firebase/firestore'
import upload from '../../lib/upload'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
    const [avatar,setAvatar]=useState({
        file:null,
        url:""
    })

    const [loading,setLoading] = useState(false)

    const handleAvatar =(e)=>{
        if(e.target.files[0]){
            setAvatar({
                file:e.target.files[0],
                url:URL.createObjectURL(e.target.files[0])
            })
        }
        
    }

    const handleRegister = async(e)=>{
      e.preventDefault()
      setLoading(true)
      const formData = new FormData(e.target)

      const {username,email,password} = Object.fromEntries(formData)
      try {
        const res = await createUserWithEmailAndPassword(auth,email,password)

        const imgUrl = await upload(avatar.file)

        await setDoc(doc(db,"users",res.user.uid),{
          username,
          email,
          avatar:imgUrl,
          id:res.user.uid,
          Blocked:[]
        })
        await setDoc(doc(db,"userchats",res.user.uid),{
          chats:[]
        })
        toast.success("account created! You can login now!")
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }finally{
        setLoading(false)
      }
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      const formData = new FormData(e.target);
      const { email, password } = Object.fromEntries(formData);
  
      try {
        await signInWithEmailAndPassword(auth, email, password);
        
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
  return (
    <div className='login'>
      <div className="item">
        <h2>Welcome back,</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" name="email" placeholder='Email' />
            <input type="password" name="password" placeholder='Password' />
            <button disabled={loading}>{loading ?"loading..." : "Sign In"}</button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
      <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
            <label htmlFor="file">
                <img src={avatar.url || "./avatar.png"} alt="" />
                Upload an image</label>
            <input type="file" id="file" style={{display:"none"}} onChange={handleAvatar}/>
            <input type="text" name="username" placeholder='Username' />
            <input type="text" name="email" placeholder='Email' />
            <input type="password" name="password" placeholder='Password' />
            <button disabled={loading}>{loading ?"loading..." : "Sign Up"}</button>
        </form>
      </div>
    </div>
  )
}

export default Login
