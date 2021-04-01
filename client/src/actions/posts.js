import * as api from '../api'

// Action Creators- functions that return actions

// without redux thunk
// const getPosts=()=>{
//     const action = {type: 'FETCH_ALL', payload:[]}

//     return action;
// }

// with thunk it allows us to create another async function within
// a function and we dispatch it instead of returning

export const getPosts= () => async(dispatch) => {
    try {
        const { data }= await api.fetchPosts();

        dispatch({type: 'FETCH_ALL', payload: data});
    } catch (error) {
        console.log(error.message);
    }
    // const action = {type: 'FETCH_ALL', payload:[]}
    // dispatch(action);
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: 'CREATE', payload: data})
    } catch (error) {
        console.log(error);
    }
}