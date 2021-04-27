import { FETCH_ALL,CREATE,UPDATE,DELETE,LIKE } from '../constants/actionTypes';

// here posts array is the state of posts and reducers are
// used to perfom some action according to their type

// exported posts array

const postReducer= (posts=[], action)=>{
    switch(action.type)
    {
        case UPDATE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post) //action.payload is updated post
        case LIKE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post) 
        case DELETE:
            return posts.filter((post) => post._id !== action.payload); //action.payload is id which we do not want
        case FETCH_ALL:
            return action.payload; //posts
        case CREATE:
            return [...posts, action.payload];
        default:
            return posts;
    }

}

export default postReducer;