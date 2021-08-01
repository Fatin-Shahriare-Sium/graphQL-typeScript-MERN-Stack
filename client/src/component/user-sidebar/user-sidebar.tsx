import React from 'react'
import './user-sidebar.scss'
import UserSingleSidebar from './user-single-sidebar'
import home from '../../assets/home.svg'
import bell from '../../assets/bell.svg'
import key from '../../assets/key.svg'
import user from '../../assets/user.svg'
import bookmark from '../../assets/bookmark-fill.svg'
const UserSidebar = () => {
    return (
        <div className='user-sidebar'>
            <UserSingleSidebar img={home} nameOfTab='Home' />
            <UserSingleSidebar img={user} nameOfTab='Profile' />
            <UserSingleSidebar img={bell} nameOfTab='Notifications' />
            <UserSingleSidebar img={bookmark} nameOfTab='Bookmarks' />
            <UserSingleSidebar img={key} nameOfTab='C.Password' />
            <UserSingleSidebar img={''} nameOfTab='Create Post' />
        </div>
    )
}

export default UserSidebar;
