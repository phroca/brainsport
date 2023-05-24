import { createSlice } from '@reduxjs/toolkit'

export const historySlice = createSlice({
    name: 'history',
    initialState: {
        value: "closeHistory",
    },
    reducers: {
        closeHistory: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value = "closeHistory"
        },
        openHistory: (state) => {
            state.value = "openHistory"
        }
    },
})

export const { closeHistory, openHistory } = historySlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectHistory = (state) => state.history.value

export default historySlice.reducer