import React, { FunctionComponent, useEffect, useState } from "react";

// import custom components
import DashboardHeader from "../../../components/dashboard/Header";
import NotAuthCard from "../../../components/dashboard/notAuthCard";
import CropCard from "../../../components/dashboard/CropCard";
import NewCropCard from "../../../components/dashboard/NewCropCard";
import Modal from "../../../components/modal";

// import fetcher
import { fetchCrops } from "../../../utils/fetcher";

import styles from "../../../styles/dashboard/farm.module.css";
import styles_ from "../../../styles/misc.module.css";

interface FarmByDashboard {
    pageIndex: number
}

interface Crop {
    name: string
    category: string
    fertilizer: string
}

interface User {
    userName: string
    user: string
}

const FarmDashboardByIndex: FunctionComponent<FarmByDashboard> = ({ pageIndex }): JSX.Element => {

    // the user credentials
    const [userInfo, setUserInfo] = useState<User>();

    // crops 
    const [crops, setCrops] = useState<Array<Crop>>([]);

    // is authenticated
    const [isAuth, setIsAuth] = useState<boolean>(false);

    // modal form states
    const [name, setName] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [fertilizer, setFertlizer] = useState<string>("");

    // handle input value change
    function textFieldChangehandler(event: any, handler: Function): void {
        handler(event.target.value);
    }

    const [cropsCreateOpen, setCropsCreateOpen] = useState<boolean>(false);
    useEffect(() => {
        let userName: string = localStorage.getItem("userName") ?? undefined;
        let user: string = localStorage.getItem("user") ?? undefined;

        if (userName === undefined || user === undefined) {
            return;
        } else {
            setIsAuth(true);
            setUserInfo({ user: user, userName: userName });

            fetchCrops(user, pageIndex).then(result => {
                setCrops(result);
                console.log(result);
            });
        }

        return function cleanup() {
            setTimeout((() => undefined), 2000);
        }
    }, [isAuth]);

    if (!isAuth) {
        return (
            <div>
                <DashboardHeader />
                <div>
                    <NotAuthCard />
                </div>
            </div>
        )
    }

    return (
        <div>
            <DashboardHeader />
            <h2 className={styles.farm__croplabel}>Crops</h2>
            <main className={styles.farm__cropsDashboardContainer}>
                <div>
                    {crops === [] ?
                        <div className={styles.farm__cropsDashboard}>
                            <NewCropCard action={() => (() => undefined)} />
                        </div>
                        : crops === undefined || crops === null ?
                            <div className={styles.farm__cropsDashboard}>
                                Error
                            </div>
                            : <div className={styles.farm__cropsDashboard}>
                                {crops.map(({ name, category, fertilizer }) => {
                                    return (
                                        <CropCard
                                            key={name}
                                            name={name}
                                            category={category}
                                            fertilizer={fertilizer}
                                        />
                                    )
                                })}
                                <NewCropCard action={() => setCropsCreateOpen(!cropsCreateOpen)} />
                            </div>}
                </div>
            </main>

            <div>
                {/* Modals Container */}
                <div className={styles.modalsContainer}>
                    <div className={styles_.modalContainer}>
                        <Modal modalState={cropsCreateOpen} closeHandler={() => setCropsCreateOpen(!cropsCreateOpen)}>
                            <form className={styles.formStyle}>
                                <input value={name} onChange={event => textFieldChangehandler(event, setName)} type="text" name="name" id="name" placeholder="Crop Name e.g Orange" />
                                <input value={category} onChange={event => textFieldChangehandler(event, setCategory)} type="text" name="category" id="category" placeholder="Category e.g Fruit" />
                                <input value={fertilizer} onChange={event => textFieldChangehandler(event, setFertlizer)} type="text" name="fertilizer" id="fertilizer" placeholder="Fertilizer type e.g NPK" />
                                <button>
                                    Create Crop
                                </button>
                            </form>
                        </Modal>
                    </div>
                </div>
                {/* Modals Container end */}
            </div>
        </div>
    )
}

export async function getServerSideProps(ctx: any) {
    let pageIndex: number = ctx?.query?.fidx;
    console.log(pageIndex);

    return {
        props: {
            pageIndex: pageIndex
        }
    }
}


export default FarmDashboardByIndex;