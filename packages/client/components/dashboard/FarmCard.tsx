
import React, { FunctionComponent } from "react";

import styles from "../../styles/dashboard/components.module.css";

import Link from "next/link";

interface FarmCardProps {
    title: string
    location: string
    category: string
    kind: string
    id: string
    index: number
}

const FarmCard: FunctionComponent<FarmCardProps> = ({ title, location, kind, category, id, index }): JSX.Element => {
    return (
        <Link href={`/dashboard/farm/${index}`}>
            <div className={styles.farmCard}>
                <span className={styles.title__index}>
                    <h2> {title} </h2> <span>{index}</span>
                </span>
                <div className={styles.varWidth}>
                    <span className={styles.plant__type}>
                        <p> Category :  {category} Crop </p>
                    </span>
                    <p className={styles.fertilizer}> Class : {kind} </p>
                </div>
                <p className={styles.location}> Location : {location} </p>
            </div>
        </Link>
    )
}

export default FarmCard;
