import axios from "axios";
import md5 from "md5";
import { AppDispatch } from "../store";
import { formatteDate } from "../../utils/date-format";
import { ProductsSlice } from "./ProductsSlice";

export const valantisURL = `http://api.valantis.store:40000/`;

const password = "Valantis";
const timestamp = formatteDate();

const authString = `${password}_${timestamp}`;
const hash = md5(authString);
const getData = async (action: string, params?: any, count = 0) => {
  try {
    const response = await axios.post(
      valantisURL,
      {
        action: action,
        params: params,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Auth": hash,
        },
      }
    );

    if (response.data !== undefined) {
      return response.data;
    }
  } catch (error) {
    // Обработка ошибки
    console.error(error);
    // Повторный запрос если ошибка, не больше 3х раз
    if (count < 3) {
      getData(action, params, count + 1);
    }
  }
};
export const fetchProductsUid =
  (params: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(ProductsSlice.actions.productsFetching());
      const resProductsUid = await getData("get_ids", params);
      dispatch(
        ProductsSlice.actions.productsFetchingUidSuccess(resProductsUid.result)
      );
    } catch (e) {
      dispatch(
        ProductsSlice.actions.productsFetchingError(
          "Произошла ошибка при загрузке UID товаров"
        )
      );
    }
  };
export const fetchProducts =
  (productsUid: string[]) => async (dispatch: AppDispatch) => {
    try {
      dispatch(ProductsSlice.actions.productsFetching());
      const paramsProducts = {
        ids: productsUid,
      };
      const respProducts = await getData("get_items", paramsProducts);
      dispatch(
        ProductsSlice.actions.productsFetchingSuccess(respProducts.result)
      );
    } catch (e) {
      dispatch(
        ProductsSlice.actions.productsFetchingError(
          "Произошла ошибка при загрузке товаров"
        )
      );
    }
  };
export const fetchFilters = (params: any) => async (dispatch: AppDispatch) => {
  try {
    dispatch(ProductsSlice.actions.productsFetching());

    const respProducts = await getData("filter", params);
    dispatch(
      ProductsSlice.actions.productsFetchingUidSuccess(respProducts.result)
    );
  } catch (e) {
    dispatch(
      ProductsSlice.actions.productsFetchingError(
        "Произошла ошибка при фильтрации товаров"
      )
    );
  }
};
