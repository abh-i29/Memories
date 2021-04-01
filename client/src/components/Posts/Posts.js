import React from 'react'
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';


const Posts=()=>{
    const posts = useSelector(state => state.posts) // posts is our global state 
    // coming from reducers/index.js

    const classes = useStyles();

    console.log(posts);

    
    return (
        <>

            <h1>POSTS</h1>
            <Post />
            <Post />

        </>
    );
}

export default Posts;