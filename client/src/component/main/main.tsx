import React from 'react'
import CreatePost from '../post/create-post';
import UserSidebar from '../user-sidebar/user-sidebar';
import MainNavbar from './main-navbar';
import ShowPost from '../show-post/show-post'
import './main.scss'
import { useData } from '../../store';
import SingleComment from '../show-post/single-comment';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UserProfile from '../user-profile/user-profile';

const Main = () => {
    let { posts, auth } = useData()

    console.log(posts);

    return (


        <BrowserRouter >
            <div className='main'>
                <div className="main-head">
                    <MainNavbar />
                </div>
                <div className="main-body">
                    <div className="main-body__column1">

                        <UserSidebar userId={auth!.user.id} />

                    </div>

                    <div className="main-body__column2">
                        <Switch>
                            <Route exact path='/'>
                                <CreatePost />
                                {posts && posts.map((sig, index) =>
                                    <ShowPost key={sig._id} post={sig} currentUserId={auth!.user.id} />
                                )}
                            </Route>
                            <Route path='/profile/:id' >
                                <UserProfile />
                            </Route>
                        </Switch>
                    </div>

                    <div className="main-body__column3">

                    </div>
                </div>
            </div>
        </BrowserRouter >

    )
}

export default Main;
