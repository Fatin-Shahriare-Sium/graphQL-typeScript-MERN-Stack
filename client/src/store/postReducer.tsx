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
    LOAD_ALLPOST: 'load-post',
    HANDLE_LIKE: 'handle-like'
}


let PostReducer = (state: POST_DATA, action: any): POST_DATA => {


    if (action.type == POST_ACTION_TYPE.LOAD_ALLPOST) {

        let jsonUserx: any = localStorage.getItem("__userx")
        let userx = JSON.parse(jsonUserx)


        let handleModifingsPosts = () => {
            let allPosts: SinglePost[] = action.payload
            let modifiedPosts: ModifiedPosts[] = allPosts.map((sig, index) => {
                if (sig.likes.includes(userx.id)) {
                    return { ...sig, liked: true, disliked: false }
                } else if (sig.dislikes.includes(userx.id)) {
                    return { ...sig, liked: false, disliked: true }
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

    } else if (action.type == POST_ACTION_TYPE.HANDLE_LIKE) {
        let postId = action.payload.postId
        let userId = action.payload.userId

        console.log(postId, userId);


        let newPosts = [...state.posts] as ModifiedPosts[]

        let findedPostIndex = newPosts.findIndex(sig => sig._id == postId)



        if (newPosts[findedPostIndex].likes.includes(userId)) {

            newPosts[findedPostIndex].likes = newPosts[findedPostIndex].likes.filter(sig => sig !== userId);
            newPosts[findedPostIndex].liked = false

            console.log('newPosts[findedPostIndex].likes.includes(userId)', newPosts[findedPostIndex]);
            return {
                ...state,
                posts: newPosts
            }
        } else {
            newPosts[findedPostIndex].likes = [...newPosts[findedPostIndex].likes, userId];
            newPosts[findedPostIndex].liked = true
            console.log('!newPosts[findedPostIndex].likes.includes(userId)', newPosts[findedPostIndex]);
            return {
                ...state,
                posts: newPosts
            }
        }


    }

    return state

}

export default PostReducer;