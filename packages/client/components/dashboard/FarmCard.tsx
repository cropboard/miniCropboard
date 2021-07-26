
import React, { FunctionComponent } from "react";



interface FarmCardProps {
    title: string
    location: string
    fertilizer: string
    plant: string
    category: string
}

const FarmCard: FunctionComponent<FarmCardProps> = ({ title, location, fertilizer, plant, category }): JSX.Element => {
    return (
        <div>
            <h2> {title} </h2>
            <div>
                <p> {plant} </p>
                <p> {category} </p>
                <p> {fertilizer} </p>
            </div>
            <p> {location} </p>
        </div>
    )
}

export default FarmCard;
