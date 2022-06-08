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

// farmCard component
import FarmCard from "../../components/dashboard/FarmCard";
import NewFarmCard from "../../components/dashboard/NewFarmCard";

import { NextRouter, useRouter } from "next/router";

// import creatFarm handler
import {
  createFarm,
  fetchFarms,
  checkIsAuthenticated,
} from "../../utils/fetcher";

interface userInfo {
  userName: string;
  user: string; // user jwt
}

interface Farm {
  title: string;
  location: string;
  category: string;
  kind: string;
  id: string;
}

const DashboardIndex: FunctionComponent = (): JSX.Element => {
  // const [loading, setLoading] = useState<boolean>(true);

  const router: NextRouter = useRouter();

  // user information -> name and jwt
  const [userInfo, setUserInfo] = useState<userInfo>();

  // are you authenticated ?
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  /* Create Farm */
  // modals states
  const [farmCreateOpen, setFarmCreateOpen] = useState<boolean>(false);

  // states for createFarm modal
  const [title, setTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  // farms state
  const [farms, setFarms] = useState<Array<Farm>>([]);

  // handle input value change
  function textFieldChangehandler(event: any, handler: Function): void {
    handler(event.target.value);
  }

  async function submitCreateFarmForm(event: any): Promise<void> {
    // event.preventDefault();
    if (title !== "" && location !== "") {
      const farmKind: string = event.target["1"].value; // fruits ? cereals ? legumes ?
      const farmCategory: string = event.target["2"].value;
      console.table({ farmKind, farmCategory, title, location });
      let results = await createFarm(
        userInfo.user,
        title.trim(),
        location.trim(),
        farmCategory,
        farmKind
      );
      return console.log(results);
    } else {
      alert("Some fields are empty");
    }
  }

  /* End Create Farm */

  // we want to check this before the component mounts
  useEffect(() => {
    let mounted: boolean = true;
    // get jwt and name from localStorage
    let name: string = localStorage.getItem("userName") ?? undefined;
    let token: string = localStorage.getItem("user") ?? undefined;

    console.log(name, token);

    if (name === undefined || token === undefined) {
      return;
    } else {
      let isAuth_ = checkIsAuthenticated(token).then((isAuth) => {
        console.log(isAuth);
        if (isAuth.message === "Authenticated") {
          setUserInfo({ userName: name, user: token });
          setIsAuthenticated(true);
        } else {
          return;
        }

        // if authenticated -> fetch farms
        if (isAuthenticated) {
          // fetch if authenticated
          let fetchedFarms_: any = fetchFarms(token).then((fetchedFarms) => {
            setFarms(fetchedFarms);
            console.log(farms);
          });
        } else {
          return;
        }

        console.log(`Mounted : ${mounted}`);
      });
    }

    console.log(`Mounted : ${mounted}`);

    return function cleanup() {
      // setLoading(false);
      mounted = false;
    };
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div>
        <DashboardHeader />
        <NotAuthCard />
      </div>
    );
  }

  return (
    <div className={styles.mainDashboardPage}>
      <DashboardHeader name={userInfo.userName} />

      <h2 className={styles.dashboardLabel__context}>Farms</h2>
      <div className={styles.mainDashboardContainer}>
        <div className={styles.FarmsShowSomething}>
          {farms === [] ? (
            <div className={styles.FarmsShowerNoFarms}>
              <NoFarms
                createFarmAction={() => setFarmCreateOpen(!farmCreateOpen)}
              />
            </div>
          ) : typeof farms === "object" ? (
            <div className={styles.FarmsShowerFarms}>
              {farms.map(
                ({ title, location, category, kind, id }, farm: any) => {
                  // console.log(farm)
                  return (
                    <FarmCard
                      key={farm}
                      title={title}
                      location={location}
                      category={category}
                      kind={kind}
                      id={id}
                      index={farm}
                    />
                  );
                }
              )}
              <NewFarmCard action={() => setFarmCreateOpen(!farmCreateOpen)} />
            </div>
          ) : (
            <div>
              <h2 style={{ fontFamily: "sans-serif" }}>No Data</h2>
              <p style={{ fontFamily: "sans-serif" }}>
                I am sure there is data...
              </p>{" "}
              <br />
              <p
                style={{
                  fontFamily: "sans-serif",
                  textDecoration: "underline",
                }}
                onClick={() => router.reload()}
              >
                retry
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modals Container */}
      <div className={styles.modalsContainer}>
        <div className={styles_.modalContainer}>
          <Modal
            modalState={farmCreateOpen}
            closeHandler={() => setFarmCreateOpen(!farmCreateOpen)}
          >
            <form
              onSubmit={(event) => submitCreateFarmForm(event)}
              className={styles.formStyle}
            >
              {/* title */}
              <input
                value={title}
                onChange={(event) => textFieldChangehandler(event, setTitle)}
                type="text"
                name="title"
                id="title"
                placeholder="Title of farm"
              />
              {/* kind */}
              <select name="kind" id="kind">
                <option value="Fruit">Fruit</option>
                <option value="Legume">Legume</option>
                <option value="Cereal">Cereal</option>
              </select>
              {/* category */}
              <select name="category" id="category">
                <option value="Cash">Cash Crop</option>
                <option value="Food">Food Crop</option>
              </select>
              {/* location */}
              <input
                value={location}
                onChange={(event) => textFieldChangehandler(event, setLocation)}
                type="text"
                name="location"
                id="location"
                placeholder="City of farm"
              />

              {/* Submit */}
              <button>Create Farm</button>
            </form>
          </Modal>
        </div>
      </div>
      {/* Modals Container end */}
    </div>
  );
};

export default DashboardIndex;
