import { configureStore } from '@reduxjs/toolkit'
import audioReducer from '../slices/audioSlice'
import historyReducer from '../slices/historySlice'
import userReducer from '../slices/userSlice'

export default configureStore({
  reducer: {
    audio: audioReducer,
    history: historyReducer,
    user: userReducer
  }
})