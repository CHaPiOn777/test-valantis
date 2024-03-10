import axios from "axios";
import md5 from "md5";
import { AppDispatch } from "../store";
import { TComments, TPost, TUser } from "../../../types/types";
import { PostsSlice } from "./PostsSlice";
import { UsersSlice } from "./UsersSlice";
import { CommentsSlice } from "./CommentsSlice";
import { formatteDate } from "../../utils/date-format";
import { ProductsSlice } from "./ProductsSlice";
import { useAppSelector } from "../../hooks/redux";

export const baseURL = `https://jsonplaceholder.typicode.com/`;
export const valantisURL = `http://api.valantis.store:40000/`;

const password = "Valantis";
const timestamp = formatteDate();

const authString = `${password}_${timestamp}`;
const hash = md5(authString);

const getData = async (action: string, params?: any) => {
  try {
    const response = await axios.post(
      valantisURL,
      {
        action: action,
        params: params,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Auth": hash,
        },
      }
    );

    if (response.data !== undefined) {
      return response.data;
    }
  } catch (error) {
    // Обработка ошибки
    console.error(error);
  }
};
export const fetchProductsUid =
  (params: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(PostsSlice.actions.postsFetching());
      const resProductsUid = await getData("get_ids", params);
      dispatch(
        ProductsSlice.actions.productsFetchingUidSuccess(resProductsUid.result)
      );
    } catch (e) {
      dispatch(
        ProductsSlice.actions.productsFetchingError(
          "Произошла ошибка при загрузке UID товаров"
        )
      );
    }
  };
export const fetchProducts =
  (productsUid: string[]) => async (dispatch: AppDispatch) => {
    try {
      dispatch(PostsSlice.actions.postsFetching());
      const paramsProducts = {
        ids: productsUid,
      };
      console.log(productsUid);
      const respProducts = await getData("get_items", paramsProducts);
      dispatch(
        ProductsSlice.actions.productsFetchingSuccess(respProducts.result)
      );
    } catch (e) {
      dispatch(
        ProductsSlice.actions.productsFetchingError(
          "Произошла ошибка при загрузке товаров"
        )
      );
    }
  };
// export const fetchPosts = () => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(PostsSlice.actions.postsFetching());
//     const res = await axios.get<TPost[]>(`${baseURL}posts`);
//     const resUsers = await axios.get<TUser[]>(`${baseURL}users`);

//     const resProducts = await getData("get_ids");
//     console.log(resProducts);

//     const posts = res.data.map((post) => {
//       const user = resUsers.data.filter((item) => item.id === post.userId);
//       return { post: post, user: user };
//     });
//     dispatch(PostsSlice.actions.postsFetchingSuccess(posts));
//   } catch (e) {
//     dispatch(
//       PostsSlice.actions.postsFetchingError(
//         "Произошла ошибка при загрузке постов"
//       )
//     );
//   }
// };

export const fetchPostsDelete =
  (id: number[]) => async (dispatch: AppDispatch) => {
    try {
      dispatch(PostsSlice.actions.postsDelete());
      id.forEach(async (item) => {
        const res = await axios.delete<TPost[]>(`${baseURL}posts/1`);
        dispatch(PostsSlice.actions.postsDeleteSuccess(item));
      });
    } catch (e) {
      dispatch(
        PostsSlice.actions.postsDeleteError(
          "Произошла ошибка при удалении постов"
        )
      );
    }
  };

export const fetchPostsPatching =
  (title: string, userName: string, body: string, id: number) =>
  async (dispatch: AppDispatch) => {
    try {
      const post = { title, userName, body, id };
      dispatch(PostsSlice.actions.postsPatching());
      const res = await axios.patch<TPost>(`${baseURL}posts/1`, {
        body: { title, body },
      });
      dispatch(PostsSlice.actions.postsPatchingSuccess(post));
    } catch (e) {
      dispatch(
        PostsSlice.actions.postsPatchingError(
          "Произошла ошибка при редактировании постов"
        )
      );
    }
  };

export const fetchUsers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(UsersSlice.actions.usersFetching());
    const res = await axios.get<TUser[]>(`${baseURL}users`);
    dispatch(UsersSlice.actions.usersFetchingSuccess(res.data));
  } catch (e) {
    dispatch(
      UsersSlice.actions.usersFetchingError(
        "Произошла ошибка при загрузке пользователей"
      )
    );
  }
};

export const fetchComments = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(CommentsSlice.actions.commentsFetching());
    const res = await axios.get<TComments[]>(`${baseURL}comments`);
    dispatch(CommentsSlice.actions.commentsFetchingSuccess(res.data));
  } catch (e) {
    dispatch(
      CommentsSlice.actions.commentsFetchingError(
        "Произошла ошибка при загрузке комментариев"
      )
    );
  }
};
