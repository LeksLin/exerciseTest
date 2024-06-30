import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useForm} from "react-hook-form";
import PostService from '../../API/PostService';
import InputCast from "../Component/InputCast";
import cl from "./Authorization.module.css"
import clStyle from "../style.module.css";

const Authorization = () => {
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = (data) => {
        PostService.postAuthorization(data).then((result) => {
            if(result){
                navigate('/people');
            }
        })
    };
    return (
        <div>
            <form className={`${clStyle.container} ${cl.container}`} onSubmit={handleSubmit(onSubmit)}>
                <h1>Авторизация</h1>
                <InputCast 
                    nameInput="Email" 
                    messageInput={errors.email?.message} 
                    type="email"
                    register = {register("email", {
                        required: "Заполните это поле"
                    })} 
                />
                <InputCast 
                    nameInput="Пароль" 
                    messageInput={errors.password?.message} 
                    type="password"
                    register = {register("password", {
                        required: "Заполните это поле",
                        minLength:{
                            value: 8,
                            message: "Минимальная длина 8 символа"
                        }
                    })} 
                />
                <button className={`${clStyle.button} ${clStyle.button400}`} type="submit">Войти</button>
                <Link className={`${clStyle.button} ${clStyle.button400}`} to="registration">Регистрироваться</Link>
            </form>
        </div>
    )
}

export default Authorization;