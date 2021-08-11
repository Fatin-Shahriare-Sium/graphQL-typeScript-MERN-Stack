import React from 'react'
import { useHistory } from 'react-router-dom'
const UserSingleSidebar: React.FC<{ img: string, nameOfTab: string, href: string }> = ({ img, nameOfTab, href }) => {
    let history = useHistory()
    return (
        <div onClick={() => history.push(href)} className='user-single-sidebar'>
            <img src={img} alt="" />
            <p>{nameOfTab}</p>
        </div>
    )
}

export default UserSingleSidebar;
