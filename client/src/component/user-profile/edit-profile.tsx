import React from 'react'
import add from '../../assets/add.svg'
const EditProfile = () => {
    return (
        <div className='edit-profile'>
            <div className='edit-profile-imgs'>
                <div className="edit-profile__cover-img">
                    <img src="https://pbs.twimg.com/profile_banners/1325508332061274113/1604864770/1080x360" alt="" />
                    <div className='edit-profile__plus-icon'>
                        <input type="file" title="Click me to change image" />

                        <img src={add} alt="" />
                    </div>
                </div>
                <div className="edit-profile__small-img">

                    <img src="https://pbs.twimg.com/profile_images/1325525438714712064/hIMAnqtB_400x400.jpg" alt="" />
                    <div className='edit-profile__plus-icon'>
                        <input title="Click me to change image" type="file" />
                        <img src={add} alt="" />
                    </div>
                </div>
            </div>

            <div className='edit-profile-details'>
                <div className='edir-profile__inputSection'>
                    <p>Name</p>
                    <input placeholder='your name' type="text" />
                </div>
                <div className='edir-profile__inputSection'>
                    <p>Bio</p>
                    <input placeholder='your bio' type="text" />
                </div>
                <div className='edir-profile__inputSection'>
                    <p>Your Address</p>
                    <input placeholder='your address/location' type="text" />
                </div>
                <div className='edir-profile__inputSection'>
                    <p>Birthdate</p>
                    <input placeholder='your birthDate' type="date" />
                </div>
            </div>

        </div>
    )
}

export default EditProfile;
