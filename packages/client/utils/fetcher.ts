// load necessary .env

// server uri
const SERVER_URI: string = process.env.NEXT_PUBLIC_CB_SERVER_URI;

async function signupHandler(
  server: string,
  name: string,
  password: string,
  email: string,
  location: string
): Promise<any> {
  // headers
  const requestHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  // data necessary to register new user
  let userData: object = {
    name: name,
    email: email,
    password: password,
    location: location,
  };

  // fetch results
  let fetchResult = await fetch(`${SERVER_URI || server}/signup`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(userData),
  });

  // the data got back from server -> expecting success
  let registrationResponse: any = await fetchResult.json();

  console.log(registrationResponse);

  if (registrationResponse.Message === "NotCreated") {
    return false;
  }

  return {
    state: "Created",
    token: registrationResponse.Token,
    name: registrationResponse.name,
  };
}

async function loginHandler(
  server: string,
  email: string,
  password: string
): Promise<any> {
  // headers
  const requestHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  // data necessary to register new user
  let userData: object = {
    email: email,
    password: password,
  };

  // fetch results
  let fetchResult = await fetch(`${SERVER_URI || server}/login`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(userData),
  });

  // the data got back from server -> expecting success
  let registrationResponse: any = await fetchResult.json();

  if (
    registrationResponse.message === "Incorrect Password" ||
    registrationResponse.message === "Incorrect email"
  ) {
    return { state: "LoginError" };
  }

  return registrationResponse;
}

async function checkIsAuthenticated(authToken: string) {
  // headers
  const requestHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  // fetch result
  let isAuthResult = await fetch(`${SERVER_URI}/isauthenticated`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify({ token: authToken }),
  });

  let isAuthResponse = await isAuthResult.json();

  return isAuthResponse;
}

async function getWeatherData(cityName: string): Promise<string> {
  const weatherMicroserviceURL: string =
    "https://weathermicroservice.cropboard.studio";

  const fetchedResult: any = await fetch(
    `${weatherMicroserviceURL}/${cityName}`
  );
  const weatherData: any = await fetchedResult.json();
  return JSON.stringify(weatherData);
}

// function to send GraphQL requests
// query has to be JSON stringified if JSON object
// action can either be query or mutation
async function sendGraphQLRequest(
  authToken: string,
  action: string,
  query: string,
  variablesPlaceholder?: string,
  variables?: object
): Promise<any> {
  // request headers for GraphQL request
  const requestHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
    mode: "no-cors",
  };

  const graphqlActionQuery: object = {
    query: `query ${query}`,
  };
  const graphqlActionMutation: object = {
    query: `mutation ${variablesPlaceholder} { ${query} }`,
    variables: JSON.stringify(variables),
  };

  if (action === "query") {
    const queryResponse = await fetch(`${SERVER_URI}/graphql`, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(graphqlActionQuery),
    });

    const queryData = await queryResponse.json();

    return queryData;
  } else if (action === "mutation") {
    const queryResponse = await fetch(`${SERVER_URI}/graphql`, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(graphqlActionMutation),
    });

    const queryData = await queryResponse.json();

    return queryData;
  } else {
    return Error("UnknownAction");
  }
}

// function to create a farm
// this is a mutation query
async function createFarm(
  authToken: string,
  title: string,
  location: string,
  category: string,
  kind: string
): Promise<any> {
  // the constructed graphql query with vars
  const createFarmMutationVariablesPlaceholder: string =
    "($title: String!, $location: String!, $category: String!, $kind: String!)";
  const createFarmMutation: string =
    "createFarm(title: $title, category: $category, location: $location, kind: $kind) {title,location}";
  const createFarmMutationVariables: object = {
    title,
    kind,
    location,
    category,
  };

  let query = await sendGraphQLRequest(
    authToken,
    "mutation",
    createFarmMutation,
    createFarmMutationVariablesPlaceholder,
    createFarmMutationVariables
  );

  return query;
}

async function updateFarm(
  authToken: string,
  title: string,
  location: string,
  fertilizer: string,
  inputSeeds: string,
  plant: string,
  category: string
): Promise<void> {
  const updateFarmMutationVariablesPlaceholder: string =
    "($title: String, $location: String, $fertilizer: String, $inputSeeds: String, $plant: String, $category: String)";
  const updateFarmMutation: string = `updateFarm(title: $title, location: $location, fertilizer: $fertilizer, inputSeeds: $inputSeeds, plant: $plant, category: $category) {title,location}`;
  const updateFarmMutationVariables: object = {
    title,
    location,
    fertilizer,
    inputSeeds,
    plant,
    category,
  };

  let query = await sendGraphQLRequest(
    authToken,
    "mutation",
    updateFarmMutation,
    updateFarmMutationVariablesPlaceholder,
    updateFarmMutationVariables
  );

  return query;
}

async function createCrop(
  authToken: string,
  name: string,
  category: string,
  fertilizer: string,
  inputSeeds: number,
  farm: string
): Promise<void> {
  const createCropMutationVariablesPlaceholder: string =
    "($name: String!, $category: String!, $fertilizer: String!, $inputSeeds: Int!, $farm: String!)";
  const createCropMutation: string = `createCrop(name: $name, category: $category, fertilizer: $fertilizer, inputSeeds: $inputSeeds, farm: $farm) {name,fertilizer}`;
  const createCropMutationVariables: object = {
    name,
    category,
    fertilizer,
    inputSeeds: inputSeeds,
    farm,
  };

  const query = await sendGraphQLRequest(
    authToken,
    "mutation",
    createCropMutation,
    createCropMutationVariablesPlaceholder,
    createCropMutationVariables
  );

  return query;
}

async function createCropData(
  authToken: string,
  fertilizerQuantity: number,
  cost: number,
  water: number,
  crop: string,
  location: string,
  fertilizer?: string
) {
  // get weather data
  const weatherData: string = await getWeatherData(location);
  console.log(`Weather Data -> ${weatherData}`);

  const createCropDataMutationVariablesPlaceholder__fertilizer: string =
    "($fertilizer: String, $fertilizerQuantity: Int!, $water: Int!, $cost: Int!, $crop: String!, $weather: String!)";
  const createCropDataMutationVariablesPlaceholder_: string =
    "($fertilizerQuantity: Int!, $water: Int!, $cost: Int!, $crop: String!, $weather: String!)";
  const createCropMutation__fertilizer: string =
    "createCropData(fertilizer: $fertilizer, fertilizerQuantity: $fertilizerQuantity, water: $water, cost: $cost, crop: $crop, weather: $weather) { water, cost }";
  const createCropMutation_: string =
    "createCropData(fertilizerQuantity: $fertilizerQuantity, water: $water, cost: $cost, crop: $crop, weather: $weather) { water, cost }";
  const createCropMutationVariables__fertilzer: object = {
    fertilizer,
    fertilizerQuantity,
    water,
    cost,
    weather: weatherData,
  };
  const createCropMutationVariables_: object = {
    fertilizerQuantity,
    water,
    cost,
    crop,
    weather: weatherData,
  };

  if (fertilizer) {
    const query = await sendGraphQLRequest(
      authToken,
      "mutation",
      createCropMutation__fertilizer,
      createCropDataMutationVariablesPlaceholder__fertilizer,
      createCropMutationVariables__fertilzer
    );
    return query;
  } else {
    const query = await sendGraphQLRequest(
      authToken,
      "mutation",
      createCropMutation_,
      createCropDataMutationVariablesPlaceholder_,
      createCropMutationVariables_
    );
    return query;
  }
}

async function fetchFarms(authToken: string): Promise<any> {
  const queryFarms: string = `{user {name,farms { title, location, category, kind, id }}}`;

  let queryFarmsResult: any = await sendGraphQLRequest(
    authToken,
    "query",
    queryFarms
  );

  if (queryFarmsResult?.data?.user?.farms === []) {
    return [];
  } else {
    return queryFarmsResult?.data?.user?.farms;
  }
}

async function fetchCrops(authToken: string, farmIndex: number): Promise<any> {
  const queryCrops: string = `{user { name, farms { title, location, category, kind, crops { name, category, fertilizer, harvested } }}}`;

  let queryCropsResult: any = await sendGraphQLRequest(
    authToken,
    "query",
    queryCrops
  );

  if (queryCropsResult?.data?.user?.farms === []) {
    return [];
  } else if (queryCropsResult?.data?.user?.farms[farmIndex]?.crops === []) {
    return [];
  } else {
    return queryCropsResult?.data?.user !== null &&
      queryCropsResult?.data?.user?.farms[farmIndex]?.crops !== null
      ? queryCropsResult?.data?.user?.farms[farmIndex]?.crops
      : [];
  }
}

async function fetchCropData(
  authToken: string,
  farmIndex: number,
  cropIndex: number
): Promise<any> {
  const queryCropData: string = `{ user { farms { title, location, crops { name, category, id, harvested, inputSeeds, output, cropsData { name, category, fertilizer, fertilizerQuantity, water, cost } } } } }`;

  let queryCropsDataResult: any = await sendGraphQLRequest(
    authToken,
    "query",
    queryCropData
  );
  // console.log(queryCropsDataResult?.data?.user?.farms[farmIndex]?.crops[cropIndex]);
  return queryCropsDataResult?.data?.user?.farms !== null &&
    queryCropsDataResult?.data?.user?.farms[farmIndex]?.crops[cropIndex] !==
      null &&
    queryCropsDataResult?.data?.user?.farms[farmIndex]?.crops
    ? [
        queryCropsDataResult?.data?.user?.farms[farmIndex]?.crops[cropIndex],
        queryCropsDataResult?.data?.user?.farms[farmIndex]?.location,
      ]
    : [];
}

async function harvestCrop(
  authToken: string,
  cropId: string,
  output: number
): Promise<any> {
  const harvestCropMutationVariablePlaceholder: string =
    "($id: String!, $output: Int!)";
  const harvestCropMutation: string = "harvestCrop(id: $id, output: $output)";
  const harvestCropMutation__object: object = {
    id: cropId,
    output: output,
  };

  const queryResult: any = await sendGraphQLRequest(
    authToken,
    "mutation",
    harvestCropMutation,
    harvestCropMutationVariablePlaceholder,
    harvestCropMutation__object
  );

  if (queryResult?.data?.harvestCrop === "Harvested") {
    return "Harvested";
  } else {
    return "Error";
  }
}

export {
  signupHandler,
  loginHandler,
  createFarm,
  createCrop,
  updateFarm,
  fetchFarms,
  checkIsAuthenticated,
  fetchCrops,
  fetchCropData,
  createCropData,
  harvestCrop,
};
