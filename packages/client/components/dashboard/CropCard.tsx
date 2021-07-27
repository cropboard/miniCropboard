import React, { FunctionComponent } from "react";

import styles from "../../styles/dashboard/components.module.css";

interface CropCardProps {
    name: string
    category: string
    fertilizer: string
}

const CropCard: FunctionComponent<CropCardProps> = ({ name, category, fertilizer }): JSX.Element => {
    return (
        <div className={styles.cropCard}>
            <h2 className={styles.cropCardTitle}> {name} </h2>
            <div>
                <p className={styles.cropCardFruit}> Crop </p>
                <p className={styles.cropCardClass}> Class :  {category} </p>
            </div>
            <p className={styles.cropCardFertilizer}>Fertilizer : {fertilizer}</p>
        </div>
    )
}

export default CropCard;