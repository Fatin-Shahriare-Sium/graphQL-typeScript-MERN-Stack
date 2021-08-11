import React from 'react'
import './user-profile.scss'
import location from '../../assets/location.svg'
import calender from '../../assets/calender.svg'
const UserProfile = () => {
    return (
        <div className='user-profile'>
            <div className="user-profile__imgs">
                <div className="user-profile__cover-img">
                    <img src="https://pbs.twimg.com/profile_banners/1325508332061274113/1604864770/1080x360" alt="" />

                </div>
                <div className="user-profile__small-img">
                    <img src="https://pbs.twimg.com/profile_images/1325525438714712064/hIMAnqtB_400x400.jpg" alt="" />
                    <button className='btn btn-outline-dark'>Edit Profile</button>
                </div>
            </div>
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
