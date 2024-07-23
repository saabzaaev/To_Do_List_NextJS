import { todoSlice } from "@/reducers/todoSlice/todoSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore(
    {
        reducer: 
        {
            [todoSlice.reducerPath]:todoSlice.reducer
        },
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware().concat(todoSlice.middleware)
    }
)