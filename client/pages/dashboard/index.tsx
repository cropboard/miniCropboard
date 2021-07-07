import React, { FunctionComponent } from "react";

// import custom components
import DashboardHeader from "../../components/dashboard/Header";

const DashboardIndex: FunctionComponent = (): JSX.Element => {
    return (
        <div>
            <DashboardHeader />
            <h1>Dashboard Index</h1>
        </div>
    )
}

export default DashboardIndex;