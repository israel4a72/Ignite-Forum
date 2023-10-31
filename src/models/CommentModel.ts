import { Author } from "./Author";
import { CommentContent } from "./TextContent";

export interface CommentModel {
    postId: number;
    content: string[];
    author: Author;
    likes: number;
    publishedAt: Date;
}