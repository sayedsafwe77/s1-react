interface Post{
  id: number;
  title: string,
  body: string,
  tags: string[],
  views: number
}
interface PostsProps{
    limit: number;
    skip: number;
    pageCount: (x: number) => void;
}
interface PaginationButtonsProps{
    noOfPags: number;
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    skip: number,
    limit: number
}
interface Todo{
  id: number,
  todo: string,
  completed: boolean,
  userId: number
}
export type {Post,PostsProps,PaginationButtonsProps,Todo}