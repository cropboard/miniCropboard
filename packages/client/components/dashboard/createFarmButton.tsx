import React, { FunctionComponent } from "react";

import styles from "../../styles/dashboard/components.module.css";

interface createFarmButtonProps {
    action?: Function
}

const CreateFarmButton: FunctionComponent<createFarmButtonProps> = ({ action }): JSX.Element => {
    return (
        <div onClick={() => action()} className={styles.createFarmButton}>
            <p>
                New Farm
            </p>
            <img src="/dashboard/plus-outline.png" alt="" />
        </div>
    )
}

export default CreateFarmButton;