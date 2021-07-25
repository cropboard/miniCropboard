import React, { FunctionComponent, useState } from "react";

// import styles 
import styles from "../../styles/auth/auth.module.css";

// import custom components
import AuthPagesHeader from "../../components/auth/Header";
import Logo from "../../components/logo";

const LoginPage: FunctionComponent = (): JSX.Element => {

    // states for the registration input fields
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [location, setLocation] = useState<string>("");

    // function to handle text input field changes
    function handleTextFieldChange(event, handler: Function): void {
        handler(event.target.value);
    }

    function chechIsSamePassowrd(): boolean {
        return confirmPassword === password;
    }

    return (
        <div>
            <AuthPagesHeader context="Login" />

            <section className={styles.registrationFormContainer}>
                <form className={styles.registrationForm}>
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