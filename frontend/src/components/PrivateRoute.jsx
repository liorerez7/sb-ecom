import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = ({publicPage = false}) => {
    
    const {user} = useSelector(state => state.auth);

    if(publicPage){
        return user ? <Navigate to="/" /> : <Outlet />
    }

    //private page:
    return (
        user ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoute
