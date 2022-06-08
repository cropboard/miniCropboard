import React, { FunctionComponent } from "react";

import styles from "../../styles/dashboard/components.module.css";

interface NewCropCardProps {
  action: Function;
}

const NewCropCard: FunctionComponent<NewCropCardProps> = ({
  action,
}): JSX.Element => {
  return (
    <div onClick={() => action()} className={styles.newFarmCard}>
      <div>
        <img src="/dashboard/plus-outline.png" alt="new-farm" />
        <h2>New Crop</h2>
      </div>
    </div>
  );
};

export default NewCropCard;
