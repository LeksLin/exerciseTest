import React, { useContext, useState } from "react";
import {Routes, Route, useLocation} from 'react-router-dom';
import { privateRoutes, publicRoutes } from "./router";
// import { useStores } from "../root-store-context";
 
const AppRouter = () => {
    // const link = useLocation();
    // const { storeLang } = useStores();
    // const [lang, setlang] = useState(storeLang.currentLanguage.Lang)
    // const switchLanguage = () => {
    //     storeLang.switchLanguage();
    //     setlang(storeLang.currentLanguage.Lang);
    // }
    console.log(1)
    return (
        <div>
            {/* {link.pathname != '/auth' ? <HeaderKomponent switchLanguage={switchLanguage} lang={lang}/> : ''} */}
            <Routes>
                {publicRoutes.map(route => <Route path={route.path} element={<route.component />} exact={route.exact} key={route.path} />)}
                {/* <Route path='/charts/graf1' element={<СhartsForm chart = "1"/>} exact={true} key='/charts/graf1' />
                <Route path='/charts/graf2' element={<СhartsForm chart = "2"/>} exact={true} key='/charts/graf2' />
                <Route path='/charts/graf3' element={<СhartsForm chart = "3"/>} exact={true} key='/charts/graf3' />
                <Route path='/charts/graf4' element={<СhartsForm chart = "4"/>} exact={true} key='/charts/graf4' />
                <Route path='/auth' element={<Auth/>} exact={true} key='/auth' /> */}
            </Routes>
        </div>
        
    )
}


export default AppRouter;