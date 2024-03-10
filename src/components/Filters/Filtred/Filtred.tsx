import React, { useEffect, useState, ChangeEvent } from "react";
import styles from "./Filtred.module.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { PostsSlice } from "../../../store/reducers/PostsSlice";
import { UsersSlice } from "../../../store/reducers/UsersSlice";

const Filtred = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.usersReducer);
  const [userName, setUserName] = useState<string>("All");
  const [active, setActive] = useState<boolean>(false);
  const { putUserName } = UsersSlice.actions;
  const { favoritesActive } = PostsSlice.actions;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setUserName(e.target.value);
  };

  useEffect(() => {
    dispatch(putUserName(userName));
  }, [userName]);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(favoritesActive());
    setActive(!active);
  };

  return (
    <div className={styles.filterNameContainer}>
      <div className={styles.selectContainer}>
        <select
          name=""
          id=""
          className={styles.select}
          onChange={(e) => handleChange(e)}
        >
          <option value="All" className={styles.option}>
            All
          </option>
          {users &&
            users.map((user, index) => (
              <option value={user.name} key={index} className={styles.option}>
                {user.name}
              </option>
            ))}
        </select>
      </div>
      <button className={active ? `${styles.btnFavorites} ${styles.btnFavoritesActive}` : styles.btnFavorites} onClick={(e) => onClick(e)}>
        All favorites...
      </button>
    </div>
  );
};

export default Filtred;
