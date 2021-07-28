import React, { FunctionComponent, useState, useEffect } from "react";

// import custom components
import DashboardHeader from "../../../../components/dashboard/Header";
import NotAuthCard from "../../../../components/dashboard/notAuthCard";

// import crop fetcher
import { fetchCropData } from "../../../../utils/fetcher";

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

    // crops 
    const [cropsData, setCropsData] = useState<Array<CropData>>([]);

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
        console.log(`CropIndex : ${cropIndex_} farmIndex : ${farmIndex} `)
        let userName: string = localStorage.getItem("userName") ?? undefined;
        let user: string = localStorage.getItem("user") ?? undefined;

        if (userName === undefined || user === undefined) {
            return;
        } else {
            setIsAuth(true);
            setUserInfo({ user: user, userName: userName });

            fetchCropData(user, farmIndex, cropIndex_).then(result => {
                console.log(result);
                setCropsData(result);
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
        <h1>Hello from crop Page : {cropIndex} </h1>
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