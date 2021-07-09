import React, { FunctionComponent } from "react";

// import custom components
import DashboardHeader from "../../components/dashboard/Header";
import DashboardMaincontrols from "../../components/dashboard/mainControls";

import NoFarms from "../../components/dashboard/NoFarms";

// import main dashboard styles
import styles from "../../styles/dashboard/index.module.css";

const DashboardIndex: FunctionComponent = (): JSX.Element => {
    return (
        <div className={styles.mainDashboardPage}>
            <DashboardHeader />
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