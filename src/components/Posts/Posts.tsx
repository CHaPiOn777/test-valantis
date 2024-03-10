import { SetStateAction, useEffect, useMemo, useState } from "react";
import styles from "./Posts.module.css";
import Post from "./Post/Post";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchComments, fetchUsers } from "../../store/reducers/ActionCreater";
import { Loader } from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";

const Posts = () => {
  const dispatch = useAppDispatch();
  // const { comments } = useAppSelector((state) => state.commentsReducer);
  const { user } = useAppSelector((state) => state.usersReducer);
  const { products, productsUid, error, isLoading } = useAppSelector(
    (state) => state.productsReducer
  );

  console.log(products);
  const counter = localStorage.getItem("counterPerPages");

  const [currentPage, setCurrentPage] = useState<number>(1);
  // const {
  //   favorites,
  //   isFavorites,
  //   paramSort,
  //   postsPage,
  //   posts,
  //   isLoading,
  //   error,
  //   valueInput,
  // } = useAppSelector((state) => state.postReducer);

  // let postsFilter = useMemo(() => {
  //   if (isFavorites === true) {
  //     const favoritesFilter = favorites.map((favorite) => {
  //       return posts.filter((post) => post.post.id === favorite);
  //     });
  //     return favoritesFilter.flat();
  //   }
  //   if (user === "All") return posts;
  //   return posts.filter((post) => post.user[0].name === user);
  // }, [user, posts, favorites, isFavorites, paramSort, counter]);

  // postsFilter = useMemo(
  //   () =>
  //     postsFilter.filter((post) => {
  //       return post.post.title
  //         .toLocaleLowerCase()
  //         .includes(valueInput.toLocaleLowerCase());
  //     }),
  //   [valueInput, postsFilter, counter]
  // );

  // useEffect(() => {
  //   const [param, ascending] = paramSort;

  //   if (param === "ID Card") {
  //     if (ascending === "Ascending") {
  //       postsFilter.sort((a, b) => {
  //         return b.post.id - a.post.id;
  //       });
  //     } else {
  //       postsFilter.sort((a, b) => {
  //         return a.post.id - b.post.id;
  //       });
  //     }
  //   }

  //   if (param === "User Name") {
  //     if (ascending === "Ascending") {
  //       postsFilter.sort((a, b) => {
  //         if (b.user[0].name > a.user[0].name) return -1;
  //         if (b.user[0].name < a.user[0].name) return 1;
  //         return 0;
  //       });
  //     } else {
  //       postsFilter.sort((a, b) => {
  //         if (b.user[0].name > a.user[0].name) return 1;
  //         if (b.user[0].name < a.user[0].name) return -1;
  //         return 0;
  //       });
  //     }
  //   }
  // }, [postsFilter, paramSort, counter]);

  // const lastPostPages = currentPage * Number(postsPage);
  // const firstPostPages = lastPostPages - Number(postsPage);

  // const currentPost = useMemo(() => {
  //   return postsFilter.slice(firstPostPages, lastPostPages);
  // }, [postsFilter, firstPostPages, lastPostPages, paramSort, counter]);

  const paginate = (currentPage: SetStateAction<number>) =>
    setCurrentPage(currentPage);

  // useEffect(() => {
  //   dispatch(fetchUsers());
  //   dispatch(fetchComments());
  // }, []);
  const { users } = useAppSelector((state) => state.usersReducer);

  return (
    <Loader loader={isLoading}>
      {error && <h1 className={styles.error}>{error}</h1>}
      <div className={styles.posts}>
        {products &&
          products?.map((product, index) => {
            return (
              <Post
                key={index}
                brand={product.brand}
                id={product.id}
                price={product.price}
                product={product.product}
                // comments={comments.filter((item) => item.postId === post.id)}
              />
            );
          })}
      </div>
      <Pagination />
    </Loader>
  );
};

export default Posts;
