import React, { FunctionComponent, useEffect } from "react";
import Logo from "../components/logo";

import { NextRouter, useRouter } from "next/router";

const LoggedOut: FunctionComponent = (): JSX.Element => {
    const router: NextRouter = useRouter();
    return (
        <div>
            <div style={{ fontFamily: "sans-serif", display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", padding: "2em", borderRadius: "6px" }}>
                <Logo />
                <div>
                    <h2>Something Wrong Occurred</h2>
                    <p onClick={() => router.reload()}>Try Reloading</p>
                </div>
            </div>
        </div>
    )
}

export default LoggedOut;