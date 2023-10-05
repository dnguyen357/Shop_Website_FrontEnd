import { useState,useEffect } from "react"
import { useNavigate,useLocation } from "react-router-dom";
import { useContext } from 'react';
import { ShopContext } from '../components/shopList';
import { Link } from "react-router-dom";
export default function SignIn({setUser}){
  const BASE_URL = `https://store-dcq8.onrender.com/api`
    const { setToken,setId ,setUserId}= useContext(ShopContext)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const signup = "Don't have an account? Sign Up" 
    async function handleLogin(e){
      
      console.log("clicked submit in login page")
      e.preventDefault()
        try {
            const response = await fetch(`${BASE_URL}/users/login`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                "username": username,
                "password": password
                
              })
            });

            const result = await response.json();
            console.log(result)
            setToken(result.token)
            setUserId(result._id)
            setUser(result.username)
            navigate('/')
          
          } catch (err) {
            console.error(err);
          }
        
    }
  
    return (
        <div>
          
            <form className="form-login"onSubmit={handleLogin} >
            <p className="signin-title">Sign in</p>
            <label>
                <div><input value={username} placeholder="Username" type="username" className="username" onChange={(e)=>{ setUsername(e.target.value) }}/></div>
                
            </label>
            <label>
                <div><input value={password} placeholder="Password" type="password" className="password" onChange={(e)=>{ setPassword(e.target.value) }}/></div>
            </label>
            <button type="submit" >Sign In</button>
            <div>
                <Link to={`/Signup`}>
                  {signup}
                </Link>
            </div>
            </form>
        </div>
    )
}