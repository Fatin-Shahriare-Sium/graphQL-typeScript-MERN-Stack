import React, { useEffect, useState } from 'react'
import './show-post.scss'
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
import { Link } from 'react-router-dom'
import { gql, useLazyQuery } from '@apollo/client'
import Modal from '../modal/modal'
import SingleFriendPreview from '../friend/single-friend-preview'
import Loading from '../loading/loading'
import more from '../../assets/more.svg'
import deletex from '../../assets/delete.svg'
import UseHandlePost from '../hooks/useHandlePost'
let IMG_CONTAINER_DIVSTYLE = [
    { width: "100%", height: '270px', margin: "1%" },
    { width: "47%", height: '230px', margin: "1%" },
    { width: "47%", height: '130px', margin: "1%" },
    { width: "47%", height: '130px', margin: "1%" }

]

let FETCH_LIKE_OF_POST = gql`

query($postId:String!){
    fetchLikeOfPost(postId:$postId){
        id
        name
        profilePic
        updatedAt
    }
}

`
let FETCH_DISLIKE_OF_POST = gql`

query($postId:String!){
    fetchDislikeOfPost(postId:$postId){
        id
        name
        profilePic
        updatedAt
    }
}

`


interface SINGLE_POST_PROPS {
    post: SinglePost,
    currentUserId: string
}

const ShowPost: React.FC<SINGLE_POST_PROPS> = ({ post, currentUserId }) => {

    let [truncated, setTruncated] = useState(false)
    let [listType, setListType] = useState('')
    let [fetchLike, fetchLikeResults] = useLazyQuery(FETCH_LIKE_OF_POST)
    let [fetchDislike, fetchDislikeResults] = useLazyQuery(FETCH_DISLIKE_OF_POST)
    let { handleLike, handleDislike, handleBookmark } = useLDC()
    let { handleDeletePost } = UseHandlePost()
    let [showMore, setShowMore] = useState(false)
    let [showModal, setShowModal] = useState(false)
    function toggleSettings() {
        return setShowMore(pre => !pre)
    }
    console.log(`post-${post._id}`);

    function toggleModal() {
        console.log('toggle modal fun clicjk', Modal);

        return setShowModal(pre => !pre)
    }
    function handleDeletePostBtn() {
        handleDeletePost(post._id, currentUserId)
        toggleModal()
        let showPostContainer = document.getElementById(`show-post-${post._id}`) as HTMLDivElement

        showPostContainer.classList.add('show-post__delete')

        setTimeout(() => {
            showPostContainer.classList.add('vanish-post')
        }, 900);
    }


    useEffect(() => {

        if (post.text.length > 277) {
            setTruncated(true)

        }

    }, [])


    useEffect(() => {
        console.log(fetchLikeResults.data);

    }, [fetchLikeResults])

    function handleListShowingModal(type: string) {
        if (type === 'Like') {
            fetchLike({ variables: { postId: post._id } })
            if (listType) {
                return setListType('')
            } else {
                return setListType(type)
            }
        } else {

            fetchDislike({ variables: { postId: post._id } })

            if (listType) {
                return setListType('')
            } else {
                return setListType(type)
            }
        }
    }


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
        <div id={`show-post-${post._id}`} className='show-post'>
            <div className="show-post__left">
                <img src={post.user.profilePic} alt="" />
            </div>
            <div className="show-post__right">
                <div className="show-post__right--header">

                </div>
                <div className="show-post__right--body">
                    <div className='show-post__right--body__user-info'>
                        <div>
                            <Link to={`/profile/${post.user._id}`}>
                                <p className='user-info__name'>{post.user.name}</p>
                            </Link>
                            <p className='show-post__time' style={{ fontSize: '.7rem', fontWeight: 500 }}>{moment(post.createdAt).fromNow()}</p>
                        </div>
                        {post.user._id === currentUserId && <div className='show-post__right--body__settings'>
                            <img onClick={toggleSettings} style={{ width: '23px' }} src={more} alt="" />
                            {showMore && <div className='body__settings--box'>
                                <div>
                                    <img style={{ width: '17px' }} src={deletex} alt="" />
                                    <p onClick={toggleModal}>Delete Post</p>
                                </div>
                            </div>}
                            {showModal && <Modal title='Delete Post' handleModal={toggleModal}>
                                <div>
                                    <p>Do you want to delete this post?</p>
                                    <div className='mt-3'>
                                        <button onClick={toggleModal} className='btn btn-outline-dark'>No</button>
                                        <button onClick={() => handleDeletePostBtn()} className='btn ms-3 btn-outline-danger'>Yes</button>
                                    </div>

                                </div>
                            </Modal>}
                        </div>}
                    </div>
                    <p className='show-post__text' id={`post-text-shower-${post._id}`}>{textTruncate(post.text)}</p>
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
                        <div onClick={() => handleListShowingModal('Like')}>
                            <p>{`${post.likes.length} likes`}</p>
                            {listType == 'Like' && <Modal title="All Likes" handleModal={() => handleListShowingModal('Like')}>

                                {fetchLikeResults.data ? fetchLikeResults.data.fetchLikeOfPost.map((sig: any, index: any) => <SingleFriendPreview friend={sig} />) :
                                    <Loading />
                                }

                            </Modal>}
                        </div>
                        <div onClick={() => handleListShowingModal('Dislike')}>
                            <p>{`${post.dislikes.length} dislikes`}</p>
                            {listType == 'Dislike' && <Modal title="All Dislikes" handleModal={() => handleListShowingModal('Dislike')}>

                                {fetchDislikeResults.data ? fetchDislikeResults.data.fetchDislikeOfPost.map((sig: any, index: any) => <SingleFriendPreview friend={sig} />) :
                                    <Loading />
                                }

                            </Modal>}
                        </div>
                        <div>
                            <p>{`${post.comments.length} comments`}</p>
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

// export default ShowPost;

export default React.memo(ShowPost, (prevProps, nextProps) => {

    if (JSON.stringify(prevProps.post) == JSON.stringify(nextProps.post)) {
        return true
    }

    return false


})
