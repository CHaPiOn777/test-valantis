export interface IIcon {
  fillDefault?: string;
  strokeDefault?: string;
  fillHovered?: string;
  strokeHovered?: string;
}

export type TPost = {
  body: string;
  id: number;
  title: string;
  userId: number;
};

export type TPostsUser = {
  post: TPost;
  user: TUser[];
}
export type TPostEdit = {
  body: string;
  title: string;
  userId: number;
};

export type TUser = {
  name: string;
  id: number;
};

export type TComments = {
  body: string;
  email: string;
  name: string;
  postId?: number;
  id?: number;
};
