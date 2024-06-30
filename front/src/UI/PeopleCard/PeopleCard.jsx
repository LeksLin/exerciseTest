import React, { useState } from "react";

const PeopleCard = () => {
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

export default PeopleCard;