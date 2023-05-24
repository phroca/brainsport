import { configureStore } from '@reduxjs/toolkit'
import audioReducer from '../slices/audioSlice'
import historyReducer from '../slices/historySlice'

export default configureStore({
  reducer: {
    audio: audioReducer,
    history: historyReducer
  }
})