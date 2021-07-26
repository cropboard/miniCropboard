

import React, { FunctionComponent } from "react";

import styles from "../../styles/dashboard/components.module.css";

interface NewFarmCardProps {
    action: Function
}
const NewFarmCard: FunctionComponent<NewFarmCardProps> = ({ action }): JSX.Element => {
    return (
        <div onClick={() => action()} className={styles.newFarmCard}>
            <div>
                <img src="/dashboard/plus-outline.png" alt="new-farm" />
                <h2>New Farm</h2>
            </div>
        </div>
    )
}

export default NewFarmCard;
