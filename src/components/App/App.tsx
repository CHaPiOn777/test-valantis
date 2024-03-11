import { useEffect } from "react";
import "./App.css";
import Posts from "../Posts/Posts";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchProducts,
  fetchProductsUid,
} from "../../store/reducers/ActionCreater";
import Filters from "../Filters/Filters";

function App() {
  const dispatch = useAppDispatch();

  const { productsUid, productsPage, productsValuePage } = useAppSelector(
    (state) => state.productsReducer
  );
  useEffect(() => {
    dispatch(
      fetchProductsUid({
        offset: productsPage,
        limit: Number(productsValuePage),
      })
    );
  }, [dispatch, productsPage, productsValuePage]);
  useEffect(() => {
    dispatch(fetchProducts(productsUid));
  }, [productsUid, dispatch]);

  return (
    <>
      <Filters />
      <Posts />
    </>
  );
}

export default App;
