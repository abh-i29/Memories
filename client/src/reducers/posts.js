
// here posts array is the state of posts and reducers are
// used to perfom some action according to their type

// exported posts array


export default (posts=[], action)=>{
    switch(action.type)
    {
        case 'FETCH_ALL':
            return action.payload; //posts
        case 'CREATE':
            return [...posts, action.payload];
        default:
            return posts;
    }

}