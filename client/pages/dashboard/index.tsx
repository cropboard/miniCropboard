import React, { FunctionComponent } from "react";

// import custom components
import DashboardHeader from "../../components/dashboard/Header";
import DashboardMaincontrols from "../../components/dashboard/mainControls";

const DashboardIndex: FunctionComponent = (): JSX.Element => {
    return (
        <div style={{ height: "100vh" }}>
            <DashboardHeader />
            <div>
                <section>
                    <DashboardMaincontrols />
                </section>
            </div>
        </div>
    )
}

export default DashboardIndex;