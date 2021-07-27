
import React, { FunctionComponent } from "react";

import styles from "../../styles/dashboard/components.module.css";

import Link from "next/link";

interface FarmCardProps {
    title: string
    location: string
    category: string
    kind: string
    id: string
}

const FarmCard: FunctionComponent<FarmCardProps> = ({ title, location, kind, category, id }): JSX.Element => {
    return (
        <Link href={`/dashboard/farm/${id}`}>
            <div className={styles.farmCard}>
                <h2> {title} </h2>
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
