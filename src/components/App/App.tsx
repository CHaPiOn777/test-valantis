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
  const { productsUid } = useAppSelector((state) => state.productsReducer);
  useEffect(() => {
    dispatch(fetchProductsUid({ offset: 1, limit: 30 }));
  }, [dispatch]);
  useEffect(() => {
    productsUid.length && dispatch(fetchProducts(productsUid));
  }, [productsUid, dispatch]);

  return (
    <>
      {/* <Filters /> */}
      <Posts />
    </>
  );
}

export default App;
