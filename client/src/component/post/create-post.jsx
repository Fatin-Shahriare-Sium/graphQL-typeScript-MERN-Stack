import React, { useEffect, useState } from 'react'
import './post.scss'
import addImg from '../../assets/addImg.svg'
import addEmoji from '../../assets/addEmoji.png'
import Picker from 'emoji-picker-react';
import Alert from '../alert/alert';
import UseHandlePost from '../hooks/useHandlePost';


const CreatePost = ({ userPofilePic }) => {

    let { handleCreatePost, error } = UseHandlePost()
    let [postText, setPostText] = useState('')
    let [showPalet, setShowPalet] = useState(false)
    let [imgContainer, setImgContainer] = useState([])
    let [divStyle, setDivStyle] = useState({ width: "47%", height: '170px', margin: "1%" })
    let [uploadError, setUploadError] = useState({ msg: '', color: '' })
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
        if (img.size > 37000) {
            return setUploadError({
                msg: "Can't upload img more than 17kb",
                color: 'warning'
            })

        }
        else {
            setUploadError({ msg: '', color: '' })
        }
        let overlay = document.getElementById('img-shower-overlay')
        overlay.style.display = 'flex'
        const data = new FormData();
        data.append('file', img)
        data.append('upload_preset', 'taskman');
        fetch('https://api.Cloudinary.com/v1_1/sium/image/upload', {
            method: 'POST',
            body: data
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                let { asset_id, url } = data
                setImgContainer([...imgContainer, { id: asset_id, src: url }])
                overlay.style.display = 'none'
            })





    }


    function handleRomove(id) {
        let filteredImg = imgContainer.filter(sig => sig.id !== id)
        setImgContainer([...filteredImg])

    }

    const onEmojiClick = (event, { emoji }) => {
        setPostText(() => {
            return `${postText}${emoji}`
        })

    }



    useEffect(() => {
        let textArea = document.getElementById('editor')
        let circleBar = document.getElementById('circle-bar')

        textArea.addEventListener('input', (e) => {
            let element = e.target
            element.style.height = (element.scrollHeight) + "px";


            if (e.target.textLength > 500) {
                circleBar.style.strokeDashoffset = 0
                circleBar.style.stroke = 'red'
                e.target.style.color = 'red'

            } else {
                circleBar.style.strokeDashoffset = 70 - (e.target.textLength / 7.5)
                circleBar.style.stroke = 'rgb(0, 140, 255)'
                e.target.style.color = 'black'

            }

        })
    }, [postText])

    useEffect(() => {
        let textArea = document.getElementById('editor')
        let img_wrapper = document.getElementById('create-post__editor__imgShower')
        console.dir(textArea);
        if (error) {
            if (error.ableToCreate) {
                textArea.value = ""
                setPostText('')
                textArea.style.minHeight = '15vh'
                img_wrapper.innerHTML = ''
            }
        }
    }, [error])
    return (
        <div className='create-post'>
            <div className='create-post__user'>
                <img style={{ width: '53px', clipPath: 'circle()' }} src={userPofilePic} alt="" />

            </div>
            <div className='create-post__editor'>
                <textarea id='editor' style={{ minHeight: '15vh' }} placeholder='create post' value={postText} onChange={(event) => setPostText(event.target.value)}>

                </textarea>
                {uploadError.msg && <Alert text={uploadError.msg} color={uploadError.color} />}
                <div id='create-post__editor__imgShower' className='create-post__editor__imgShower'>

                    {imgContainer.map((sig) =>
                        <div className='single-img__container' style={divStyle} id='single-img__container'>
                            <img style={{ width: '100%', height: '100%', borderRadius: '13px' }} src={sig.src} alt='' />
                            <p onClick={() => handleRomove(sig.id)}>&#x2715;</p>
                        </div>

                    )}

                    <div id='img-shower-overlay' className='img-shower-overlay'>
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
                {error && <Alert text={error.msg} color={error.color} />}
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

                        <p onClick={() => handleCreatePost(postText, imgContainer)}>Post</p>
                    </div>
                </div>
                {showPalet && <div className='emoji-palet' style={{ display: "flex", justifyContent: 'center', alignItems: 'center' }} >
                    <Picker onEmojiClick={onEmojiClick} />
                </div>}
            </div>
        </div>
    )
}

// export default CreatePost;
//breake the react.mome,alhamdulillah - https://felixgerschau.com/react-performance-react-memo/
export default React.memo(CreatePost, (pre, next) => {
    if (pre.userPofilePic == next.userPofilePic) {
        return true
    } else {
        return false  //update the component
    }
})
