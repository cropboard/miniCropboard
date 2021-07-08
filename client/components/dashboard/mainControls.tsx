import React, { FunctionComponent } from "react";

// import mainControl components
import CreateFarmButton from "./createFarmButton";
import ControlButton from "./ControlButton";

const DashboardMaincontrols: FunctionComponent = (): JSX.Element => {
    return (
        <aside>
            <CreateFarmButton action={alert} />
            <ControlButton name="Analytics" iconSource="/dashboard/chart.svg" action={alert} />
            <ControlButton name="Tasks" iconSource="/dashboard/task.svg" action={alert} />
            <ControlButton name="History" iconSource="/dashboard/clock-outline.svg" action={alert} />
        </aside>
    )
}

export default DashboardMaincontrols;