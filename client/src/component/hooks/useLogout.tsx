import React from "react";
import { Redirect, useHistory } from 'react-router-dom'
import { useData } from "../../store";
const UseLogout = () => {

    let history = useHistory()
    function handleLogout() {
        localStorage.removeItem("__tokenx")
        localStorage.removeItem("__userx")
        window.location.reload() //reload the page
        return history.push('/login')


    }

    return { handleLogout }
}

export default UseLogout;
