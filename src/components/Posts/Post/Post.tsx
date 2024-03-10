import { useState, FC, useMemo, useCallback } from "react";
import styles from "./Post.module.css";
import { FavoritesIcon } from "../../../images/icons/FavoritesIcon";
import { DialogueIcon } from "../../../images/icons/DialogueIcon";
import { Delete } from "../../../images/icons/Delete";
import { EditIcon } from "../../../images/icons/EditIcon";
import { TComments, TUser } from "../../../../types/types";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import Comments from "./Comments/Comments";
import { PostsSlice } from "../../../store/reducers/PostsSlice";
import Modal from "../../Modal/Modal";
import DeletePostsModal from "../../Modal/DeletePostsModal/DeletePostsModal";
import EditModal from "../../Modal/EditModal/EditModal";

export type TPost = {
  user: TUser[];
  body: string;
  id: number;
  title: string;
  comments: TComments[];
};
const Post: FC<TPost> = ({ title, body, id, comments, user }) => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.postReducer);
  const { toggleFavorites } = PostsSlice.actions;
  const { idChecked } = useAppSelector((state) => state.postReducer);
  const { addChecked } = PostsSlice.actions;
  const [activePopup, setActivePopup] = useState<boolean>(false);
  const [textPopup, setTextPopup] = useState<string>("");
  const [modalName, setModalName] = useState<string>("");

  const [checkedComments, setCheckedComments] = useState<boolean>(false);
  const { name } = user[0];

  const openComments = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setCheckedComments(!checkedComments);
  };

  const favoriteClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      idChecked.length > 0
        ? idChecked.map((item) => {
            dispatch(toggleFavorites(item));
          })
        : dispatch(toggleFavorites(id));
    },
    [id, idChecked, dispatch]
  );

  const activeFavorites = useMemo(() => {
    return favorites.some((item) => item === id);
  }, [favorites, dispatch, id]);

  const isChecked = useMemo(() => {
    return idChecked.some((item) => item === id);
  }, [idChecked]);

  const deletePosts = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setModalName("delete");
    setTextPopup("Are you sure you want to delete the selected items?");
    setActivePopup(true);
  };

  const editPost = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    setModalName("edit");
    setActivePopup(true);
  };

  return (
    <div
      className={
        isChecked ? `${styles.post} ${styles.postActive}` : styles.post
      }
      onClick={() => dispatch(addChecked(id))}
    >
      <Modal active={activePopup} setActive={setActivePopup}>
        {modalName === "delete" ? (
          <DeletePostsModal textPopup={textPopup} setActive={setActivePopup} />
        ) : (
          <EditModal setActive={setActivePopup} id={id}></EditModal>
        )}
      </Modal>
      <h1 className={styles.title}>{title}</h1>
      <button
        className={
          isChecked || activeFavorites
            ? `${styles.button} ${styles.favorite} ${styles.buttonActive}`
            : `${styles.button} ${styles.favorite}`
        }
        onClick={(e) => favoriteClick(e)}
      >
        <FavoritesIcon
          strokeDefault={activeFavorites ? "rgb(255 0 240)" : "rgb(0 126 255)"}
        />
      </button>
      <p className={styles.description}>{body}</p>
      <div className={styles.footer}>
        <p className={styles.userName}>{name}</p>
        <div className={styles.buttons}>
          <button
            className={
              isChecked
                ? `${styles.button} ${styles.btnDelete} ${styles.buttonActive}`
                : `${styles.button} ${styles.btnDelete}`
            }
            onClick={(e) => deletePosts(e)}
          >
            <span className={styles.span}>Удалить</span>
            <Delete strokeDefault="rgb(0 126 255)" />
          </button>

          <button className={styles.button} onClick={(e) => openComments(e)}>
            <span className={styles.span}>Комментарии</span>
            <DialogueIcon
              strokeDefault={
                checkedComments ? "rgb(255 0 240)" : "rgb(0 126 255)"
              }
            />
          </button>

          <button className={styles.button} onClick={(e) => editPost(e)}>
            <span className={styles.span}>Редактировать</span>
            <EditIcon strokeDefault="rgb(0 126 255)" />
          </button>
        </div>
      </div>
      <div
        className={
          checkedComments
            ? `${styles.overlay} ${styles.overlayActive}`
            : styles.overlay
        }
        onClick={(e) => openComments(e)}
      >
        <div
          className={
            checkedComments
              ? `${styles.comments} ${styles.commentsActive}`
              : styles.comments
          }
        >
          {comments &&
            comments.map((item, index) => {
              return (
                <Comments
                  key={index}
                  name={item.name}
                  email={item.email}
                  body={item.body}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Post;
