import React, { FunctionComponent } from "react";

// logo styles
import styles from "../styles/logo.module.css";

const Logo: FunctionComponent = (): JSX.Element => {
    return (
        <div className={styles.logo}>
            <h1>C</h1>
        </div>
    )
}

export default Logo;
