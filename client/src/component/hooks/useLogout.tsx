import React from "react";
import { Redirect, useHistory } from 'react-router-dom'
const UseLogout = () => {
    let history = useHistory()
    function handleLogout() {
        localStorage.removeItem("__tokenx")
        localStorage.removeItem("__userx")
        return < Redirect to='/login' />


    }

    return { handleLogout }
}

export default UseLogout;
