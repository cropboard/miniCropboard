import React, { FunctionComponent } from "react";

// import custom components

// import logo component
import Logo from "../logo";

// import avatar component
import HeaderAvatar from "./HeaderAvatar";


// import styles
import styles from "../../styles/dashboard/header.module.css";

const DashboardHeader: FunctionComponent = (): JSX.Element => {
    return (
        <header className={styles.header}>
            <Logo /> {/* Cropboard logo */}
            <HeaderAvatar profile="/josias.jpg" name="Josias" />
        </header>
    )
}

export default DashboardHeader;