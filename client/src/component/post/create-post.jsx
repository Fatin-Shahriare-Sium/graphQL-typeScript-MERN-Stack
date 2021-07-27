import React, { useState } from 'react'
import './post.scss'
import addImg from '../../assets/addImg.svg'
import addEmoji from '../../assets/addEmoji.png'

import Picker from 'emoji-picker-react';
const CreatePost = () => {
    let [postText, setPostText] = useState('')
    let [showPalet, setShowPalet] = useState(false)
    let [imgContainer, setImgContainer] = useState([])
    let [imgStyle, setImgStyle] = useState({ width: "100%", height: '270px', objectFit: 'contain' })
    function handlePalet() {
        setShowPalet(pre => !pre)
    }

    function showImage(e) {
        console.log(e);
        let img = e.target.files[0]

        let url = URL.createObjectURL(img)
        console.log(url);
        if (imgContainer.length == 1) {
            setImgStyle({ width: "50%", height: '270px', objectFit: 'contain' })
        }
        setImgContainer([...imgContainer, url])


    }

    const onEmojiClick = (event, { emoji }) => {
        setPostText(() => {
            return `${postText}${emoji}`
        })

    };
    return (
        <div className='create-post'>
            <div className='create-post__user'>
                <img src="https://sportstar.thehindu.com/football/article32903363.ece/ALTERNATES/LANDSCAPE_1200/antony-ajax" alt="" />
            </div>
            <div className='create-post__editor'>
                <textarea placeholder='craete post' value={postText} onChange={(event) => setPostText(event.target.value)}>

                </textarea>
                <div id='post-editor-imgShower' className='create-post__editor__imgShower'>
                    {imgContainer.map((sig) =>

                        <img style={imgStyle} src={sig} alt='' />

                    )}
                </div>
                <div className="create-post__editor--bottom">
                    <div className='post__editor--toolbar'>
                        <div className='input-container'>
                            <img style={{ cursor: "pointer" }} src={addImg} alt="" />
                            <input onChange={(event) => showImage(event)} type="file" />
                        </div>
                        <img style={{ width: '23px', cursor: 'pointer', marginLeft: '3%' }} onClick={handlePalet} src={addEmoji} alt="" />
                    </div>
                    <div>
                        <p>Post</p>
                    </div>
                </div>
                {showPalet && <div className='emoji-palet' style={{ display: "flex", justifyContent: 'center', alignItems: 'center' }} className='mt-1'>

                    <Picker onEmojiClick={onEmojiClick} />
                </div>}
            </div>
        </div>
    )
}

export default CreatePost;
