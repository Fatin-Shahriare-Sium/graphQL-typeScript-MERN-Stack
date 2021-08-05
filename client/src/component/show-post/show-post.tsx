import React, { useEffect, useState } from 'react'
import './show-post.scss'
import img2 from '../../assets/img2.png'
import like from '../../assets/like.svg'
import dislike from '../../assets/dislike.svg'
import comment from '../../assets/comment.svg'
import bookmark from '../../assets/bookmark.svg'
import useLDC from '../hooks/useLDC'

let IMG_CONTAINER_DIVSTYLE = [
    { width: "100%", height: '270px', margin: "1%" },
    { width: "47%", height: '230px', margin: "1%" },
    { width: "47%", height: '130px', margin: "1%" },
    { width: "47%", height: '130px', margin: "1%" }

]

interface SINGLE_POST_IMGS {
    id: string,
    src: string
}

interface SINGLE_POST_PROPS {
    id: string,
    user: {
        _id: string,
        name: string,
        profilePic: string,
    },
    text: string,
    likes: string[],
    dislikes: string[],
    isLiked: boolean,
    isDisliked: boolean,
    imgs: SINGLE_POST_IMGS[]
}

const ShowPost: React.FC<SINGLE_POST_PROPS> = ({ id, user, text, imgs, likes, dislikes, isLiked, isDisliked }) => {

    let [truncated, setTruncated] = useState(false)


    let { handleLike, handleDislike } = useLDC()
    useEffect(() => {

        if (text.length > 277) {
            setTruncated(true)

        }

    }, [text])

    function handleReadmore(id: string) {
        let readmoreBtn: any = document.getElementById(`readMore-btn-${id}`)
        let postText: any = document.getElementById(`post-text-shower-${id}`)
        console.dir(readmoreBtn);
        console.dir(postText);

        if (readmoreBtn.textContent == 'Read More') {
            readmoreBtn.innerText = 'Show less'
            postText.innerText = text
        } else {
            readmoreBtn.innerText = "Read More"
            postText.innerText = textTruncate(text)
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
                <img src={user.profilePic} alt="" />
            </div>
            <div className="show-post__right">
                <div className="show-post__right--header">

                </div>
                <div className="show-post__right--body">
                    <div className='show-post__right--body__user-info'>
                        <p className='user-info__name'>{user.name}</p>
                        <p style={{ fontSize: '.7rem', fontWeight: 500 }}>A day ago</p>
                    </div>
                    <p id={`post-text-shower-${id}`}>{textTruncate(text)}</p>
                    {/* 277 string */}
                    {
                        truncated && <p onClick={() => handleReadmore(id)} key={text} id={`readMore-btn-${id}`} style={{ fontWeight: 700, cursor: "pointer" }} className='mt-1'>Read More</p>
                    }

                    <div className="show-post__right--body__img-shower">
                        {imgs.map((sig, index) => <div style={IMG_CONTAINER_DIVSTYLE[imgs.length - 1]}>
                            <img src={sig.src} alt="" />
                        </div>)}

                    </div>

                </div>
                <div className="show-post__right--footer">
                    <div className='social-box-summery'>
                        <div>
                            {`${likes.length} likes`}
                        </div>
                        <div>
                            2 comments
                        </div>
                    </div>
                    <div className='social-box-icon'>

                        <div onClick={() => handleLike(user._id, isLiked, id)} className=''>
                            <img src={like} alt="" />
                            <p>Like</p>

                        </div>

                        <div onClick={() => handleDislike(user._id, isLiked, id)}>
                            <img src={dislike} alt="" />
                            <p>Dislike</p>
                        </div>

                        <div>
                            <img src={comment} alt="" />
                            <p>Comment</p>
                        </div>

                        <div>
                            <img src={bookmark} alt="" />
                            <p>Save</p>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default ShowPost;
