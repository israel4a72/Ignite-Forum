import { Comment } from './Comment';
import { Avatar } from './Avatar';

import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import styles from './Post.module.css';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { PostProps } from './PostProps';
import { CommentModel } from '../models/CommentModel';
import { TextContent } from '../models/TextContent';

const commentsGroup: CommentModel[] = [
    {
        postId: 1,
        author: {
            avatarUrl: "https://github.com/luteciorv.png",
            name: "Luís Felipe",
            role: "Desenvolvedor Web 2"
        },
        content: [
            "Ain faz pacote bla bla bla"
        ],
        likes: 2,
        publishedAt: new Date("2023-10-20 08:55")
    },
    {
        postId: 2,
        author: {
            avatarUrl: "https://github.com/israel4a72.png",
            name: "Israel Júnior",
            role: "Desenvolvedor Web"
        },
        content: [
            "Ain faz teste bla bla bla",
        ],
        likes: 5,
        publishedAt: new Date("2023-10-20 09:05")
    },
];

export function Post({ id, author, content, publishedAt, usuarioLogado }: PostProps) {
    const [comments, setComments] = useState(commentsGroup);
    const [newCommentText, setNewCommentText] = useState('');

    const publishedDateTitle = format(publishedAt, "d 'de' MMMM 'às' HH:mm'h'", { locale: ptBR });
    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, { locale: ptBR, addSuffix: true });

    const isNewCommentEmpty = newCommentText.length === 0;

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault();

        const content = (event.target as HTMLFormElement).commentArea.value;

        if (content === null) return;

        setComments([...comments,
        {
            postId: id,
            author: {
                avatarUrl: usuarioLogado.avatarUrl,
                name: usuarioLogado.name,
                role: usuarioLogado.role
            },
            content: [
                content
            ],
            likes: 0,
            publishedAt: new Date()
        }]);
        console.log(content, comments)

        setNewCommentText('');
    }
    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('');
        setNewCommentText(event.target.value);
    }
    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity("Este campo é obrigatório");
    }
    function deleteComment(commentKey: string) {
        setComments(comments.filter(item => item.content + '-' + item.postId !== commentKey));
    }
    function addLikeToComment(commentKey: string) {
        let listaAtualizada = comments;
        listaAtualizada.forEach(comment => {
            if (comment.content + '-' + comment.postId === commentKey)
                comment.likes++;
        });
        setComments((state: any) => {
            return [...state, listaAtualizada];
        });
    }

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title={publishedDateTitle} dateTime={publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {
                    content.map((item, index) => {
                        if (item.type === 'paragraph') {
                            return <p key={index}>{item.content}</p>
                        }
                        else if (item.type === 'link') {
                            return <a key={index} href={item.content}>{item.content}</a>
                        }
                    })
                }
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea name="commentArea"
                    placeholder='Deixe um comentário'
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    required
                />

                <footer>
                    <button type="submit" disabled={isNewCommentEmpty}>
                        Publicar
                    </button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {
                    comments.map(comment => {
                        if (comment.postId === id) {
                            return (
                                <Comment
                                    key={comment.content + '-' + comment.postId}
                                    postId={comment.postId}
                                    author={comment.author}
                                    content={comment.content}
                                    publishedAt={comment.publishedAt}
                                    likes={comment.likes}
                                    onLikeAdded={addLikeToComment}
                                    onDeleteComment={deleteComment}
                                />
                            );
                        }
                    })
                }
            </div>
        </article >
    );
}