import React, { FunctionComponent } from "react";

// import logo component
import Logo from "../logo";

const DashboardHeader: FunctionComponent = (): JSX.Element => {
    return (
        <div>
            <Logo />

            <h2>Header</h2>
        </div>
    )
}

export default DashboardHeader;