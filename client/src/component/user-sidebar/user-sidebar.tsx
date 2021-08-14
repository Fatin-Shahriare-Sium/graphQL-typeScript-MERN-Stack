import React from 'react'
import './user-sidebar.scss'
import UserSingleSidebar from './user-single-sidebar'
import home from '../../assets/home.svg'
import bell from '../../assets/bell.svg'
import key from '../../assets/key.svg'
import user from '../../assets/user.svg'
import bookmark from '../../assets/bookmark-fill.svg'
const UserSidebar: React.FC<{ userId: string }> = ({ userId }) => {
    return (
        <div className='user-sidebar'>
            <UserSingleSidebar href='/' img={home} nameOfTab='Home' />
            <UserSingleSidebar href={`/profile/${userId}`} img={user} nameOfTab='Profile' />
            <UserSingleSidebar href='' img={bell} nameOfTab='Notifications' />
            <UserSingleSidebar href='/bookmarks' img={bookmark} nameOfTab='Bookmarks' />
            <UserSingleSidebar href='/changepass' img={key} nameOfTab='C.Password' />
            <UserSingleSidebar href='/createPost' img={''} nameOfTab='Create Post' />
        </div>
    )
}

export default UserSidebar;
