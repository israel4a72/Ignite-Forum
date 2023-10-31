import { AvatarProps } from './AvatarProps';

import styles from './Avatar.module.css';

export function Avatar({ hasBorder = true, ...props }: AvatarProps) {
    return (
        <img
            className={hasBorder ? styles.avatarWithBorder : styles.avatar}
            src={props.src}
            alt={props.alt}
        />
    );
}