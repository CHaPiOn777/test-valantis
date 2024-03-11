import axios from "axios";
import md5 from "md5";
import { AppDispatch } from "../store";
import { formatteDate } from "../../utils/date-format";
import { ProductsSlice, TProductState } from "./ProductsSlice";
import { AnyAction, CombinedState, ThunkDispatch } from "@reduxjs/toolkit";
import { Dispatch } from "react";

export const valantisURL = `https://api.valantis.store:41000/`;
type TRetryRequest = {
  dispatch: ThunkDispatch<
    CombinedState<{ productsReducer: TProductState }>,
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>;
  params?: any;
  count: number;
  action: string;
};
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
  }
};

const retry = async ({ dispatch, params, count, action }: TRetryRequest) => {
  try {
    const resRetry = await getData(action, params, count);
    if (resRetry) {
      dispatch(
        ProductsSlice.actions.productsFetchingUidSuccess(resRetry.result)
      );
    } else {
      throw new Error("Ошибка при повторном запросе");
    }
  } catch (error) {
    console.error(error);
    if (count < 3) {
      count++;
      await retry({ dispatch, params, count, action });
    } else {
      dispatch(
        ProductsSlice.actions.productsFetchingError(
          "Превышено количество попыток загрузки UID товаров"
        )
      );
    }
  }
};

export const fetchProductsUid =
  (params: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(ProductsSlice.actions.productsFetching());
      const resProductsUid = await getData("get_ids", params);
      if (resProductsUid) {
        dispatch(
          ProductsSlice.actions.productsFetchingUidSuccess(
            resProductsUid.result
          )
        );
      } else {
        dispatch(
          ProductsSlice.actions.productsFetchingError(
            "Произошла ошибка при загрузке UID товаров"
          )
        );
        // Повторный запрос если ошибка, не больше 3х раз
        let count = 0;
        await retry({ dispatch, params, count, action: "get_ids" });
      }
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
      if (respProducts) {
        dispatch(
          ProductsSlice.actions.productsFetchingSuccess(respProducts.result)
        );
      } else {
        dispatch(
          ProductsSlice.actions.productsFetchingError(
            "Произошла ошибка при загрузке товаров"
          )
        );
        // Повторный запрос если ошибка, не больше 3х раз
        let count = 0;
        await retry({ dispatch, count, action: "get_items" });
      }
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
    if (respProducts) {
      dispatch(
        ProductsSlice.actions.productsFetchingUidSuccess(respProducts.result)
      );
    } else {
      dispatch(
        ProductsSlice.actions.productsFetchingError(
          "Произошла ошибка при загрузке фильтрации товаров"
        )
      );
      // Повторный запрос если ошибка, не больше 3х раз
      let count = 0;
      await retry({ dispatch, params, count, action: "filter" });
    }
  } catch (e) {
    dispatch(
      ProductsSlice.actions.productsFetchingError(
        "Произошла ошибка при фильтрации товаров"
      )
    );
  }
};
