import { gql, useMutation } from '@apollo/client'
import React from 'react'
import { FETCH_POSTS_BY_USERID, FETCH_PROFILE_DETAILS } from '../user-profile/user-profile'

const UseHandleProfile = () => {
    let PROFILE_MUTATION = gql`

    mutation($userId:String,$profileId:String,$name:String,$bio:String,$coverImg:String,$profilePic:String,$address:String,$birthdate:String){
        updateUserProfile(userId:$userId,profileId:$profileId,name:$name,bio:$bio,coverImg:$coverImg,profilePic:$profilePic,address:$address,birthdate:$birthdate){
            msg
        }
    }
    
    `



    let [createProfile] = useMutation(PROFILE_MUTATION)


    async function updateUserProfile(userId: string, profileId: string, userName: string, bio: string, coverImg: string, profilePic: string, address: string, birthdate: string) {
        let response = await createProfile({
            variables: { userId, profileId, name: userName, bio, coverImg, profilePic, address, birthdate }, refetchQueries: [{
                query: FETCH_PROFILE_DETAILS,
                variables: {
                    userId
                }
            }, {
                query: FETCH_POSTS_BY_USERID,
                variables: {
                    userId
                }
            }]
        })

        console.log(' createUserProfile', response);
        if (response) {
            return {
                success: true
            }
        } else {
            return {
                success: false
            }
        }


    }

    return { updateUserProfile }
}

export default UseHandleProfile;
