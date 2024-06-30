import React from "react";
import {useForm} from "react-hook-form";
import { Link } from "react-router-dom";
import PostService from '../../API/PostService';

const Registration = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = async (data) => PostService.postRegistration(data);
    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <lable>Имя</lable> 
                    <input 
                        {...register("name", {
                            required: "Заполните это поле",
                            minLength:{
                                value: 2,
                                message: "Минимальная длина 2 символа"
                            }
                        })}  
                        type="text"
                    />
                    <span>{errors.name?.message}</span>
                </div>
                <div>
                    <lable>Email</lable>
                    <input 
                        {...register("email", {
                            required: "Заполните это поле",
                        })} 
                        type="email"
                    />
                    <span>{errors.email?.message}</span>
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
                    <span>{errors.password?.message}</span>
                </div>
                <div>
                    <lable>Дата рождения</lable>
                    <input 
                        {...register("date", {
                            required: "Заполните это поле",
                        })} 
                        type="date"
                    />
                    <span>{errors.date?.message}</span>
                </div>
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
                <button type="submit">Регистрироваться</button>
                <Link to="/">Авторизироваться</Link>
            </form>
        </div>
    )
}

export default Registration;