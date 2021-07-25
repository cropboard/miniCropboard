import React, { FunctionComponent, useState, useEffect } from "react";

// import custom components
import DashboardHeader from "../../components/dashboard/Header";
import DashboardMaincontrols from "../../components/dashboard/mainControls";

import NoFarms from "../../components/dashboard/NoFarms";

// import main dashboard styles
import styles from "../../styles/dashboard/index.module.css";

interface userInfo {
    userName: string
    user: string // user jwt
}

const DashboardIndex: FunctionComponent = (): JSX.Element => {

    // user information -> name and jwt
    const [userInfo, setUserInfo] = useState<userInfo>();

    // are you authenticated ?
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    // we want to check this before the component mounts
    useEffect(() => {
        // get jwt and name from localStorage
        let name: string = localStorage.getItem("userName") ?? undefined;
        let token: string = localStorage.getItem("user") ?? undefined;

        console.log(name, token)

        if (name === undefined || token === undefined) {
            return
        } else {
            setUserInfo({ userName: name, user: token });
            setIsAuthenticated(true);
        }

    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <div>
                <DashboardHeader />
                <div>
                    <h2>You are not Authenticated</h2>
                </div>
            </div>
        )
    }


    return (
        <div className={styles.mainDashboardPage}>
            <DashboardHeader name={userInfo.userName} />
            <div className={styles.mainDashboardContainer}>
                <section className={styles.mainControlSection}>
                    <div className={styles.mainControlSectionElementContainer}>
                        <DashboardMaincontrols />
                    </div>
                </section>
                <section className={styles.mainControlSection}>
                    <div className={styles.noFarmShower}>
                        <NoFarms />
                    </div>
                </section>
                <section className={styles.mainControlSection}>

                </section>
            </div>
        </div>
    )
}

export default DashboardIndex;