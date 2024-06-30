import React, { useState } from "react";
import {useForm} from "react-hook-form";
import PostService from '../../API/PostService';
import InputCast from "../Component/InputCast";
import cl from './Account.module.css';

const Account = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = (data) => {
        let check = false;
        let json = {};
        if(data.name != ""){
            json.name = data.name;
            check = true;
        }
        if(data.password != ""){
            json.password = data.password;
            check = true;
        }
        if(data.foto.length){
            json.foto = data.foto;
            check = true;
        }
        if(check){
            PostService.postAccount(json).then((result) => {
                if(result){
                    // navigate('/people');
                }
            })
        }
    };
    return (
        <div className={cl.AccountCont}>
            <div className={cl.buttonBack}>
                <button className={`${cl.button} ${cl.button150}`} type="button">Назад</button>
            </div>
            <form className={cl.container} onSubmit={handleSubmit(onSubmit)}>
            
                <h2>Изменить пользователя</h2>
                <InputCast 
                    nameInput="Имя" 
                    messageInput={errors.name?.message} 
                    type="text"
                    placeholder={"LeksLin"}
                    register = {register("name", {
                        minLength:{
                            value: 2,
                            message: "Минимальная длина 2 символа"
                        }
                    })} 
                />
                <InputCast 
                    nameInput="Пароль" 
                    messageInput={errors.password?.message} 
                    type="password"
                    placeholder={"********"}
                    register = {register("password", {
                        minLength:{
                            value: 8,
                            message: "Минимальная длина 8 символа"
                        }
                    })} 
                />
                <InputCast 
                    nameInput="Фото профиля" 
                    messageInput={errors.foto?.message} 
                    type="file"
                    register = {register("foto")} 
                />
                <button className={`${cl.button} ${cl.button400}`} type="submit">Изменить</button>
            </form>
        </div>
    )
}

export default Account;