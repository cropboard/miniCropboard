
// load necessary .env

// server uri
const SERVER_URI: string = process.env.SERVER_URI;

// headers
const requestHeaders: HeadersInit = {
    "Content-Type": "application/json"
};

async function signupHandler(name: string, password: string, email: string, location: string) {

    // data necessary to register new user
    let userData: object = {
        name: name,
        email: email,
        password: password,
        location: location
    };

    // fetch results
    let fetchResult = await fetch(SERVER_URI, {
        headers: requestHeaders,
        body: JSON.stringify(userData)
    });

    // the data got back from server -> expecting success
    let registrationResponse = await fetchResult.json();

    console.log(registrationResponse);
}

export { signupHandler };