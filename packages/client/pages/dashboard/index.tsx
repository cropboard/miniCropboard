import React, { FunctionComponent, useState, useEffect } from "react";

// import custom components
import DashboardHeader from "../../components/dashboard/Header";
import DashboardMaincontrols from "../../components/dashboard/mainControls";

import NoFarms from "../../components/dashboard/NoFarms";
import NotAuthCard from "../../components/dashboard/notAuthCard";

// import main dashboard styles
import styles from "../../styles/dashboard/index.module.css";
import styles_ from "../../styles/misc.module.css";

// use modal
import Modal from "../../components/modal";

interface userInfo {
    userName: string
    user: string // user jwt
}

const DashboardIndex: FunctionComponent = (): JSX.Element => {

    // user information -> name and jwt
    const [userInfo, setUserInfo] = useState<userInfo>();

    // are you authenticated ?
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    // modals states
    const [farmCreateOpen, setFarmCreateOpen] = useState<boolean>(false);

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
                <NotAuthCard />
            </div>
        )
    }

    return (
        <div className={styles.mainDashboardPage}>
            <DashboardHeader name={userInfo.userName} />
            <div className={styles.mainDashboardContainer}>
                <section className={styles.mainControlSection}>
                    <div className={styles.mainControlSectionElementContainer}>
                        <DashboardMaincontrols
                            createFarmAction={() => setFarmCreateOpen(!farmCreateOpen)}
                            analyticsAction={() => undefined}
                            tasksAction={() => undefined}
                            historyAction={() => undefined}
                        />
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

            {/* Modals Container */}
            <div>
                <div className={styles_.modalContainer}>
                    <Modal modalState={farmCreateOpen} closeHandler={() => setFarmCreateOpen(!farmCreateOpen)}>
                        <h1>My cool modal</h1>
                        <h2>Do you like it too ?</h2>
                    </Modal>
                </div>
            </div>
            {/* Modals Container end */}
        </div>
    )
}

export default DashboardIndex;