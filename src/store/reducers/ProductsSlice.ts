import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TProduct = {
  brand: string;
  id: string;
  price: number;
  product: string;
};
type TProductState = {
  products: TProduct[];
  productsValuePage: string;
  productsUid: string[];
  isLoading: boolean;
  error: string;
  favorites: string[];
  isFavorites: boolean;
  idChecked: string[];
  isFiltered: boolean;
  productsPage: number;
  valueInput: string;
};

const initialState: TProductState = {
  isFiltered: false,
  products: [],
  productsValuePage: "10",
  productsUid: [],
  isLoading: false,
  error: "",
  favorites: [],
  idChecked: [],
  productsPage: 1,
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

    toggleFavorites(state, action: PayloadAction<string>) {
      state.idChecked = [];
      if (state.favorites.some((item) => item === action.payload)) {
        state.favorites = state.favorites.filter(
          (item) => item !== action.payload
        );
      } else {
        state.favorites.push(action.payload);
      }
    },
    setIsFiltered(state, action: PayloadAction<boolean>) {
      state.isFiltered = action.payload;
    },
    favoritesActive(state) {
      state.isFavorites = !state.isFavorites;
    },

    setProductsPage(state, action: PayloadAction<number>) {
      state.productsPage = action.payload;
    },
    setProductsValuePage(state, action: PayloadAction<string>) {
      state.productsValuePage = action.payload;
    },

    setValueInput(state, action: PayloadAction<string>) {
      state.valueInput = action.payload;
    },

    addChecked(state, action: PayloadAction<string>) {
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
