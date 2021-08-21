import { gql, useLazyQuery, useQuery } from '@apollo/client'
import React, { Dispatch, useContext, useEffect, useReducer, useState } from 'react'
import PostReducer, { INITIAL_STATE, POST_ACTION_TYPE } from './postReducer'
import { POST_DATA } from './postReducer'

let FETCH_POST = gql`
    query{
  allPosts {
        _id,
          text,
          likes,
         dislikes,
         bookmarked,
         comments{
             user
             commentText
         }
         user{
             _id,
             name,
             profilePic
         }
         imgs{
             id,
             src
         }
         createdAt,
         updatedAt,
  }
}
  
    `

export let FETCH_USER_PROFILE_DETAILS = gql`
    
query($userId:String!){
    userProfileDetails(userId:$userId){
        friends
        sendFriendRequest
        getFriendRequest
    }
}

`

interface AUTH_USER_PROFILE_DATA {
    friends: [string],
    sendFriendRequest: string[],
    getFriendRequest: string[]
}

interface DataContextValue extends POST_DATA {
    auth: authState | undefined,
    dispatch: Dispatch<any> | null,
    authUserProfileData: AUTH_USER_PROFILE_DATA | undefined
}



interface authState {
    token: string | null,
    user: {
        id: string,
        email: string,
        name: string,
        profilePic: string
    }
}

let DataContext = React.createContext<DataContextValue>({ auth: undefined, posts: [], dispatch: null, authUserProfileData: undefined })

export let useData = () => {

    return useContext(DataContext)


}


const DataProvider: React.FC = ({ children }) => {
    let [state, dispatch] = useReducer(PostReducer, INITIAL_STATE)
    let postData = useQuery(FETCH_POST)
    let [fetchUserProfileData, { data }] = useLazyQuery(FETCH_USER_PROFILE_DETAILS)
    let [auth, setAuth] = useState<authState>()
    let [authProfileData, setAuthProfileData] = useState<AUTH_USER_PROFILE_DATA>()
    let [loading, setLoading] = useState(true)



    useEffect(() => {
        let jsonUserx: any = localStorage.getItem("__userx")
        let userx = JSON.parse(jsonUserx)
        let token = localStorage.getItem('__tokenx')

        setAuth({
            token,
            user: {
                id: userx.id,
                email: userx.email,
                name: userx.name,
                profilePic: userx.profilePic
            }
        })

        setLoading(false)


    }, [localStorage.getItem('__userx')])





    useEffect(() => {
        //fetching userprofile data to update AuthProfileData
        if (auth) {
            fetchUserProfileData({ variables: { userId: auth!.user.id } })
        }
    }, [auth])

    useEffect(() => {
        //updating userProfileData
        console.log(data);
        if (data) {
            setAuthProfileData({
                friends: data.userProfileDetails.friends,
                sendFriendRequest: data.userProfileDetails.sendFriendRequest,
                getFriendRequest: data.userProfileDetails.getFriendRequest
            })
        }

    }, [data])

    useEffect(() => {

        if (postData.data) {
            dispatch({ type: POST_ACTION_TYPE.LOAD_ALLPOST, payload: postData.data.allPosts })
            localStorage.setItem('__socialPosts', JSON.stringify(postData.data.allPosts))
        }

    }, [postData.data])



    let value = {
        auth,
        posts: state.posts,
        dispatch,
        authUserProfileData: authProfileData


    }
    return (
        <DataContext.Provider value={value}>
            {!loading && children}
        </DataContext.Provider>
    )
}

export default DataProvider;
