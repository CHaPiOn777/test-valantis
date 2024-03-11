import { useEffect, useState } from "react";
import styles from "./DisplayItems.module.css";
import { useAppDispatch } from "../../../hooks/redux";
import { ProductsSlice } from "../../../store/reducers/ProductsSlice";

const DisplayItems = () => {
  const dispatch = useAppDispatch();
  const { setProductsValuePage, setIsFiltered } = ProductsSlice.actions;
  const [counterPerPages, setCounterPerPages] = useState<string>("50");
  const arrValues = ["10", "20", "50"];

  useEffect(() => {
    dispatch(setProductsValuePage(counterPerPages));
    dispatch(setIsFiltered(false));
  }, [counterPerPages, dispatch, setProductsValuePage, setIsFiltered]);

  return (
    <div className={styles.selectContainer}>
      <p className={styles.title}>Display items</p>
      <select
        value={counterPerPages || "10"}
        className={styles.select}
        onChange={(e) => setCounterPerPages(e.target.value)}
      >
        {arrValues.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DisplayItems;
