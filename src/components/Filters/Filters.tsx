import styles from "./Filter.module.css";
import { SearchIcon } from "../../images/icons/SearchIcon";
import { useAppDispatch } from "../../hooks/redux";
import Sorted from "./Sorted/Sorted";
import Filtred from "./Filtred/Filtred";
import DisplayItems from "./DisplayItems/DisplayItems";
import { PostsSlice } from "../../store/reducers/PostsSlice";

const Filters = () => {
  const dispatch = useAppDispatch();
  const { setValueUnput } = PostsSlice.actions;

  return (
    <div className={styles.containerFilter}>
      <h2 className="title"></h2>

      <form className={styles.form}>
        <div className={styles.searchContainer}>
          <i className={styles.searchIcon}>
            <SearchIcon strokeDefault={"#0000004d"} size={20} />
          </i>
          <input
            className={styles.input}
            placeholder={"Search by post title..."}
            onChange={(e) => dispatch(setValueUnput(e.target.value))}
          />
        </div>
        <div className={styles.container}>
          <Filtred />
          <DisplayItems />
          <Sorted />
        </div>
      </form>
    </div>
  );
};

export default Filters;
