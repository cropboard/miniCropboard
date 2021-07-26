
// load necessary .env

// server uri
const SERVER_URI: string = process.env.NEXT_PUBLIC_CB_SERVER_URI;

async function signupHandler(server: string, name: string, password: string, email: string, location: string): Promise<any> {

    // headers
    const requestHeaders: HeadersInit = {
        "Content-Type": "application/json",
    };

    // data necessary to register new user
    let userData: object = {
        name: name,
        email: email,
        password: password,
        location: location
    };

    // fetch results
    let fetchResult = await fetch(`${SERVER_URI || server}/signup`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(userData)
    });

    // the data got back from server -> expecting success
    let registrationResponse: any = await fetchResult.json();

    console.log(registrationResponse);

    if (registrationResponse.Message === "NotCreated") {
        return false;
    }

    return {state: "Created", token: registrationResponse.Token, name: registrationResponse.name}
}

async function loginHandler(server: string, email: string, password: string): Promise<any> {

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
        body: JSON.stringify(userData)
    });

    // the data got back from server -> expecting success
    let registrationResponse: any = await fetchResult.json();

    if (registrationResponse.message === "Incorrect Password" || registrationResponse.message === "Incorrect email") {
        return { state: "LoginError" }
    }

    return registrationResponse;
    
}


// function to send GraphQL requests
// query has to be JSON stringified if JSON object
// action can either be query or mutation
async function sendGraphQLRequest(authToken: string, action: string, query: string, variablesPlaceholder?: string, variables?: object): Promise<any> {
    // request headers for GraphQL request
    const requestHeaders: HeadersInit = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
    };

    const graphqlActionQuery: object = {
        query: `query { ${action} }`
    };
    const graphqlActionMutation: object = {
        query: `mutation ${variablesPlaceholder} { ${query} }`,
        variables: JSON.stringify(variables)
    };

    if (action === "query") {
        const queryResponse = await fetch(`${SERVER_URI}/graphql`, {
            method: "POST",
            headers: requestHeaders,
            body: JSON.stringify(graphqlActionQuery)
        });

        const queryData = await queryResponse.json();

        return queryData;
    } else if (action === "mutation") {
        const queryResponse = await fetch(`${SERVER_URI}/graphql`, {
            method: "POST",
            headers: requestHeaders,
            body: JSON.stringify(graphqlActionMutation)
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
    fertilizer: string, 
    location: string, 
    inputSeeds: string, 
    plant: string, 
    category: string): Promise<any> {

    // the constructed graphql query with vars
    const createFarmMutationVariablesPlaceholder: string = "($title: String!, $location: String!, $fertilizer: String!, $inputSeeds: String!, $plant: String!, $category: String!)";
    const createFarmMutation: string = "createFarm(title: $title, fertilizer: $fertilizer, location: $location, inputSeeds: $inputSeeds, plant: $plant, category: $category) {title,fertilizer}";
    const createFarmMutationVariables: object = {
        title: title,
        fertilizer,
        location,
        inputSeeds,
        plant,
        category
    };

    let query = await sendGraphQLRequest(authToken, "mutation", createFarmMutation, createFarmMutationVariablesPlaceholder, createFarmMutationVariables);

    return query;
}

async function updateFarm(
    authToken: string, 
    title: string, 
    location: string, 
    fertilizer: string, 
    inputSeeds: string, 
    plant: string, 
    category: string): Promise<void> {

    const updateFarmMutationVariablesPlaceholder: string = "($title: String, $location: String, $fertilizer: String, $inputSeeds: String, $plant: String, $category: String)";
    const updateFarmMutation: string = `updateFarm(title: $title, location: $location, fertilizer: $fertilizer, inputSeeds: $inputSeeds, plant: $plant, category: $category) {title,location}`;
    const updateFarmMutationVariables: object = {
        title,
        location,
        fertilizer,
        inputSeeds,
        plant,
        category
    }

    let query = await sendGraphQLRequest(authToken, "mutation", updateFarmMutation, updateFarmMutationVariablesPlaceholder, updateFarmMutationVariables);

    return query;
}


async function createCrop(
    authToken: string, 
    name: string, 
    category: string, 
    fertilizerQuantity: number, 
    water: number, 
    cost: number, 
    weather: object, 
    farm: string): Promise<void> {

    const createCropMutationVariablesPlaceholder: string = "($name: String!, $category: String!, $fertilizerQuantity: Int!, $water: Int!, $cost: Int!, $weather: Weather!, $farm: String!)";
    const createCropMutation: string = `createCrop(name: $name, category: $category, fertilizerQuantity: $fertilizerQuantity, water: $water, cost: $cost, weather: $weather, farm: $farm) {name,fertilizerQuantity}`;
    const createCropMutationVariables: object = {
        name,
        category,
        fertilizerQuantity,
        water,
        cost,
        weather: JSON.stringify(weather),
        farm
    };

    const query = await sendGraphQLRequest(authToken, "mutation", createCropMutation, createCropMutationVariablesPlaceholder, createCropMutationVariables);

    return query;
}


export { signupHandler, loginHandler, createFarm, createCrop, updateFarm };