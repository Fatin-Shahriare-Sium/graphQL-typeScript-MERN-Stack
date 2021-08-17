import React, { useEffect, useState } from 'react'
import './show-post.scss'
import img2 from '../../assets/img2.png'
import like from '../../assets/like.svg'
import likeFill from '../../assets/like-fill.svg'
import dislike from '../../assets/dislike.svg'
import dislikeFill from '../../assets/dislike-fill.svg'
import comment from '../../assets/comment.svg'
import bookmark from '../../assets/bookmark.svg'
import bookmarkFillx from '../../assets/bookmark-fill-blue.svg'
import useLDC from '../hooks/useLDC'
import CommentSection from './comment-section'
import moment from 'moment'
import { SinglePost } from '../../store/postReducer'
let IMG_CONTAINER_DIVSTYLE = [
    { width: "100%", height: '270px', margin: "1%" },
    { width: "47%", height: '230px', margin: "1%" },
    { width: "47%", height: '130px', margin: "1%" },
    { width: "47%", height: '130px', margin: "1%" }

]

// interface SINGLE_POST_IMGS {
//     id: string,
//     src: string
// }
// interface SinglePost {
//     _id: string,
//     text: string,
//     likes: string[],
//     dislikes: string[],
//     comments: SingleComment[],
//     user: {
//         _id: string,
//         name: string,
//         profilePic: string,
//     },
//     imgs: SINGLE_POST_IMGS[],
//     userName: string,
//     profilePic: string,
//     createdAt: string,
//     updatedAt: string,
// }




interface SINGLE_POST_PROPS {
    post: SinglePost,
    currentUserId: string
}

const ShowPost: React.FC<SINGLE_POST_PROPS> = ({ post, currentUserId }) => {

    let [truncated, setTruncated] = useState(false)


    let { handleLike, handleDislike, handleBookmark } = useLDC()
    useEffect(() => {

        if (post.text.length > 277) {
            setTruncated(true)

        }

    }, [])

    function handleReadmore(id: string) {
        let readmoreBtn: any = document.getElementById(`readMore-btn-${id}`)
        let postText: any = document.getElementById(`post-text-shower-${id}`)


        if (readmoreBtn.textContent == 'Read More') {
            readmoreBtn.innerText = 'Show less'
            postText.innerText = post.text
        } else {
            readmoreBtn.innerText = "Read More"
            postText.innerText = textTruncate(post.text)
        }

    }

    function textTruncate(textx: string) {


        if (textx.length > 277) {

            return textx.substr(0, 277) + '...'


        } else {

            return textx
        }

    }

    return (
        <div className='show-post'>
            <div className="show-post__left">
                <img src={post.user.profilePic} alt="" />
            </div>
            <div className="show-post__right">
                <div className="show-post__right--header">

                </div>
                <div className="show-post__right--body">
                    <div className='show-post__right--body__user-info'>
                        <p className='user-info__name'>{post.user.name}</p>
                        <p style={{ fontSize: '.7rem', fontWeight: 500 }}>{moment(post.createdAt).fromNow()}</p>
                    </div>
                    <p id={`post-text-shower-${post._id}`}>{textTruncate(post.text)}</p>
                    {/* 277 string */}
                    {
                        truncated && <p onClick={() => handleReadmore(post._id)} key={post.text} id={`readMore-btn-${post._id}`} style={{ fontWeight: 700, cursor: "pointer" }} className='mt-1'>Read More</p>
                    }

                    <div className="show-post__right--body__img-shower">
                        {post.imgs.map((sig, index) => <div style={IMG_CONTAINER_DIVSTYLE[post.imgs.length - 1]}>
                            <img src={sig.src} alt="" />
                        </div>)}

                    </div>

                </div>
                <div className="show-post__right--footer">

                    <div className='social-box-summery'>
                        <div>
                            {`${post.likes.length} likes`}
                        </div>
                        <div>
                            {`${post.dislikes.length} dislikes`}
                        </div>
                        <div>
                            {`${post.comments.length} comments`}
                        </div>
                    </div>

                    {/* like/dislike/comments icons container */}

                    <div className='social-box-icon'>

                        <div onClick={() => handleLike(post._id)} className=''>
                            {post.likes.includes(currentUserId) ?
                                <img style={{ width: '23px' }} src={likeFill} alt='' /> :
                                <img src={like} alt="" />
                            }
                            <p>Like</p>

                        </div>

                        <div onClick={() => handleDislike(post._id)}>
                            {post.dislikes.includes(currentUserId) ?
                                <img style={{ width: '23px' }} src={dislikeFill} alt='' /> :
                                <img src={dislike} alt="" />
                            }
                            <p>Dislike</p>
                        </div>

                        <div>
                            <img src={comment} alt="" />
                            <p>Comment</p>
                        </div>

                        <div onClick={() => handleBookmark(post._id)}>
                            {post.bookmarked.includes(currentUserId) ?
                                <img style={{ width: '23px' }} src={bookmarkFillx} alt='' /> :
                                <img src={bookmark} alt="" />
                            }
                            <p>Save</p>
                        </div>

                    </div>

                    {/* comments container */}

                    <div className='social-box-comments mt-3'>
                        <CommentSection key={post._id} postId={post._id} />

                    </div>

                </div>
            </div>
        </div >
    )
}

export default ShowPost;
