import React, { useEffect, useState } from "react";
import PostService from '../../API/PostService';

const People = () => {
    useEffect(() => {
        PostService.postPeople();
    }, [])
    
    return (
        <div>
            <div>
                <div>
                    <lable>Имя</lable>
                    <input type="text"/>
                </div>
                <div>
                    <lable>Пароль</lable>
                    <input type="password"/>
                </div>
            </div>
        </div>
    )
}

export default People;