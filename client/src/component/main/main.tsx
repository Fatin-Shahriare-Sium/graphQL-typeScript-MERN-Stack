import React from 'react'
import CreatePost from '../post/create-post';
import UserSidebar from '../user-sidebar/user-sidebar';
import MainNavbar from './main-navbar';
import ShowPost from '../show-post/show-post'
import './main.scss'
import { useData } from '../../store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UserProfile from '../user-profile/user-profile';
import Notifications from '../notifications/notification';
import ShowSinglePost from '../show-post/show-single-post';
import Bookmark from '../bookmark/bookmark';
import Search from '../search/search';
import ChangePass from '../changePass/changePass';
import Modal from '../modal/modal';
//email-rose1206@gmail.com
//password-rose1206@gmail.com
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

                        <Switch >
                            <Route exact path='/'>
                                <CreatePost />
                                {posts && posts.map((sig, index) =>
                                    <ShowPost key={sig._id} post={sig} currentUserId={auth!.user.id} />
                                )}
                            </Route>
                            <Route exact path='/profile/:id' >
                                <UserProfile />
                            </Route>
                            <Route exact path='/notifications'>
                                <Notifications />
                            </Route>
                            <Route exact path='/post/:postId'>
                                <ShowSinglePost posts={posts} currentUserId={auth!.user.id} />
                            </Route>
                            <Route exact path='/bookmarks'>
                                <Bookmark userId={auth!.user.id} />
                            </Route>
                            <Route exact path='/search'>
                                <Search />
                            </Route>
                            <Route exact path='/changepass'>
                                <ChangePass />

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
