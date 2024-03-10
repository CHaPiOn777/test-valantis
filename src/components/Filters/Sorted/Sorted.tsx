import { useEffect, useState, useCallback } from "react";
import styles from "./Sorted.module.css";
import { useAppDispatch } from "../../../hooks/redux";
import { PostsSlice } from "../../../store/reducers/PostsSlice";

const Sorted = () => {
  const dispatch = useAppDispatch();
  const { sortedPosts } = PostsSlice.actions;
  const [params, setParams] = useState<string>("ID Card");
  const [ascending, setAscending] = useState<string>("Ascending");
  const counter = localStorage.getItem("counterPerPages");

  useEffect(() => {
    dispatch(sortedPosts([params, ascending]));
  }, [params, ascending, counter]);

  const onChange = useCallback((e: any) => {
    setParams(e.target.value);
    setAscending(e.target.value);
  }, [counter])

  return (
    <div className={styles.sortedContainer}>
      <select
        value={params}
        className={styles.select}
        onChange={(e) => setParams(e.target.value)}
      >
        <option value="ID Card">ID Card</option>
        <option value="User Name">User Name</option>
      </select>
      <select
        className={styles.select}
        value={ascending}
        onChange={(e) => setAscending(e.target.value)}
      >
        <option value="Ascending">Ascending</option>
        <option value="Descending">Descending</option>
      </select>
    </div>
  );
};

export default Sorted;
