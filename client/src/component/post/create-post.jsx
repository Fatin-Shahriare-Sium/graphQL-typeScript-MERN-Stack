import React, { useEffect, useState } from 'react'
import './post.scss'
import addImg from '../../assets/addImg.svg'
import addEmoji from '../../assets/addEmoji.png'
import Picker from 'emoji-picker-react';
import Alert from '../alert/alert';

const CreatePost = () => {
    let [postText, setPostText] = useState('')
    let [showPalet, setShowPalet] = useState(false)
    let [imgContainer, setImgContainer] = useState([])
    let [divStyle, setDivStyle] = useState({ width: "47%", height: '170px', margin: "1%" })
    let [alert, setAlert] = useState(false)
    function handlePalet() {
        setShowPalet(pre => !pre)
    }

    useEffect(() => {
        if (imgContainer.length == 2) {
            setDivStyle({ width: "47%", height: '230px', margin: "1%" })
        } else if (imgContainer.length == 3 || imgContainer.length == 4) {
            setDivStyle({ width: "47%", height: '130px', margin: "1%" })
        } else {
            setDivStyle({ width: "100%", height: '270px', margin: "1%" })
        }

    }, [JSON.stringify(imgContainer)])

    function showImage(e) {
        console.log(e);
        //270,170
        let img = e.target.files[0]

        let url = URL.createObjectURL(img)
        console.log(img);

        setImgContainer([...imgContainer, { id: img.size, src: url }])


    }

    function handleRomove(id) {
        let filteredImg = imgContainer.filter(sig => sig.id !== id)



        setImgContainer([...filteredImg])

    }

    const onEmojiClick = (event, { emoji }) => {
        setPostText(() => {
            return `${postText}${emoji}`
        })

    };
    useEffect(() => {
        let textArea = document.getElementById('editor')
        let circleBar = document.getElementById('circle-bar')

        textArea.addEventListener('input', (e) => {

            if (e.target.textLength > 170) {

                e.target.style.height = '30vh'

                //552 textlength at 30vh
            }

            if (e.target.textLength > 500) {

                circleBar.style.stroke = 'red'
                e.target.style.color = 'red'

            } else {
                circleBar.style.strokeDashoffset = 70 - (e.target.textLength / 7.5)
                circleBar.style.stroke = 'rgb(0, 140, 255)'
                e.target.style.color = 'black'

            }

        })
        console.log(postText.length);
    }, [postText])
    return (
        <div className='create-post'>
            <div className='create-post__user'>
                <img src="https://sportstar.thehindu.com/football/article32903363.ece/ALTERNATES/LANDSCAPE_1200/antony-ajax" alt="" />

            </div>
            <div className='create-post__editor'>
                <textarea id='editor' style={{ minHeight: '15vh' }} placeholder='create post' value={postText} onChange={(event) => setPostText(event.target.value)}>

                </textarea>

                <div id='post-editor-imgShower' className='create-post__editor__imgShower'>

                    {imgContainer.map((sig) =>
                        <div style={divStyle} id='single-img__container'>
                            <img style={{ width: '100%', height: '100%', borderRadius: '13px' }} src={sig.src} alt='' />
                            <p onClick={() => handleRomove(sig.id)}>&#x2715;</p>
                        </div>

                    )}
                </div>
                {/* {alert && <Alert text={ } color={ } />} */}
                <div className="create-post__editor--bottom">
                    <div className='post__editor--toolbar'>
                        <div className='input-container'>
                            <img style={{ cursor: "pointer" }} src={addImg} alt="" />
                            <input onChange={(event) => showImage(event)} type="file" />
                        </div>

                        <img style={{ width: '23px', cursor: 'pointer', marginLeft: '3%' }} onClick={handlePalet} src={addEmoji} alt="" />

                    </div>

                    <div className='post__editor--toolbar2'>
                        {postText ?
                            <div className='circle-progressBar'>
                                <svg>
                                    <circle id='circle-bar' cx="50" cy="50" r="11" stroke="black" stroke-width="3" fill="white" />
                                </svg>
                            </div>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" fill='rgba(0,0,0,.3)' width="24" height="24" viewBox="0 0 24 24"><path id='circle-bar' d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12z" /></svg>

                        }

                        <p>Post</p>
                    </div>
                </div>
                {showPalet && <div className='emoji-palet' style={{ display: "flex", justifyContent: 'center', alignItems: 'center' }} >
                    <Picker onEmojiClick={onEmojiClick} />
                </div>}
            </div>
        </div>
    )
}

export default CreatePost;
