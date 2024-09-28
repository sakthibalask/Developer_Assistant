import React, { useState } from "react";
import { AiFillGoogleCircle } from "react-icons/ai";

import axios from "axios";
import { useNavigate } from "react-router-dom";


const Form = ({ showToast })=>{
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccess, setLoginSucess] = useState(false);
    const nav = useNavigate();

    const handleLogin = () =>{
        if(email === '' || password === ''){
            showToast("error","All feilds must be filled");
        }else{
            const data = {
                email:email,
                password:password
            }
            showToast("warn", "Fetching your credentials Don't Refresh");
            axios.post('http://localhost:8181/auth',data)
            .then(function(response) {
                showToast("success",response.data.message, email, response.data.role);
            }).catch(function(error){
                if(error.response.status === 401){
                    showToast("error",error.response.data.error);
                }
                if(error.response.status === 404){
                    showToast("notfound", error.response.data.error);
                    nav('/create/account');
                }
               
            });

            
        }
        
    }

    const handleForgot = () =>{
        if(email === ''){
            showToast("warn", "Enter your email");
        }else{
            const data = {
                email: email
            }
            axios.post('http://localhost:8181/auth/forgot',data)
            .then(function(response){
                showToast("info", response.data.message);
            }).catch(function(error){
                if(error.response.status === 404){
                    showToast("notfound", error.response.data.error);
                }
            })
        }
    }



    return(
        <>
            <div className="bg-textColor px-20 py-10 rounded-3xl border-2 border-textColor">
                <h1 className="text-5xl font-semibold text-White">Welcome Back</h1>
                <p className="font-medium text-[15px] text-lightmainColor mt-4">Hi 👋👋 Enter your credentails</p>
                <div className="mt-8">
                    <div>
                        <label htmlFor="" className="text-[14px] font-medium text-light">Email</label>
                        <input type="email"  value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Mail" className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent text-lightmainColor"/>
                    </div>
                    <div>
                        <label htmlFor="" className="text-[14px] font-medium text-light mb-4">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your Password" className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent text-lightmainColor"/>
                    </div>
                    <div className="mt-8 flex justify-between items-center">
                        <div>
                            <input type="checkbox"  id="remember"/>
                            <label htmlFor="remember" className="ml-2 font-medium text-base text-light">Remember me</label>
                        </div>
                        <button className="font-medium text-base text-lightmainColor" onClick={handleForgot}>Forgot Password ?</button>
                    </div>
                    <div className="mt-8 flex flex-col gap-y-4">
                        <button 
                            className="active:scale-[0.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-4 bg-White text-textColor text-lg font-bold rounded-xl"
                            onClick={handleLogin}
                        >
                            Sign In
                        </button>
                        <button className="active:scale-[0.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-4 bg-White text-textColor text-lg font-bold rounded-xl flex items-center justify-center gap-2">
                            <AiFillGoogleCircle className="text-[20px] text-dark"/>
                            Sign In with Google
                        </button>
                    </div>
                    <div>
                        <p className="font-medium text-[15px] text-lightmainColor mt-4">Don't have an account ? <span className="text-lightSucess cursor-pointer" onClick={()=>nav('/create/account')}>Register</span></p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Form;