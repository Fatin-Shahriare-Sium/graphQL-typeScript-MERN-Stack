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

export interface SinglePost {
    _id: string,
    text: string,
    likes: string[],
    comments: SingleComment[],
    bookmarked: string[],
    dislikes: string[],
    user: User,
    imgs: SINGLE_POST_IMGS[],
    userName: string,
    profilePic: string,
    createdAt: string,
    updatedAt: string,
}


export interface POST_DATA {
    posts: SinglePost[] | []
}

export let POST_ACTION_TYPE = {
    LOAD_ALLPOST: 'load-post',
    HANDLE_LIKE: 'handle-like',
    HANDLE_DISLIKE: 'handle-dislike',
    HANDLE_BOOKMARK: 'handle-bookmark',
    UPDATE_ALLPOST: 'update-post',
    LOAD_ONLY_USER_POST: 'load-user-posts'
}


let PostReducer = (state: POST_DATA, action: any): POST_DATA => {


    if (action.type == POST_ACTION_TYPE.LOAD_ALLPOST) {


        return {
            ...state,

            posts: [...state.posts, ...action.payload]
        }

    } else if (action.type == POST_ACTION_TYPE.HANDLE_LIKE) {

        let { userId, postId } = action.payload


        //let newPosts=[...state.posts] will not work.it will give error like "Cannot assign to read only property 'likes' of object in ts"
        //By doing cloning array using spread oparetor will do a shallow copy not deep copy.So,when you want to modify your array ts will 
        // give error and say -- Cannot assign to read only property.to fix it ,you can do is map the array like-
        // let newPosts = state.posts.map(sig => {
        // return { ...sig }
        //})
        //I have been able to learn this by the grace of Allah.

        let newPosts = state.posts.map(sig => {
            return { ...sig }
        })


        let findedPostIndex = newPosts.findIndex(sig => sig._id == postId)


        if (newPosts[findedPostIndex].likes.includes(userId)) {

            newPosts[findedPostIndex].likes = newPosts[findedPostIndex].likes.filter(sig => sig !== userId);

            return {
                ...state,
                posts: newPosts
            }

        } else {
            newPosts[findedPostIndex].likes = [...newPosts[findedPostIndex].likes, userId]

            newPosts[findedPostIndex].dislikes = newPosts[findedPostIndex].dislikes.filter(sig => sig !== userId)

            console.log('!newPosts[findedPostIndex].likes.includes(userId)', newPosts[findedPostIndex]);
            return {
                ...state,
                posts: newPosts
            }
        }


    } else if (action.type == POST_ACTION_TYPE.HANDLE_DISLIKE) {


        let { userId, postId } = action.payload

        let newPosts = state.posts.map(sig => {
            return { ...sig }
        })

        let findedPostIndex = newPosts.findIndex(sig => sig._id == postId)
        if (newPosts[findedPostIndex].dislikes.includes(userId)) {

            newPosts[findedPostIndex].dislikes = newPosts[findedPostIndex].dislikes.filter(sig => sig !== userId)

            return {
                ...state,
                posts: newPosts
            }
        } else {
            newPosts[findedPostIndex].likes = newPosts[findedPostIndex].likes.filter(sig => sig !== userId)

            newPosts[findedPostIndex].dislikes = [...newPosts[findedPostIndex].dislikes, userId]

            return {
                ...state,
                posts: newPosts
            }
        }

    } else if (action.type == POST_ACTION_TYPE.HANDLE_BOOKMARK) {
        let newPosts = state.posts.map((sig) => {
            return { ...sig }
        })

        let { postId, userId } = action.payload

        let filteredPostIndex = newPosts.findIndex(sig => sig._id == postId)

        if (newPosts[filteredPostIndex].bookmarked.includes(userId)) {
            newPosts[filteredPostIndex].bookmarked = newPosts[filteredPostIndex].bookmarked.filter(sig => sig !== userId)
        } else {
            newPosts[filteredPostIndex].bookmarked = [userId, ...newPosts[filteredPostIndex].bookmarked]
        }

        return {
            ...state,
            posts: newPosts
        }
    } else if (action.type == POST_ACTION_TYPE.UPDATE_ALLPOST) {

        return {
            ...state,
            posts: [...action.payload]
        }
    } else if (action.type == POST_ACTION_TYPE.LOAD_ONLY_USER_POST) {
        return {
            ...state,
            posts: action.payload
        }
    }

    return state

}

export default PostReducer;