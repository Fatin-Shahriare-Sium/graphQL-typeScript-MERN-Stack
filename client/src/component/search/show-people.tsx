import React from 'react'
import { Link } from 'react-router-dom'
import FriendRequstBtn from '../friend/friend-request-btn'

interface PEOPLE {
    id: string,
    name: string,
    profilePic: string,
    posts: string,
    profile?: {
        friends: string[]
    }
}

const ShowPeople: React.FC<{ people: PEOPLE }> = ({ people }) => {
    return (
        <div onClick={() => console.log('Allah is Almighty')
        } className='show-people'>
            <div className="show-people__left">
                <img src={people.profilePic} alt="" />
            </div>
            <div className="show-people__right">
                <div>
                    <Link to={`/profile/${people.id}`}>
                        <p style={{ textDecoration: 'underline', textDecorationColor: 'blue' }}>{people.name}</p>
                    </Link>
                </div>
                <div className="show-people__bottom">
                    <p>Total Posts-{people.posts.length}</p>
                    <p>Friends-{people.profile?.friends.length}</p>
                </div>
            </div>

        </div>
    )
}

export default ShowPeople;
