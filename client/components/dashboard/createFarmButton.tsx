import React, { FunctionComponent } from "react";

import styles from "../../styles/dashboard/components.module.css";

const CreateFarmButton: FunctionComponent = (): JSX.Element => {
    return (
        <div className={styles.createFarmButton}>
            <p>
                New Farm
            </p>
            <img src="/dashboard/plus-outline.png" alt="" />
        </div>
    )
}

export default CreateFarmButton;