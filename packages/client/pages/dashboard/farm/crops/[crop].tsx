import React, { FunctionComponent, useState, useEffect } from "react";

// import custom components
import DashboardHeader from "../../../../components/dashboard/Header";
import NotAuthCard from "../../../../components/dashboard/notAuthCard";
import CropDataCard from "../../../../components/dashboard/CropDataCard";
import TeeGraph from "../../../../components/special/TeeGraph";
import Modal from "../../../../components/modal";

// import crop fetcher
import { fetchCropData } from "../../../../utils/fetcher";

// import tee graph
// import { TeeGraph } from "../../../../utils/teegraph";

// import styles
import miscStyles from "../../../../styles/misc.module.css";
import styles from "../../../../styles/dashboard/crop.module.css";

interface CropPageProps {
    cropIndex: string
}

interface Crop {
    name: string
    category: string
    fertilizer: string
}

interface CropData {
    name: string
    category: string
    fertilizer: string
    fertilizerQuantity: number
    water: number
    cost: number
    // timeStamp: string
    // weather: any
    // crop: string
}

interface cropDataStruct {
    value: number
    date: string
}

interface User {
    userName: string
    user: string
}


const CropPage: FunctionComponent<CropPageProps> = ({ cropIndex }): JSX.Element => {

    // let page query
    const farmIndex: number = parseInt(cropIndex.split("-")[0]);
    const cropIndex_: number = parseInt(cropIndex.split("-")[1]);

    // the user credentials
    const [userInfo, setUserInfo] = useState<User>();

    const [cropCreate, setCropCreate] = useState<boolean>();
    // crops 
    const [cropsData, setCropsData] = useState<Array<CropData>>([]);
    let cropsData_: Array<cropDataStruct> = [];

    // loading state
    const [loading, setLoading] = useState<boolean>(true);

    // is authenticated
    const [isAuth, setIsAuth] = useState<boolean>(false);

    useEffect(() => {
        let userName: string = localStorage.getItem("userName");
        let user: string = localStorage.getItem("user");

        if (user !== undefined || userName !== undefined) {
            setUserInfo({ user: user, userName: userName });
            setIsAuth(true);

            fetchCropData(user, farmIndex, cropIndex_).then(result => {
                console.log(result);
                setCropsData(result);
                cropsData_ = result;
            }).catch(error => setCropsData([]));
        }


    }, []);

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
        <div className={styles.cropDashboardPage}>
            <DashboardHeader name={userInfo.userName} />
            <h2 style={{ fontFamily: "sans-serif" }}>Graphical Overview</h2>
            <div className={styles.dashboardSections}>
                <div className={styles.dashboardContainer}>
                    <div>
                        {
                            cropsData !== undefined ?
                                <div>
                                    {
                                        cropsData.length === 0 ?
                                            <div>
                                                <h2>No Crop Data</h2>
                                            </div>
                                            :
                                            <div className={styles.cropDataCardsCn}>
                                                <button onClick={() => setCropCreate(!cropCreate)} className={miscStyles.newRecordButton}>
                                                    <img src="/dashboard/plus-outline.png" alt="new-record-btn" />
                                                    New Record
                                                </button>
                                                <div className={styles.cropDataCards}>
                                                    {cropsData.map(({ name, category, fertilizer, fertilizerQuantity, cost, water }, cropdata_) => {
                                                        return (
                                                            <CropDataCard
                                                                key={cropdata_}
                                                                name={name}
                                                                category={category}
                                                                fertilizer={fertilizer}
                                                                fertilizerQuantity={fertilizerQuantity}
                                                                cost={cost}
                                                                water={water}
                                                            />
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                    }
                                </div>
                                :
                                <div>
                                    <h2>Try Again</h2>
                                </div>
                        }
                    </div>
                </div>

                <main className={styles.mainGraphContainer}>
                    <div>
                        <div>
                            <h2>Cost</h2>
                            <TeeGraph
                                data={cropsData}
                                width={300}
                                value="cost"
                                thickness={40}
                            />
                        </div>
                        <div>
                            <h2>Water</h2>
                            <TeeGraph
                                data={cropsData}
                                width={300}
                                value="water"
                                thickness={40}
                            />
                        </div>
                        <div>
                            <h2>Fertilizer Quantity</h2>
                            <TeeGraph
                                data={cropsData}
                                width={300}
                                value="fertilizerQuantity"
                                thickness={40}
                            />
                        </div>
                    </div>
                </main>
            </div>

            <div className={styles.modalContainer}>
                <Modal modalState={cropCreate} closeHandler={() => setCropCreate(false)}>
                    <form className={styles.formStyle}>
                        <input type="text" name="fertilizer" id="fertilizer" placeholder="Fertilizer(option)" />
                        <input type="text" name="fertilizerQuantity" id="fertilizerQuantity" placeholder="Fertilizer Quantity" />
                        <input type="number" name="water" id="water" placeholder="Water in liters" />
                        <input type="number" name="cost" id="cost" placeholder="Cost in your local currency" />
                        <button>
                            Create Record
                        </button>
                    </form>
                </Modal>
            </div>
        </div>
    )
}

export async function getServerSideProps(ctx: any) {
    const cropIndex: number = ctx.query.crop;

    // the query is of the farm farmIndex-cropIndex
    return {
        props: {
            cropIndex
        }
    }
}

export default CropPage;