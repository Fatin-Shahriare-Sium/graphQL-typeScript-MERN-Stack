import React, { useEffect, Suspense } from 'react'
import CreatePost from '../post/create-post';
import UserSidebar from '../user-sidebar/user-sidebar';
import ShowPost from '../show-post/show-post'
import './main.scss'
import { useData } from '../../store';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import UserProfile from '../user-profile/user-profile';
// import Notifications from '../notifications/notification';
import ShowSinglePost from '../show-post/show-single-post';
// import Bookmark from '../bookmark/bookmark';
// import Search from '../search/search';
// import ChangePass from '../changePass/changePass';
//bangla nestjs-https://www.youtube.com/watch?v=NYVDtPKMU38&list=PL03GdZZs-POXVXZ0wlEAv3Aao3toYt62V
import Modal from '../modal/modal';
import { gql, useQuery } from '@apollo/client';
import SingleFriendPreview from '../friend/single-friend-preview';
import Loading from '../loading/loading';
import MainTop from './main-top';
import { useInView } from 'react-intersection-observer';
import { POST_ACTION_TYPE } from '../../store/postReducer';
import LogoutModal from '../modal/logout-modal';

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
    let { posts, auth, authUserProfileData, fetchMorePosts, dispatch } = useData()

    let Notifications = React.lazy(() => import('../notifications/notification'))
    let Bookmark = React.lazy(() => import('../bookmark/bookmark'))
    let Search = React.lazy(() => import('../search/search'))
    let ChangePass = React.lazy(() => import('../changePass/changePass'))
    // let LogoutModal = React.lazy(() => import('../modal/logout-modal'))

    let history = useHistory()

    let { ref, inView } = useInView()

    let { data } = useQuery(FETCH_RECENT_USER)

    useEffect(() => {
        if (inView && posts.length > 5) {


            fetchMorePosts({
                variables: { skip: posts.length }, updateQuery: (preResult: any, newResult: any) => {
                    console.log(' newResult.fetchMoreResult.allPosts', newResult.fetchMoreResult.allPosts);


                    dispatch!({ type: POST_ACTION_TYPE.LOAD_ALLPOST, payload: newResult.fetchMoreResult.allPosts })

                    // return newResult.fetchMoreResult.allPosts
                }
            })
        }
    }, [inView])


    return (


        <BrowserRouter  >


            <div className='main'>

                <div className="main-body">
                    <div className="main-body__column1">

                        <UserSidebar key='99999' userId={auth!.user.id} />

                    </div>

                    <div className="main-body__column2">
                        <Suspense fallback={<p>Loading...</p>}>
                            <Switch >


                                <Route exact path='/'>
                                    <MainTop userId={auth!.user.id} name='Home'>
                                        <UserSidebar userId={auth!.user.id} />
                                    </MainTop>
                                    <CreatePost userPofilePic={authUserProfileData?.profileImg} />
                                    {posts && posts.map((sig, index) =>
                                        <ShowPost key={sig._id + index} post={sig} currentUserId={auth!.user.id} />
                                    )}
                                    {/* <div className='bottom-loading'>
                                       
                                    </div> */}
                                    <Loading refx={ref} />
                                </Route>
                                <Route exact path='/profile/:id' >
                                    <MainTop userId={auth!.user.id} name='Profile' />
                                    <UserProfile />
                                </Route>
                                <Route exact path='/notifications'>
                                    <MainTop userId={auth!.user.id} name='Notifications' />
                                    <Notifications />
                                </Route>
                                <Route exact path='/post/:postId'>
                                    <MainTop userId={auth!.user.id} name='Post' />
                                    <ShowSinglePost currentUserId={auth!.user.id} />
                                </Route>
                                <Route exact path='/bookmarks'>
                                    <MainTop userId={auth!.user.id} name='Bookmarks' />
                                    <Bookmark userId={auth!.user.id} />
                                </Route>
                                <Route exact path='/search'>
                                    <MainTop userId={auth!.user.id} name='Search' />
                                    <Search />
                                </Route>
                                <Route exact path='/changepass'>
                                    <MainTop userId={auth!.user.id} name='Change Password' />
                                    <ChangePass />

                                </Route>
                                <Route exact path='/logout'>
                                    <MainTop userId={auth!.user.id} name='Logout' />
                                    <LogoutModal />

                                </Route>
                                <Route exact path='/createPost'>
                                    <Modal title='Create Post' handleModal={() => history.goBack()}>
                                        <CreatePost userPofilePic={auth?.user.profilePic} />
                                    </Modal>
                                </Route>

                            </Switch>
                        </Suspense>

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
