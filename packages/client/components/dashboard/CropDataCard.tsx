import React, { FunctionComponent } from "react";

import styles from "../../styles/dashboard/components.module.css";

interface CropDataProps {
    name: string
    category: string
    fertilizer: string
    fertilizerQuantity: number
    water: number
    cost: number
    // weather: any
}

const CropDataCard: FunctionComponent<CropDataProps> = ({ name, category, fertilizer, fertilizerQuantity, water, cost }): JSX.Element => {
    return (
        <div className={styles.cropDataCard}>
            <h2 className={styles.cropDataName}> {name} </h2>
            <div>
                <p> Category : {category} </p>
                <div>
                    <span>
                        <h3> Fertilizer </h3>
                        <p> {fertilizer} </p>
                    </span>
                    <p> Quantity : {fertilizerQuantity} </p>
                </div>
                <span>
                    <p> Water {water}L </p>
                    <p> Cost {cost} Local </p>
                </span>
            </div>
        </div>
    )
}

export default CropDataCard;