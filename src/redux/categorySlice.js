import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../utils/axiosClient";

export const fetchCategories = createAsyncThunk("api/categories", async () => {
  try {
    const response = await axiosClient.get("/categories?populate=image");
    return response.data.data;
  } catch (error) {
    //if error comes then return error with a promise
    return Promise.reject(error);
  }
});

const categorySlice = createSlice({
  name: "categorySlice",
  initialState: {
    categories: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      //yaha pe hame action ke andar vo data mil jayaga jo ham yaha pass kr rahe h h
      //upar se jo bhi data retuirn kr rha h vo hame action.payload mai mil jayaga i.e category.data
      //or uski help se ham state ki category ko update kr denge
      state.categories = action.payload;
    });
  },
});

export default categorySlice.reducer;
