import React, { useEffect, useState } from "react";
import Form from "./Form";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AiFillMail } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Login = ()=>{

    const nav = useNavigate();
    const [role, setRole] = useState(false);
    const showToast = (type, message, email, role) => {
        if(type === "success"){
            toast.success(message,{
                position: "top-right",
                autoClose: 5000,
            });
            setTimeout(()=>{
                if(role === 'user_student'){
                    nav('/');
                }
                if(role === 'user_company'){
                    nav('/');
                }
                if(role === 'admin'){
                    nav('/');
                }
            },5010);
            sessionStorage.setItem('email',email);
        }
        
        if(type === "warn"){
            toast.warn(message,{
                position: "top-right",
                autoClose: false,
            });

        }

        if(type === "info"){
            toast.info(message,{
                icon: AiFillMail,
                theme: "dark"
            });
        }

        if(type === "error"){
            toast.error(message,{
                position: "top-right",
                autoClose: 5000,
            })
        }

        if(type === "notfound"){
            toast.info(message, {
                position: "top-right",
                autoClose: false
            });
        }
    }

    return(
        <>
         <div className="w-full m-auto bg-white">
            <div className="flex w-full h-screen">
                <ToastContainer/>
                <div className="w-full flex items-center justify-center lg:w-1/2 bg-gradient-to-tr from-dark1 to-dark2">
                    <Form showToast={showToast}/>
                </div>
                <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gradient-to-tr from-dark1 to-dark2">
                    <div className="w-60 h-60 bg-gradient-to-tr from-darklight2 to-darklight1 rounded-full animate-bounce"/>
                    <div className="w-full h-full absolute bottom-0 bg-white/10 backdrop-blur-lg"/>
                    <div className="w-60 h-60 bg-gradient-to-tr from-darklight2 to-darklight1 rounded-full animate-bounce"/>
                </div>
            </div>
            {/* <Footer/> */}
            </div>
        </>
    );
}

export default Login;