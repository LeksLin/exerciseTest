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
        // setPeople([
        //     {
        //       _id: '6681365ba882d2b36ea3ff95',
        //       name: 'LeksLin',
        //       personalFotoName: 'Ozl1QJi6pm4.jpg'
        //     },
        //     {
        //       _id: '6681366aa882d2b36ea3ff96',
        //       name: 'LeksLin1',
        //       personalFotoName: 'Ozl1QJi6pm4.jpg'
        //     }
        //   ]);
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