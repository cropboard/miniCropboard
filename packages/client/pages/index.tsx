import React, { FunctionComponent, useEffect } from "react";

import { useRouter, NextRouter } from "next/router";

const Index: FunctionComponent = (): JSX.Element => {
    const router: NextRouter = useRouter();
    useEffect(() => {
        setTimeout((() => router.replace("/dashboard")), 1000);
    });

    return (
        <div>
            <h1>Redirecting to dashboard...</h1>
        </div>
    )
}

export default Index;