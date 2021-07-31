import React, { FunctionComponent, useState, useEffect } from "react";

// import styles 
import styles from "../../styles/auth/auth.module.css";

// import custom components
import AuthPagesHeader from "../../components/auth/Header";
import Logo from "../../components/logo";

// import util
import { signupHandler } from "../../utils/fetcher";

// import next router for routing after auth
import { NextRouter, useRouter } from "next/router";

const SERVER_: string = "http://localhost:4000";

const SignUpPage: FunctionComponent = (): JSX.Element => {

    // init router
    const router: NextRouter = useRouter();

    // states for the registration input fields
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [location, setLocation] = useState<string>("");

    // is he finally registered
    const [isRegistered, setIsRegistered] = useState<boolean>();

    // function to handle text input field changes
    function handleTextFieldChange(event, handler: Function): void {
        handler(event.target.value);
    }

    function chechIsSamePassowrd(): boolean {
        return confirmPassword === password;
    }

    // registration handler
    async function registerUser(event: any): Promise<void> {
        event.preventDefault();

        // registration status
        let registrationStatus: any;

        if (name !== "" && confirmPassword !== "" && email !== "" && location !== "") {
            registrationStatus = await signupHandler(SERVER_, name.trim(), confirmPassword.trim(), email.trim(), location.trim());
        } else {
            alert("Some fields are empty. Please fill them");
        }

        // handle not registered status
        if (!registrationStatus) {
            setIsRegistered(false);
        }

        // set auth token
        // console.log(`Registration status : ${JSON.stringify(registrationStatus)}`);
        localStorage.setItem("user", registrationStatus.token);
        localStorage.setItem("userName", registrationStatus.name);

        // redirect user to dashboard
        router.replace("/dashboard");

    }

    return (
        <div>
            <AuthPagesHeader context="Registration" />

            <section className={styles.registrationFormContainer}>
                <form className={styles.registrationForm} onSubmit={event => registerUser(event)}>
                    <span>
                        <Logo />
                    </span>
                    <input value={name} onChange={event => handleTextFieldChange(event, setName)} type="text" placeholder="Name" />
                    <input value={email} onChange={event => handleTextFieldChange(event, setEmail)} type="text" placeholder="Email" />
                    <input value={password} onChange={event => handleTextFieldChange(event, setPassword)} type="password" placeholder="Password" />
                    <input value={confirmPassword} onChange={event => handleTextFieldChange(event, setConfirmPassword)} type="password" placeholder="Confirm Password" />
                    {chechIsSamePassowrd() ? <p style={{ color: "rgb(118, 252, 118)", fontFamily: "sans-serif" }}>Passwords Match</p> : <p style={{ color: "rgb(255 59 59)", fontFamily: "sans-serif" }}> Passwords do not match </p>}
                    <input value={location} onChange={event => handleTextFieldChange(event, setLocation)} type="text" placeholder="Country" />
                    <button>
                        Register
                    </button>
                </form>
            </section>
        </div>
    )
}

export default SignUpPage;