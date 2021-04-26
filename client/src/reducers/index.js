import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';

// import postsState from './posts'
// this import posts represents state array
// whose value can be set below as
// 'posts: postState' below 

// as the name of imported value and key is same i.e posts
// we can simply use it like done

export default combineReducers({ posts, auth }); 