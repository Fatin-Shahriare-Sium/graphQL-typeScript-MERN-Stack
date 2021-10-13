import moment from 'moment';
import React from 'react'
import { Link } from 'react-router-dom';
import './friend.scss'
interface SINGLE_FRIEND {
    id: string,
    name: string,
    profilePic: string,
    createdAt: string
}

const SingleFriendPreview: React.FC<{ friend: SINGLE_FRIEND }> = ({ friend }) => {


    return (
        <Link to={`/profile/${friend.id}`}>
            <div className='single-previewer'>
                <div className='single-previewer__left'>
                    <img style={{ width: '37px', clipPath: 'circle()' }} src={friend.profilePic} alt="" />
                </div>
                <div className='single-previewer__right mt-1'>
                    <p style={{ fontWeight: 700 }}>{friend.name}</p>
                    {friend.createdAt && <p style={{ fontSize: ".7rem" }}>{moment(friend.createdAt).fromNow()}</p>}
                </div>
            </div>
        </Link>
    )
}

// export default SingleFriendPreview;

export default React.memo(SingleFriendPreview, (prevProps, nextProps) => {
    if (prevProps.friend.id == nextProps.friend.id) {
        return true
    }
    return false
})


