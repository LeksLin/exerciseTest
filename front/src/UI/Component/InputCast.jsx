import React, { useState } from "react";
import cl from "./InputCast.module.css";

const InputCast = ({nameInput, messageInput, type, placeholder, register}) => {
    return (
        <div>
            <div className={cl.inputCont}>
                <label className={cl.labelInput}>{nameInput}</label> 
                <input 
                className={cl.input}
                    {...register}  
                    type={type}
                    placeholder={placeholder}
                />
                <span className={cl.message}>{messageInput}</span>
            </div>
        </div>
    )
}

export default InputCast;