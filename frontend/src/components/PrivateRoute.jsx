import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = ({publicPage = false, adminOnly = false}) => {
    
    const {user} = useSelector(state => state.auth);
    const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

    if(publicPage){
        return user ? <Navigate to="/" /> : <Outlet />
    }

    if(adminOnly){
        if(!isAdmin) {
            return <Navigate to="/" />
        }
    }

    //private page:
    return (
        user ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoute
