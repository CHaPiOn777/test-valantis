import { useEffect, useState } from "react";
import styles from "./DisplayItems.module.css";
import { useAppDispatch } from "../../../hooks/redux";
import { PostsSlice } from "../../../store/reducers/PostsSlice";

const DisplayItems = () => {
  const dispatch = useAppDispatch();
  const { setpostsPage } = PostsSlice.actions;
  const counter = localStorage.getItem("counterPerPages");
  const [counterPerPages, setCounterPerPages] = useState<string>(
    counter || "10"
  );
  const arrValues = ["10", "20", "50", "100"];
  localStorage.setItem("counterPerPages", counterPerPages);

  useEffect(() => {
    dispatch(setpostsPage(counterPerPages));
  }, [counterPerPages, counter]);

  return (
    <div className={styles.selectContainer}>
      <p>Display items</p>
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
