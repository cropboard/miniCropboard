import React, { FunctionComponent } from "react";

// import mainControl components
import CreateFarmButton from "./createFarmButton";
import ControlButton from "./ControlButton";

const DashboardMaincontrols: FunctionComponent = (): JSX.Element => {
    return (
        <aside>
            <CreateFarmButton />
            <ControlButton name="Analytics" iconSource="/dashboard/chart.svg" action={alert} />
        </aside>
    )
}

export default DashboardMaincontrols;