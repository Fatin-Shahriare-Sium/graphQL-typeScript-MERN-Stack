import { gql, useQuery } from '@apollo/client'
import React, { Dispatch, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ShowPost from '../show-post/show-post'

export let FETCH_USER_BOOKMARK = gql`
query($userId:String!){
    fetchUserBookmarks(userId:$userId){
        _id
    text
    likes
    comments {
      parentCommentId
    }
    dislikes
    bookmarked
    user {
      _id
      name
      profilePic
    }
    createdAt
    imgs {
      src
      id
    }
    updatedAt
    }
}

`

const Bookmark: React.FC<{ userId: string }> = ({ userId }) => {
    let location = useLocation()
    let { data, refetch } = useQuery(FETCH_USER_BOOKMARK, { variables: { userId } })
    useEffect(() => {
        console.log(data);

    }, [data])
    useEffect(() => {
        if (location.pathname == '/bookmarks') {
            refetch()
        }

    }, [])
    function renderBookmark() {
        if (data.fetchUserBookmarks.length > 0) {

            return data.fetchUserBookmarks.map((sig: any, index: any) => <ShowPost key={index} currentUserId={userId} post={sig} />)
        } else {

            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                    <p style={{ fontWeight: 700, fontSize: '1.3rem' }}>You have not bookmarked any post yet.</p>
                </div>
            )
        }
    }
    return (
        <div>
            {data && renderBookmark()}
        </div>
    )
}

export default Bookmark
