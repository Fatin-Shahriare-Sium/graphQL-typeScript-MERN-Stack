import React from 'react'
import home from '../../assets/home.svg'
import './user-sidebar.scss'
const UserSingleSidebar: React.FC<{ img: string, nameOfTab: string }> = ({ img, nameOfTab }) => {
    return (
        <div className='user-single-sidebar'>
            <img src={img} alt="" />
            <p>{nameOfTab}</p>
        </div>
    )
}

export default UserSingleSidebar;
