import { gql, useMutation } from '@apollo/client'
import React from 'react'

const UseHandleProfile = () => {
    let PROFILE_MUTATION = gql`

    mutation($userId:String,$name:String,$bio:String,$coverImg:String,$profilePic:String,$address:String,$birthdate:String){
        updateUserProfile(userId:$userId,name:$name,bio:$bio,coverImg:$coverImg,profilePic:$profilePic,address:$address,birthdate:$birthDate){
            msg
        }
    }
    
    `

    let FETCH_PROFILE_DETAILS = gql`
    
    query($userId:String){
        userProfileDetails(userId:$userId){
            id
        }
    }
    
    `
    let [createProfile] = useMutation(PROFILE_MUTATION)


    async function updateUserProfile(userId: string, userName: string, bio: string, coverImg: string, profilePic: string, address: string, birthdate: string) {
        let response = await createProfile({ variables: { userId, name: userName, bio, coverImg, profilePic, address, birthdate } })

        console.log(' createUserProfile', response);

    }

    return { updateUserProfile }
}

export default UseHandleProfile;
