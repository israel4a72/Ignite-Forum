import { Trash } from 'phosphor-react';
import { ThumbsUp } from 'phosphor-react';

import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import { Avatar } from './Avatar';
import { CommentProps } from './CommentProps';

import styles from './Comment.module.css';

export function Comment({ postId, author, content, likes, publishedAt, onLikeAdded, onDeleteComment }: CommentProps) {
    const commentKey = content + '-' + postId;

    const publishedDateTitle = format(publishedAt, "d 'de' MMMM 'às' HH:mm'h'", { locale: ptBR });
    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, { locale: ptBR, addSuffix: true });

    function handleDeleteComment() {
        onDeleteComment(commentKey);
    }
    function handleAddLikeComment() {
        onLikeAdded(commentKey);
    }

    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src={author.avatarUrl} />

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>{author.name}</strong>
                            <time
                                title={publishedDateTitle}
                                dateTime={publishedAt.toISOString()}>
                                {publishedDateRelativeToNow}
                            </time>
                        </div>

                        <button title="Deletar comentário" onClick={handleDeleteComment}>
                            <Trash size={24} />
                        </button>
                    </header>

                    {content.map(item => {
                        return <p>{item}</p>;
                    })}
                </div>

                <footer>
                    <button onClick={handleAddLikeComment}>
                        <ThumbsUp />
                        Aplaudir <span>{likes}</span>
                    </button>
                </footer>
            </div>
        </div>
    );
}