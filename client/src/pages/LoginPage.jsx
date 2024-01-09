import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom"
import { UserContext } from "../context/UserContext";

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect,setRedirect]=useState(false);
    const {setUser}=useContext(UserContext)

    async function loginUser(e) {
        e.preventDefault(); // submit hone pr page load nii hoga
        try {
            const userInfo=await axios.post('/LoginUser', {email,password});//axios.defaults.baseURL='http://localhost:4000' isko repeatedly nii likhna pade isiliye baseURL me  daal diye in app.jsx
            setUser(userInfo.data);
            alert('Login Successfull');
            setRedirect(true);
        } catch (error) {
            alert('Login Failed , Please try again later');
        }
    }
    if(redirect){
        return <Navigate to={'/'}/>
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-lg mx-auto my-2" onSubmit={loginUser}>
                    <input type="email" placeholder="your@gmail.com" 
                    value={email}
                    onChange={evnt => setEmail(evnt.target.value)}/>
                    <input type="password" placeholder="password" 
                    value={password}
                    onChange={evnt => setPassword(evnt.target.value)}/>
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-500">Don't Have an Account yet?
                    <Link to={'/RegisterPage'} className="underline text-blue "> Register</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
