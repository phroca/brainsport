import { createSlice } from '@reduxjs/toolkit'

export const audioSlice = createSlice({
    name: 'audio',
    initialState: {
        value: "closeAudio",
    },
    reducers: {
        closeAudio: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value = "closeAudio"
        },
        openAudio: (state) => {
            state.value = "openAudio"
        },
        retryRecordAudio: (state) => {
            state.value = "retryRecordAudio"
        }
    },
})

export const { closeAudio, openAudio, retryRecordAudio } = audioSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectAudio = (state) => state.audio.value

export default audioSlice.reducer