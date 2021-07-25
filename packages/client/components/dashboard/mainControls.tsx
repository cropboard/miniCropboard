import React, { FunctionComponent, useState, useEffect } from "react";

// import mainControl components
import CreateFarmButton from "./createFarmButton";
import ControlButton from "./ControlButton";

// use modal
import Modal from "../modal";

co

return (
    <aside>
        <CreateFarmButton action={function () { setModalOpen(!(modalOpen)) }} />
        <ControlButton name="Analytics" iconSource="/dashboard/chart.svg" action={() => undefined} />
        <ControlButton name="Tasks" iconSource="/dashboard/task.svg" action={() => undefined} />
        <ControlButton name="History" iconSource="/dashboard/clock-outline.svg" action={() => undefined} />
    </aside>
)
}

export default DashboardMaincontrols;