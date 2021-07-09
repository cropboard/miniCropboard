import React, { FunctionComponent } from "react";

// import mainControl components
import CreateFarmButton from "./createFarmButton";
import ControlButton from "./ControlButton";

const DashboardMaincontrols: FunctionComponent = (): JSX.Element => {
    return (
        <aside>
            <CreateFarmButton action={eval("console.log('yo')")} />
            <ControlButton name="Analytics" iconSource="/dashboard/chart.svg" action={eval("console.log('yo')")} />
            <ControlButton name="Tasks" iconSource="/dashboard/task.svg" action={eval("console.log('yo')")} />
            <ControlButton name="History" iconSource="/dashboard/clock-outline.svg" action={eval("console.log('yo')")} />
        </aside>
    )
}

export default DashboardMaincontrols;