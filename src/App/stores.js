import { configureStore } from "@reduxjs/toolkit";
import ReducerWeathers from "../weatherApislice"
export  const stores = configureStore({
    reducer: {
        weather: ReducerWeathers,  // Add your slice here.

    },

}) 