import { gql, useLazyQuery } from '@apollo/client'
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


interface DataContextValue extends POST_DATA {
    auth: authState | undefined,
    dispatch: Dispatch<any> | null
}



interface authState {
    token: string | null,
    user: {
        id: string,
        email: string,
        profilePic: string
    }
}

let DataContext = React.createContext<DataContextValue>({ auth: undefined, posts: [], dispatch: null })

export let useData = () => {

    return useContext(DataContext)


}


const DataProvider: React.FC = ({ children }) => {
    let [state, dispatch] = useReducer(PostReducer, INITIAL_STATE)
    let [fetchPostTigger, { data }] = useLazyQuery(FETCH_POST)
    let [auth, setAuth] = useState<authState>()
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
                profilePic: userx.profilePic
            }
        })

        setLoading(false)


    }, [localStorage.getItem('__userx')])

    useEffect(() => {

        fetchPostTigger()

    }, [])

    useEffect(() => {



        if (data) {
            dispatch({ type: POST_ACTION_TYPE.LOAD_ALLPOST, payload: data.allPosts })
        }

    }, [data])



    let value = {
        auth,
        posts: state.posts,
        dispatch

    }
    return (
        <DataContext.Provider value={value}>
            {!loading && children}
        </DataContext.Provider>
    )
}

export default DataProvider;
