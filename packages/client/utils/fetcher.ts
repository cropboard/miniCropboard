
// load necessary .env

// server uri
const SERVER_URI: string = process.env.CB_SERVER_URI;

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


// function to send GraphQL requests
// query has to be JSON stringified if JSON object
// action can either be query or mutation
async function sendGraphQLRequest(authToken: string, action: string, query: string): Promise<any> {
    // request headers for GraphQL request
    const requestHeaders: HeadersInit = {
        "Content-Type": "application/json",
        authorization: `Bearer ${authToken}`
    };

    const graphqlActionQuery: string = `query { ${query} }`;
    const graphqlActionMutation: string = `mutation { ${query} }`;

    if (action === "query") {
        const queryResponse = await fetch(`${SERVER_URI}/graphql`, {
            method: "POST",
            headers: requestHeaders,
            body: graphqlActionQuery
        });

        const queryData = await queryResponse.json();

        return queryData;
    } else if (action === "mutation") {
        const queryResponse = await fetch(`${SERVER_URI}/graphql`, {
            method: "POST",
            headers: requestHeaders,
            body: graphqlActionMutation
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
    const createFarmMutation: string = `
        createFarm(title: ${title}, fertilizer: ${fertilizer}, location: ${location}, inputSeeds: ${inputSeeds}, plant: ${plant}, category: ${category}) {
            title,
            fertilizer
        }
    `;

    let query = await sendGraphQLRequest(authToken, "mutation", createFarmMutation);

}

async function updateFarm(authToken: string, title: string, location: string, fertilizer: string, inputSeeds: string, plant: string, category: string): Promise<void> {
    const updateFarmMutation: string = `
        updateFarm(title: ${title}, location: ${location}, fertilizer: ${fertilizer}, inputSeeds: ${inputSeeds}, plant: ${plant}, category: ${category}) {
            title,
            location
        }
    `;

    let query = await sendGraphQLRequest(authToken, "mutation", updateFarmMutation);
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
    const createCropMutation: string = `
        createCrop(name: ${name}, category: ${category}, fertilizerQuantity: ${fertilizerQuantity}, water: ${water}, cost: ${cost}, weather: ${JSON.stringify(weather)}, farm: ${farm}) {
            name,
            fertilizerQuantity
        }
    `;

    const query = await sendGraphQLRequest(authToken, "mutation", createCropMutation);
}


export { signupHandler };