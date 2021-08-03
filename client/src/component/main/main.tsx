import React from 'react'
import CreatePost from '../post/create-post';
import UserSidebar from '../user-sidebar/user-sidebar';
import MainNavbar from './main-navbar';
import ShowPost from '../show-post/show-post'
import './main.scss'
import { useData } from '../../store';

const Main = () => {
    let { posts } = useData()
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
                    {posts && posts.map((sig, index) =>
                        <ShowPost key={sig._id} id={sig._id} text={sig.text} user={sig.user} imgs={sig.imgs} />
                    )}
                </div>
                <div className="main-body__column3">

                </div>
            </div>
        </div>
    )
}

export default Main;
