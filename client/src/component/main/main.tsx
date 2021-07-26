import React from 'react'
import CreatePost from '../post/create-post';
import UserSidebar from '../user-sidebar/user-sidebar';
import MainNavbar from './main-navbar';
import './main.scss'
const Main = () => {
    return (
        <div className='main'>
            <div className="main-head">
                <MainNavbar />
            </div>
            <div className="main-body">
                <div className="main-body__column1">

                    <UserSidebar />

                </div>
                <div className="main-body__column2">
                    <CreatePost />
                </div>
                <div className="main-body__column3">

                </div>
            </div>
        </div>
    )
}

export default Main;
