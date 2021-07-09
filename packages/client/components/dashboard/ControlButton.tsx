import React, { FunctionComponent } from "react";

// import styles
import styles from "../../styles/dashboard/components.module.css";

interface ControlButton {
    name: string
    iconSource: string
    action: Function
}

const ControlButton: FunctionComponent<ControlButton> = ({ name, iconSource, action }): JSX.Element => {
    return (
        <button className={styles.controlButton} onClick={() => action()}>
            <p> {name} </p>
            <img src={iconSource} alt={`${name}-Action`} />
        </button>
    )
}

export default ControlButton;