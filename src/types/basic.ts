interface PostAuthor {
  _id: string;
  username: string;
}

interface Post {
  _id: string;
  title: string;
  body: string;
  tags: string[];
  views: number;
  author: PostAuthor | null;
  createdAt?: string;
  updatedAt?: string;
}

interface PostsListResponse {
  posts: Post[];
  total: number;
  page: number;
  limit: number;
}

interface User {
  id: string;
  username: string;
  email: string;
}

interface PaginationButtonsProps {
  noOfPags: number;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  skip: number;
  limit: number;
}

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export type {
  Post,
  PostAuthor,
  PostsListResponse,
  User,
  PaginationButtonsProps,
  Todo,
};
