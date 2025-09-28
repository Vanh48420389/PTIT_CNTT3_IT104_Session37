import { configureStore } from "@reduxjs/toolkit";
import student_slice from "./slices/studentSlice"
const storeRedux = configureStore({
    reducer:{
        students:student_slice
    }
})
export default storeRedux;