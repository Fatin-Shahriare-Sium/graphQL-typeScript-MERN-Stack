import React from 'react'
import { Link } from 'react-router-dom';

interface SINGLE_FRIEND {
    id: string,
    name: string,
    profilePic: string
}

const SingleFriendPreview: React.FC<{ friend: SINGLE_FRIEND }> = ({ friend }) => {
    return (
        <Link to={`/profile/${friend.id}`}>
            <div style={{ display: 'flex' }} className='single-previewer'>
                <div className='single-previewer__left'>
                    <img style={{ width: '37px', clipPath: 'circle()' }} src={friend.profilePic} alt="" />
                </div>
                <div className='single-previewer__right mt-1'>
                    <p style={{ fontWeight: 700 }}>{friend.name}</p>
                    {/* <p style={{ fontSize: ".7rem" }}>1 day ago</p> */}
                </div>
            </div>
        </Link>
    )
}

export default SingleFriendPreview;
