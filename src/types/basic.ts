interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  views: number;
}
interface PostsProps {
  limit: number;
  skip: number;
  pageCount: (x: TodoResponse) => void;
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
interface middleWareTypes {
  request: Request;
  params: Record<string, string | undefined>;
}
interface TodoResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}
export type {
  Post,
  PostsProps,
  PaginationButtonsProps,
  Todo,
  TodoResponse,
  middleWareTypes,
};
