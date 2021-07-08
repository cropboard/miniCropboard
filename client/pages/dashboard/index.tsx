import React, { FunctionComponent } from "react";

// import custom components
import DashboardHeader from "../../components/dashboard/Header";
import CreateFarmButton from "../../components/dashboard/createFarmButton";

const DashboardIndex: FunctionComponent = (): JSX.Element => {
    return (
        <div style={{ height: "100vh" }}>
            <DashboardHeader />
            <div>
                <aside>
                    <CreateFarmButton />
                </aside>
            </div>
        </div>
    )
}

export default DashboardIndex;