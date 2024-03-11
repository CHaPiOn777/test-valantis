import React, { useState, ChangeEvent, useCallback } from "react";
import styles from "./Filtred.module.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  fetchFilters,
  fetchProductsUid,
} from "../../../store/reducers/ActionCreater";
import { ProductsSlice } from "../../../store/reducers/ProductsSlice";

const filterItems = ["price", "product", "brand"];
const Filtred = () => {
  const dispatch = useAppDispatch();
  const [active, setActive] = useState<boolean>(false);
  const { favoritesActive } = ProductsSlice.actions;
  const { setIsFiltered } = ProductsSlice.actions;
  const [valueForm, setValueForm] = useState<string>("price");
  const [formData, setFormData] = useState<Record<string, string | number>>({});

  const { productsPage } = useAppSelector((state) => state.productsReducer);
  const { productsValuePage } = useAppSelector(
    (state) => state.productsReducer
  );
  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setValueForm(e.target.value);
    setFormData({});
  };
  const onClickAllFavor = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(favoritesActive());
    setActive(!active);
  };
  const handleSubmit = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      event.stopPropagation();
      dispatch(fetchFilters(formData));
      dispatch(setIsFiltered(true));
      setFormData({});
    },
    [dispatch, formData, setIsFiltered]
  );
  const resetFilters = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      dispatch(
        fetchProductsUid({
          offset: productsPage,
          limit: Number(productsValuePage),
        })
      );
      dispatch(setIsFiltered(false));
    },
    [productsPage, productsValuePage]
  );
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      [name]: name === "price" ? Number(value) : value,
    });
  };
  return (
    <div className={styles.filterNameContainer}>
      <div className={styles.groupFilter}>
        <h3 className={styles.title}>Фильтр:</h3>
        <select
          className={styles.select}
          onChange={(e) => handleChangeSelect(e)}
        >
          {filterItems.map((item, index) => (
            <option value={item} key={index} className={styles.option}>
              {item}
            </option>
          ))}
        </select>
        <form className={styles.formContainer}>
          <input
            type={valueForm === "price" ? "number" : "text"}
            id={valueForm}
            name={valueForm}
            value={formData[valueForm] || ""}
            onChange={handleChange}
            className={styles.input}
          />
          <button
            disabled={
              formData[valueForm] === undefined ||
              formData[valueForm] === 0 ||
              formData[valueForm] === ""
            }
            className={styles.btnSubmit}
            onClick={(e) => handleSubmit(e)}
          >
            Apply Filters
          </button>
          <button className={styles.btnSubmit} onClick={(e) => resetFilters(e)}>
            Reset Filters
          </button>
        </form>
      </div>
      <button
        className={
          active
            ? `${styles.btnFavorites} ${styles.btnFavoritesActive}`
            : styles.btnFavorites
        }
        onClick={(e) => onClickAllFavor(e)}
      >
        All favorites...
      </button>
    </div>
  );
};

export default Filtred;
