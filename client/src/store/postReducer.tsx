import { useData } from "."


export let INITIAL_STATE = {
    posts: []
}
interface SingleComment {
    user: string,
    userName: string,
    profilePic: string,
    commentText: string,
    likes: string[],
    dislikes: string[],
    reply: SingleComment[]
}

interface User {
    _id: string,
    name: string,
    profilePic: string
}

interface SINGLE_POST_IMGS {
    id: string,
    src: string
}

interface SinglePost {
    _id: string,
    text: string,
    likes: string[],
    comments: SingleComment[],
    dislikes: string[],
    user: User,
    imgs: SINGLE_POST_IMGS[],
    userName: string,
    profilePic: string,
    createdAt: string,
    updatedAt: string,
}

interface ModifiedPosts extends SinglePost {
    liked: boolean,
    disliked: boolean
}

export interface POST_DATA {
    posts: (ModifiedPosts | SinglePost)[]
}

export let POST_ACTION_TYPE = {
    LOAD_ALLPOST: 'load-post'
}


let PostReducer = (state: POST_DATA, action: any): POST_DATA => {


    if (action.type == POST_ACTION_TYPE.LOAD_ALLPOST) {

        let jsonUserx: any = localStorage.getItem("__userx")
        let userx = JSON.parse(jsonUserx)


        let handleModifingsPosts = (): ModifiedPosts[] => {
            let allPosts: any = action.payload
            let modifiedPosts = allPosts.map((sig: any, index: any) => {
                if (sig.likes.includes(userx.id)) {
                    return { ...sig, liked: true, disliked: false }
                } else if (sig.dislikes.includes(userx.id)) {
                    return { ...sig, liked: false, disliked: true, p: 'y' }
                } else {
                    return { ...sig, liked: false, disliked: false }
                }
            })


            return modifiedPosts;
        }
        return {
            ...state,

            posts: userx ? handleModifingsPosts() : action.payload
        }

    }

    return state

}

export default PostReducer;