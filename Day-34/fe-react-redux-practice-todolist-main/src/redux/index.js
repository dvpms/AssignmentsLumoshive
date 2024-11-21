import {configureStore} from '@reduxjs/toolkit';
import todoReducer from './async/todosSlice';
import langReducer from './slices/todosSlice'

export const store = configureStore({
    reducer: {
        todos: todoReducer,
        lang: langReducer
    }
})