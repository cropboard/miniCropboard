import React, { FunctionComponent, useEffect } from "react";
import Logo from "../components/logo";

import { NextRouter, useRouter } from "next/router";

const LoggedOut: FunctionComponent = (): JSX.Element => {
    const router: NextRouter = useRouter();
    useEffect(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("userName");

        setTimeout(() => router.replace("/"), 2000);
    }, [])
    return (
        <div>
            <div style={{ fontFamily: "sans-serif", display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", padding: "2em", borderRadius: "6px" }}>
                <Logo />
                <div>
                    <h2>You Just Logged Out</h2>
                    <p>You will be redirected to the homepage in a bit...</p>
                </div>
            </div>
        </div>
    )
}

export default LoggedOut;