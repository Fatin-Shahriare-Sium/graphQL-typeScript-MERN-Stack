import React, { useEffect } from 'react'
import CreatePost from '../post/create-post';
import UserSidebar from '../user-sidebar/user-sidebar';
import ShowPost from '../show-post/show-post'
import './main.scss'
import { useData } from '../../store';

import { BrowserRouter, Route, Switch, useHistory, Router, Redirect } from 'react-router-dom';
import UserProfile from '../user-profile/user-profile';
import Notifications from '../notifications/notification';
import ShowSinglePost from '../show-post/show-single-post';
import Bookmark from '../bookmark/bookmark';
import Search from '../search/search';
import ChangePass from '../changePass/changePass';
//bangla nestjs-https://www.youtube.com/watch?v=NYVDtPKMU38&list=PL03GdZZs-POXVXZ0wlEAv3Aao3toYt62V
import Modal from '../modal/modal';
import { gql, useQuery } from '@apollo/client';
import SingleFriendPreview from '../friend/single-friend-preview';
import Loading from '../loading/loading';
import MainTop from './main-top';
import LogoutModal from '../modal/logout-modal';
import createHistory from 'history/createBrowserHistory';
//email-rose1206@gmail.com
//password-rose1206@gmail.com
let FETCH_RECENT_USER = gql`
query{
    fetchUser{
        id
        name
        profilePic
        createdAt
    }
}
`
const Main = () => {
    let { posts, auth, authUserProfileData } = useData()
    let history = useHistory()

    let { data } = useQuery(FETCH_RECENT_USER)


    return (


        <BrowserRouter  >
            <div className='main'>

                <div className="main-body">
                    <div className="main-body__column1">

                        <UserSidebar userId={auth!.user.id} />

                    </div>

                    <div className="main-body__column2">

                        <Switch >
                            <Route exact path='/'>
                                <MainTop name='Home' />
                                <CreatePost userPofilePic={authUserProfileData?.profileImg} />
                                {posts && posts.map((sig, index) =>
                                    <ShowPost key={sig._id} post={sig} currentUserId={auth!.user.id} />
                                )}
                            </Route>
                            <Route exact path='/profile/:id' >
                                <MainTop name='Profile' />
                                <UserProfile />
                            </Route>
                            <Route exact path='/notifications'>
                                <MainTop name='Notifications' />
                                <Notifications />
                            </Route>
                            <Route exact path='/post/:postId'>
                                <MainTop name='Post' />
                                <ShowSinglePost posts={posts} currentUserId={auth!.user.id} />
                            </Route>
                            <Route exact path='/bookmarks'>
                                <MainTop name='Bookmarks' />
                                <Bookmark userId={auth!.user.id} />
                            </Route>
                            <Route exact path='/search'>
                                <MainTop name='Search' />
                                <Search />
                            </Route>
                            <Route exact path='/changepass'>
                                <MainTop name='Change Password' />
                                <ChangePass />

                            </Route>
                            <Route exact path='/logout'>
                                <MainTop name='Logout' />
                                <LogoutModal />

                            </Route>
                        </Switch>

                    </div>

                    <div className="main-body__column3">
                        <div className='ms-5 my-1'>
                            <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>Recent Users</p>
                        </div>
                        <div>
                            {data ? data.fetchUser.map((sig: any, index: any) => <SingleFriendPreview friend={sig} />) :
                                <Loading />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </BrowserRouter >

    )
}

export default Main;
