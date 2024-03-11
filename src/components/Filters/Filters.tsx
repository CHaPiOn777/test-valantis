import styles from "./Filter.module.css";
import Filtred from "./Filtred/Filtred";
import DisplayItems from "./DisplayItems/DisplayItems";

const Filters = () => {
  return (
    <div className={styles.containerFilter}>
      <Filtred />
      <DisplayItems />
    </div>
  );
};

export default Filters;
