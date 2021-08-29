import React, { useEffect, useState } from 'react'
import './user-sidebar.scss'
import UserSingleSidebar from './user-single-sidebar'
import home from '../../assets/home.svg'
import bell from '../../assets/bell.svg'
import key from '../../assets/key.svg'
import user from '../../assets/user.svg'
import bookmark from '../../assets/bookmark-fill.svg'
import search from '../../assets/search.svg'
import logout from '../../assets/logout.svg'

const UserSidebar: React.FC<{ userId: string, id?: string }> = ({ userId, id }) => {

    console.log('UserSidebar.jsx render');

    return (
        <div id={id} className='user-sidebar'>
            <div className='mx-auto w-50 my-1'>
                <p style={{ fontWeight: 700, fontSize: '1.7rem' }}>Social App</p>
            </div>
            <UserSingleSidebar href='/' img={home} nameOfTab='Home' />
            <UserSingleSidebar href={`/profile/${userId}`} img={user} nameOfTab='Profile' />
            <UserSingleSidebar href='/notifications' img={bell} nameOfTab='Notifications' />
            <UserSingleSidebar href='/bookmarks' img={bookmark} nameOfTab='Bookmarks' />
            <UserSingleSidebar href='/search' img={search} nameOfTab='Search' />
            <UserSingleSidebar href='/changepass' img={key} nameOfTab='C.Password' />
            <UserSingleSidebar href='/logout' img={logout} nameOfTab='Logout' />
            <UserSingleSidebar href='/createPost' img={''} nameOfTab='Create Post' />
        </div >
    )
}

// export default UserSidebar;

export default React.memo(UserSidebar)
