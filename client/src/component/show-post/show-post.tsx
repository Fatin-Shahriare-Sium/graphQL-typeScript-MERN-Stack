import React from 'react'
import './show-post.scss'
import img2 from '../../assets/img2.png'
import like from '../../assets/like.svg'
import dislike from '../../assets/dislike.svg'
import comment from '../../assets/comment.svg'
import bookmark from '../../assets/bookmark.svg'
let IMG_CONTAINER_DIVSTYLE = [
    { width: "100%", height: '270px', margin: "1%" },
    { width: "47%", height: '230px', margin: "1%" },
    { width: "47%", height: '130px', margin: "1%" },
    { width: "47%", height: '130px', margin: "1%" }

]

const ShowPost = () => {
    return (
        <div className='show-post'>
            <div className="show-post__left">
                <img src="https://sportstar.thehindu.com/football/article32903363.ece/ALTERNATES/LANDSCAPE_1200/antony-ajax" alt="" />
            </div>
            <div className="show-post__right">
                <div className="show-post__right--header">

                </div>
                <div className="show-post__right--body">
                    <p id='post-text-shower'>An 'error' is a deviation from accuracy or correctness. A 'mistake' is an error caused by a fault: the fault being misjudgment, carelessness, or forgetfulness. Now, say that I run a stop sign because I was in a hurry, and wasn't concentrating, and the police stop me, that is a mistake</p>
                    {/* 277 string */}
                    <p style={{ fontWeight: 700, cursor: "pointer" }} className='mt-1'>Read More</p>
                    <div className="show-post__right--body__img-shower">
                        <div style={IMG_CONTAINER_DIVSTYLE[0]}>
                            <img src={img2} alt="" />
                        </div>

                    </div>

                </div>
                <div className="show-post__right--footer">
                    <div className='social-box-summery'>
                        <div>
                            30 likes
                        </div>
                        <div>
                            2 comments
                        </div>
                    </div>
                    <div className='social-box-icon'>

                        <div className=''>
                            <img src={like} alt="" />
                            <p>Like</p>
                        </div>

                        <div>
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
        </div>
    )
}

export default ShowPost;
