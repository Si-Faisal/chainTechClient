import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Components/Header/Header';

const Layout = () => {
    const location = useLocation();

    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup');
    return (
        <div>
            {noHeaderFooter || <Header></Header>}
            {/* <Header></Header> */}
             <Outlet></Outlet>
            {/* {noHeaderFooter || <Footer></Footer>} */}
            {/* <h3>Footer</h3> */}
        </div>
    );
};

export default Layout;