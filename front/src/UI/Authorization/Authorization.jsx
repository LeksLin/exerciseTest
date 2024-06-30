import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useForm} from "react-hook-form";
import PostService from '../../API/PostService';

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
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <lable>Имя</lable>
                    <input 
                        {...register("email", {
                            required: "Заполните это поле"
                        })}  
                        type="email"
                    />
                </div>
                <div>
                    <lable>Пароль</lable>
                    <input 
                        {...register("password", {
                            required: "Заполните это поле",
                            minLength:{
                                value: 8,
                                message: "Минимальная длина 8 символа"
                            }
                        })} 
                        type="password"
                    />
                </div>
                <button type="submit">Войти</button>
                <Link to="registration">Регистрироваться</Link>
            </form>
        </div>
    )
}

export default Authorization;