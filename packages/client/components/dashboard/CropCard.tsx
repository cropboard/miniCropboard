import React, { FunctionComponent } from "react";

import styles from "../../styles/dashboard/components.module.css";

import Link from "next/link";

interface CropCardProps {
    name: string
    category: string
    fertilizer: string
    index: number
    page__farmIndex: number
}

const CropCard: FunctionComponent<CropCardProps> = ({ name, category, fertilizer, index, page__farmIndex }): JSX.Element => {
    return (
        <Link href={`/dashboard/farm/${page__farmIndex}/crop/${index}`}>
            <div className={styles.cropCard}>
                <h2 className={styles.cropCardTitle}> {name} </h2>
                <div>
                    <p className={styles.cropCardFruit}> Crop </p>
                    <p className={styles.cropCardClass}> Class :  {category} </p>
                </div>
                <p className={styles.cropCardFertilizer}>Fertilizer : {fertilizer}</p>
            </div>
        </Link>
    )
}

export default CropCard;