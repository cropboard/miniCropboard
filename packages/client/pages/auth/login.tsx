import React, { FunctionComponent, useState } from "react";

// import styles 
import styles from "../../styles/auth/auth.module.css";

// import custom components
import AuthPagesHeader from "../../components/auth/Header";
import Logo from "../../components/logo";

// import login handler
import { loginHandler } from "../../utils/fetcher";

// import next router for routing after auth
import { NextRouter, useRouter } from "next/router";

const SERVER_: string = "http://localhost:4000";

const LoginPage: FunctionComponent = (): JSX.Element => {

    // init router
    const router: NextRouter = useRouter();

    // states for the registration input fields
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // function to handle text input field changes
    function handleTextFieldChange(event, handler: Function): void {
        handler(event.target.value);
    }

    async function loginUser(event: any): Promise<void> {

        // prevent browser reload
        event.preventDefault();

        // login statuse
        const loginStatus: any = await loginHandler(SERVER_, email, password);

        if (loginStatus.state === "LoginError") {
            // handle this with a model
            alert("LoginError");
            return
        }

        // console.log(loginStatus);
        localStorage.setItem("user", loginStatus.token);
        localStorage.setItem("userName", loginStatus.name);

        // redirect user to dashboard
        router.replace("/dashboard");

    }

    return (
        <div>
            <AuthPagesHeader context="Login" />

            <section className={styles.registrationFormContainer}>
                <form className={styles.registrationForm} onSubmit={event => loginUser(event)}>
                    <span>
                        <Logo />
                    </span>
                    <input value={email} onChange={event => handleTextFieldChange(event, setEmail)} type="text" placeholder="Email" />
                    <input value={password} onChange={event => handleTextFieldChange(event, setPassword)} type="password" placeholder="Password" />
                    <button>
                        Login
                    </button>
                </form>
            </section>
        </div>
    )
}

export default LoginPage;