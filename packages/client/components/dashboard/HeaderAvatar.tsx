import React, { FunctionComponent } from "react";

// import styles
import styles from "../../styles/dashboard/header.module.css";

interface HeaderAvatarProps {
    profile: string
    name: string
}

const HeaderAvatar: FunctionComponent<HeaderAvatarProps> = ({ profile, name }): JSX.Element => {
    return (
        <div className={styles.headerAvatar}>
            <p>{name}</p>
            <div className={styles.profile}>
                <img src={profile} alt={name} />
            </div>
        </div>
    )
}

export default HeaderAvatar;