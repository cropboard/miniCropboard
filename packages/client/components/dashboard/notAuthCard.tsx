import React, { FunctionComponent } from "react";

import Link from "next/link";

// import styles
import styles from "../../styles/misc.module.css";

const NotAuthCard: FunctionComponent = (): JSX.Element => {
    return (
        <div className={styles.notAuthCardContainer}>
            <div className={styles.notAuthCard}>
                <h2>You are not Authenticated</h2>
                <p>Consider an action below</p>
                <div>
                    <Link href="/auth/signup">
                        <button>
                            SignUp
                        </button>
                    </Link>
                    <Link href="/auth/login">
                        <button>
                            LogIn
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotAuthCard;