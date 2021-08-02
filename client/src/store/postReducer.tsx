

export let INITIAL_STATE = {
    posts: []
}
interface SingleComment {
    user: string,
    userName: string,
    profilePic: string,
    commentText: string,
    likes: [string],
    dislikes: [string],
    reply: [SingleComment]
}
interface SinglePost {
    _id: string,
    text: string,
    likes: [string],
    comments: [SingleComment],
    dislikes: [string],
    user: string,
    userName: string,
    profilePic: string,
    createdAt: string,
    updatedAt: string,
}

export interface POST_DATA {
    posts: SinglePost[] | []
}

export let POST_ACTION_TYPE = {
    LOAD_ALLPOST: 'load-post'
}


let PostReducer = (state: POST_DATA, action: any): POST_DATA => {


    if (action.type == POST_ACTION_TYPE.LOAD_ALLPOST) {
        return {
            ...state,
            posts: action.payload
        }

    }

    return state

}

export default PostReducer;