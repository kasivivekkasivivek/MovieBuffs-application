

import {Component} from "react";
import {Route, Redirect,Router} from "react-router-dom";
import Cookies from "js-cookie"

const ProtectedRoute = (props)=>{
    const jwtToken = Cookies.get('jwt_token')
    if(jwtToken===undefined){
        return <Redirect to="/login"/>
    }
    return <Route {...props}/>
}

export default ProtectedRoute