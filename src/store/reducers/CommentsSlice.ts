import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TComments } from "../../../types/types"

type TCommentsState = {
  comments: TComments[];
  isLoading: boolean;
  error: string;
}

const initialState: TCommentsState = {
  comments: [],
  isLoading: false,
  error: '' ,
}

export const CommentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    commentsFetching(state) {
      state.isLoading = true;
    },
    commentsFetchingSuccess(state, action: PayloadAction<TComments[]>) {
      state.isLoading = false;
      state.comments = action.payload;
      state.error = '';
    },
    commentsFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
})

export default CommentsSlice.reducer;