import React, { useEffect, useState } from "react";
import PostService from '../../API/PostService';
import { Link } from "react-router-dom";
import cl from './People.module.css';

const People = () => {
    const [people, setPeople] = useState([]);
    useEffect(() => {
        PostService.postPeople().then((result) => {
            setPeople(result.data);
        });
    }, []);
    return (
        <div>
            <h1>Пользователи</h1>
            {people.map((e, index) => (             
                <div className={cl.cardContainer}>
                    <Link className={cl.card} to={`/people/${e._id.toString()}`} key={e._id.toString()}>
                        <div className={cl.cardCont}>
                            <div className={cl.cardImgBord}>
                                <img className={cl.cardImg} src={e.personalFotoName} alt="Ошибка"/>
                            </div>
                            <p className={cl.nameUser}>{e.name}</p>
                        </div>
                        
                        <div className={cl.lineCrad}></div>
                    </Link>
                    
                </div>
            ))}
        </div>
    )
}

export default People;