import { PencilLine } from 'phosphor-react';
import { Avatar } from './Avatar';

import { SidebarProps } from './SidebarProps';

import styles from './Sidebar.module.css'

export function Sidebar({ usuario }: SidebarProps) {
    return (
        <aside className={styles.sidebar}>
            <img
                className={styles.cover}
                src={usuario.backgroundUrl}
            />

            <div className={styles.profile}>
                <Avatar src={usuario.avatarUrl} />

                <strong>{usuario.name}</strong>
                <span>{usuario.role}</span>
            </div>

            <footer>
                <a href="#">
                    <PencilLine size={20} />
                    Editar seu perfil
                </a>
            </footer>
        </aside>
    );
}