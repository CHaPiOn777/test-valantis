import { useMemo } from "react";
import styles from "./Posts.module.css";
import Post from "./Post/Post";
import { useAppSelector } from "../../hooks/redux";
import { Loader } from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";

const Posts = () => {
  const { products } = useAppSelector((state) => state.productsReducer);
  const { error } = useAppSelector((state) => state.productsReducer);
  const { isLoading } = useAppSelector((state) => state.productsReducer);
  const { isFiltered } = useAppSelector((state) => state.productsReducer);
  const { isFavorites } = useAppSelector((state) => state.productsReducer);
  const { favorites } = useAppSelector((state) => state.productsReducer);

  const postsFilter = useMemo(() => {
    if (isFavorites === true) {
      const favoritesFilter = favorites.map((favorite) => {
        return products.filter((product) => product.id === favorite);
      });
      return favoritesFilter.flat();
    }
    return products;
  }, [favorites, isFavorites, products]);

  return (
    <Loader loader={isLoading}>
      {error && <h1 className={styles.error}>{error}</h1>}
      <div className={styles.posts}>
        {postsFilter && postsFilter.length ? (
          postsFilter?.map((product, index) => {
            return (
              <Post
                key={index}
                brand={product.brand}
                id={product.id}
                price={product.price}
                product={product.product}
              />
            );
          })
        ) : (
          <p className={styles.description}>Товаров нет</p>
        )}
      </div>
      {!isFiltered && !isFavorites && <Pagination />}
    </Loader>
  );
};

export default Posts;
