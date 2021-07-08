import React, { FunctionComponent } from "react";

const NoFarms: FunctionComponent = (): JSX.Element => {
    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", flexDirection: "column" }}>
                <img src="/dashboard/cube.svg" alt="" />
                <h2>No Farms Yet</h2>
            </div>
        </div>
    )
}

export default NoFarms;