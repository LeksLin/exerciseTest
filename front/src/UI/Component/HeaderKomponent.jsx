import React from "react";
import { Link } from "react-router-dom";
import cl from './HeaderKomponent.module.css';
const HeaderKomponent = () => {
    return (
        <div className={cl.headerCont}>
            <Link className={cl.headerLink} to="/account">Личный кабинет</Link>
        </div>
    )
}

export default HeaderKomponent;