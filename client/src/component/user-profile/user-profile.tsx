import React, { useEffect, useState } from 'react'
import './user-profile.scss'
import location from '../../assets/location.svg'
import calender from '../../assets/calender.svg'
import EditProfile from './edit-profile'
import { gql, useQuery } from '@apollo/client'
let FETCH_PROFILE_DETAILS = gql`
    
query($userId:String!){
    userProfileDetails(userId:$userId){
        id
    }
}

`

const UserProfile = () => {
    let [showModal, setShowModal] = useState(false)
    let { data } = useQuery(FETCH_PROFILE_DETAILS, { variables: { userId: '60fc669f13a8144494bad1ca' } })
    function toggleModal() {
        return setShowModal(pre => !pre)
    }
    useEffect(() => {
        console.log(data);

    }, [data])
    return (
        <div className='user-profile'>
            <div className="user-profile__imgs">
                <div className="user-profile__cover-img">
                    <img src="https://pbs.twimg.com/profile_banners/1325508332061274113/1604864770/1080x360" alt="" />

                </div>
                <div className="user-profile__small-img">
                    <img src="https://pbs.twimg.com/profile_images/1325525438714712064/hIMAnqtB_400x400.jpg" alt="" />
                    <button onClick={toggleModal} className='btn btn-outline-dark'>Edit Profile</button>
                </div>
            </div>
            {showModal && <EditProfile handleModal={toggleModal} />}
            <div className="user-profile__details">
                <p className='user-profile__details__username'>Fahim Shahriare Shawon</p>
                <p className='user-profile__details__bio'>The first word in business news.</p>
                <div className='user-profile__details__location'>
                    <img src={location} alt="" />
                    <p>Pabna , Rajshahi , Bangladesh</p>
                </div>
                <div className='user-profile__details__birthDate'>
                    <img src={calender} alt="" />
                    <p>November 2020</p>
                </div>
                <p className='user-profile__details__friend'>13 Friends</p>
            </div>

        </div>
    )
}

export default UserProfile;
