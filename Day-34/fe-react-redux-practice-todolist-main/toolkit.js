import {configureStore, createSlice} from "@reduxjs/toolkit"

const initialState = {
    count: 0
}

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1
        },
        decrement: (state) => {
            state.count -= 1
        }
    }
});

const logMiddleware = store => next => action => {
    console.log("action", action);
    next(action);
    console.log("State sekarang:", store.getState());
  };

const store = configureStore({
    reducer: {
        counter: counterSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logMiddleware)
})

store.dispatch(counterSlice.actions.increment())
store.dispatch(counterSlice.actions.increment())
store.dispatch(counterSlice.actions.decrement())
