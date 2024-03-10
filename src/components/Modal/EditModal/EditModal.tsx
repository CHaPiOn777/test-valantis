import React, { FC, useState } from "react";
import styles from "./EditModal.module.css";
import { useAppDispatch } from "../../../hooks/redux";
import { fetchPostsPatching } from "../../../store/reducers/ActionCreater";

type TEditModal = {
  setActive: (value: React.SetStateAction<boolean>) => void;
  id: number;
};

const EditModal: FC<TEditModal> = ({ setActive, id }) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  return (
    <form className={styles.form}>
      <div className={styles.container}>
        <label className={styles.label}>Edit the post title:</label>
        <input
          className={styles.input}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={styles.container}>
        <label className={styles.label}>Edit post description:</label>
        <input
          className={styles.input}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className={styles.container}>
        <label className={styles.label}>Edit the author of the post:</label>
        <input
          className={styles.input}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className={styles.btns}>
        <button
          className={`${styles.btn} mt-7 mr-5`}
          onClick={() => {
            dispatch(fetchPostsPatching(title, description, userName, id));
            setActive(false);
          }}
        >
          Edit
        </button>
        <button
          className={`${styles.btn} mt-7 mr-5`}
          onClick={(e) => {setActive(false); e.preventDefault()}}
        >
          Close
        </button>
      </div>
    </form>
  );
};

export default EditModal;
