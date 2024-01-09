import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import axios from "axios"
export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect,setRedirect]=useState(false);

    async function registerUser(e) {
        e.preventDefault(); // submit hone pr page load nii hoga
        try {
            await axios.post('/RegisterUser', {
                name,
                email,
                password,
            });  //axios.defaults.baseURL='http://localhost:4000' isko repeatedly nii likhna pade isiliye baseURL me  daal diye in app.jsx
            setRedirect(true);
            alert('Registration Successfull, Now You can Login to your Account');
        } catch (error) {
            alert('Registration Failed , Please try again later');
        }
    }

    if(redirect){
        return <Navigate to={'/LoginPage'}/>
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-lg mx-auto my-2" onSubmit={registerUser}>
                    <input type="text"
                        placeholder="your name"
                        value={name}
                        onChange={evnt => setName(evnt.target.value)} />
                    <input type="email"
                        placeholder="your@gmail.com"
                        value={email}
                        onChange={evnt => setEmail(evnt.target.value)} />
                    <input type="password"
                        placeholder="Password"
                        value={password}
                        onChange={evnt => setPassword(evnt.target.value)} />
                    <button className="primary">Register</button>
                    <div className="text-center py-2 text-gray-500">Already Have an Account?
                        <Link to={'/LoginPage'} className="underline text-blue "> Login</Link>
                    </div>
                </form>
            </div>
        </div>

    )
}
