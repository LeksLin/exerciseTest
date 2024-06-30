import React from "react";
import {useForm} from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import PostService from '../../API/PostService';
import cl from "./Registration.module.css"
import clStyle from "../style.module.css";
import InputCast from "../Component/InputCast";

const Registration = () => {
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = async (data) => {
        PostService.postRegistration(data).then((result) => {
            if(!result){
                console.log(1)
                navigate('/');
            }else{
                alert(result.message);
            }
        });
        
    };
    return(
        <div>
            <form className={`${clStyle.container} ${cl.container}`} onSubmit={handleSubmit(onSubmit)}>
                <h1>Регистрация</h1>
                <InputCast
                    nameInput="Имя" 
                    messageInput={errors.name?.message} 
                    type="text"
                    register = {register("name", {
                        required: "Заполните это поле",
                        minLength:{
                            value: 2,
                            message: "Минимальная длина 2 символа"
                        }
                    })} 
                />
                <InputCast 
                    nameInput="Email" 
                    messageInput={errors.email?.message} 
                    type="email"
                    register = {register("email", {
                        required: "Заполните это поле",
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
                <InputCast 
                    nameInput="Дата рождения" 
                    messageInput={errors.date?.message} 
                    type="date"
                    register = {register("date", {
                        required: "Заполните это поле",
                    })} 
                />
                <div>
                    <lable>Пол</lable>
                    <select {...register("gender")} name="gender">
                        <option value="man">Мужской</option>
                        <option value="woman">Женский</option>
                    </select>
                </div>
                <div>
                    <lable>Фото профиля</lable>
                    <input 
                        {...register("foto", {
                            required: "Заполните это поле",
                        })}  
                        type="file"
                    />
                    <span>{errors.foto?.message}</span>
                </div>
                <button className={`${clStyle.button} ${clStyle.button400}`} type="submit">Регистрироваться</button>
                <Link className={`${clStyle.button} ${clStyle.button400}`} to="/">Авторизироваться</Link>
            </form>
        </div>
    )
}

export default Registration;