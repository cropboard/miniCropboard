import React, { FunctionComponent } from "react";

import CreateFarmButton from "./createFarmButton";

interface NoFarmsProps {
  createFarmAction: Function;
}

const NoFarms: FunctionComponent<NoFarmsProps> = ({
  createFarmAction,
}): JSX.Element => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          flexDirection: "column",
        }}
      >
        <img src="/dashboard/cube.svg" alt="" />
        <h2>No Farms Yet</h2>
        <CreateFarmButton action={() => createFarmAction()} />
      </div>
    </div>
  );
};

export default NoFarms;
