import React from 'react'
import './notification.scss'
import likefill from '../../assets/like-fill.svg'
import more from '../../assets/more.svg'
const SingleNotification = () => {
    return (
        <div className='single-notification'>
            <div className="notifier-user">
                <img className='notifier-user__img' src="https://sportstar.thehindu.com/football/article32903363.ece/ALTERNATES/LANDSCAPE_1200/antony-ajax" alt="" />
                <div className='notify-type-img' >
                    <img style={{ width: '23px' }} src={likefill} alt="" />
                </div>
            </div>
            <div className="notification-details">
                <p style={{ fontWeight: 700 }}>Fatin</p>
                <p style={{ wordBreak: 'break-all', fontSize: '.9rem' }}>sdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</p>
                <p style={{ fontSize: '.7rem' }}>2 days ago</p>
                <div className='notification-settings'>
                    <img style={{ width: '23px' }} src={more} alt="" />
                </div>
            </div>
        </div>
    )
}

export default SingleNotification;
