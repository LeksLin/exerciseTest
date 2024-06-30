import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cl from './HeaderKomponent.module.css';
import PostService from "../../API/PostService";
const HeaderKomponent = () => {
    const [user, setUser] = useState({});
    useEffect(() => {
        PostService.getUser().then((result) => {
            console.log()
            setUser(result.data[0]);
        });
    }, []);
    return (
        <div className={cl.headerCont}>
            <div className={cl.userCont}>
                <div className={cl.imgUserCont}>
                    <img className={cl.imgUser} src={`/static/${user.personalFotoName}`}/>
                </div>
                <Link className={cl.headerLink} to="/account">{user.name}</Link>
            </div>
            
            
            
        </div>
    )
}

export default HeaderKomponent;