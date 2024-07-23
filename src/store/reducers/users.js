import { createSlice } from '@reduxjs/toolkit';
import { addToNewsLetter } from '../utils/thunk';


export const usersSlice = createSlice ({
    name: 'users',
    initialState:{
        
    },
    reducers:{
        clearNewsletter:(state)=>{
            state.action = {};
        }
    
    },
    extraReducers:(builder)=>{

        builder.addCase(addToNewsLetter.fulfilled, (state,action)=>{
            state.action = action.payload
        })
    }

})
    export const {clearNewsletter} = usersSlice.actions;
    export default usersSlice.reducer;