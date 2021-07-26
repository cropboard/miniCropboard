import React, { FunctionComponent } from "react";

// import mainControl components
import CreateFarmButton from "./createFarmButton";
import ControlButton from "./ControlButton";


interface DashboardMaincontrolsProps {
    createFarmAction?: Function
    analyticsAction?: Function
    tasksAction?: Function
    historyAction?: Function
}

const DashboardMaincontrols: FunctionComponent<DashboardMaincontrolsProps> = ({ createFarmAction, analyticsAction, tasksAction, historyAction }): JSX.Element => {

    return (
        <aside>
            <CreateFarmButton action={() => createFarmAction()} />
            <ControlButton name="Analytics" iconSource="/dashboard/chart.svg" action={() => analyticsAction()} />
            <ControlButton name="Tasks" iconSource="/dashboard/task.svg" action={() => tasksAction()} />
            <ControlButton name="History" iconSource="/dashboard/clock-outline.svg" action={() => historyAction()} />
        </aside>
    )
}

export default DashboardMaincontrols;