import React, { FunctionComponent } from "react";

// import mainControl components
import CreateFarmButton from "./createFarmButton";

const DashboardMaincontrols: FunctionComponent = (): JSX.Element => {
    return (
        <aside>
            <CreateFarmButton />
        </aside>
    )
}

export default DashboardMaincontrols;