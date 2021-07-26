import React, { FunctionComponent, useState, useEffect } from "react";

// import custom components
import DashboardHeader from "../../components/dashboard/Header";

import NoFarms from "../../components/dashboard/NoFarms";
import NotAuthCard from "../../components/dashboard/notAuthCard";

// import main dashboard styles
import styles from "../../styles/dashboard/index.module.css";
import styles_ from "../../styles/misc.module.css";

// use modal
import Modal from "../../components/modal";

// import creatFarm handler
import { createFarm } from "../../utils/fetcher";

interface userInfo {
    userName: string
    user: string // user jwt
}

const DashboardIndex: FunctionComponent = (): JSX.Element => {

    // user information -> name and jwt
    const [userInfo, setUserInfo] = useState<userInfo>();

    // are you authenticated ?
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    /* Create Farm */
    // modals states
    const [farmCreateOpen, setFarmCreateOpen] = useState<boolean>(false);

    // states for createFarm modal
    const [title, setTitle] = useState<string>("");
    const [plant, setPlant] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [inputSeeds, setInputSeeds] = useState<string>("");
    const [fertilizer, setFertilizer] = useState<string>("");
    const [location, setLocation] = useState<string>("");

    // handle input value change
    function textFieldChangehandler(event: any, handler: Function): void {
        handler(event.target.value);
    }

    async function submitCreateFarmForm(event: any): Promise<void> {
        // event.preventDefault();
        if (title !== "" && plant !== "" && category !== "" && inputSeeds !== "" && fertilizer !== "" && location !== "") {
            let results = await createFarm(userInfo.user, title, fertilizer, location, inputSeeds, plant, category);
            return console.log(results);
        } else {
            alert("Some fields are empty");
        }
    }

    /* End Create Farn */

    // we want to check this before the component mounts
    useEffect(() => {
        // get jwt and name from localStorage
        let name: string = localStorage.getItem("userName") ?? undefined;
        let token: string = localStorage.getItem("user") ?? undefined;

        console.log(name, token);

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
                        <form onSubmit={event => submitCreateFarmForm(event)} className={styles.formStyle}>
                            {/* title */}
                            <input value={title} onChange={event => textFieldChangehandler(event, setTitle)} type="text" name="title" id="title" placeholder="Title of farm" />
                            {/* plant */}
                            <input value={plant} onChange={event => textFieldChangehandler(event, setPlant)} type="text" name="plant" id="plant" placeholder="Name of plant e.g Tomato" />
                            {/* category */}
                            <input value={category} onChange={event => textFieldChangehandler(event, setCategory)} type="text" name="category" id="category" placeholder="Type of plant e.g fruit, legume..." />
                            {/* inputSeeds */}
                            <input value={inputSeeds} onChange={event => textFieldChangehandler(event, setInputSeeds)} type="text" name="inputSeeds" id="inputSeeds" placeholder="Quantity of seeds in kg or tonnes" />
                            {/* fertilizer */}
                            <input value={fertilizer} onChange={event => textFieldChangehandler(event, setFertilizer)} type="text" name="fertilizer" id="fertilizer" placeholder="Type of fertilizer e.g NPK" />
                            {/* location */}
                            <input value={location} onChange={event => textFieldChangehandler(event, setLocation)} type="text" name="location" id="location" placeholder="Location of farm" />

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