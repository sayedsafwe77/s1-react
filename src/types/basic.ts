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
interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<User>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

export type {
  Post,
  PostAuthor,
  PostsListResponse,
  User,
  PaginationButtonsProps,
  Todo,
  AuthContextValue,
};
