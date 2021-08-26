import React from 'react'
import { useHistory } from 'react-router-dom'
const UserSingleSidebar: React.FC<{ img: string, nameOfTab: string, href: string }> = ({ img, nameOfTab, href }) => {
    let history = useHistory()
    let lengthx = localStorage.getItem('__social-notification-length')
    return (
        <div id={nameOfTab.toLowerCase()} data-length={lengthx} onClick={() => history.push(href)} className={parseInt(lengthx!) > 0 ? `user-single-sidebar ${nameOfTab.toLocaleLowerCase()}-icon__container` : `user-single-sidebar `}>
            <img src={img} alt="" />
            <p>{nameOfTab}</p>
        </div>
    )
}

export default UserSingleSidebar;
