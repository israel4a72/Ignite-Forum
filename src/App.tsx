import { Post } from './components/Post';
import { Header } from './components/Header';
import './global.css';
import styles from './App.module.css';
import { Sidebar } from './components/Sidebar';

const usuarioLogado = {
  backgroundUrl: "https://plus.unsplash.com/premium_photo-1678565869434-c81195861939?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=500&q=50",
  avatarUrl: "https://github.com/israel4a72.png",
  name: "Israel Júnior",
  role: "Backend Developer"
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/israel4a72.png",
      name: "Israel Júnior",
      role: "Web Developer",
    },
    content: [
      { type: "paragraph", content: "Pacotes" },
      { type: "paragraph", content: "Eu só defendo o pobre coitado do desenvolvimento de pacotes." },
      { type: "link", content: "somelink.com/route-israel" }
    ],
    publishedAt: new Date("2023-10-20 08:45")
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/luteciorv.png",
      name: "Luís Felipe",
      role: "Web Developer 2",
    },
    content: [
      { type: "paragraph", content: "Testes" },
      { type: "paragraph", content: "Luís defende testes com unhas e dentes." },
      { type: "link", content: "somelink.com/route-luis" }
    ],
    publishedAt: new Date("2023-10-10 08:25")
  }
];

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar usuario={usuarioLogado} />
        <main>
          {posts.map(post => {
            return (
              <Post
                key={post.id}
                id={post.id}
                author={post.author}
                content={post.content as Content[]}
                publishedAt={post.publishedAt}
                usuarioLogado={usuarioLogado}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
}