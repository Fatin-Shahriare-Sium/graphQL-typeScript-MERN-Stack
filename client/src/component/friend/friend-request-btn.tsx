import React from 'react'
import UseHandleFriend from '../hooks/useHandleFriend'

const FriendRequstBtn: React.FC<{ userId: string, requestedUserId: string }> = ({ userId, requestedUserId }) => {
    let { acceptFriendRequest, removeFriendRequest } = UseHandleFriend()
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '50%' }}>
            <button onClick={() => acceptFriendRequest(userId, requestedUserId)} className='btn btn-outline-success'>Accept Request</button>
            <button onClick={() => removeFriendRequest(userId, requestedUserId)} className='btn btn-outline-danger'>Delete</button>
        </div>
    )
}

export default FriendRequstBtn;
