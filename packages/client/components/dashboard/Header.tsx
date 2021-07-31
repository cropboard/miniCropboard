import React, { FunctionComponent } from "react";

// import custom components

// import logo component
import Logo from "../logo";

// import avatar component
import HeaderAvatar from "./HeaderAvatar";

// import styles
import styles from "../../styles/dashboard/header.module.css";

interface DashboardHeaderProps {
    name?: string
}

const DashboardHeader: FunctionComponent<DashboardHeaderProps> = ({ name }): JSX.Element => {
    if (!name) {
        return (
            <header className={styles.header}>
                <Logo /> {/* Cropboard logo */}
            </header>
        )
    }

    return (
        <header className={styles.header}>
            <Logo /> {/* Cropboard logo */}
            <HeaderAvatar profile="/person.png" name={name} />
        </header>
    )
}

export default DashboardHeader;