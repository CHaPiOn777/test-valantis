import { FC } from "react";
import styles from "./Comments.module.css";
import { TComments } from "../../../../../types/types";

const Comments: FC<TComments> = ({ name, email, body }) => {
  return (
    <div className={styles.comment} onClick={(e) => e.stopPropagation()}>
      <h2 className={styles.name}>{name}</h2>
      <p className={styles.email}>{email}</p>
      <p className={styles.body}>{body}</p>
    </div>
  );
};

export default Comments;
