import React from 'react'

const UserSingleSidebar: React.FC<{ img: string, nameOfTab: string }> = ({ img, nameOfTab }) => {
    return (
        <div className='user-single-sidebar'>
            <img src={img} alt="" />
            <p>{nameOfTab}</p>
        </div>
    )
}

export default UserSingleSidebar;
