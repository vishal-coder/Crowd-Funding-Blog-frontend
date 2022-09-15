import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    postList: [],
  },
  reducers: {
    setpostList: (state, action) => {
      state.postList = action.payload;
    },
    //     addpostToList: (state, action) => {
    //       //   state.postList.push({ ...action.payload });
    //       state.postList = action.payload;
    //     },
    addNewpost: (state, action) => {
      state.postList.push({ ...action.payload });
    },
    //     addEditedpost: (state, action) => {
    //       const editedList = state.postList.map(function (item) {
    //         return item._id == action.payload._id ? action.payload : item;
    //       });
    //       state.postList = editedList;
    //     },
  },
});

export default postSlice.reducer;

export const {
  setpostList,
  addNewpost,
  // addpostToList, addNewpost, addEditedpost
} = postSlice.actions;
