import React, { FunctionComponent, useState } from "react";

import { NextRouter, useRouter } from "next/router";

// import styles
import styles from "../../styles/dashboard/header.module.css";

interface HeaderAvatarProps {
    profile: string
    name: string
}

const HeaderAvatar: FunctionComponent<HeaderAvatarProps> = ({ profile, name }): JSX.Element => {
    const router: NextRouter = useRouter();
    function logOutUser(): void {
        // redirect to logged out page
        router.replace("/loggedout");
    }
    const [modal, setModal] = useState<boolean>(false);
    return (
        <div>
            <div onClick={() => setModal(!modal)} className={styles.headerAvatar}>
                <p>{name}</p>
                <div className={styles.profile}>
                    <img src={profile} alt={name} />
                </div>
            </div>
            {modal ?
                <div className={styles.userModal}>
                    <a href="mailto:support@cropboard.studio">
                        <button>
                            Support
                        </button>
                    </a>
                    <button onClick={() => logOutUser()}>
                        Log Out
                    </button>
                </div>
                :
                <div style={{ visibility: "hidden" }}>

                </div>
            }
        </div>
    )
}

export default HeaderAvatar;