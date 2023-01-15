import { configureStore } from '@reduxjs/toolkit'
import audioReducer from '../slices/audioSlice'

export default configureStore({
  reducer: {
    audio: audioReducer
  }
})