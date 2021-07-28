import React, { useEffect, useState } from 'react'
import './post.scss'
import addImg from '../../assets/addImg.svg'
import addEmoji from '../../assets/addEmoji.png'
import img2 from '../../assets/img2.png'
import img3 from '../../assets/img3.png'
import Picker from 'emoji-picker-react';
const CreatePost = () => {
    let [postText, setPostText] = useState('')
    let [showPalet, setShowPalet] = useState(false)
    let [imgContainer, setImgContainer] = useState([])
    let [divStyle, setDivStyle] = useState({ width: "47%", height: '170px', margin: "1%" })
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
        textArea.addEventListener('input', (e) => {

            if (e.target.textLength > 170) {
                console.log('1265terzdfxugoih');
                e.target.style.height = '30vh'
                //552 textlength at 30vh
            }

        })
    }, [postText])
    return (
        <div className='create-post'>
            <div className='create-post__user'>
                <img src="https://sportstar.thehindu.com/football/article32903363.ece/ALTERNATES/LANDSCAPE_1200/antony-ajax" alt="" />

            </div>
            <div className='create-post__editor'>
                <textarea id='editor' style={{ minHeight: '15vh' }} placeholder='craete post' value={postText} onChange={(event) => setPostText(event.target.value)}>

                </textarea>
                <div id='post-editor-imgShower' className='create-post__editor__imgShower'>

                    {imgContainer.map((sig) =>
                        <div style={divStyle} id='single-img__container'>
                            <img style={{ width: '100%', height: '100%', borderRadius: '13px' }} src={sig.src} alt='' />
                            <p onClick={() => handleRomove(sig.id)}>&#x2715;</p>
                        </div>

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
