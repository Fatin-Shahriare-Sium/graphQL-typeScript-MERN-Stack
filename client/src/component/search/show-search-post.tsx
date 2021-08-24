import moment from 'moment'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

interface SINGLE_SEARCH_POST {
    _id: string,
    text: string,
    likes: string[],
    dislikes: string[],
    comments: string[],
    user: {
        _id: string,
        name: string
    },
    createdAt: string
}

const ShowSearchPost: React.FC<{ searchedPost: SINGLE_SEARCH_POST, searchText: string }> = ({ searchedPost, searchText }) => {

    useEffect(() => {
        let postText = document.getElementById(`post-content-${searchedPost._id}`) as HTMLParagraphElement

        let matcher = new RegExp(searchText, 'gi')

        let replaceHTML = postText.innerText.replace(matcher, (matchStr) => {
            return `<span class='search-text'>${matchStr}</span>`
        })


        postText.innerHTML = replaceHTML
    }, [])
    return (
        <div className='show-search-post'>
            <div className='show-search-post__text'>
                <Link to={`/post/${searchedPost._id}`}>
                    <p id={`post-content-${searchedPost._id}`}>
                        {searchedPost.text}
                    </p>
                </Link>
            </div>
            <div className='show-search-post__summerize'>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>Written by <Link to={`/profile/${searchedPost.user._id}`}>
                    <p style={{ textDecoration: 'underline', textDecorationColor: 'blue' }}>{searchedPost.user.name}</p>
                </Link></div>
                <p>Likes -{searchedPost.likes.length}</p>
                <p>dislikes -{searchedPost.dislikes.length}</p>
                <p>Comments -{searchedPost.comments.length}</p>
                <p>{moment(searchedPost.createdAt).fromNow()}</p>
            </div>
        </div>
    )
}

export default ShowSearchPost
