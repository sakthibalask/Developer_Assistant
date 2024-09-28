import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillGoogleCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Register = () =>{
    const nav = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleRegister = () =>{
        if(email==='' && password=== '' && role === ''){
            toast.error("All feilds must be filled",{
                position: "top-right",
                autoClose: 5000,
            });
        }
        else{
            const data = {
                email:email,
                password: password,
                role: role
            }
            console.log(data);
            axios.post('http://localhost:8181/signup',data)
            .then(function(response){
                toast.success(response.data.message,{
                    position: "top-right",
                    autoClose: 5000,
                    });
                sessionStorage.setItem('email',email);
                setTimeout(()=>{
                    nav('/user/auth');
                },5005);
            })
            .catch(function(error){
                if(error.response.status === 409){
                    toast.warn(error.response.data.error,{
                        position: "top-right",
                        autoClose: 5000,
                    });
                }
            })
        }
    }

    return(
        <>
         <div className="w-[85%] m-auto bg-white">
        <main className="min-h-screen flex flex-col items-center justify-center">
            <ToastContainer/>
            <div className="space-y-3 my-5">
                <h1 className="mb-6 text-3xl font-extrabold">Create an account</h1>
                <p className="text-center">
                    or 
                    <a className="text-indigo-600 border-b border-indigo-600 cursor-pointer" onClick={()=>nav('/user/auth')}> Already have an account? Sign in</a>
                </p>
            </div>
            <div className="max-w-md w-full mx-auto bg-textColor rounded-lg p-7 space-y-7">
                <div className="flex flex-col ">
                    <label htmlFor="email" className="text-[14px] font-medium text-lightmainColor">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="Enter your mail" className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent text-light"/>
                </div>
                <div className="flex flex-col ">
                    <label htmlFor="password" className="text-[14px] font-medium text-lightmainColor">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="Enter your password" className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent text-light"/>
                </div>
                <div className="flex flex-col ">
                    <label htmlFor="newpassword" className="text-[14px] font-medium text-lightmainColor">Role</label>
                    <input type="text" value={role} onChange={(e) => setRole(e.target.value)} id="newpassword" placeholder="Enter your Role Eg: Student, Company" className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent text-light"/>
                </div>
                <div className="flex">
                    <div className="flex items-center space-x-2">
                        <input type="checkbox" id="agree"/>
                        <label htmlFor="agree" className="text-White">I agree all <a href="" className="text-lightmainColor border-b border-lightmainColor"> Terms and Conditions</a></label>
                    </div>
                </div>
                <div className="mt-8 flex flex-col gap-y-4">
                    <button className="active:scale-[0.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-4 bg-White text-textColor text-lg font-bold rounded-xl" onClick={()=>handleRegister()}>Create</button>
                </div>
            </div>
        </main>
        </div>
        </>
    );
}

export default Register;