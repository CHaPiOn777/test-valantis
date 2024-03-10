import React, { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchPostsDelete } from "../../../store/reducers/ActionCreater";
import styles from "./DeletePostsModal.module.css";

type TDeleteModal = {
  setActive: (value: React.SetStateAction<boolean>) => void;
  textPopup: string;
};

const DeletePosts: FC<TDeleteModal> = ({ textPopup, setActive }) => {
  const { idChecked } = useAppSelector((state) => state.postReducer);

  const dispatch = useAppDispatch();

  return (
    <>
      <h3 className={styles.text}>{textPopup}</h3>
      <div className={styles.btns}>
        <button
          className={`${styles.btn} mt-7 mr-5`}
          onClick={() => {
            dispatch(fetchPostsDelete(idChecked));
            setActive(false);
          }}
        >
          Yes
        </button>
        <button
          className={`${styles.btn} mt-7 mr-5`}
          onClick={() => setActive(false)}
        >
          No
        </button>
      </div>
    </>
  );
};

export default DeletePosts;
