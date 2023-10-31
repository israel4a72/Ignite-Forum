import { Author } from "../models/Author";
import { TextContent } from "../models/TextContent";

export interface PostProps {
    id: number;
    author: Author;
    content: TextContent[];
    publishedAt: Date;
    usuarioLogado: Author;
}