import {configureStore} from '@reduxjs/toolkit' 
import authSlice from '../store/authSilce'
const store = configureStore({
    reducer: {
        auth: authSlice,
        // post: postSlice
    }
})

export default  store;