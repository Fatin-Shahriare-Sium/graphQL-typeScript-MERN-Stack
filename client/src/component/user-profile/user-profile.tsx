import React, { useEffect, useState } from 'react'
import './user-profile.scss'
import location from '../../assets/location.svg'
import calender from '../../assets/calender.svg'
import EditProfile from './edit-profile'
import { gql, useQuery } from '@apollo/client'
import { useData } from '../../store'
import { PROFILE_DATA } from './edit-profile'
import { useParams } from 'react-router-dom'
import defaultcover from '../../assets/defaultcover.jpg'
import ShowPost from '../show-post/show-post'
import { POST_ACTION_TYPE } from '../../store/postReducer'
import { Prompt } from 'react-router'
import UseHandleFriend from '../hooks/useHandleFriend'
import FriendRequstBtn from '../friend/friend-request-btn'
export let FETCH_PROFILE_DETAILS = gql`
    
query($userId:String!){
    userProfileDetails(userId:$userId){
        id
        name
    profileImg
    coverImg
    address
    bio
    brithDate 
    user
    friends
    sendFriendRequest
    getFriendRequest
    }
}

`

export let FETCH_POSTS_BY_USERID = gql`
  query($userId:String!){
      userPosts(userId:$userId){
        _id
          text
          likes
         dislikes
         comments{
             user
         }
         bookmarked
         user{
             _id
             name
             profilePic
         }
        
         imgs{
             id
             src
         }
         createdAt
         updatedAt
      }
  }
`




//https://stackoverflow.com/questions/58431224/how-does-apollo-client-graphql-refetchqueries-works
const UserProfile = () => {
    let [showModal, setShowModal] = useState(false)
    let { id } = useParams<{ id: string }>()
    let { auth, dispatch, posts, authUserProfileData } = useData()
    let { data } = useQuery(FETCH_PROFILE_DETAILS, { variables: { userId: id } })
    let userPosts = useQuery(FETCH_POSTS_BY_USERID, { variables: { userId: id } })
    let { sendFriendRequest, cancelRequest } = UseHandleFriend()
    let [userProfileData, setUserProfileData] = useState<PROFILE_DATA>()

    function toggleModal() {
        return setShowModal(pre => !pre)
    }


    function renderUserProfileBtn() {
        console.log('renderUserProfileBtn()');

        if (auth!.user.id == id) {
            return <button onClick={toggleModal} className='btn btn-outline-dark'>Edit Profile</button>
        } else if (authUserProfileData!.getFriendRequest.includes(id)) {
            return <FriendRequstBtn userId={auth!.user.id} requestedUserId={id} />
        } else if (authUserProfileData!.sendFriendRequest.includes(id)) {
            return <button onClick={() => cancelRequest(auth!.user.id, id)} className='btn btn-outline-danger'>Cancel Request</button>
        } else {
            return <button onClick={() => sendFriendRequest(auth!.user.id, id)} className='btn btn-outline-primary' > Add Friend</button >
        }
    }

    useEffect(() => {
        console.log(data);

        if (data) {
            setUserProfileData(data.userProfileDetails)
        }

    }, [data])
    useEffect(() => {
        if (!userPosts.loading) {
            dispatch!({ type: POST_ACTION_TYPE.LOAD_ALLPOST, payload: userPosts.data.userPosts })
        }



    }, [userPosts])

    if (!data) {
        return (

            <div style={{ position: 'relative', height: '100%' }}>
                <div id='edit-img-overflow' style={{ display: 'flex', background: 'inherit' }} className='edit-img-overflow'>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>

        )
    }
    return (
        <div className='user-profile'>
            <Prompt message={(location) => {
                console.log(location);
                if (location.pathname !== `/profile/${id}`) {
                    let allPostJson = localStorage.getItem('__socialPosts')
                    dispatch!({ type: POST_ACTION_TYPE.LOAD_ALLPOST, payload: JSON.parse(allPostJson!) })
                }
                return true
            }} />

            <div className="user-profile__imgs">
                <div className="user-profile__cover-img">
                    <img src={!userProfileData?.coverImg ? defaultcover : userProfileData?.coverImg} alt="" />

                </div>
                <div className="user-profile__small-img">
                    <img src={userProfileData?.profileImg} alt="" />
                    {userProfileData && renderUserProfileBtn()}
                </div>
            </div>
            {showModal && <EditProfile handleModal={toggleModal} userId={auth!.user.id} profileData={userProfileData!} />}
            <div className="user-profile__details">
                <p className='user-profile__details__username'>{userProfileData?.name}</p>
                <p className='user-profile__details__bio'>{userProfileData?.bio}</p>
                <div className='user-profile__details__location'>
                    <img src={location} alt="" />
                    <p>{userProfileData?.address ? userProfileData.address : 'set not yet'}</p>
                    <p></p>
                </div>
                <div className='user-profile__details__birthDate'>
                    <img src={calender} alt="" />
                    <p>{userProfileData?.brithDate ? userProfileData.brithDate : 'set not yet'}</p>
                </div>
                <p className='user-profile__details__friend'>13 Friends</p>
            </div>
            <div className='user-profile__posts'>
                {userPosts.data && posts.map((sig: any) => <ShowPost post={sig} currentUserId={auth!.user.id} />)}
            </div>
        </div>
    )
}

export default UserProfile;
