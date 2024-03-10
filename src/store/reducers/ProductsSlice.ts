import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TProduct = {
  brand: string;
  id: string;
  price: number;
  product: string;
};
type TProductState = {
  products: TProduct[];
  productsUid: string[];
  isLoading: boolean;
  error: string;
  favorites: number[];
  isFavorites: boolean;
  idChecked: number[];
  // paramSort: string[];
  // postsPage: string;
  valueInput: string;
};

const initialState: TProductState = {
  products: [],
  productsUid: [],
  isLoading: false,
  error: "",
  favorites: [],
  idChecked: [],
  isFavorites: false,
  valueInput: "",
};

export const ProductsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productsFetching(state) {
      state.isLoading = true;
    },
    productsFetchingSuccess(state, action: PayloadAction<TProduct[]>) {
      state.isLoading = false;
      const uniqueProducts = action.payload.filter(
        (product, index, self) =>
          index === self.findIndex((p) => p.id === product.id)
      );
      state.products = uniqueProducts;
      state.error = "";
    },
    productsFetchingUidSuccess(state, action: PayloadAction<string[]>) {
      state.isLoading = false;

      state.productsUid = action.payload;
      state.error = "";
    },
    productsFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = true;
      state.error = action.payload;
    },

    toggleFavorites(state, action: PayloadAction<number>) {
      state.idChecked = [];
      if (state.favorites.some((item) => item === action.payload)) {
        state.favorites = state.favorites.filter(
          (item) => item !== action.payload
        );
      } else {
        state.favorites.push(action.payload);
      }
    },

    favoritesActive(state) {
      state.isFavorites = !state.isFavorites;
    },

    // sortedPosts(state, action: PayloadAction<string[]>) {
    //   state.paramSort = action.payload;
    // },

    // setpostsPage(state, action: PayloadAction<string>) {
    //   state.postsPage = action.payload;
    // },

    // setValueUnput(state, action: PayloadAction<string>) {
    //   state.valueInput = action.payload;
    // },

    addChecked(state, action: PayloadAction<number>) {
      if (state.idChecked.some((item) => item === action.payload)) {
        state.idChecked = state.idChecked.filter(
          (item) => item !== action.payload
        );
      } else {
        state.idChecked.push(action.payload);
      }
    },
  },
});

export default ProductsSlice.reducer;
