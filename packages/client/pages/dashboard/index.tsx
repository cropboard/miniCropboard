import React, { FunctionComponent, useState, useEffect } from "react";

// import custom components
import DashboardHeader from "../../components/dashboard/Header";
import CreateFarmButton from "../../components/dashboard/createFarmButton";

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

                <div className={styles.NoFarmsShowSomething}>
                    <div className={styles.noFarmShower}>
                        <NoFarms createFarmAction={() => setFarmCreateOpen(!farmCreateOpen)} />
                    </div>
                </div>

            </div>

            {/* Modals Container */}
            <div className={styles.modalsContainer}>
                <div className={styles_.modalContainer}>
                    <Modal modalState={farmCreateOpen} closeHandler={() => setFarmCreateOpen(!farmCreateOpen)}>
                        <form className={styles.formStyle} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            {/* title */}
                            <input type="text" name="title" id="title" placeholder="Title of farm" />
                            {/* plant */}
                            <input type="text" name="plant" id="plant" placeholder="Name of plant e.g Tomato" />
                            {/* category */}
                            <input type="text" name="category" id="category" placeholder="Type of plant e.g fruit, legume..." />
                            {/* inputSeeds */}
                            <input type="text" name="inputSeeds" id="inputSeeds" placeholder="Quantity of seeds in kg or tonnes" />
                            {/* fertilizer */}
                            <input type="text" name="fertilizer" id="fertilizer" placeholder="Type of fertilizer e.g NPK" />
                            {/* location */}
                            <input type="text" name="location" id="location" placeholder="Location of farm" />

                            {/* Submit */}
                            <button>
                                Creat Farm
                            </button>
                        </form>
                    </Modal>
                </div>
            </div>
            {/* Modals Container end */}
        </div>
    )
}

export default DashboardIndex;