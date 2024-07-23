import { configureStore } from '@reduxjs/toolkit'
import PostsReducer from './reducers/posts';
import UserReducer from './reducers/users'

export const store = configureStore({
    reducer:{
        posts:PostsReducer,
        users:UserReducer
    }
})