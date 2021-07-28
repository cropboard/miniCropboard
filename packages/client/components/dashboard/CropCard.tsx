import React, { FunctionComponent } from "react";

import styles from "../../styles/dashboard/components.module.css";

import Link from "next/link";

interface CropCardProps {
    name: string
    category: string
    fertilizer: string
    index: number
}

const CropCard: FunctionComponent<CropCardProps> = ({ name, category, fertilizer }): JSX.Element => {
    return (
        <Link>

        </Link>
    )
}

export default CropCard;