import React, { FunctionComponent } from "react";

// import styles
import styles from "../styles/misc.module.css";

interface ModalProps {
  children: any;
  modalState: boolean; // true and false for open and closed state respectively
  closeHandler?: Function;
}

const Modal: FunctionComponent<ModalProps> = ({
  children,
  modalState,
  closeHandler,
}): JSX.Element => {
  if (!modalState) {
    return (
      <div>
        <div className={styles.modalSkeletonClosed}>
          <div>{/* {children} */}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalSkeleton}>
        <span>
          <button onClick={() => closeHandler()}>&times;</button>
        </span>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
