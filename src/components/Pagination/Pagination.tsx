import { FC, SetStateAction, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import styles from "./Pagination.module.css";
import { ProductsSlice } from "../../store/reducers/ProductsSlice";

const Pagination = () => {
  const dispatch = useAppDispatch();

  const { productsPage } = useAppSelector((state) => state.productsReducer);
  const { setProductsPage } = ProductsSlice.actions;

  return (
    <ul className={styles.pagination}>
      <li className={styles.pageItem}>
        <button
          className={styles.pageLink}
          disabled={productsPage <= 1}
          onClick={() => dispatch(setProductsPage(productsPage - 1))}
        >
          lastPage
        </button>
      </li>
      <li className={styles.pageItem}>
        <button
          className={styles.pageLink}
          onClick={() => dispatch(setProductsPage(productsPage + 1))}
        >
          nextPage
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
