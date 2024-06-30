import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import cl from "./PeopleCard.module.css";
import clStyle from "../style.module.css";
import PostService from "../../API/PostService";

const PeopleCard = () => {
    const router = useLocation();
    const [people, setPeople] = useState({});
    useEffect(() => {
        console.log(router.pathname.split('/')[2]);
        // GetService.getTaskItem(router.pathname.split('/')[2]).then(result => {
        //     setTaskItem(...taskItem, result.data);
        // });
        PostService.postPeopleOne(router.pathname.split('/')[2]).then((result) => {
            let age = result.data.age;
            if((age % 10 >= 5 && age <= 9) || age % 10 == 0 || (age >= 10 && age <= 19)){
                result.data.age += " лет";
            }else if(age % 10 == 1){
                result.data.age += " год";
            }else if(age % 10 >= 2 && age % 10 <= 4){
                result.data.age += " год";
            }
            setPeople(result.data);
        });
    }, []);



    return (
        <div>
            <div className={clStyle.buttonBack}>
                <Link className={`${clStyle.button} ${clStyle.button150}`} to="/people">Назад</Link>
            </div>
            {people? 
                <div>
                    <img className={cl.imgPeople} src={`/static/${people.personalFotoName}`}/>
                    <div className={cl.namePeople}> {`Имя: ${people.name}`}</div>
                    <div className={cl.namePeople}> {`Возраст: ${people.age}`}</div>
                </div>
            : ""}
            
        </div>
    )
}

export default PeopleCard;