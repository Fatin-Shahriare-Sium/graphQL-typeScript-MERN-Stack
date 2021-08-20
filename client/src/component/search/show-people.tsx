import React from 'react'
import FriendRequstBtn from '../friend/friend-request-btn'

interface PEOPLE {
    _id: string,
    name: string,
    profileImg: string,
    friends: string,
}

const ShowPeople = () => {
    return (
        <div onClick={() => console.log('Allah is Almighty')
        } className='show-people'>
            <div className="show-people__left">
                <img src="http://res.cloudinary.com/sium/image/upload/v1628946719/s8bxdnezwaflm6bw36qr.svg" alt="" />
            </div>
            <div className="show-people__right">
                <p>Fatin Shahriare Sium</p>
                <div className="show-people__bottom">
                    <button className='btn btn-outline-primary'>Add frined</button>
                </div>
            </div>

        </div>
    )
}

export default ShowPeople;
