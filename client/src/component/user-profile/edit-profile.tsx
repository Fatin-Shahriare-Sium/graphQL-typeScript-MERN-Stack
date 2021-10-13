
import React, { useEffect, useState } from 'react'
import add from '../../assets/add.svg'
import Alert from '../alert/alert'
import UseHandleProfile from '../hooks/useHandleProfile'
import defaultcover from '../../assets/defaultcover.jpg'

export interface PROFILE_DATA {
    _id: string,
    name: string,
    profileImg: string,
    coverImg: string,
    address: string,
    bio: string,
    brithDate: string,
    user: string,
    friends: string[],
    sendFriendRequest: string[],
    getFriendRequest: string[]
}

interface EDIT_PROFILE {
    userId: string,
    handleModal: () => any,
    profileData: PROFILE_DATA

}



const EditProfile: React.FC<EDIT_PROFILE> = ({ handleModal, userId, profileData }) => {
    let { updateUserProfile } = UseHandleProfile()
    let [userImgs, setUserImgs] = useState<{ coverImg: string, profilePic: string }>({ coverImg: '', profilePic: '' })
    let [error, setError] = useState<{ msg: string, color: string }>({ msg: "", color: '' })
    // function x() {
    //     let name = document.getElementById('name')
    //     let bio = document.getElementById('bio')
    //     let address = document.getElementById('address')
    //     let birthdate = document.getElementById('birthdate')
    //     let coverImg = document.getElementById('cover-img')
    //     let smallImg = document.getElementById('small-img')
    // }
    useEffect(() => {
        let name = document.getElementById('name') as HTMLInputElement
        let bio = document.getElementById('bio') as HTMLInputElement
        let address = document.getElementById('address') as HTMLInputElement
        let birthdate = document.getElementById('birthdate') as HTMLInputElement
        let coverImg = document.getElementById('cover-img') as HTMLImageElement
        let smallImg = document.getElementById('small-img') as HTMLImageElement

        name.value = profileData.name
        bio.value = profileData.bio
        address.value = profileData.address
        birthdate.value = profileData.brithDate

        return setUserImgs({
            coverImg: profileData.coverImg,
            profilePic: profileData.profileImg
        })



    }, [])

    async function handlePreviewImg(e: any, type: string) {
        //type=cover/small
        let imgData = e.target.files[0]
        if (!imgData) {
            return
        }
        let overflow = document.getElementById('edit-img-overflow') as HTMLDivElement
        if (type == 'cover' && imgData.size >= 100000) {
            return setError({
                msg: "can't use more than 45kb imgsize for coverphoto",
                color: 'danger'
            })
        } else if (type == 'small' && imgData.size >= 23000) {
            return setError({
                msg: "can't use more than 23kb imgsize for profilePic",
                color: 'danger'
            })
        }

        if (type == 'cover') {
            overflow.style.display = 'flex'
        }


        const data = new FormData();
        data.append('file', imgData)
        data.append('upload_preset', 'taskman');
        let res = await fetch('https://api.Cloudinary.com/v1_1/sium/image/upload', {
            method: 'POST',
            body: data
        })

        let datax = await res.json()

        let { url, asset_id } = datax
        if (type == 'cover') {
            let coverImg = document.getElementById('cover-img') as HTMLImageElement
            coverImg.src = url
            overflow.style.display = 'none'
            return setUserImgs({
                ...userImgs,
                coverImg: url
            })

        } else {
            let smallImg = document.getElementById('small-img') as HTMLImageElement
            smallImg.src = url
            overflow.style.display = 'none'
            return setUserImgs({
                ...userImgs,
                profilePic: url
            })
        }
    }

    let handleCreateBtn = async () => {
        let namex = document.getElementById('name') as HTMLInputElement
        let bio = document.getElementById('bio') as HTMLInputElement
        let address = document.getElementById('address') as HTMLInputElement
        let birthdate = document.getElementById('birthdate') as HTMLInputElement
        if (namex.value && address.value) {
            let { success } = await updateUserProfile(userId, profileData._id, namex.value, bio.value, userImgs.coverImg, userImgs.profilePic, address.value, birthdate.value)
            if (success) {
                handleModal()
            }
        } else {
            return setError({
                msg: 'please,fill the name and address box',
                color: 'danger'
            })
        }




    }

    return (
        <div className="modal fade show" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" onClick={handleModal} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className='edit-profile'>
                            <div className='edit-profile-imgs'>
                                <div className="edit-profile__cover-img">
                                    <img id='cover-img' src={profileData.coverImg ? profileData.coverImg : defaultcover} alt="" />
                                    <div className='edit-profile__plus-icon'>
                                        <input onChange={(event) => handlePreviewImg(event, 'cover')} type="file" title="Click me to change image" />
                                        <img src={add} alt="" />
                                    </div>
                                    <div id='edit-img-overflow' className='edit-img-overflow'>
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="edit-profile__small-img">

                                    <img id='small-img' src={profileData.profileImg} alt="" />
                                    <div className='edit-profile__plus-icon'>
                                        <input onChange={(event) => handlePreviewImg(event, 'small')} id='small-img' title="Click me to change image" type="file" />
                                        <img src={add} alt="" />
                                    </div>
                                </div>
                            </div>

                            <div className='edit-profile-details'>
                                {error!.msg && <Alert text={error.msg} color={error.color} />}
                                <div className='edir-profile__inputSection'>
                                    <p>Name</p>
                                    <input id='name' placeholder='your name' type="text" />
                                </div>
                                <div className='edir-profile__inputSection'>
                                    <p>Bio</p>
                                    <input id='bio' placeholder='your bio' type="text" />
                                </div>
                                <div className='edir-profile__inputSection'>
                                    <p>Your Address</p>
                                    <input id='address' placeholder='your address/location' type="text" />
                                </div>
                                <div className='edir-profile__inputSection'>
                                    <p>Birthdate</p>
                                    <input id='birthdate' placeholder='your birthDate' type="date" />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={() => handleModal()} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={() => handleCreateBtn()} type="button" className="btn btn-primary">Update Profile</button>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default EditProfile;




