import { Author } from "../models/Author";

export interface CommentProps {
    postId: number;
    author: Author;
    content: string[];
    likes: number;
    publishedAt: Date;
    onLikeAdded: (commentKey: string) => void;
    onDeleteComment: (commentKey: string) => void;
}