import React, { useContext, useState } from "react";
import {Routes, Route, useLocation} from 'react-router-dom';
import { privateRoutes, publicRoutes } from "./router";
import HeaderKomponent from "../UI/Component/HeaderKomponent";
import cl from './AppRouter.module.css';
 
const AppRouter = () => {
    const link = useLocation();
    return (
        <div className={cl.container}>
            {link.pathname != '/auth' ? <HeaderKomponent/> : ''}
            <Routes>
                {publicRoutes.map(route => <Route path={route.path} element={<route.component />} exact={route.exact} key={route.path} />)}
            </Routes>
        </div>
        
    )
}


export default AppRouter;