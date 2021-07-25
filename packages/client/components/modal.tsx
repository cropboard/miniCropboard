import React, { FunctionComponent } from "react";

// import styles
import styles from "../styles/misc.module.css";

interface ModalProps {
    children: any
    modalState: boolean // true and false for open and closed state respectively
}

const Modal: FunctionComponent<ModalProps> = ({ children, modalState }): JSX.Element => {

    if (!modalState) {
        return (
            <div className={styles.modalSkeletonClosed}>
                <div>
                    {children}
                </div>
            </div>
        )
    }

    return (
        <div className={styles.modalSkeleton}>
            <div>
                {children}
            </div>
        </div>
    )
}

export default Modal;