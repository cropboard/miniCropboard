
import React, { FunctionComponent } from "react";

import styles from "../../styles/dashboard/components.module.css";

import Link from "next/link";

interface FarmCardProps {
    title: string
    location: string
    fertilizer: string
    plant: string
    category: string
    id: string
}

const FarmCard: FunctionComponent<FarmCardProps> = ({ title, location, fertilizer, plant, category, id }): JSX.Element => {
    return (
        <Link href={`/dashboard/farm/${id}`}>
            <div className={styles.farmCard}>
                <h2> {title} </h2>
                <div className={styles.varWidth}>
                    <span className={styles.plant__type}>
                        <p> {plant} </p>
                        <p> {category} </p>
                    </span>
                    <p className={styles.fertilizer}> Fertilizer : {fertilizer} </p>
                </div>
                <p className={styles.location}> {location} </p>
            </div>
        </Link>
    )
}

export default FarmCard;
