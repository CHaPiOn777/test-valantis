import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TPost, TUser } from "../../../types/types"

type TPostState = {
  posts: { post: TPost; user: TUser[] }[];
  isLoading: boolean;
  error: string;
  favorites: number[];
  isFavorites: boolean;
  idChecked: number[];
  paramSort: string[];
  postsPage: string;
  valueInput: string;
}

const initialState: TPostState = {
  posts: [],
  isLoading: false,
  error: '',
  favorites: [],
  idChecked: [],
  isFavorites: false,
  paramSort: [],
  postsPage: '',
  valueInput: ''
}

export const PostsSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {

    postsFetching(state) {
      state.isLoading = true;
    },
    postsFetchingSuccess(state, action: PayloadAction<{ post: TPost; user: TUser[] }[]>) {
      state.isLoading = false;
      state.posts = action.payload;
      state.error = '';
    },
    postsFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = true;
      state.error = action.payload;
    },

    toggleFavorites(state, action: PayloadAction<number>) {
      state.idChecked = [];
      if (state.favorites.some(item => item === action.payload)) {
        state.favorites = state.favorites.filter(item => item !== action.payload)
      } else {
        state.favorites.push(action.payload)
      }
    },

    favoritesActive(state) {
      state.isFavorites = !state.isFavorites
    },

    sortedPosts(state, action: PayloadAction<string[]>) {
      state.paramSort = action.payload;
    },

    setpostsPage(state, action: PayloadAction<string>) {
      state.postsPage = action.payload;
    },
    
    setValueUnput(state, action: PayloadAction<string>) {
      state.valueInput = action.payload;
    },

    addChecked(state, action: PayloadAction<number>) {
      if (state.idChecked.some(item => item === action.payload)) {
        state.idChecked = state.idChecked.filter(item => item !== action.payload)
      } else {
        state.idChecked.push(action.payload)
      }
    },

    postsDelete(state) {
      state.isLoading = true;
      state.error = '';
    },
    postsDeleteSuccess(state, action: PayloadAction<number>) {
      state.isLoading = false;
      state.posts = state.posts.filter(item => item.post.id !== action.payload);
      state.idChecked = [];
    },
    postsDeleteError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },

    postsPatching(state) {
      state.isLoading = true;
      state.error = '';
    },
    postsPatchingSuccess(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.posts.map(item => {
        if (item.post.id === action.payload.id) {
          item.post.body = action.payload.body;
          item.post.title = action.payload.title;
          item.user[0].name = action.payload.userName;
        }
      })
    },
    postsPatchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },

  }
})

export default PostsSlice.reducer;