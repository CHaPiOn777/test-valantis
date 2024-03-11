import { FC, useMemo, useCallback } from "react";
import styles from "./Post.module.css";
import { FavoritesIcon } from "../../../images/icons/FavoritesIcon";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { ProductsSlice } from "../../../store/reducers/ProductsSlice";

export type TPost = {
  brand: string;
  id: string;
  product: string;
  price: number;
};
const Post: FC<TPost> = ({ brand, product, id, price }) => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.productsReducer);
  const { toggleFavorites } = ProductsSlice.actions;
  const { idChecked } = useAppSelector((state) => state.productsReducer);
  const { addChecked } = ProductsSlice.actions;

  const favoriteClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      idChecked.length > 0
        ? idChecked.map((item) => {
            dispatch(toggleFavorites(item));
          })
        : dispatch(toggleFavorites(id));
    },
    [idChecked, dispatch, toggleFavorites, id]
  );

  const activeFavorites = useMemo(() => {
    return favorites.some((item) => item === id);
  }, [favorites, id]);

  const isChecked = useMemo(() => {
    return idChecked.some((item) => item === id);
  }, [id, idChecked]);

  return (
    <div
      className={
        isChecked ? `${styles.post} ${styles.postActive}` : styles.post
      }
      onClick={() => dispatch(addChecked(id))}
    >
      <p className={styles.id}>ID: {id}</p>
      <h1 className={styles.title}>{product}</h1>
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
      <div className={styles.footer}>
        <p className={styles.price}>
          Цена товара: <span className={styles.spanPrice}>{price}</span>
        </p>
        <p className={styles.brand}>{brand}</p>
      </div>
    </div>
  );
};

export default Post;
