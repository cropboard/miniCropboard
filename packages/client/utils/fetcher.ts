
// load necessary .env

// server uri
const SERVER_URI: string = process.env.CB_SERVER_URI;

// headers
const requestHeaders: HeadersInit = {
    "Content-Type": "application/json"
};

async function signupHandler(server: string, name: string, password: string, email: string, location: string): Promise<any> {

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

export { signupHandler };